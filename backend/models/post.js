const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            enum: ['scouts', 'divinity', 'devotional'],
            required: true,
        },
        image: {
            type: String,
        },
        author: {
            type: String,
            default: 'Admin',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
