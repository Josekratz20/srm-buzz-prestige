const express = require("express");
const router = express.Router();
const Devotional = require("../models/Devotional");
const Comment = require("../models/Comment");


// CREATE Devotional (Admin)
router.post("/", async (req, res) => {
    try {
        const devotional = new Devotional(req.body);
        await devotional.save();
        res.json(devotional);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET Devotionals with Pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 3;
        const skip = (page - 1) * limit;

        const devotionals = await Devotional
            .find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Devotional.countDocuments();

        res.json({
            devotionals,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// UPDATE Devotional
router.put("/:id", async (req, res) => {
    try {
        const updated = await Devotional.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// DELETE Devotional
router.delete("/:id", async (req, res) => {
    try {
        await Devotional.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ADD Comment
router.post("/:id/comments", async (req, res) => {
    try {
        const comment = new Comment({
            devotionalId: req.params.id,
            name: req.body.name,
            message: req.body.message
        });

        await comment.save();
        res.json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET Comments
router.get("/:id/comments", async (req, res) => {
    try {
        const comments = await Comment
            .find({ devotionalId: req.params.id })
            .sort({ createdAt: -1 });

        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
