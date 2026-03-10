document.addEventListener("DOMContentLoaded", async () => {

    const wall = document.getElementById("devotionalWall");

    const res = await fetch("/api/devotionals");
    const data = await res.json();

    if (!data || data.length === 0) {
        wall.innerHTML = "<p>No devotionals yet.</p>";
        return;
    }

    wall.innerHTML = data.slice().reverse().map(d => `
    <div class="card">
      <h3>${d.title}</h3>
      <p>${d.content}</p>
    </div>
  `).join("");
});