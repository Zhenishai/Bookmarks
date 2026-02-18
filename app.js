import { getUserIds, getData, setData } from "./storage.js";

let currentUser = null;

const userSelect = document.getElementById("user-select");
const list = document.getElementById("bookmark-list");
const form = document.getElementById("bookmark-form");

/* ---------- USERS ---------- */

function populateUsers() {
  const users = getUserIds();

  users.forEach(id => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    userSelect.appendChild(option);
  });

  currentUser = users[0];
  userSelect.value = currentUser;
  renderBookmarks();
}

userSelect.addEventListener("change", () => {
  currentUser = userSelect.value;
  renderBookmarks();
});

populateUsers();

/* ---------- RENDER ---------- */

function renderBookmarks() {
  list.innerHTML = "";

  const bookmarks = getData(currentUser) || [];

  if (bookmarks.length === 0) {
    list.textContent = "No bookmarks saved yet.";
    return;
  }

  const sorted = [...bookmarks].sort((a, b) => b.createdAt - a.createdAt);

  sorted.forEach(bookmark => {
    const li = document.createElement("li");

    // TITLE LINK
    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";

    // DESCRIPTION
    const desc = document.createElement("p");
    desc.textContent = bookmark.description;

    // TIME
    const time = document.createElement("small");
    time.textContent = new Date(bookmark.createdAt).toLocaleString();

    // LIKE BUTTON
    const likeBtn = document.createElement("button");
    likeBtn.textContent = `❤️ ${bookmark.likes}`;

    likeBtn.addEventListener("click", () => {
      bookmark.likes++;
      saveAndRender(bookmarks);
    });

    // COPY BUTTON
    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy URL";

    copyBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(bookmark.url);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy URL"), 1000);
    });

    li.append(link, desc, time, likeBtn, copyBtn);
    list.appendChild(li);
  });
}

function saveAndRender(data) {
  setData(currentUser, data);
  renderBookmarks();
}

/* ---------- ADD BOOKMARK ---------- */

form.addEventListener("submit", e => {
  e.preventDefault();

  const url = document.getElementById("url").value.trim();
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  const bookmarks = getData(currentUser) || [];

  const newBookmark = {
    id: Date.now().toString(),
    url,
    title,
    description,
    createdAt: Date.now(),
    likes: 0
  };

  bookmarks.push(newBookmark);

  setData(currentUser, bookmarks);
  form.reset();
  renderBookmarks();
});
