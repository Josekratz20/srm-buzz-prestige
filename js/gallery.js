document.addEventListener("DOMContentLoaded", () => {
  loadGallery();
});

function loadGallery() {
  fetch("/api/gallery")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("gallery-container");
      container.innerHTML = "";

      // Newest first
      data.reverse().forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("polaroid-card");

        // Add a slight stagger and fade
        card.style.opacity = "0";
        card.style.transitionDelay = `${index * 100}ms`;

        card.innerHTML = `
          <div class="polaroid-img-container">
            <img src="${item.imageUrl}" alt="${item.caption}">
          </div>
          <p class="polaroid-caption">${item.caption || 'Live. Love. Purpose.'}</p>
        `;

        container.appendChild(card);

        // Professional fade-in
        setTimeout(() => {
          card.style.opacity = "1";
        }, 100);
      });
    })
    .catch(err => console.error("Gallery error:", err));
}