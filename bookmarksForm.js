import { getData, setData } from "./storage.js";
import { renderBookmarks } from "./bookmarksView.js";

export function initForm(formElement, userIdGetter, listElement) {
  formElement.addEventListener("submit", e => {
    e.preventDefault();

    const userId = userIdGetter();

    const url = document.getElementById("url").value.trim();
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    
    if (!url || !title || !description) {
      alert("Please fill in all required fields.");  
      return;
    }
    if (title.length > 50) {
      alert("Title must be 50 characters or less.");
      return;
    }
    try {
      new URL(url); 
    } catch (err) {
      alert("please enter a valid URL."); 
      return; 
    }
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