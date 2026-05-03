const mongoose = require("mongoose");

const devotionalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    verse: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    challenge: String,
    prayer: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Devotional", devotionalSchema);
