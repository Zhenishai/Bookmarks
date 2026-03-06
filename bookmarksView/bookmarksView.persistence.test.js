import { renderBookmarks } from "./bookmarksView.js";
import { setData, clearData } from "../storage.js";

test("like count persists after re-render", () => {

  const userId = "1";

  const bookmarks = [
    {
      id: "1",
      url: "https://example.com",
      title: "Example",
      description: "Test",
      createdAt: 1,
      likes: 0
    }
  ];

  setData(userId, bookmarks);

  const list = document.createElement("ul");

  renderBookmarks(list, userId);

  let likeButton = list.querySelector("button");

  likeButton.click();

  renderBookmarks(list, userId);

  likeButton = list.querySelector("button");

  expect(likeButton.textContent).toContain("1");

  clearData(userId);

});