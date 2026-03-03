import { setData } from "../storage.js";
import { renderBookmarks } from "../bookmarksView/bookmarksView.js";

export function createCopyBtn(bookmark) {
  const copyBtn = document.createElement("button");
  copyBtn.textContent = "Copy URL";

  copyBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(bookmark.url);
    copyBtn.textContent = "Copied!";
    setTimeout(() => (copyBtn.textContent = "Copy URL"), 1000);
  });
  return copyBtn;
}
export function createLikeBtn(bookmark, bookmarks, userId, listElement) {
  const likeBtn = document.createElement("button");
  likeBtn.textContent = `❤️ ${bookmark.likes}`;

  likeBtn.addEventListener("click", () => {
    bookmark.likes++;
    setData(userId, bookmarks);
    renderBookmarks(listElement, userId);
  });
  return likeBtn;
}
export function createDeleteBtn(bookmarkId, bookmarks, userId, listElement) {
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "🗑 Delete";

  deleteBtn.addEventListener("click", () => {
    const updatedBookmarks = bookmarks.filter(
      b => b.id !== bookmarkId
    );
    setData(userId, updatedBookmarks);
    renderBookmarks(listElement, userId);
  });
  return deleteBtn;
}