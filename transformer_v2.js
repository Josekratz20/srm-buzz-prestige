const fs = require('fs');
const path = require('path');

const socialLinks = `
    <!-- REAL BRANDED SOCIAL ICONS -->
    <a href="https://bit.ly/SrmbuzzYoutube" target="_blank" class="nav-toggle-btn" title="SRM Youtube" style="width: 32px; padding: 0; margin-top: 5px;">
        <svg viewBox="0 0 24 24" fill="#FF0000" width="24" height="24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
    </a>
    <a href="https://bit.ly/SrmbuzzFacebook" target="_blank" class="nav-toggle-btn" title="SRM Facebook" style="width: 32px; padding: 0; margin-top: 5px; margin-left: 10px;">
        <svg viewBox="0 0 24 24" fill="#1877F2" width="24" height="24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
    </a>`;

const footerHTML = `
    <!-- FOOTER SOCIAL LINKS -->
    <footer class="srm-footer" style="background:#020617; text-align:center; padding:60px 20px; border-top:1px solid rgba(255,215,0,0.1); width:100%; box-sizing:border-box; relative; z-index:1;">
        <h3 style="color:var(--accent-gold); font-family:'Playfair Display', serif; margin-bottom:15px; font-size:1.8rem;">Connect with SRM Hub</h3>
        <div style="display:flex; justify-content:center; gap:25px; align-items:center;">
            ${socialLinks}
        </div>
        <p style="opacity:0.5; font-size:0.9rem; margin-top:30px;">© 2026 SRM Buzz. All Rights Reserved.</p>
    </footer>
`;

const files = ['index.html', ...fs.readdirSync('pages').filter(f => f.endsWith('.html'))].map(f => f.startsWith('pages/') ? f : (fs.existsSync(f) ? f : 'pages/' + f));

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');
    
    // 1. Clean Top Navigation (Move social icons to footer, ensure light/dark mode at right)
    // Remove all Social Icons from nav-controls
    content = content.replace(/<!-- REAL BRANDED SOCIAL ICONS -->[\s\S]*?<\/a>[\s]*<\/a>/g, '');
    content = content.replace(/<a href="https:\/\/bit\.ly\/SrmbuzzYoutube"[\s\S]*?<\/a>/g, '');
    content = content.replace(/<a href="https:\/\/bit\.ly\/SrmbuzzFacebook"[\s\S]*?<\/a>/g, '');

    // Ensure Theme Toggle and Account Button are together at the end of nav-controls
    // We'll rebuild nav-controls content
    const navControlsRegex = /<div class="nav-controls">([\s\S]*?)<\/div>/;
    const match = content.match(navControlsRegex);
    if (match) {
        let controls = match[1];
        // Clean out existing theme, auth, and cart buttons to rebuild
        controls = controls.replace(/<button id="theme-toggle"[\s\S]*?<\/button>/g, '');
        controls = controls.replace(/<!-- JUMIA STYLE ACCOUNT LOGIN -->[\s\S]*?<\/a>/g, '');
        controls = controls.replace(/<a href="\/pages\/auth\.html" id="srm-nav-auth-btn"[\s\S]*?<\/a>/g, '');
        const cartRegex = /<a href="\/pages\/cart\.html" class="nav-cart">[\s\S]*?<\/a>/;
        let cartHtml = '';
        const cartMatch = controls.match(cartRegex);
        if (cartMatch) {
            cartHtml = cartMatch[0];
            controls = controls.replace(cartRegex, '');
        }
        controls = controls.replace(/<button class="nav-toggle-btn" id="srm-menu-toggle"[\s\S]*?<\/button>/g, '');

        let newControls = `
            ${cartHtml}
            <a href="/pages/auth.html" id="srm-nav-auth-btn" class="nav-toggle-btn" style="font-size: 1.5rem; text-decoration: none;" title="Account">👤</a>
            <button id="theme-toggle" onclick="SRM_ToggleTheme()" class="nav-toggle-btn" style="font-size: 28px;">🌙</button>
            <button class="nav-toggle-btn" id="srm-menu-toggle" onclick="SRM_ToggleMenu()">☰</button>
        `;
        content = content.replace(navControlsRegex, `<div class="nav-controls">${newControls}</div>`);
    }

    // 2. Ensure Footer is at the very bottom (except auth.html which we will redesign)
    if (file !== 'pages/auth.html') {
        content = content.replace(/<!-- FOOTER SOCIAL LINKS -->[\s\S]*?<\/footer>/g, ''); // Remove old one
        if (content.includes('<!-- KABABA CHATBOT -->')) {
            content = content.replace('<!-- KABABA CHATBOT -->', footerHTML + '\n\n    <!-- KABABA CHATBOT -->');
        } else if (content.includes('</body>')) {
            content = content.replace('</body>', footerHTML + '\n</body>');
        }
    }

    fs.writeFileSync(file, content);
});

console.log("Layout Transformation V2 Complete!");
