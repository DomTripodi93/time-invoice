const express = require("express");

const checkAuth = require("../middleware/checkAuth");
const InvoiceController = require("../controllers/invoiceController");

function routes(Invoice, ClockItem){
    const router = express.Router();
    const controller = InvoiceController(Invoice, ClockItem);

    router.route("/:_id")
        .delete(checkAuth, controller.deleteInvoice);

    router.route("/:startDate/:endDate")
        .post(checkAuth, controller.post)

    router.route("/:startDate/:endDate/:_id")
        .put(checkAuth, controller.put)

    router.route("/byNumber/:invoiceNumber")
        .get(checkAuth, controller.getByNumber);

    router.route("/byDateRange/:startDate/:endDate")
        .get(checkAuth, controller.getByPeriod);
    

    return router;
}

module.exports = routes;