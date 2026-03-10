const form = document.getElementById("feedbackForm");
const status = document.getElementById("statusMessage");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    await fetch("/api/feedback", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, message })
    });

    form.reset();
    status.innerText = "✅ Feedback sent successfully!";
});