document.addEventListener("DOMContentLoaded", () => {
    loadEvents();
});

async function loadEvents() {
    const container = document.getElementById("eventsContainer");
    container.innerHTML = `<div class="spinner"></div>`;

    try {
        const res = await fetch("https://srm-buzz-prestige.onrender.com/api/events");
        const data = await res.json();

        container.innerHTML = "";

        if (data.length === 0) {
            container.innerHTML = "<p style='text-align:center; grid-column: 1/-1;'>No upcoming events at the moment. Stay tuned!</p>";
            return;
        }

        // Show newest events first
        data.reverse().forEach(event => {
            container.innerHTML += `
                <div class="event-poster">
                    <div class="vintage-overlay"></div>
                    <div class="event-date-badge">
                        ${event.dateString.split(",")[0]}<br>
                        <span style="font-size: 0.7rem;">${event.dateString.split(",")[1] || 2024}</span>
                    </div>
                    <img src="${event.imageUrl.startsWith('data:') ? event.imageUrl : 'https://srm-buzz-prestige.onrender.com' + event.imageUrl}" alt="${event.title}" class="event-img">
                    <div class="event-info">
                        <h2 class="event-title">${event.title}</h2>
                        <p class="event-desc">${event.description || 'Join us for an unforgettable purpose-driven gathering.'}</p>
                        <button class="nav-toggle-btn" style="width: 100%; padding: 12px; border: 2px solid var(--accent-gold); color: var(--accent-gold); background: transparent;">
                             View Details
                        </button>
                    </div>
                </div>
            `;
        });

    } catch (err) {
        console.error("Error loading events:", err);
        container.innerHTML = "<p>Error loading events hub. Please try again.</p>";
    }
}

