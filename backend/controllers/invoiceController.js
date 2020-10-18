const autoMapper = require("../middleware/autoMapper");

function InvoiceController(Invoice, ClockItem) {

    function post(req, res) {
        const invoice = new Invoice(req.body);
        let processed = 0;

        invoice.userId = req.userId;
        invoice.dateRange = req.params.startDate + "-" + req.params.endDate;
        invoice.save((err) => {
            if (err) {
                console.log(err)
                return res.send({error: err});
            }
        });

        let clockItemsQuery = {
            userId: req.userId,
            startTime: getDateRange(req.params.startDate, req.params.endDate)
        }
        ClockItem.find(clockItemsQuery)
            .exec((err, clockItems) => {
                if (err) {
                    return res.send(err);
                }
                clockItems.forEach(clockItem => {
                    if (err) {
                        return res.send(err);
                    }
                    processed++
                    let clockItemForUpdate = clockItem.toObject();
                    let updateQuery = {
                        userId: req.userId,
                        _id: clockItemForUpdate._id
                    }
                    clockItemForUpdate.invoiced = false;
                    clockItemForUpdate.invoiceNumber = invoice.invoiceNumber;
                    ClockItem.updateOne(updateQuery, clockItemForUpdate)
                        .then(() => {
                            if (processed === clockItems.length){
                                res.status(201);
                                return res.json(invoice);
                            }
                        });
                });
            })
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
        console.log("1")
        const startDate = req.params.startDate;
        const endDate = req.params.endDate;
        const query = {
            userId: req.userId,
            date: getDateRange(startDate, endDate)
        }
        console.log(query)
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
            userId: req.userId,
            _id: req.params._id
        }
        Invoice.find(query, (err, invoices) => {
            if (err) {
                return res.send(err);
            }
            let invoiceForUpdate = invoices[0].toObject();
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

    function deleteInvoice(req, res) {
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
                clockItemForUpdate.invoiced = false;
                ClockItem.updateOne(query, clockItemForUpdate)
                    .then(() => {
                        if (processed === req.body.invoiced.length){
                            const invoiceQuery = {
                                _id: req.params._id
                            }
                            Invoice.deleteOne(invoiceQuery).then(
                                result => {
                                    if (result.n > 0) {
                                        return res.status(200).json({ message: "Deletion successful!" });
                                    } else {
                                        return res.status(500).json({ message: "Cannot Delete" });
                                    }
                                }
                            );
                        }
                    });
            });
        });
    }

    return { post, getByPeriod, getByNumber, put, deleteInvoice }
}

module.exports = InvoiceController;