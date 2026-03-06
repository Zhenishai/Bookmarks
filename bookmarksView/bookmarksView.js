import { getData } from "../storage.js";
import {
  createCopyBtn,
  createLikeBtn,
  createDeleteBtn
} from "../bookmarkButtons/bookmarkButtons.js";

export function renderBookmarks(listElement, userId) {
  listElement.innerHTML = "";
  
  const bookmarks = getData(userId) || [];

  if (bookmarks.length === 0) {
    listElement.textContent = "No bookmarks saved yet.";
    return;
  }
  const sorted = [...bookmarks].sort(
    (a, b) => b.createdAt - a.createdAt
  );
  sorted.forEach(bookmark => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = bookmark.url;
    link.textContent = bookmark.title;
    link.target = "_blank";

    const desc = document.createElement("p");
    desc.textContent = bookmark.description;

    const time = document.createElement("small");
    time.textContent = new Date(
      bookmark.createdAt
    ).toLocaleString();

    const copyBtn = createCopyBtn(bookmark);
    const likeBtn = createLikeBtn(
      bookmark,
      bookmarks,
      userId,
      listElement
    );
    const deleteBtn = createDeleteBtn(
      bookmark.id,
      bookmarks,
      userId,
      listElement
    );

    li.append(
      link,
      desc,
      time,
      likeBtn,
      copyBtn,
      deleteBtn
    );

    listElement.appendChild(li);
  });
}