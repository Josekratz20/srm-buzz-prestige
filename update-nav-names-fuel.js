const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\users\\erick masaba\\srm-buzz';
const files = [
    'index.html', 'pages/about.html', 'pages/cart.html', 'pages/checkout.html',
    'pages/contact.html', 'pages/devotional.html', 'pages/events.html',
    'pages/gallery.html', 'pages/gossip.html', 'pages/merchandise.html'
];

files.forEach(file => {
    let filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Update the link text for Devotional -> Soul Fuel
    content = content.replace(/<a href=["'].*?devotional\.html["']>.*?Devotional.*?<\/a>/gi, '<a href="/pages/devotional.html">Soul Fuel</a>');
    
    // Catch-all replacement in the nav menu
    content = content.replace(/>Devotional<\/a>/gi, '>Soul Fuel</a>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated Nav for: " + file);
});
