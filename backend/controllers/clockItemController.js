const autoMapper = require("../middleware/autoMapper");
const dateRegulator = require("../middleware/dateRegulator");

function ClockItemController(ClockItem) {

    function post(req, res) {
        const clockItem = new ClockItem(req.body);
        clockItem.userId = req.userId;
        clockItem.date = dateRegulator(clockItem.date);
        clockItem.save((err) => {
            if (err) {
                return res.send(err);
            }
            res.status(201);
            return res.json(clockItem);
        });
    };

    function getDayRange(date) {
        const dateInfo = date.split("-");
        dateInfo[1] -= 1;
        return {
            $gte: new Date(Date.UTC(...dateInfo, 00, 00, 00)),
            $lt: new Date(Date.UTC(...dateInfo, 23, 59, 59))
        }
    }

    function getResultsForPeriod(query) {
        return new Promise((resolve, reject) => {
            ClockItem.find(query)
                .sort({date: 1})
                .exec((err, clockItems) => {
                if (err) {
                    return reject(err);
                }
                resolve(clockItems);
            });
        })
    }

    async function getByPeriod(req, res) {
        let stopDate =  new Date(req.params.endDate);
        const results = {};
        for (
            let currentDate = new Date(req.params.startDate); 
            currentDate <= stopDate; 
            currentDate.setDate(currentDate.getDate() + 1)
        ){
            let dateString = new Date(currentDate).toJSON().split('T')[0]
            let query = {
                userId: req.userId,
                startTime: getDayRange(dateString)
            }
            await getResultsForPeriod(query)
                .then(result=>{
                    results[dateString] = result;
                })
                .catch(err=>{
                    res.json(err);
                });
        }
        return res.json(results);
    };

    async function getByPeriodAndInvoiced(req, res) {
        let stopDate =  new Date(req.params.endDate);
        const results = {};
        for (
            let currentDate = new Date(req.params.startDate); 
            currentDate <= stopDate; 
            currentDate.setDate(currentDate.getDate() + 1)
        ){
            let dateString = new Date(currentDate).toJSON().split('T')[0]
            let query = {
                userId: req.userId,
                startTime: getDayRange(dateString),
                invoiced: req.params.invoiced
            }
            await getResultsForPeriod(query)
                .then(result=>{
                    results[dateString] = result;
                })
                .catch(err=>{
                    res.json(err);
                });
        }
        return res.json(results);
    };


    function put(req, res) {
        const query = {
            userId: req.userId,
            _id: req.params._id
        }
        ClockItem.find(query, (err, clockItems) => {
            if (err) {
                return res.send(err);
            }
            let clockItemForUpdate = clockItems[0].toObject();
            clockItemForUpdate = autoMapper(clockItemForUpdate, req.body);
            ClockItem.updateOne(query, clockItemForUpdate)
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
            userId: req.userId,
            _id: req.params._id
        }
        ClockItem.deleteMany(query).then(
            result => {
                if (result.n > 0) {
                    return res.status(200).json({ message: "Deletion successful!" });
                } else {
                    return res.status(500).json({ message: "Cannot Delete" });
                }
            }
        );
    }

    return { post, getByPeriod, getByPeriodAndInvoiced, put, deleteTime }
}

module.exports = ClockItemController;