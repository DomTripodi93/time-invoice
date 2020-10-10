const express = require("express");

const checkAuth = require("../middleware/checkAuth");
const ClockItemController = require("../controllers/clockItemController");

function routes(ClockItem){
    const router = express.Router();
    const controller = ClockItemController(ClockItem);

    router.route("")
        .post(checkAuth, controller.post);

    router.route("/byDateRange/:startDate/:endDate")
        .get(checkAuth, controller.getByPeriod);

    router.route("/byInvoiced/:startDate/:endDate/:invoiced")
        .get(checkAuth, controller.getByPeriodAndInvoiced);

    router.route("/:_id")
        .put(checkAuth, controller.put)
        .delete(checkAuth, controller.deleteTime);

    return router;
}

module.exports = routes;