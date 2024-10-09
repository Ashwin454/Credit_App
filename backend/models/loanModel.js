const mongoose = require("mongoose");
const loanSchema = new mongoose.Schema({
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    verifier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Verifier",
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    loanTenure: {
      type: String,
      required: true,
    },
    loanReason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    verificationStatus: {
      type: String,
      enum: ["not_verified", "verified", "pending"],
      default: "pending",
    },
    verificationDate: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  });

module.exports = mongoose.model("Loan", loanSchema);
