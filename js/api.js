const API_URL = "http://localhost:5000/api/posts";

async function fetchPosts() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        displayPosts(data);
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

function displayPosts(posts) {
    const container = document.getElementById("posts-container");

    container.innerHTML = "";

    posts.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("post-card");

        postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.content}</p>
      <small>Category: ${post.category}</small>
    `;

        container.appendChild(postElement);
    });
}

fetchPosts();
