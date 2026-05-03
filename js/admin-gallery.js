// Select elements
const form = document.getElementById("gallery-form");
const galleryContainer = document.getElementById("admin-gallery-container");

// ==========================
// LOAD GALLERY IMAGES
// ==========================
async function loadGallery() {
    try {
        const res = await fetch("https://srm-buzz-prestige.onrender.com/api/gallery");
        const data = await res.json();

        galleryContainer.innerHTML = "";

        if (data.length === 0) {
            galleryContainer.innerHTML = "<p>No images uploaded yet.</p>";
            return;
        }

        data.reverse().forEach(item => {
            const card = document.createElement("div");
            card.className = "admin-gallery-card";

            card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.caption}" width="100%">
        <h4>${item.caption}</h4>
        <p>${new Date(item.date).toLocaleString("en-KE", {
                dateStyle: "medium",
                timeStyle: "short"
            })}</p>
        <button onclick="deleteImage(${item.id})" style="background:red;color:white;border:none;padding:8px 12px;cursor:pointer;">
          Delete
        </button>
      `;

            galleryContainer.appendChild(card);
        });

    } catch (error) {
        console.error("Error loading gallery:", error);
    }
}

// ==========================
// UPLOAD IMAGE
// ==========================
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const res = await fetch("https://srm-buzz-prestige.onrender.com/api/gallery", {
            method: "POST",
            body: formData
        });

        const result = await res.json();

        alert(result.message);

        form.reset();
        loadGallery();

    } catch (error) {
        console.error("Upload failed:", error);
        alert("Upload failed.");
    }
});

// ==========================
// DELETE IMAGE
// ==========================
async function deleteImage(id) {
    const confirmDelete = confirm("Are you sure you want to delete this image?");
    if (!confirmDelete) return;

    try {
        const res = await fetch(`/api/gallery/${id}`, {
            method: "DELETE"
        });

        const result = await res.json();

        alert(result.message);
        loadGallery();

    } catch (error) {
        console.error("Delete failed:", error);
        alert("Delete failed.");
    }
}

// ==========================
// INITIAL LOAD
// ==========================
loadGallery();
