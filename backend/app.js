const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rate limiter
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});
app.use(limiter);

// Test route
app.get('/', (req, res) => {
    res.json({ message: "SRM Buzz backend running" });
});

// Post routes
app.use('/api/posts', require('./routes/posts'));
app.use('/api/auth', require('./routes/auth'));


// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

module.exports = app;
