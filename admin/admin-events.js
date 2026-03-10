import { db } from "../js/firebase.js";
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const form = document.getElementById("eventForm");
const list = document.getElementById("eventList");

const idInput = document.getElementById("eventId");
const titleInput = document.getElementById("eventTitle");
const dateInput = document.getElementById("eventDate");
const locationInput = document.getElementById("eventLocation");
const descInput = document.getElementById("eventDescription");

// 🔄 LOAD EVENTS
async function loadEvents() {
    list.innerHTML = "";

    const q = query(collection(db, "events"), orderBy("eventDate", "asc"));
    const snapshot = await getDocs(q);

    snapshot.forEach(docSnap => {
        const e = docSnap.data();

        list.innerHTML += `
      <div style="border:1px solid #ccc;padding:10px;margin-bottom:10px">
        <strong>${e.title}</strong><br>
        📅 ${e.eventDate}<br>
        📍 ${e.location}<br>
        <button onclick="editEvent(
          '${docSnap.id}',
          '${e.title}',
          '${e.eventDate}',
          '${e.location}',
          \`${e.description || ""}\`
        )">Edit</button>
        <button onclick="deleteEvent('${docSnap.id}')">Delete</button>
      </div>
    `;
    });
}

// ✏️ EDIT
window.editEvent = (id, title, date, location, desc) => {
    idInput.value = id;
    titleInput.value = title;
    dateInput.value = date;
    locationInput.value = location;
    descInput.value = desc;
};

// 🗑 DELETE
window.deleteEvent = async (id) => {
    if (!confirm("Delete this event?")) return;
    await deleteDoc(doc(db, "events", id));
    loadEvents();
};

// 💾 SAVE
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        title: titleInput.value,
        eventDate: dateInput.value,
        location: locationInput.value,
        description: descInput.value,
        createdAt: serverTimestamp()
    };

    if (idInput.value) {
        await updateDoc(doc(db, "events", idInput.value), data);
    } else {
        await addDoc(collection(db, "events"), data);
    }

    form.reset();
    idInput.value = "";
    loadEvents();
});

loadEvents();
