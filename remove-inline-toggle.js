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

    // Pattern to look for the old inline toggle logic
    const oldToggleScriptRegex = /const\s+toggle\s*=\s*document\.getElementById\("menu-toggle"\);\s*const\s*links\s*=\s*document\.getElementById\("nav-dropdown"\);\s*toggle\.addEventListener\("click",\s*\(\)\s*=>\s*\{\s*links\.classList\.toggle\("active"\);\s*\}\);/ig;
    
    // Also removing potential old inline nav-links versions just in case
    const olderToggleScriptRegex = /const\s+toggle\s*=\s*document\.getElementById\("menu-toggle"\);\s*const\s*links\s*=\s*document\.getElementById\("nav-links"\);\s*toggle\.addEventListener\("click",\s*\(\)\s*=>\s*\{\s*links\.classList\.toggle\("active"\);\s*\}\);/ig;

    let initialLength = content.length;
    content = content.replace(oldToggleScriptRegex, '');
    content = content.replace(olderToggleScriptRegex, '');

    // Brute force string replacement as fallback
    let bruteTarget1 = 'const toggle = document.getElementById("menu-toggle");\n        const links = document.getElementById("nav-dropdown");\n\n        toggle.addEventListener("click", () => {\n            links.classList.toggle("active");\n        });';
    let bruteTarget2 = 'const toggle = document.getElementById("menu-toggle");\r\n        const links = document.getElementById("nav-dropdown");\r\n\r\n        toggle.addEventListener("click", () => {\r\n            links.classList.toggle("active");\r\n        });';
    let bruteTarget3 = 'const toggle = document.getElementById("menu-toggle");\n        const links = document.getElementById("nav-links");\n\n        toggle.addEventListener("click", () => {\n            links.classList.toggle("active");\n        });';
    let bruteTarget4 = 'const toggle = document.getElementById("menu-toggle");\r\n        const links = document.getElementById("nav-links");\r\n\r\n        toggle.addEventListener("click", () => {\r\n            links.classList.toggle("active");\r\n        });';

    content = content.replace(bruteTarget1, '').replace(bruteTarget2, '').replace(bruteTarget3, '').replace(bruteTarget4, '');

    // Let's use a more robust regex to catch whitespace variations
    const robustRegex = /const\s+toggle\s*=\s*document\.getElementById\("menu-toggle"\);[\s\S]*?toggle\.addEventListener\("click"[^}]*\}\);/ig;
    content = content.replace(robustRegex, '');

    if (content.length !== initialLength) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log("Removed conflicting toggle from: " + file);
    }
});
