# 📚 Shared Bookmarks App

A multi-user bookmark management application built with **HTML**, **JavaScript**, and **localStorage**.

This project is part of the **Piscine learning sprint** and focuses on application logic, data handling, and a clean frontend structure rather than visual design.

---

## 🚧 Project Status

- **Status:** In Progress  
- **Approach:** Agile-inspired, lightweight planning  
- **Tracking:** GitHub Issues (user stories & tasks), Jira used for high-level planning  

---

## 🎯 Project Overview

As developers, we often want to save useful links and return to them later.  
This application allows users to create, view, and interact with bookmarks in a shared environment.

The main goals of the project are to:
- implement clear and simple application logic,
- manage user-specific state,
- persist data in the browser,
- build an accessible frontend.

---

## 👥 Core User Stories

- As a user, I want to select a user from a dropdown to see that user’s bookmarks.
- As a user, I want to add a bookmark with a URL, title, and description.
- As a user, I want to see bookmarks sorted by newest first.
- As a user, I want to like a bookmark and have the like count saved.
- As a user, I want to copy a bookmark URL to the clipboard.
- As a user, I want to see a clear message when no bookmarks are available.

---

## 🧩 Features

- Dropdown to switch between multiple users  
- Bookmark creation form  
- Automatic timestamping  
- Reverse chronological sorting  
- Like button with persistent counter  
- Copy-to-clipboard functionality  
- User-specific data stored in localStorage  
- Keyboard-accessible and semantic HTML  

---

## 🧠 Architecture

The application follows a simple separation of concerns:

### Data Layer
A storage module (`storage.js`) handles all interaction with `localStorage` and keeps user data isolated.

### Application Logic
Core logic manages user selection, bookmark creation, sorting, likes, and validation.

### UI
The DOM is used to render bookmarks dynamically and handle user interactions via event listeners.

The project is developed **logic-first**, then connected to the UI.

---

## 🛠 Tech Stack

- HTML  
- JavaScript (ES Modules)  
- localStorage  
- Jest (for unit testing)  

---

## 📦 How to Run Locally

Because the project uses ES Modules, it must be served over HTTP:

```bash
npx http-server