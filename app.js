import { initUsers, getCurrentUser } from "./users/users.js";
import { renderBookmarks } from "./bookmarksView.js";
import { initForm } from "./bookmarksForm.js";

const userSelect = document.getElementById("user-select");
const list = document.getElementById("bookmark-list");
const form = document.getElementById("bookmark-form");


initUsers(userSelect, (userId) => {
  renderBookmarks(list, userId);
});

initForm(form, getCurrentUser, list);