const express = require("express");
const fs = require("fs");
const path = require("path");
const multer = require("multer");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "../public")));

// Serve frontend from root
app.use(express.static(path.join(__dirname, "..")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// DATABASE INITIALIZATION (Self-Healing)
const dbFiles = ['devotionals.json', 'gallery.json', 'events.json', 'feedback.json', 'merchandise.json', 'news.json', 'sales.json', 'users.json'];
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
dbFiles.forEach(file => {
    const fPath = path.join(dataDir, file);
    if (!fs.existsSync(fPath)) fs.writeFileSync(fPath, "[]", "utf8");
});

// Helper functions
function readData(file) {
    const filePath = path.join(__dirname, "..", "data", file);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "[]", "utf8");
    }
    try {
        let content = fs.readFileSync(filePath, "utf8");
        // DEEP CLEANSING FOR ALL HIDDEN CHARACTERS (BOM, etc.)
        content = content.replace(/[^\x20-\x7E\s\u00A0-\uFFFF]/g, ""); 
        content = content.trim();
        if(!content || content === "") content = "[]";
        
        const parsed = JSON.parse(content);
        console.log("✅ DATA READY: " + file);
        return parsed;
    } catch (e) {
        console.error("❌ CRITICAL REPAIR on " + file + ":", e.message);
        return [];
    }

}



function writeData(file, data) {
    const filePath = path.join(__dirname, "..", "data", file);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
const uploadPath = path.join(__dirname, "../public/uploads");

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

/* =========================
   DEVOTIONAL ROUTES
   ========================= */
app.get("/api/devotionals", (req, res) => {
    console.log("GET /api/devotionals hit");
    try {
        const data = readData("devotionals.json");
        res.json(data);
    } catch (e) {
        console.error("Data Read Error:", e);
        res.status(500).json({ error: "Storage error" });
    }
});

app.post("/api/devotionals", (req, res) => {
    console.log("POST /api/devotionals hit", req.body);
    const data = readData("devotionals.json");

    const newItem = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content
    };

    data.push(newItem);
    writeData("devotionals.json", data);

    res.json({ message: "Saved" });
});

app.delete("/api/devotionals/:id", (req, res) => {
    let data = readData("devotionals.json");

    const id = parseInt(req.params.id);

    data = data.filter(item => item.id !== id);

    writeData("devotionals.json", data);

    res.json({ message: "Deleted" });
});
/* =========================
   GALLERY ROUTES
========================= */

app.get("/api/gallery", (req, res) => {
    res.json(readData("gallery.json"));
});

app.post("/api/gallery", upload.single("image"), (req, res) => {
    const data = readData("gallery.json");

    const newItem = {
        id: Date.now(),
        imageUrl: "/uploads/" + req.file.filename,
        caption: req.body.caption,
        date: new Date().toISOString()
    };

    data.push(newItem);
    writeData("gallery.json", data);

    res.json({ message: "Uploaded" });
});

app.delete("/api/gallery/:id", (req, res) => {
    const data = readData("gallery.json");

    const filtered = data.filter(item => item.id != req.params.id);

    writeData("gallery.json", filtered);

    res.json({ message: "Deleted successfully" });
});

/* =========================
   EVENTS ROUTES
========================= */

app.get("/api/events", (req, res) => {
    res.json(readData("events.json"));
});

app.post("/api/events", (req, res) => {
    const data = readData("events.json");
    data.push(req.body);
    writeData("events.json", data);
    res.json({ message: "Event saved" });
});

/* =========================
   FEEDBACK ROUTES
========================= */

app.get("/api/feedback", (req, res) => {
    res.json(readData("feedback.json"));
});

