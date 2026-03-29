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

    // Update the link text and ensure the path is consistent
    content = content.replace(/<a href=["'].*?gossip\.html["']>.*?Updates.*?<\/a>/gi, '<a href="/pages/gossip.html">Campus Stories</a>');
    
    // Catch-all for any other "Updates" text in tags
    content = content.replace(/>Updates<\/a>/gi, '>Campus Stories</a>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated Nav for: " + file);
});
