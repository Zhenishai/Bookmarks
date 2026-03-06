import { renderBookmarks } from "./bookmarksView.js";
import { setData, getData, clearData } from "../storage.js";

test("like count persists after reload", () => {

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

  const storedData = getData(userId);

  expect(storedData[0].likes).toBe(1);

  clearData(userId);

});



test("likes are isolated between users", () => {

  const user1 = "1";
  const user2 = "2";

  const bookmarksUser1 = [
    {
      id: "1",
      url: "https://example.com",
      title: "Example",
      description: "Test",
      createdAt: 1,
      likes: 0
    }
  ];

  const bookmarksUser2 = [
    {
      id: "1",
      url: "https://example2.com",
      title: "Example 2",
      description: "Test",
      createdAt: 1,
      likes: 0
    }
  ];

  setData(user1, bookmarksUser1);
  setData(user2, bookmarksUser2);

  const list = document.createElement("ul");

  renderBookmarks(list, user1);

  const likeButton = list.querySelector("button");

  likeButton.click();

  const dataUser1 = getData(user1);
  const dataUser2 = getData(user2);

  expect(dataUser1[0].likes).toBe(1);
  expect(dataUser2[0].likes).toBe(0);

  clearData(user1);
  clearData(user2);

});