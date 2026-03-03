import { getUserIds } from "../storage.js";

export function initUser() {
  return getUserIds().length !== 0 ? getUserIds()[0] : null;
}

export function initUsers(selectElement, onUserChange) {
  let currentUser = getUserIds()[0];

  getUserIds().forEach(id => {
    const option = document.createElement("option");
    option.value = id;
    option.textContent = `User ${id}`;
    selectElement.appendChild(option);
  });
  selectElement.value = currentUser;
  onUserChange(currentUser);

  selectElement.addEventListener("change", () => {
    currentUser = selectElement.value;
    onUserChange(currentUser);
  });
}

