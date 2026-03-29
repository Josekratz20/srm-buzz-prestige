// SRM Buzz Professional Navigation & Theme logic
function SRM_ToggleMenu() {
    console.log("Global menu toggle triggered!");
    const navDropdown = document.getElementById("srm-nav-dropdown");
    if (navDropdown) {
        navDropdown.classList.toggle("active");
    } else {
        console.error("Critical Error: 'srm-nav-dropdown' element not found in DOM!");
    }
}

function SRM_ToggleTheme() {
    console.log("Global theme toggle triggered!");
    const toggleBtn = document.getElementById("theme-toggle");
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
        if (toggleBtn) toggleBtn.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        if (toggleBtn) toggleBtn.textContent = "🌙";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("SRM Buzz JS Loaded v3");

    // Initialize Theme
    const toggleBtn = document.getElementById("theme-toggle");
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (toggleBtn) toggleBtn.textContent = "☀️";
    }

    // Attach listeners as fallback
    const menuToggleBtn = document.getElementById("srm-menu-toggle");
    if (menuToggleBtn) menuToggleBtn.addEventListener("click", SRM_ToggleMenu);
    if (toggleBtn) toggleBtn.addEventListener("click", SRM_ToggleTheme);
});