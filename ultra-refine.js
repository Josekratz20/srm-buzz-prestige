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

    // Clean up literal '\n' anywhere.
    content = content.replace(/\\n/g, '');

    // The literal '\n' before </head> got stripped out, leaving </head> on same line. Let's make sure it's linked correctly.
    // If <link rel="stylesheet" href="/css/style.css"></head> is there, add newline before </head>
    content = content.replace('<link rel="stylesheet" href="/css/style.css"></head>', 
`<link rel="stylesheet" href="/css/style.css">
</head>`);

    // Remove cart block manually
    if (file === 'index.html' || file === 'pages/about.html' || file === 'pages/contact.html' || file === 'pages/devotional.html' || file === 'pages/events.html' || file === 'pages/gallery.html') {
        const cartStr = 
`        <a href="/pages/cart.html" class="nav-cart">
            <span style="font-size:1.2rem;">🛒</span> <span style="font-weight:600; margin-left:5px;" id="cart-count">0</span>
        </a>`;
        
        while (content.includes(cartStr)) {
            content = content.replace(cartStr, '');
        }

        // Just in case there are spacing differences:
        content = content.replace(/<a href="\/pages\/cart\.html" class="nav-cart">[\s\S]*?<\/span>\s*<\/a>/ig, '');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Ultra refined: " + file);
});
