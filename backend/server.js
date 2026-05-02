const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { Gallery, Event, Merchandise, Sale, User } = require("./models/Schemas");
const Devotional = require("./models/Devotional");
const Post = require("./models/post");

// Initialize environment variables
dotenv.config();

// Connect to Cloud Database
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// File Upload Configuration
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadPath),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage: storage });

/* =========================
   DEVOTIONAL ROUTES
   ========================= */
app.get("/api/devotionals", async (req, res) => {
    try {
        const data = await Devotional.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: "DB Error" });
    }
});

app.post("/api/devotionals", async (req, res) => {
    try {
        const newItem = new Devotional(req.body);
        await newItem.save();
        res.json({ message: "Saved to Cloud" });
    } catch (e) {
        res.status(500).json({ error: "Save failed" });
    }
});

app.delete("/api/devotionals/:id", async (req, res) => {
    try {
        await Devotional.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (e) {
        res.status(500).json({ error: "Delete failed" });
    }
});

/* =========================
   GALLERY ROUTES
   ========================= */
app.get("/api/gallery", async (req, res) => {
    try {
        const data = await Gallery.find().sort({ date: -1 });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: "DB Error" });
    }
});

app.post("/api/gallery", upload.single("image"), async (req, res) => {
    try {
        const newItem = new Gallery({
            imageUrl: "/uploads/" + req.file.filename,
            caption: req.body.caption
        });
        await newItem.save();
        res.json({ message: "Uploaded to Cloud" });
    } catch (e) {
        res.status(500).json({ error: "Upload failed" });
    }
});

app.delete("/api/gallery/:id", async (req, res) => {
    try {
        await Gallery.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (e) {
        res.status(500).json({ error: "Delete failed" });
    }
});

/* =========================
   EVENTS ROUTES
   ========================= */
app.get("/api/events", async (req, res) => {
    try {
        const data = await Event.find().sort({ uploadedAt: -1 });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: "DB Error" });
    }
});

app.post("/api/events", upload.single("image"), async (req, res) => {
    try {
        const newItem = new Event({
            title: req.body.title,
            description: req.body.description,
            dateString: req.body.dateString,
            imageUrl: "/uploads/" + req.file.filename
        });
        await newItem.save();
        res.json({ message: "Event saved to Cloud" });
    } catch (e) {
        res.status(500).json({ error: "Save failed" });
    }
});

app.delete("/api/events/:id", async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (e) {
        res.status(500).json({ error: "Delete failed" });
    }
});

/* =========================
   STORE & MERCH ROUTES
   ========================= */
app.get("/api/merchandise", async (req, res) => {
    try {
        const data = await Merchandise.find().sort({ date: -1 });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: "DB Error" });
    }
});

app.post("/api/merchandise", upload.single("image"), async (req, res) => {
    try {
        const newItem = new Merchandise({
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            imageUrl: "/uploads/" + req.file.filename
        });
        await newItem.save();
        res.json({ message: "Product added to Cloud" });
    } catch (e) {
        res.status(500).json({ error: "Save failed" });
    }
});

app.delete("/api/merchandise/:id", async (req, res) => {
    try {
        await Merchandise.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (e) {
        res.status(500).json({ error: "Delete failed" });
    }
});

/* =========================
   NEWS & STORIES ROUTES (Using Post Model)
   ========================= */
app.get("/api/news", async (req, res) => {
    try {
        const data = await Post.find().sort({ createdAt: -1 });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: "DB Error" });
    }
});

app.post("/api/news", upload.single("image"), async (req, res) => {
    try {
        const newItem = new Post({
            title: req.body.title,
            content: req.body.content,
            image: "/uploads/" + req.file.filename,
            category: req.body.category || 'general'
        });
        await newItem.save();
        res.json({ message: "News posted to Cloud" });
    } catch (e) {
        res.status(500).json({ error: "Post failed" });
    }
});

app.delete("/api/news/:id", async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.json({ message: "Deleted" });
    } catch (e) {
        res.status(500).json({ error: "Delete failed" });
    }
});

/* =========================
   USER AUTHENTICATION
   ========================= */
app.post("/api/users/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const exists = await User.findOne({ email });
        if (exists) return res.status(400).json({ success: false, message: "Email registered." });

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.json({ success: true, message: "Welcome!" });
    } catch (e) {
        res.status(500).json({ error: "Signup failed" });
    }
});

app.post("/api/users/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (user) {
            res.json({ success: true, token: "USER_TOKEN_" + user._id, name: user.name });
        } else {
            res.status(401).json({ success: false, message: "Invalid credentials." });
        }
    } catch (e) {
        res.status(500).json({ error: "Login failed" });
    }
});

app.get("/api/users", async (req, res) => {
    try {
        const data = await User.find().sort({ joined: -1 });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: "DB Error" });
    }
});

/* =========================
   ADMIN AUTHENTICATION
   ========================= */
app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === "PRESTIGE2026") {
        res.json({ success: true, token: "MASTER_ADMIN_TOKEN_" + Date.now() });
    } else {
        res.status(401).json({ success: false, message: "❌ UNAUTHORIZED ACCESS" });
    }
});

/* =========================
   SALES & POS ROUTES
   ========================= */
app.post("/api/sales", async (req, res) => {
    try {
        const newSale = new Sale({
            customerName: req.body.name,
            phone: req.body.phone,
            Order_Items: req.body.Order_Items,
            transaction_code: req.body.transaction_code,
            total: req.body.total
        });
        await newSale.save();
        res.json({ message: "Sale recorded in Cloud" });
    } catch (e) {
        res.status(500).json({ error: "Record failed" });
    }
});

app.get("/api/sales", async (req, res) => {
    try {
        const data = await Sale.find().sort({ date: -1 });
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: "DB Error" });
    }
});

app.delete("/api/sales/:id", async (req, res) => {
    try {
        await Sale.findByIdAndDelete(req.params.id);
        res.json({ message: "Record deleted" });
    } catch (e) {
        res.status(500).json({ error: "Delete failed" });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Master Server running on http://localhost:${PORT}`);
});
