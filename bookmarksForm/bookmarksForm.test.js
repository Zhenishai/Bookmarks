import { jest } from "@jest/globals";

jest.unstable_mockModule("../storage.js", () => ({
  getData: jest.fn(),
  setData: jest.fn(),
}));

jest.unstable_mockModule("../bookmarksView.js", () => ({
  renderBookmarks: jest.fn(),
}));

const { initForm } = await import("./bookmarksForm.js");
const { getData, setData } = await import("../storage.js");
const { renderBookmarks } = await import("../bookmarksView.js");

describe("initForm", () => {
  let form;
  let listElement;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="bookmark-form">
        <input id="url" />
        <input id="title" />
        <input id="description" />
      </form>
      <ul id="bookmark-list"></ul>
    `;

    form = document.getElementById("bookmark-form");
    listElement = document.getElementById("bookmark-list");

    getData.mockReturnValue([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("adds a new bookmark on form submit", () => {
    const mockUserIdGetter = jest.fn().mockReturnValue("1");

    initForm(form, mockUserIdGetter, listElement);

    document.getElementById("url").value = "https://google.com";
    document.getElementById("title").value = "Google";
    document.getElementById("description").value = "Search engine";

    form.dispatchEvent(new Event("submit"));

    expect(getData).toHaveBeenCalledWith("1");
    expect(setData).toHaveBeenCalledTimes(1);
    expect(renderBookmarks).toHaveBeenCalledWith(listElement, "1");
  });
});