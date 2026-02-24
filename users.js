import { getUserIds } from "./storage.js";

let currentUser = null;

export function getCurrentUser() {
  return currentUser;
}

export function initUsers(selectElement, onUserChange) {
  const users = getUserIds();

  users.forEach(id => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    selectElement.appendChild(option);
  });

  currentUser = users[0];
  selectElement.value = currentUser;

  onUserChange(currentUser);

  selectElement.addEventListener("change", () => {
    currentUser = selectElement.value;
    onUserChange(currentUser);
  });
}