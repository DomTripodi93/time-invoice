const express = require("express");

const checkAuth = require("../middleware/checkAuth");
const CustomerController = require("../controllers/customerController");

function routes(Customer){
    const router = express.Router();
    const controller = CustomerController(Customer);

    router.route("")
        .post(checkAuth, controller.post)
        .get(checkAuth, controller.getAll);

    router.route("/:_id")
        .put(checkAuth, controller.put)
        .delete(checkAuth, controller.deleteCustomer);

    return router;
}

module.exports = routes;