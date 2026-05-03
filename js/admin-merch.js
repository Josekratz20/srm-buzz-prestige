const form = document.getElementById("merch-form");
const container = document.getElementById("admin-merch-container");

async function loadMerch() {
    const res = await fetch("https://srm-buzz-prestige.onrender.com/api/merchandise");
    const data = await res.json();

    container.innerHTML = "";

    data.reverse().forEach(item => {
        container.innerHTML += `
      <div>
        <img src="${item.imageUrl}" width="150">
        <h3>${item.name}</h3>
        <p>KES ${item.price}</p>
        <p>${item.description}</p>
        <button onclick="deleteItem(${item.id})">Delete</button>
      </div>
    `;
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    await fetch("https://srm-buzz-prestige.onrender.com/api/merchandise", {
        method: "POST",
        body: formData
    });

    form.reset();
    loadMerch();
});

async function deleteItem(id) {
    await fetch(`/api/merchandise/${id}`, { method: "DELETE" });
    loadMerch();
}

loadMerch();
