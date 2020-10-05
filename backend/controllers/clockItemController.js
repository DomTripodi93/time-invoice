const autoMapper = require("../middleware/autoMapper");

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

    function getByDay(req, res) {
        const day = req.params.date;
        const query = {
            userId: req.userId,
            date: getDateRange(day, day)
        }
        ClockItem.find(query)
            .sort({date: 1})
            .exec((err, clockItems) => {
            if (err) {
                return res.send(err);
            }
            return res.json(clockItems);
        });
    };

    function getByPeriod(req, res) {
        const startDate = req.params.startDate;
        const endDate = req.params.endDate;
        const query = {
            userId: req.userId,
            date: getDateRange(startDate, endDate)
        }
        ClockItem.find(query)
            .sort({date: 1})
            .exec((err, clockItems) => {
            if (err) {
                return res.send(err);
            }
            return res.json(clockItems);
        });
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

    function changeInvoiced(req, res) {
        let processed = 0;
        req.body.invoiced.forEach(id => {
            processed++
            let query = {
                userId: req.userId,
                _id: id
            }
            ClockItem.find(query, (err, clockItems) => {
                if (err) {
                    return res.send(err);
                }
                let clockItemForUpdate = clockItems[0].toObject();
                clockItemForUpdate.invoiced = req.params.invoiced
                ClockItem.updateOne(query, clockItemForUpdate)
                    .then(result => {
                        if (processed === req.body.invoiced.length){
                            if (result.nModified > 0) {
                                return res.status(200).json({ message: "Update Successful" });
                            } else {
                                return res.status(500).json({ message: "No Changes" });
                            }
                        }
                    });
            });
        });
    }

    function deleteTime(req, res) {
        const query = {
            _id: req.params._id
        }
        ClockItem.deleteOne(query).then(
            result => {
                if (result.n > 0) {
                    return res.status(200).json({ message: "Deletion successful!" });
                } else {
                    return res.status(500).json({ message: "Cannot Delete" });
                }
            }
        );
    }

    return { post, getByPeriod, getByDay, put, changeInvoiced, deleteTime }
}

module.exports = ClockItemController;