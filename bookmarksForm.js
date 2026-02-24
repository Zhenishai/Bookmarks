import { getData, setData } from "./storage.js";
import { renderBookmarks } from "./bookmarksView.js";

export function initForm(formElement, userIdGetter, listElement) {
  formElement.addEventListener("submit", e => {
    e.preventDefault();

    const userId = userIdGetter();

    const url = document.getElementById("url").value.trim();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();

    const bookmarks = getData(userId) || [];

    const newBookmark = {
      id: Date.now().toString(),
      url,
      title,
      description,
      createdAt: Date.now(),
      likes: 0
    };

    bookmarks.push(newBookmark);

    setData(userId, bookmarks);
    formElement.reset();
    renderBookmarks(listElement, userId);
  });
}