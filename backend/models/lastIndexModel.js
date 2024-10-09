const mongoose = require("mongoose");

const lastIndexSchema = new mongoose.Schema({
    value: {
        type: Number,
        required: true,
        default:0
    },
});

const LastIndex = mongoose.model("LastIndex", lastIndexSchema);

module.exports = LastIndex;
