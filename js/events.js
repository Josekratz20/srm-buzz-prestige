const container = document.getElementById("eventsContainer");

async function loadEvents() {
  const res = await fetch("/api/events");
  const data = await res.json();

  if (data.length === 0) {
    container.innerHTML = "<p>No events yet.</p>";
    return;
  }

  container.innerHTML = data.reverse().map(event => `
    <div class="card">
      <h3>${event.title}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p>${event.description}</p>
    </div>
  `).join("");
}

loadEvents();