app.post("/api/feedback", (req, res) => {
    const data = readData("feedback.json");
    data.push(req.body);
    writeData("feedback.json", data);
    res.json({ message: "Feedback saved" });
});
/* =========================
   STORE & MERCH ROUTES
========================= */
app.post("/api/merchandise", upload.single("image"), (req, res) => {
    const data = readData("merchandise.json");
    const newItem = {
        id: Date.now(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: "/uploads/" + req.file.filename,
        date: new Date().toISOString()
    };
    data.push(newItem);
    writeData("merchandise.json", data);
    res.json({ message: "Product added successfully" });
});

app.get("/api/merchandise", (req, res) => {
    res.json(readData("merchandise.json"));
});

/* =========================
   NEWS & STORIES ROUTES
========================= */
app.post("/api/news", upload.single("image"), (req, res) => {
    const data = readData("news.json");
    const newItem = {
        id: Date.now(),
        title: req.body.title,
        content: req.body.content,
        imageUrl: "/uploads/" + req.file.filename,
        trending: req.body.trending === "true",
        date: new Date().toISOString()
    };
    data.push(newItem);
    writeData("news.json", data);
    res.json({ message: "News posted successfully" });
});

app.get("/api/news", (req, res) => {
    res.json(readData("news.json"));
});

/* =========================
   EVENTS ROUTES
========================= */
app.post("/api/events", upload.single("image"), (req, res) => {
    const data = readData("events.json");
    const newItem = {
        id: Date.now(),
        title: req.body.title,
        description: req.body.description,
        dateString: req.body.dateString,
        imageUrl: "/uploads/" + req.file.filename,
        uploadedAt: new Date().toISOString()
    };
    data.push(newItem);
    writeData("events.json", data);
    res.json({ message: "Event saved successfully" });
});

app.get("/api/events", (req, res) => {
    res.json(readData("events.json"));
});

/* =========================
   DELETE ROUTES (MASTER)
========================= */
app.delete("/api/merchandise/:id", (req, res) => {
    let data = readData("merchandise.json");
    data = data.filter(item => item.id != req.params.id);
    writeData("merchandise.json", data);
    res.json({ message: "Product deleted" });
});

app.delete("/api/news/:id", (req, res) => {
    let data = readData("news.json");
    data = data.filter(item => item.id != req.params.id);
    writeData("news.json", data);
    res.json({ message: "News deleted" });
});

app.delete("/api/gallery/:id", (req, res) => {
    let data = readData("gallery.json");
    data = data.filter(item => item.id != req.params.id);
    writeData("gallery.json", data);
    res.json({ message: "Gallery item deleted" });
});

app.delete("/api/events/:id", (req, res) => {
    let data = readData("events.json");
    data = data.filter(item => item.id != req.params.id);
    writeData("events.json", data);
    res.json({ message: "Event deleted" });
});

app.delete("/api/devotionals/:id", (req, res) => {
    let data = readData("devotionals.json");
    data = data.filter(item => item.id != req.params.id);
    writeData("devotionals.json", data);
    res.json({ message: "Devotional deleted" });
});

/* =========================
   USER AUTHENTICATION (MEMBERSHIP)
========================= */
app.post("/api/users/signup", (req, res) => {
    const data = readData("users.json");
    const { name, email, password } = req.body;
    
    if (data.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: "Email already registered." });
    }

    const newUser = { id: Date.now(), name, email, password, joined: new Date().toISOString() };
    data.push(newUser);
    writeData("users.json", data);
    res.json({ success: true, message: "Welcome to the Sanctuary!" });
});

app.post("/api/users/login", (req, res) => {
    const data = readData("users.json");
    const { email, password } = req.body;
    const user = data.find(u => u.email === email && u.password === password);
    
    if (user) {
        res.json({ success: true, token: "USER_TOKEN_" + user.id, name: user.name });
    } else {
        res.status(401).json({ success: false, message: "Invalid credentials." });
    }
});

app.get("/api/users", (req, res) => {
    res.json(readData("users.json"));
});

/* =========================
   AUTHENTICATION ROUTES (ADMIN)
========================= */
app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    // MASTER PASSWORD: You can change this to anything!
    if (password === "PRESTIGE2026") {
        res.json({ success: true, token: "MASTER_ADMIN_TOKEN_" + Date.now() });
    } else {
        res.status(401).json({ success: false, message: "❌ UNAUTHORIZED ACCESS" });
    }
});

/* =========================
   SALES & POS ROUTES
========================= */
app.post("/api/sales", (req, res) => {
    const data = readData("sales.json");
    const newSale = {
        id: Date.now(),
        ...req.body,
        date: new Date().toISOString()
    };
    data.push(newSale);
    writeData("sales.json", data);
    res.json({ message: "Sale recorded successfully" });
});

app.get("/api/sales", (req, res) => {
    res.json(readData("sales.json"));
});

app.delete("/api/sales/:id", (req, res) => {
    let data = readData("sales.json");
    data = data.filter(item => item.id != req.params.id);
    writeData("sales.json", data);
    res.json({ message: "Sale record deleted" });
});

app.listen(PORT, () => {

    console.log(`🚀 Master Server running on http://localhost:${PORT}`);
});