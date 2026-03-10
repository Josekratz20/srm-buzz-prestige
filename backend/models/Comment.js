const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    devotionalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Devotional",
        required: true
    },
    name: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Comment", commentSchema);
