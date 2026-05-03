document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("galleryForm");
    const list = document.getElementById("galleryList");

    async function loadGallery() {
        const res = await fetch("https://srm-buzz-prestige.onrender.com/api/gallery");
        const data = await res.json();

        list.innerHTML = data.map(item => `
      <div style="margin-bottom:20px;">
        <img src="${item.imageUrl}" width="150"><br>
        <p>${item.caption}</p>
        <small>${new Date(item.date).toLocaleString("en-KE", {
            dateStyle: "medium",
            timeStyle: "short"
        })}</small><br>
        <button onclick="deleteImage(${item.id})">Delete</button>
        <hr>
      </div>
    `).join("");
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const imageFile = document.getElementById("image").files[0];
        const caption = document.getElementById("caption").value;

        formData.append("image", imageFile);
        formData.append("caption", caption);

        await fetch("https://srm-buzz-prestige.onrender.com/api/gallery", {
            method: "POST",
            body: formData
        });

        form.reset();
        loadGallery();
    });

    window.deleteImage = async function (id) {
        await fetch(`/api/gallery/${id}`, {
            method: "DELETE"
        });

        loadGallery();
    }

    loadGallery();
});
