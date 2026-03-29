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

    // Replace literal '\n' string characters appearing ANYWHERE with ''
    content = content.split('\\r\\n').join('\\n');
    content = content.split('\\n<body>').join('\\n\\n<body>'); // If there were literal string `\n` followed by `<body>`, swap with actual newline
    content = content.replace(/\\\\n/g, ''); // Blast all other literal '\n' strings that snuck into the HTML
    
    // Clean up index.html specific old style conflict
    if (file === 'index.html') {
        const styleStart = content.indexOf('<style>');
        const styleEnd = content.indexOf('</style>', styleStart);
        // We know the second <style> block is the bad one around the old nav
        if (styleStart > -1) {
            let nextStart = content.indexOf('<style>', styleEnd);
            if(nextStart > -1) {
                let nextEnd = content.indexOf('</style>', nextStart) + 8;
                let potentialBadStyle = content.substring(nextStart, nextEnd);
                if (potentialBadStyle.includes('.navbar {')) {
                    content = content.replace(potentialBadStyle, '');
                }
            }
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Super Cleaned: " + file);
});
