import { getUserIds, getData, setData, clearData } from "../storage.js";

describe("storage.js", () => {
  beforeEach(() => {
    // clear data for known users before each test
    const users = getUserIds();
    users.forEach(userId => clearData(userId));
  });

  test("returns a list of user IDs", () => {
    const users = getUserIds();

    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBe(5);
  });

  test("stores and retrieves data for a user", () => {
    const userId = "1";
    const bookmarks = [{ title: "Test Bookmark", url: "https://example.com" }];

    setData(userId, bookmarks);
    const storedData = getData(userId);

    expect(storedData).toEqual(bookmarks);
  });

  test("keeps data isolated between users", () => {
    const user1Data = [{ title: "User 1 Bookmark" }];
    const user2Data = [{ title: "User 2 Bookmark" }];

    setData("1", user1Data);
    setData("2", user2Data);

    expect(getData("1")).toEqual(user1Data);
    expect(getData("2")).toEqual(user2Data);
  });
});