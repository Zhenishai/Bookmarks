import { initUsers, initUser } from "./users.js";
import { jest } from "@jest/globals";

describe("User Dropdown", () => {

  let select;
  let mockCallback;

  beforeEach(() => {
    document.body.innerHTML = `
      <select id="user-select"></select>
    `;

    select = document.getElementById("user-select");
    mockCallback = jest.fn();
  });
//test1
  test("Dropdown contains 5 users", () => {
    initUsers(select, mockCallback);

    expect(select.children.length).toBe(5);
  });

//test2
  test("First user is selected by default", () => {
    initUsers(select, mockCallback);

    expect(select.value).toBe("1");
    expect(initUser()).toBe("1");
  });
//test3
  test("Changing user calls callback with new user", () => {
  initUsers(select, mockCallback);

  select.value = "3";
  select.dispatchEvent(new Event("change"));

  expect(mockCallback).toHaveBeenCalledWith("3");
});

});