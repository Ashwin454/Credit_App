const express=require("express");
const { createVerifier, getAllLoans, getAllUsers } = require("../controller/adminController");
const { isAdmin, isAuthenticated } = require("../middleware/auth");

const router=express.Router();

router.route("/createVerifier").post(isAuthenticated, isAdmin, createVerifier);
router.route("/getAllLoans").get(isAuthenticated, isAdmin, getAllLoans);
router.route("/getAllUsers").get(isAuthenticated, isAdmin, getAllUsers);

module.exports = router;