const express = require("express");
const settingsController = require("../controllers/settingsController");

const checkAuth = require("../middleware/checkAuth");

function routes(Settings){
    const router = express.Router();
    const controller = settingsController(Settings);

    router.route("")
        .get(checkAuth, controller.getUserData)
        .put(checkAuth, controller.put);

    return router;
}

module.exports = routes;