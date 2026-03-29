const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\users\\erick masaba\\srm-buzz';
const files = [
    'index.html', 'pages/about.html', 'pages/cart.html', 'pages/checkout.html',
    'pages/contact.html', 'pages/devotional.html', 'pages/events.html',
    'pages/gallery.html', 'pages/gossip.html', 'pages/merchandise.html'
];

const tickerHTML = `
    <!-- FOOTER TICKER (LOWER THIRD) -->
    <div class="ticker">
        <div class="ticker-text">
            SRM Buzz • Empowering Purpose • Mentoring Champions • Transforming Lives • Embu Scout Centre • Bookings Open • Leadership Development • Faith in Action • 
            SRM Buzz • Empowering Purpose • Mentoring Champions • Transforming Lives • Embu Scout Centre • Bookings Open • Leadership Development • Faith in Action •
        </div>
    </div>\n`;

files.forEach(file => {
    let filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove existing ticker structures if any
    content = content.replace(/<!-- FOOTER TICKER -->[\s\S]*?<\/div>\s*<\/div>/gi, '');
    content = content.replace(/<div class="ticker">[\s\S]*?<\/div>\s*<\/div>/gi, '');

    // Re-insert before </body>
    if (!content.includes('class="ticker"')) {
        content = content.replace('</body>', tickerHTML + '</body>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Added Running Ticker to: " + file);
});
