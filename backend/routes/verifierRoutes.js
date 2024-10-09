const express=require("express");
const { isAdmin, isAuthenticated, isVerifier } = require("../middleware/auth");
const { getVerifierLoans, updateVerStatus } = require("../controller/verifierController");

const router=express.Router();

router.route("/getVerifierLoan").get(isAuthenticated, isVerifier, getVerifierLoans);
router.route("/updateVerificationStatus").post(isAuthenticated, isVerifier, updateVerStatus);

module.exports = router;