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

    // Update menu toggle ID
    content = content.replace('id="menu-toggle"', 'id="srm-menu-toggle"');
    
    // Update dropdown ID (ensuring we match the class one too just in case)
    content = content.replace('id="nav-dropdown"', 'id="srm-nav-dropdown"');
    content = content.replace('class="nav-dropdown"', 'class="srm-nav-dropdown-placeholder"'); // Just so we don't match the same class later
    
    // Final force ofonclick
    if (!content.includes('onclick="SRM_ToggleMenu()"')) {
        content = content.replace('id="srm-menu-toggle">☰', 'id="srm-menu-toggle" onclick="SRM_ToggleMenu()">☰');
    }

    // Scrub any remaining legacy class references to nav-dropdown in HTML just to avoid CSS ghosts
    content = content.replace(/class="nav-dropdown"/g, 'class=""');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Renamed SRM Components: " + file);
});
