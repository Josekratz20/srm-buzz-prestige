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
    const user = localStorage.getItem('srmUserToken');
    const name = localStorage.getItem('srmUserName');

    if (user) {
        if (authLink) authLink.style.display = 'none';
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
            logoutBtn.innerHTML = `🚪 LOGOUT (${name})`;
        }
    } else {
        if (authLink) authLink.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
});

