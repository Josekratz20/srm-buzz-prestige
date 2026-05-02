const mongoose = require('mongoose');

// Gallery Schema
const gallerySchema = new mongoose.Schema({
    imageUrl: String,
    caption: String,
    date: { type: Date, default: Date.now }
});

// Event Schema
const eventSchema = new mongoose.Schema({
    title: String,
    description: String,
    dateString: String,
    imageUrl: String,
    uploadedAt: { type: Date, default: Date.now }
});

// Merchandise Schema
const merchandiseSchema = new mongoose.Schema({
    name: String,
    price: String,
    description: String,
    imageUrl: String,
    date: { type: Date, default: Date.now }
});

// Sale Schema
const saleSchema = new mongoose.Schema({
    customerName: String,
    phone: String,
    Order_Items: String,
    transaction_code: String,
    total: String,
    date: { type: Date, default: Date.now }
});

// User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: { type: String },
    joined: { type: Date, default: Date.now }
});

module.exports = {
    Gallery: mongoose.model('Gallery', gallerySchema),
    Event: mongoose.model('Event', eventSchema),
    Merchandise: mongoose.model('Merchandise', merchandiseSchema),
    Sale: mongoose.model('Sale', saleSchema),
    User: mongoose.model('User', userSchema)
};
