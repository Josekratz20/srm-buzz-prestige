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
        card.classList.add("gallery-card");

        card.innerHTML = `
          <img src="${item.imageUrl}" alt="${item.caption}">
          <div class="gallery-info">
            ${item.caption}
          </div>
        `;

        container.appendChild(card);

        // Stagger fade animation
        setTimeout(() => {
          card.classList.add("show");
        }, index * 80); // delay per image
      });
    })
    .catch(err => console.error("Gallery error:", err));
}