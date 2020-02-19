<div align="center">
  <img src="./docs/logo.png" alt="StormDB logo">

  <p>🌩️ StormDB is a small and lightweight, 0 dependency, easy-to-use JSON-based database that allows users to quickly and easily achieve data persistence by provided a wrapper to store and access data.</p>

  <img src="https://img.shields.io/badge/license-MIT-blue">
</div>

> Example: quickly add a post entry under users.tom and save it to the database.
```js
db.get("users")
  .get("tom")
  .push({ title: "Post 1" })
  .save();
```