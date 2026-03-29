const fs = require('fs');
const path = require('path');

const rootDir = 'c:\\\\users\\\\erick masaba\\\\srm-buzz';
const files = [
    'index.html', 'pages/about.html', 'pages/cart.html', 'pages/checkout.html',
    'pages/contact.html', 'pages/devotional.html', 'pages/events.html',
    'pages/gallery.html', 'pages/gossip.html', 'pages/merchandise.html'
];

const jsContent = `
    <script>
        function SRM_ToggleMenu() {
            const dropdown = document.getElementById("srm-nav-dropdown");
            if (dropdown) dropdown.classList.toggle("active");
        }
        function SRM_ToggleTheme() {
            document.body.classList.toggle("dark-mode");
            const btn = document.getElementById("theme-toggle");
            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
                if (btn) btn.textContent = "☀️";
            } else {
                localStorage.setItem("theme", "light");
                if (btn) btn.textContent = "🌙";
            }
        }
        document.addEventListener("DOMContentLoaded", () => {
            if (localStorage.getItem("theme") === "dark") {
                document.body.classList.add("dark-mode");
                const btn = document.getElementById("theme-toggle");
                if (btn) btn.textContent = "☀️";
            }
        });
    </script>
`;

files.forEach(file => {
    let filePath = path.join(rootDir, file);
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // Remove any previous theme script tags and consolidate into one inline script
    content = content.replace(/<script src=["'].*?theme\.js.*?><\/script>\s*/gi, '');
    
    // Insert the inline script into the head
    if (content.includes('</head>')) {
        content = content.replace('</head>', jsContent + '</head>');
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Inlined script for bulletproof execution: " + file);
});
