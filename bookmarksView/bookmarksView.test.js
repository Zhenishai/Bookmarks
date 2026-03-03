import { jest } from "@jest/globals";

/* ---- Mock dependencies BEFORE importing module ---- */

jest.unstable_mockModule("../storage.js", () => ({
  getData: jest.fn(),
}));

jest.unstable_mockModule("../bookmarkButtons.js", () => ({
  createCopyBtn: jest.fn(() => document.createElement("button")),
  createLikeBtn: jest.fn(() => document.createElement("button")),
  createDeleteBtn: jest.fn(() => document.createElement("button")),
}));

/* ---- Import AFTER mocking ---- */

const { renderBookmarks } = await import("./bookmarksView.js");
const { getData } = await import("../storage.js");
const {
  createCopyBtn,
  createLikeBtn,
  createDeleteBtn,
} = await import("../bookmarkButtons.js");

describe("renderBookmarks", () => {
  let listElement;

  beforeEach(() => {
    document.body.innerHTML = `<ul id="bookmark-list"></ul>`;
    listElement = document.getElementById("bookmark-list");

    jest.clearAllMocks();
  });

  test("renders empty message when no bookmarks", () => {
    getData.mockReturnValue([]);

    renderBookmarks(listElement, "1");

    expect(listElement.textContent).toBe("No bookmarks saved yet.");
  });

  test("renders bookmarks correctly", () => {
    const mockBookmarks = [
      {
        id: "1",
        title: "Google",
        url: "https://google.com",
        description: "Search engine",
        createdAt: 1000,
        likes: 0,
      },
      {
        id: "2",
        title: "GitHub",
        url: "https://github.com",
        description: "Code hosting",
        createdAt: 2000,
        likes: 2,
      },
    ];

    getData.mockReturnValue(mockBookmarks);

    renderBookmarks(listElement, "1");

    // Should render 2 list items
    expect(listElement.children.length).toBe(2);

    // Should call button creators
    expect(createCopyBtn).toHaveBeenCalledTimes(2);
    expect(createLikeBtn).toHaveBeenCalledTimes(2);
    expect(createDeleteBtn).toHaveBeenCalledTimes(2);
  });

  test("renders bookmarks sorted by createdAt descending", () => {
    const mockBookmarks = [
      { id: "1", title: "Old", url: "#", description: "", createdAt: 1000, likes: 0 },
      { id: "2", title: "New", url: "#", description: "", createdAt: 2000, likes: 0 },
    ];

    getData.mockReturnValue(mockBookmarks);

    renderBookmarks(listElement, "1");

    const firstLinkText = listElement.querySelector("a").textContent;

    expect(firstLinkText).toBe("New"); // newest first
  });
});