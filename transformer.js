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
    <footer class="srm-footer" style="background:#020617; text-align:center; padding:30px; border-top:1px solid rgba(255,215,0,0.1); margin-top:50px;">
        <h3 style="color:var(--accent-gold); font-family:'Playfair Display', serif; margin-bottom:15px;">Connect with SRM Hub</h3>
        <div style="display:flex; justify-content:center; gap:20px; align-items:center;">
            ${socialLinks}
        </div>
        <p style="opacity:0.5; font-size:0.8rem; margin-top:20px;">© 2026 SRM Buzz. All Rights Reserved.</p>
    </footer>
`;

const cartHTML = `
        <a href="/pages/cart.html" class="nav-cart">
            <span style="font-size:1.2rem;">🛒</span> <span style="font-weight:600; margin-left:5px;" id="cart-count">0</span>
        </a>`;

const userAuthLink = `
        <!-- JUMIA STYLE ACCOUNT LOGIN -->
        <a href="/pages/auth.html" id="srm-nav-auth-btn" class="nav-toggle-btn" style="font-size: 1.5rem; text-decoration: none; position: relative; top: 1px; margin: 0 5px;" title="Account">👤</a>
`;

const files = ['index.html', ...fs.readdirSync('pages').filter(f => f.endsWith('.html')).map(f => 'pages/' + f)];

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let hasCart = file.includes('merchandise.html') || file.includes('cart.html') || file.includes('checkout.html');
    
    // 1. Remove Top Social Icons
    content = content.replace(/<!-- REAL BRANDED SOCIAL ICONS -->[\s\S]*?<\/a>([\s]*<\/a>)?/g, '');
    
    // 2. Remove old nav-cart
    content = content.replace(/<a href="\/pages\/cart\.html" class="nav-cart">[\s\S]*?<\/a>/g, '');

    // 3. Rebuild nav-controls carefully
    const themeBtnRegex = /<button id="theme-toggle".*?<\/button>/;
    if (themeBtnRegex.test(content) && content.includes('nav-controls')) {
        let replacement = '$&'; 
        replacement += userAuthLink;
        if (hasCart) {
            replacement += cartHTML;
        }
        
        // Let's strip out existing srm-nav-auth-btn if any to avoid duplication
        content = content.replace(/<!-- JUMIA STYLE ACCOUNT LOGIN -->[\s\S]*?<\/a>/g, '');
        content = content.replace(themeBtnRegex, replacement);
    }
    
    // 4. Add Footer if not present
    if (!content.includes('<footer class="srm-footer"')) {
        // Place before closing body, or before Kababa Chatbot
        if (content.includes('<!-- KABABA CHATBOT -->')) {
            content = content.replace('<!-- KABABA CHATBOT -->', footerHTML + '\n\n    <!-- KABABA CHATBOT -->');
        } else {
            content = content.replace('</body>', footerHTML + '\n</body>');
        }
    }

    fs.writeFileSync(file, content);
});

console.log("HTML Layout Transformation Complete!");
