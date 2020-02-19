<div align="center">
  <img src="./docs/logo.png" alt="StormDB logo">

  <p>🌩️ StormDB is a tiny and lightweight, 0 dependency, easy-to-use JSON-based database that allows users to quickly and easily achieve data persistence by provided an engine to store and access JSON data, for NodeJS the browser or Electron.</p>

  <img src="https://img.shields.io/badge/dependencies-0-brightgreen">
  <img src="https://img.shields.io/badge/license-MIT-blue">
</div>

> Example: Add a post entry under users.tom and save it to the database.

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
const engine = new StormDB.localFileEngine("./db.stormdb");
const db = StormDB(engine);

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

The `db.stormdb` database file is updated to:

```js
{
  "users": [
    {"name":"jeff"}
  ]
}
```

StormDB is designed to be flexible, and can be used in NodeJS, the browser or even Electron with very small adaptations to the code. Examples usages can be seen below:

- [Browser Usage](./examples/browser.md)
- [NodeJS Server](./examples/node.md)

## Engine API

For expanding functionality, each database initialized can be expanded with the following options, in the format `new Engine(path, options);`.

- `serialize` - function to serialize data before writing it to the database.
- `deserialize` - function to deserialize data from the database.

## Database Operations

Change Value of Key in Database:

```js
db.get("old").set("newData");
// before: {"old": "oldData"}
// after: {"old": "newData"}
```

Set Key-Value Pair on Dictionary Property:

```js
db.set("key", "value").save();
// before: {}
// after: {"key": "value"}
```

Set Key-Value Pair on Dictionary with Shorthand Syntax:

```js
db.set("key.key2", "value").save();
// before: {}
// after: {"key": {"key2": "value"}}
```

Set Default Data for Empty Database:

```js
db.default({name: "tom"});

// actual db: {}
console.log(db.get("name")); // prints "tom"
```

Push Item to Array Property:

```js
db.get("list").push(1).save();

// before: {'list': []}
// after: {'list': [1]}
```