const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\\\users\\\\erick masaba\\\\srm-buzz';
const files = [
    'index.html', 'pages/about.html', 'pages/cart.html', 'pages/checkout.html',
    'pages/contact.html', 'pages/devotional.html', 'pages/events.html',
    'pages/gallery.html', 'pages/gossip.html', 'pages/merchandise.html'
];

const properNav = `
<nav class="custom-navbar">
    <a href="/" class="nav-brand">
        <img src="/images/logo.png" alt="SRM Buzz Logo" class="brand-img">
        <span class="brand-text">SRM<span class="brand-highlight">BUZZ</span></span>
    </a>
    <div class="nav-controls">
        <button id="theme-toggle" class="nav-toggle-btn" style="font-size: 28px;">🌙</button>
        <a href="/pages/cart.html" class="nav-cart">
            <span style="font-size:1.2rem;">🛒</span> <span style="font-weight:600; margin-left:5px;" id="cart-count">0</span>
        </a>
        <button class="nav-toggle-btn" id="menu-toggle">☰</button>
    </div>
    <div class="nav-dropdown" id="nav-dropdown">
        <a href="/">Home</a>
        <a href="/pages/gallery.html">Gallery</a>
        <a href="/pages/merchandise.html">Merch</a>
        <a href="/pages/gossip.html">Updates</a>
        <a href="/pages/devotional.html">Devotional</a>
        <a href="/pages/events.html">Events</a>
        <a href="/pages/contact.html">Contact</a>
    </div>
</nav>
`;

files.forEach(file => {
    let filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove the bad literal backslash-n navbar injection that accidentally prefixed <body>
    const badRegex = new RegExp('<nav class="custom-navbar">\\\\n[\\\\s\\\\S]*?<\\\\/nav>\\\\n<body>', 'i');
    content = content.replace(badRegex, '<body>');

    // Remove all old <nav> blocks completely
    content = content.replace(/<nav[^>]*>[\s\S]*?<\/nav>/ig, '');

    // Now insert the proper nav right before <div class="hero"> or <div class="section"> or <h1> if it's there?
    // Wait, let's just put it right after <body>.
    content = content.replace(/<body[^>]*>/i, match => match + properNav);

    // Fix the literal '\n' headers
    // Using simple string replacement
    content = content.replace(/\\n\s*<script src="\/js\/theme\.js"><\/script>\\n<\/head>/i, '\n    <script src="/js/theme.js"></script>\n</head>');
    content = content.replace(/\\n\s*<script src="\/js\/cart\.js"><\/script>\\n<\/head>/i, '\n    <script src="/js/cart.js"></script>\n</head>');
    content = content.replace(/<script src="\/js\/theme\.js"><\/script>\\n\s*<script src="\/js\/cart\.js"><\/script>\\n<\/head>/i, '\n    <script src="/js/theme.js"></script>\n    <script src="/js/cart.js"></script>\n</head>');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Fixed: " + file);
});
