import { db } from "../js/firebase.js";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("postForm");
const postList = document.getElementById("postList");

const titleInput = document.getElementById("title");
const categoryInput = document.getElementById("category");
const contentInput = document.getElementById("content");
const postIdInput = document.getElementById("postId");

// 🔄 LOAD POSTS
async function loadPosts() {
    postList.innerHTML = "";

    const snapshot = await getDocs(collection(db, "posts"));
    snapshot.forEach(docSnap => {
        const post = docSnap.data();

        postList.innerHTML += `
      <div style="border:1px solid #ccc;padding:10px;margin-bottom:10px">
        <strong>${post.title}</strong> (${post.category})
        <br>
        <button onclick="editPost('${docSnap.id}','${post.title}','${post.category}','${post.content}')">Edit</button>
        <button onclick="deletePost('${docSnap.id}')">Delete</button>
      </div>
    `;
    });
}

// ✏️ EDIT POST
window.editPost = (id, title, category, content) => {
    postIdInput.value = id;
    titleInput.value = title;
    categoryInput.value = category;
    contentInput.value = content;
};

// 🗑 DELETE POST
window.deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;
    await deleteDoc(doc(db, "posts", id));
    loadPosts();
};

// 💾 SAVE / UPDATE POST
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = postIdInput.value;

    if (id) {
        await updateDoc(doc(db, "posts", id), {
            title: titleInput.value,
            category: categoryInput.value,
            content: contentInput.value
        });
    } else {
        await addDoc(collection(db, "posts"), {
            title: titleInput.value,
            category: categoryInput.value,
            content: contentInput.value,
            createdAt: serverTimestamp()
        });
    }

    form.reset();
    postIdInput.value = "";
    loadPosts();
});

// INIT
loadPosts();
