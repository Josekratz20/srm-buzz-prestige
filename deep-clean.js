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

    // Remove any remaining literal '\n' characters.
    // In Javascript, a literal backslash is '\\', so replacing '\\n' removes the physical strings "\n" that show up on screen.
    content = content.replace(/\\n/g, ''); 

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Deep cleaned: " + file);
});
