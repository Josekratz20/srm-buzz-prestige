document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("devotionalForm");
    const list = document.getElementById("devotionalList");

    async function loadDevotionals() {
        const res = await fetch("https://srm-buzz-prestige.onrender.com/api/devotionals");
        const data = await res.json();

        list.innerHTML = data.map(d => `
      <div style="margin-bottom:20px;">
        <h4>${d.title}</h4>
        <p>${d.content}</p>
        <button onclick="deleteDevotional(${d.id})">Delete</button>
        <hr>
      </div>
    `).join("");
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        await fetch("https://srm-buzz-prestige.onrender.com/api/devotionals", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ title, content })
        });

        form.reset();
        loadDevotionals();
    });

    window.deleteDevotional = async function (id) {
        await fetch(`/api/devotionals/${id}`, {
            method: "DELETE"
        });

        loadDevotionals();
    }

    loadDevotionals();
});
