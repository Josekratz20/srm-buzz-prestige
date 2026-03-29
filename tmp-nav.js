const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\users\\erick masaba\\srm-buzz';

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

const newNav = `<nav class="navbar">
    <div class="logo-container">
        <a href="/" class="logo">
            <img src="/images/logo.png" alt="SRM Buzz Logo">
            <div class="logo-text">
                <span class="srm-text">SRM</span><span class="buzz-text">BUZZ</span>
            </div>
        </a>
    </div>
    <div class="nav-links" id="nav-links">
        <a href="/">Home</a>
        <a href="/pages/devotional.html">Devotionals</a>
        <a href="/pages/events.html">Events</a>
        <a href="/pages/gallery.html">Gallery</a>
        <a href="/pages/merchandise.html">Merch</a>
        <a href="/pages/gossip.html">Updates</a>
        <a href="/pages/contact.html">Contact</a>
        <a href="/pages/cart.html" class="cart-link">
            🛒 Cart (<span id="cart-count">0</span>)
        </a>
    </div>
    <div class="menu-toggle" id="menu-toggle">☰</div>
</nav>`;

files.forEach(file => {
    const filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) return;

    let content = fs.readFileSync(filePath, 'utf8');

    const navRegex = /<nav\b[^>]*>[\s\S]*?<\/nav>/i;

    if (navRegex.test(content)) {
        content = content.replace(navRegex, newNav);
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Updated " + file);
    } else {
        console.log("No nav found in " + file);
    }
});
