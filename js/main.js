document.addEventListener("DOMContentLoaded", () => {

    const postsContainer = document.getElementById("posts");
    const eventsContainer = document.getElementById("events-container");
    const devotionalContainer = document.getElementById("devotional-container");

    const API_URL = "http://localhost:5000/api/posts";

    // Fetch all posts once
    fetch(API_URL)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }
            return response.json();
        })
        .then(posts => {

            if (!posts || posts.length === 0) {
                if (postsContainer) postsContainer.innerHTML = "<p>No posts available.</p>";
                if (eventsContainer) eventsContainer.innerHTML = "<p>No events available.</p>";
                if (devotionalContainer) devotionalContainer.innerHTML = "<p>No devotionals available.</p>";
                return;
            }

            // Filter by category
            const scoutsPosts = posts.filter(p => p.category === "scouts");
            const divinityPosts = posts.filter(p => p.category === "divinity");
            const devotionalPosts = posts.filter(p => p.category === "devotional");

            // Render posts
            if (postsContainer) {
                postsContainer.innerHTML = scoutsPosts.map(post => createCard(post)).join("")
                    || "<p>No scouts posts available.</p>";
            }

            if (eventsContainer) {
                eventsContainer.innerHTML = divinityPosts.map(post => createCard(post)).join("")
                    || "<p>No divinity posts available.</p>";
            }

            if (devotionalContainer) {
                devotionalContainer.innerHTML = devotionalPosts.map(post => createCard(post)).join("")
                    || "<p>No devotionals available.</p>";
            }

        })
        .catch(error => {
            console.error("Error loading posts:", error);

            if (postsContainer) postsContainer.innerHTML = "<p>Error loading posts.</p>";
            if (eventsContainer) eventsContainer.innerHTML = "<p>Error loading events.</p>";
            if (devotionalContainer) devotionalContainer.innerHTML = "<p>Error loading devotionals.</p>";
        });

    // Card template function
    function createCard(post) {
        return `
            <div class="card">
                <h3>${post.title}</h3>
                <p>${post.content.substring(0, 150)}...</p>
                <small>By ${post.author || "Admin"}</small>
            </div>
        `;
    }

});
const filter = document.getElementById("categoryFilter");

if (filter) {
    filter.addEventListener("change", () => {
        const value = filter.value;
        const cards = document.querySelectorAll(".modern-card");

        cards.forEach(card => {
            if (value === "all" || card.dataset.category === value) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}