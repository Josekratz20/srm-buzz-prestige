/**
 * SRM PRESTIGE AUTH GUARD
 * Protects the Sanctuary by ensuring only logged-in users 
 * can view premium content (Everything except Home).
 */
(function() {
    const protectedPages = ['checkout.html', 'contact.html', 'cart.html'];
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const isAuthPage = window.location.pathname.includes('auth.html');
    const user = localStorage.getItem('srmUserToken');

    // ONLY lock Payment (checkout), Feedback (contact), and Booking (events/checkout)
    if (protectedPages.includes(currentPath) && !isAuthPage && !user) {
        window.location.href = '/pages/auth.html?redirect=' + encodeURIComponent(window.location.pathname);
    }
})();

function srm_logout() {
    localStorage.removeItem('srmUserToken');
    localStorage.removeItem('srmUserName');
    window.location.href = '/';
}

// UI UPDATE LOGIC
document.addEventListener('DOMContentLoaded', () => {
    const authLink = document.getElementById('srm-auth-link');
    const logoutBtn = document.getElementById('srm-logout-btn');
    const topNavAuthBtn = document.getElementById('srm-nav-auth-btn');
    const user = localStorage.getItem('srmUserToken');
    const name = localStorage.getItem('srmUserName');

    if (user) {
        if (authLink) authLink.style.display = 'none';
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
            logoutBtn.innerHTML = `🚪 LOGOUT (${name})`;
        }
        if (topNavAuthBtn) {
            topNavAuthBtn.innerHTML = `🚪`;
            topNavAuthBtn.title = `Logout (${name})`;
            topNavAuthBtn.onclick = (e) => { e.preventDefault(); srm_logout(); };
        }
    } else {
        if (authLink) authLink.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (topNavAuthBtn) {
            topNavAuthBtn.innerHTML = `👤`;
            topNavAuthBtn.title = `Login / Register`;
        }
    }
});

