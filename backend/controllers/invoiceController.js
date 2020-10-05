const autoMapper = require("../middleware/autoMapper");

function InvoiceController(Invoice) {

    function post(req, res) {
        const invoice = new Invoice(req.body);
        invoice.userId = req.userId;
        invoice.date = dateRegulator(invoice.date);
        invoice.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            return res.json(invoice);
        });
    };

    function getDateRange(startDate, endDate) {
        const startInfo = startDate.split("-");
        startInfo[1] -= 1;
        const endInfo = endDate.split("-");
        endInfo[1] -= 1;

        return {
            $gte: new Date(Date.UTC(...startInfo, 00, 00, 00)),
            $lt: new Date(Date.UTC(...endInfo, 23, 59, 59))
        }
    }

    function getByNumber(req, res) {
        const query = {
            userId: req.userId,
            invoiceNumber: req.params.invoiceNumber
        }
        Invoice.find(query)
            .sort({date: 1})
            .exec((err, invoices) => {
            if (err) {
                return res.send(err);
            }
            return res.json(invoices);
        });
    };

    function getByPeriod(req, res) {
        const startDate = req.params.startDate;
        const endDate = req.params.endDate;
        const query = {
            userId: req.userId,
            date: getDateRange(startDate, endDate)
        }
        Invoice.find(query)
            .sort({date: 1})
            .exec((err, invoices) => {
            if (err) {
                return res.send(err);
            }
            return res.json(invoices);
        });
    };


    function put(req, res) {
        const query = {
            _id: req.params._id
        }
        Invoice.find(query, (err, users) => {
            if (err) {
                return res.send(err);
            }
            let invoiceForUpdate = users[0].toObject();
            invoiceForUpdate = autoMapper(invoiceForUpdate, req.body);
            Invoice.updateOne(query, invoiceForUpdate)
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json({ message: "Update Successful" });
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    }

    function deleteTime(req, res) {
        const query = {
            _id: req.params._id
        }
        Invoice.deleteOne(query).then(
            result => {
                if (result.n > 0) {
                    return res.status(200).json({ message: "Deletion successful!" });
                } else {
                    return res.status(500).json({ message: "Cannot Delete" });
                }
            }
        );
    }

    return { post, getByPeriod, getByNumber, put, deleteTime }
}

module.exports = InvoiceController;