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

    // 1. Ensure style.css is linked so the navbar actually gets styled!
    if (!content.includes('href="/css/style.css"')) {
        // Find </head> and inject it right before
        content = content.replace('</head>', '    <link rel="stylesheet" href="/css/style.css">\\n</head>');
    }

    // 2. Remove redundant brand text because logo.png ALREADY spells out "SRM BUZZ" visually
    content = content.replace(/<span class="brand-text">SRM<span class="brand-highlight">BUZZ<\/span><\/span>/g, '');

    // 3. Remove Cart from the homepage per user request: "what is cart doing in homepage ?"
    if (file === 'index.html' || file === 'pages/about.html') {
        const cartRegex = /<a href="\/pages\/cart\.html" class="nav-cart">[\\s\\S]*?<\/a>/ig;
        content = content.replace(cartRegex, '');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Refined: " + file);
});
