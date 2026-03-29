const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\\\users\\\\erick masaba\\\\srm-buzz';

const files = [
    'index.html',
    'pages/about.html',
    'pages/cart.html',
    'pages/checkout.html',
    'pages/contact.html',
    'pages/devotional.html',
    'pages/events.html',
    'pages/gallery.html',
    'pages/gossip.html',
    'pages/merchandise.html'
];

const newNav = '<nav class="custom-navbar">\\n' +
'    <a href="/" class="nav-brand">\\n' +
'        <img src="/images/logo.png" alt="SRM Buzz Logo" class="brand-img">\\n' +
'        <span class="brand-text">SRM<span class="brand-highlight">BUZZ</span></span>\\n' +
'    </a>\\n' +
'    <div class="nav-controls">\\n' +
'        <button id="theme-toggle" style="background:none;border:none;font-size:24px;cursor:pointer;">🌙</button>\\n' +
'        <a href="/pages/cart.html" class="nav-cart">\\n' +
'            <span style="font-size:1.2rem;">🛒</span> <span style="font-weight:600; margin-left:5px;" id="cart-count">0</span>\\n' +
'        </a>\\n' +
'        <button class="nav-toggle-btn" id="menu-toggle">☰</button>\\n' +
'    </div>\\n' +
'    <div class="nav-dropdown" id="nav-dropdown">\\n' +
'        <a href="/">Home</a>\\n' +
'        <a href="/pages/gallery.html">Gallery</a>\\n' +
'        <a href="/pages/merchandise.html">Merch</a>\\n' +
'        <a href="/pages/gossip.html">SRM Buzz Updates</a>\\n' +
'        <a href="/pages/devotional.html">Devotional</a>\\n' +
'        <a href="/pages/events.html">Events</a>\\n' +
'        <a href="/pages/contact.html">Contact</a>\\n' +
'    </div>\\n' +
'</nav>';

files.forEach(file => {
    const filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    // Replace ANY old nav with new nav
    const navRegex = new RegExp('<nav\\\\b[^>]*>[\\\\s\\\\S]*?<\\\\/nav>', 'i');
    if (navRegex.test(content)) {
        content = content.replace(navRegex, newNav);
    } else {
        // Just inject after body
        content = content.replace('<body', newNav + '\\n<body');
    }

    // Ensure theme.js and cart.js are included in head
    if (!content.includes('js/theme.js')) {
        content = content.replace('</head>', '    <script src="/js/theme.js"></script>\\n</head>');
    }
    if (!content.includes('js/cart.js')) {
        content = content.replace('</head>', '    <script src="/js/cart.js"></script>\\n</head>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Updated " + file);
});
