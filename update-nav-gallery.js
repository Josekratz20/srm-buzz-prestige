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

    // Update the link text for Gallery -> Timeless Moments
    content = content.replace(/<a href=["'].*?gallery\.html["']>.*?Gallery.*?<\/a>/gi, '<a href="/pages/gallery.html">Timeless Moments</a>');
    
    // Catch-all
    content = content.replace(/>Gallery<\/a>/gi, '>Timeless Moments</a>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated Nav Gallery for: " + file);
});
