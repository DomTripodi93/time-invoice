const express = require("express");

const userController = require("../controllers/userController");
const checkAuth = require("../middleware/checkAuth");

function routes(User, Settings){
    const router = express.Router();
    const controller = userController(User, Settings);

    router.route("")
        .get(checkAuth, controller.getUserData);

    return router;
}

module.exports = routes;