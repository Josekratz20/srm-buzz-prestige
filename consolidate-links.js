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

    // Remove all style.css links
    const styleRegex = /<link rel=["']stylesheet["'] href=["'].*?style\.css(\?v=\d+)?["']>\s*/gi;
    content = content.replace(styleRegex, '');
    
    // Remove all theme.js scripts
    const scriptRegex = /<script src=["'].*?theme\.js(\?v=\d+)?["']><\/script>\s*/gi;
    content = content.replace(scriptRegex, '');

    // Re-insert cleanly
    const timestamp = Date.now();
    const newTags = `\n    <link rel="stylesheet" href="/css/style.css?v=${timestamp}">\n    <script src="/js/theme.js?v=${timestamp}"></script>\n`;
    
    if (content.includes('</head>')) {
        content = content.replace('</head>', newTags + '</head>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Cleaned and consolidated: " + file);
});
