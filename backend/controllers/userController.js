const autoMapper = require("../middleware/autoMapper");

function userController(User, Settings) {
    function getUserData(req, res) {
        const query = {
            userId: req.userId
        }
        Settings.findOne(query, (err, settings) => {
            if (err) {
                return res.send(err);
            }
            return res.json(settings);
        })
    };


    function put(req, res) {
        const query = {
            userId: req.userId
        }
        Settings.findOne(query, (err, settings) => {
            if (err) {
                return res.send(err);
            }
            let settingsForUpdate = autoMapper(settings.toObject(), req.body);
            settingsForUpdate.save()
                .then(result => {
                    if (result.nModified > 0) {
                        return res.status(200).json({ message: "Update Successful" });
                    } else {
                        return res.status(500).json({ message: "No Changes" });
                    }
                });
        });
    }

    return { getUserData, put }
}

module.exports = userController;