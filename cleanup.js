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

    // Fix literal '\n' before <body> which is causing layout shifting
    content = content.replace(/\\n<body>/i, '<body>');
    
    // Remove conflicting inline CSS in index.html specifically regarding the old .navbar
    const badInlineStyleRegex = /<style>[\\s\\S]*?\\.navbar \\{[\\s\\S]*?<\\/style>/ig;
    content = content.replace(badInlineStyleRegex, '');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Cleaned up: " + file);
});
