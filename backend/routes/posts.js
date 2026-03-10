const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const { protect } = require('../middleware/authMiddleware');


// CREATE POST
router.post('/', async (req, res) => {
    try {
        const { title, content, category, image } = req.body;

        const post = new Post({
            title,
            content,
            category,
            image,
        });

        const savedPost = await post.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET POSTS BY CATEGORY
router.get('/category/:category', async (req, res) => {
    try {
        const posts = await Post.find({
            category: req.params.category,
        }).sort({ createdAt: -1 });

        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE POST
router.put('/:id', async (req, res) => {
    try {
        const updated = await Post.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE POST
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
