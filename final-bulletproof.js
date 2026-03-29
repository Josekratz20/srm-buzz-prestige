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

    // 1. Ensure theme toggler has the global onclick
    content = content.replace('id="theme-toggle"', 'id="theme-toggle" onclick="SRM_ToggleTheme()"');
    
    // 2. Ensure menu toggle has the global onclick (just in case they were reverted)
    if (!content.includes('onclick="SRM_ToggleMenu()"')) {
        content = content.replace('id="menu-toggle">☰', 'id="menu-toggle" onclick="SRM_ToggleMenu()">☰');
    }

    // 3. Add Cache Buster to JS to force browser to reload it on all pages
    content = content.replace('src="/js/theme.js"', 'src="/js/theme.js?v=' + Date.now() + '"');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Bulletproofed: " + file);
});
