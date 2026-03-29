const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\\\users\\\\erick masaba\\\\srm-buzz';
const files = [
    'index.html', 'pages/about.html', 'pages/cart.html', 'pages/checkout.html',
    'pages/contact.html', 'pages/devotional.html', 'pages/events.html',
    'pages/gallery.html', 'pages/gossip.html', 'pages/merchandise.html'
];

files.forEach(file => {
    let filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Add onclick directly to the menu toggle button for bulletproof execution
    content = content.replace('id="menu-toggle">☰', 'id="menu-toggle" onclick="SRM_ToggleMenu()">☰');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Attached Global Function to: " + file);
});
