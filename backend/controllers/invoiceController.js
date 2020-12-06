const autoMapper = require("../middleware/autoMapper");
var ObjectID = require('mongodb').ObjectID;

function InvoiceController(Invoice, ClockItem) {

    function post(req, res) {
        const invoice = new Invoice(req.body);
        invoice.userId = req.userId;
        let clockItemsQuery = {
            userId: req.userId,
            invoiced: false,
            startTime: getDateRange(req.params.startDate, req.params.endDate)
        }
        ClockItem.find(clockItemsQuery)
            .exec(async (err, clockItems) => {
                if (err) {
                    return res.send(err);
                }
                if (clockItems.length > 0){
                    await setClockItemsInvoiced(clockItems, invoice, res, req)
                        .then(hours => {
                            console.log(hours);
                            addInvoice(invoice, hours, res)
                        });
                } else {
                    addInvoice(invoice, 0, res)
                }
            });
    };

    function setClockItemsInvoiced(clockItems, invoice, req) {
        return new Promise((resolve, reject) => {
            let hours = 0
            let processed = 0
            clockItems.forEach(clockItem => {
                processed++
                let clockItemForUpdate = clockItem.toObject();
                console.log(clockItemForUpdate)
                let updateQuery = {
                    userId: req.userId,
                    _id: ObjectID(clockItemForUpdate._id)
                }
                clockItemForUpdate.invoiced = true;
                hours += clockItemForUpdate.hours;
                clockItemForUpdate.invoiceNumber = invoice.invoiceNumber;
                console.log(clockItemForUpdate)
                ClockItem.updateOne(updateQuery, clockItemForUpdate)
                    .then((err) => {
                        console.log(err)
                        if (processed === clockItems.length) {
                            resolve(hours)
                        }
                    });
            });
        })
    }

    function addInvoice(invoice, hours, res) {
        invoice.hours = hours;
        invoice.save((err) => {
            if (err) {
                return res.send({ error: err });
            }
            res.status(201);
            return res.json(invoice);
        });
    }

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
            .sort({ date: 1 })
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
            .sort({ invoiceNumber: -1 })
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
                })
                .catch(err=>{
                    res.json(err);
                });
        });
    }

    function deleteInvoice(req, res) {
        const invoiceQuery = {
            _id: req.params._id
        }
        Invoice.findOne(invoiceQuery, (err, invoice) =>{
            const clockItemsQuery = {
                userId: req.userId,
                invoiceNumber: invoice.invoiceNumber
            }
            ClockItem.find(clockItemsQuery, (err, clockItems) =>{
                if (clockItems.length > 0){
                    return setClockItemsNotInvoiced(clockItems, invoiceQuery, res);
                } else {
                    return removeInvoice(invoiceQuery, res);
                }
            })
            .catch(err=>{
                res.json(err);
            });
        })
    }

    function setClockItemsNotInvoiced (clockItems, invoiceQuery, res) {
        let processed = 0;
        clockItems.forEach(clockItem => {
            processed++;
            updateClockItemNotInvoiced(clockItem, invoiceQuery, (processed === clockItems.length), res)
        })
    }

    function updateClockItemNotInvoiced(clockItem, invoiceQuery, remove, res) {
        let clockItemForUpdate = clockItem.toObject();
        clockItemForUpdate.invoiced = false;
        clockItemForUpdate.invoiceNumber = null;
        const clockItemUpdateQuery = {
            _id: clockItemForUpdate._id
        }
        ClockItem.updateOne(clockItemUpdateQuery, clockItemForUpdate)
            .then(() => {
                if (remove) {
                    return removeInvoice(invoiceQuery, res);
                } else return;
            });

    }

    function removeInvoice(invoiceQuery, res) {
        Invoice.deleteOne(invoiceQuery).then(
            result => {
                if (result.n > 0) {
                    return res.status(200).json({ message: "Deletion successful!" });
                } else {
                    return res.json({ message: "Cannot Delete" });
                }
            }
        );
    }

    return { post, getByPeriod, getByNumber, put, deleteInvoice }
}

module.exports = InvoiceController;