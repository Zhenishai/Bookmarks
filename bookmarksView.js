import { getData, setData } from "./storage.js";

export function renderBookmarks(listElement, userId) {
  listElement.innerHTML = "";

  const bookmarks = getData(userId) || [];

  if (bookmarks.length === 0) {
    listElement.textContent = "No bookmarks saved yet.";
    return;
  }

  const sorted = [...bookmarks].sort((a, b) => b.createdAt - a.createdAt);

  sorted.forEach(bookmark => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";

    const desc = document.createElement("p");
    desc.textContent = bookmark.description;

    const time = document.createElement("small");
    time.textContent = new Date(bookmark.createdAt).toLocaleString();

    const likeBtn = document.createElement("button");
    likeBtn.textContent = `❤️ ${bookmark.likes}`;

    likeBtn.addEventListener("click", () => {
      bookmark.likes++;
      setData(userId, bookmarks);
      renderBookmarks(listElement, userId);
    });

    const copyBtn = document.createElement("button");
    copyBtn.textContent = "Copy URL";

    copyBtn.addEventListener("click", async () => {
      await navigator.clipboard.writeText(bookmark.url);
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy URL"), 1000);
    });

    li.append(link, desc, time, likeBtn, copyBtn);
    listElement.appendChild(li);
  });
}