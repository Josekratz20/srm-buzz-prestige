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

    // Remove the entire <style>...</style> block
    const styleBlockRegex = /<style>[\s\S]*?<\/style>/gi;
    content = content.replace(styleBlockRegex, '');

    // Replace version numbers in script tags to force cache bust
    content = content.replace(/js\/theme\.js(\?v=\d+)?/g, 'js/theme.js?v=' + Date.now());

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Deep cleaned: " + file);
});
