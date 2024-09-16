//Dependencies and Modules ofr User Routes

const express = require("express");
const userController = require("../controllers/user");
const auth = require("../auth");
const { verify, verifyAdmin } = auth;
const User = require('../models/User');


//Routing Component
const router = express.Router();

//USER REGISTRATION
router.post("/register", (req, res) => {
    userController.registerUser(req.body)
        .then(resultFromController => {
            if (resultFromController.success) {
                res.status(201).send(resultFromController);
            } else {
                res.status(400).send(resultFromController);
            }
        })
        .catch(err => {
            res.status(500).send({
                success: false,
                message: 'Internal server error',
                error: err.message
            });
        });
});

//USER LOGIN
router.post("/login", userController.loginUser);


// Export Route System
module.exports = router;
