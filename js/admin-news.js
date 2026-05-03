const form = document.getElementById("news-form");
const container = document.getElementById("admin-news-container");

async function loadNews() {
    const res = await fetch("https://srm-buzz-prestige.onrender.com/api/news");
    const data = await res.json();

    container.innerHTML = "";

    data.reverse().forEach(item => {
        container.innerHTML += `
      <div>
        <img src="${item.imageUrl}" width="200">
        <h3>${item.title}</h3>
        <p>${item.content}</p>
        <p>${new Date(item.date).toLocaleString("en-KE")}</p>
        <button onclick="deleteNews(${item.id})">Delete</button>
      </div>
    `;
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    await fetch("https://srm-buzz-prestige.onrender.com/api/news", {
        method: "POST",
        body: formData
    });

    form.reset();
    loadNews();
});

async function deleteNews(id) {
    await fetch(`/api/news/${id}`, { method: "DELETE" });
    loadNews();
}

loadNews();
