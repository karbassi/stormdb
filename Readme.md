<div align="center">
  <img src="./docs/logo.png" alt="StormDB logo">

  <p>🌩️ StormDB is a small and lightweight, 0 dependency, easy-to-use JSON-based database that allows users to quickly and easily achieve data persistence by provided a wrapper to store and access data.</p>

  <img src="https://img.shields.io/badge/license-MIT-blue">
</div>

> Example: Quickly add a post entry under users.tom and save it to the database.

```js
db.get("users")
  .get("tom")
  .push({ title: "Post 1" })
  .save();
```

## Usage

Install StormDB through NPM:

```
$ npm i stormdb
```

Basic usage with NodeJS:

```js
const StormDB = require("stormdb");

// start db with "./db.stormdb" storage location
// no options.engine provided, so defaults to local file engine
const db = StormDB("./db.stormdb");

// set default db value if db is empty
db.default({ users: [] });

// add new users entry
db.get("users").push({ name: "tom" });

// update username of first user
db.get("users")
  .get(0)
  .get("name")
  .set("jeff");

// save changes to db
db.save();
```
