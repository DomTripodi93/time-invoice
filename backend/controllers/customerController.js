const autoMapper = require("../middleware/autoMapper");


function CustomerController(Customer) {

    function post(req, res) {
        const customer = new Customer(req.body);
        customer.userId = req.userId;
        customer.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            return res.json(customer);
        });
    };


    async function getAll(req, res) {
        let query = {
            userId: req.userId
        }
        Customer.find(query)
            .then(results => {
                return res.json(results);
            })
            .catch(err => {
                res.json(err);
            });
    };


    async function getGroups(req, res) {
        let query = {
            userId: req.userId,
            isGroup: true
        }
        Customer.find(query)
            .then(results => {
                return res.json(results);
            })
            .catch(err => {
                res.json(err);
            });
    };


    function put(req, res) {
        const query = {
            userId: req.userId,
            _id: req.params._id
        }
        Customer.findOne(query, (err, customer) => {
            if (err) {
                return res.send(err);
            }
            let customerForUpdate = customer.toObject();
            customerForUpdate = autoMapper(customerForUpdate, req.body);
            Customer.updateOne(query, customerForUpdate)
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json(customerForUpdate);
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    }

    function deleteCustomer(req, res) {
        const query = {
            userId: req.userId,
            _id: req.params._id
        }
        Customer.deleteMany(query).then(
            result => {
                if (result.n > 0) {
                    return res.status(200).json({ message: "Deletion successful!" });
                } else {
                    return res.status(500).json({ message: "Cannot Delete" });
                }
            }
        );
    }

    return { post, getAll, getGroups, put, deleteCustomer }
}

module.exports = CustomerController;