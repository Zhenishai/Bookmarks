import { jest } from "@jest/globals";

/* ---- Mock dependencies BEFORE import ---- */

jest.unstable_mockModule("../storage.js", () => ({
  setData: jest.fn(),
}));

jest.unstable_mockModule(
  "../bookmarksView/bookmarksView.js",
  () => ({
    renderBookmarks: jest.fn(),
  })
);

/* ---- Import AFTER mocking ---- */

const {
  createCopyBtn,
  createLikeBtn,
  createDeleteBtn,
} = await import("./bookmarkButtons.js");

const { setData } = await import("../storage.js");
const { renderBookmarks } = await import(
  "../bookmarksView/bookmarksView.js"
);

describe("bookmarkButtons", () => {
  let listElement;

  beforeEach(() => {
    document.body.innerHTML = `<ul></ul>`;
    listElement = document.querySelector("ul");
    jest.clearAllMocks();
  });

  /* ---------------- COPY BUTTON ---------------- */

  test("copy button writes URL to clipboard", async () => {
    const mockBookmark = { url: "https://google.com" };

    // Mock clipboard
    global.navigator.clipboard = {
      writeText: jest.fn().mockResolvedValue(),
    };

    const btn = createCopyBtn(mockBookmark);

    await btn.click();

    expect(navigator.clipboard.writeText)
      .toHaveBeenCalledWith("https://google.com");
  });

  /* ---------------- LIKE BUTTON ---------------- */

  test("like button increments likes and updates state", () => {
    const bookmark = { id: "1", likes: 0 };
    const bookmarks = [bookmark];

    const btn = createLikeBtn(
      bookmark,
      bookmarks,
      "1",
      listElement
    );

    btn.click();

    expect(bookmark.likes).toBe(1);
    expect(setData).toHaveBeenCalledWith("1", bookmarks);
    expect(renderBookmarks)
      .toHaveBeenCalledWith(listElement, "1");
  });

  /* ---------------- DELETE BUTTON ---------------- */

  test("delete button removes bookmark and updates state", () => {
    const bookmarks = [
      { id: "1" },
      { id: "2" },
    ];

    const btn = createDeleteBtn(
      "1",
      bookmarks,
      "1",
      listElement
    );

    btn.click();

    expect(setData).toHaveBeenCalledWith(
      "1",
      [{ id: "2" }]
    );

    expect(renderBookmarks)
      .toHaveBeenCalledWith(listElement, "1");
  });
});