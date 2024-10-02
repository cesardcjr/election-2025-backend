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

//GET ALL USER
router.get("/all", verify, verifyAdmin, userController.getAllUsers)

//RETRIEVE USER DETAILS
router.get("/details", verify, userController.getProfile);

//DELETE SPECIFIC USER - ADMIN ACCESS ONLY
router.delete("/deleteUser", verify, verifyAdmin, userController.deleteUser);

//Update Profile  
router.put('/profile', verify, userController.updateProfile);

//Reset Password
router.put('/:userId/reset-password', verify, userController.resetPassword);


// Export Route System
module.exports = router;
