📚 Shared Bookmarks App

A simple multi-user bookmark sharing application built with HTML, JavaScript, and localStorage.

This project allows users to save useful links with a title and description, view bookmarks in reverse chronological order, and interact with them using like and copy-to-clipboard features.

🚀 Features

👥 Select between 5 different users

🔗 Add bookmarks with:

URL

Title

Description

🕒 Automatic timestamp when a bookmark is created

🔄 Bookmarks displayed in reverse chronological order

❤️ Like button with persistent like counter

📋 Copy URL to clipboard button

💾 Data stored using localStorage

♿ Accessible form and interface (keyboard-friendly)

🧪 Includes unit tests for core logic

🧠 What I Learned

Through this project I practiced:

Working with JavaScript modules

Managing state per user

Persisting data using localStorage

DOM manipulation and dynamic rendering

Event handling

Sorting data (reverse chronological order)

Clipboard API

Writing unit tests for non-trivial logic

Accessibility best practices

🛠 Tech Stack

HTML

JavaScript (ES Modules)

localStorage

Jest (for unit testing)

📦 How to Run Locally

Because the project uses ES Modules, it must be served via HTTP.

npx http-server


Then open:

http://localhost:8080

🎯 Project Goal

This project focuses on logic and functionality rather than styling.
The goal was to build a clean, working, accessible multi-user bookmarking system with persistent data storage.


