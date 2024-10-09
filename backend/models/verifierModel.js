const mongoose = require("mongoose");

const loanOfficerSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    loanList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loan", // Assuming you have a Loan schema
    }],
    pendingList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Loan", // Assuming you have a Loan schema
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Verifier", loanOfficerSchema);
