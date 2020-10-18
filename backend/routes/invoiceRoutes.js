const express = require("express");

const checkAuth = require("../middleware/checkAuth");
const InvoiceController = require("../controllers/invoiceController");

function routes(Invoice, ClockItem){
    const router = express.Router();
    const controller = InvoiceController(Invoice, ClockItem);

    router.route("/:startDate/:endDate")
        .post(checkAuth, controller.post)

    router.route("/byNumber/:invoiceNumber")
        .get(checkAuth, controller.getByNumber);

    router.route("/byDateRange/:startDate/:endDate")
        .get(checkAuth, controller.getByPeriod);
    
    router.route("/:_id")
        .put(checkAuth, controller.put)
        .delete(checkAuth, controller.deleteInvoice);

    return router;
}

module.exports = routes;