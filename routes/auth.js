const router = require('express').Router();
const authController = require("../controllers/authController")


//ROUTES
router.post("/login",authController.signIn)
router.post("/register",authController.signUp);


module.exports = router;