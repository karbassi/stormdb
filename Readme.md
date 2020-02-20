<div align="center">
  <img src="./docs/logo.png" alt="StormDB logo">

  <p>🌩️ StormDB is a tiny, lightweight, 0 dependency, easy-to-use JSON-based database that allows users to quickly and easily achieve data persistence by provided an engine to store and access JSON data, for NodeJS the browser or Electron.</p>

  <img src="https://img.shields.io/npm/v/stormdb">
  <a href="https://bundlephobia.com/result?p=stormdb">
    <img src="https://img.shields.io/bundlephobia/minzip/stormdb">
  </a>
  <img src="https://img.shields.io/badge/dependencies-0-brightgreen">
  <img src="https://img.shields.io/badge/license-MIT-blue">
</div>

<br>

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

## Database Operations Examples

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

Delete Value:

```js
db.delete("key");
// before: {'key': 'value', 'key2': 'value2'}
// after: {'key2': 'value2'}
```

Set Key-Value Pair on Dictionary with Shorthand Syntax:

```js
db.set("key.key2", "value").save();
// before: {}
// after: {"key": {"key2": "value"}}
```

Set Default Data for Empty Database:

```js
db.default({ name: "tom" });

// actual db: {}
console.log(db.get("name")); // prints "tom"
```

Push Item to Array Property:

```js
db.get("list")
  .push(1)
  .save();

// before: {'list': []}
// after: {'list': [1]}
```

Filter All Elements under 5:

```js
// before = {'list': [1,2,6,1]}
// output = {'list': [6]}

// get list from db
let value = db.get("list").value();

// delete all elements with value under 5
value.forEach(function(el, i) {
  if (el < 5) {
    db.get("list")
      .get(i)
      .delete();
  }
});

// remove all null elements
value = value.filter(el => el !== null);
db.get("list").set(value);

// save db
db.save();
```

Change Element with Highest Value:

```js
// before = {'users': [{value: 10}, {value: 5}, {value: 6}]}
// after = {'users': [{value: "changed"}, {value: 5}, {value: 6}]}

// get list from db
let values = db.get("users").value();

// sort list with highest value first
values = values.sort((a, b) => b.value - a.value);

// change value of highest element
values[0]["value"] = "changed";

// replace list with new list with changed values
db.get("users").set(values);

// save db
db.save();
```

Map List, Squaring Each Number in List:

```js
// before = {'data': [1,2,3,4,5]}
// after = {'data': [1,4,9,16,25]}

// get values list
let values = db.get("data").value();

// map list, squaring each number
values = values.map(x => x ** 2);

// reassign list to db
db.get("data").set(values);

// save db
db.save();
```

Leverage Serialize and Deserialize functions to encrypt and decrypt data:

```js
const engine = new StormDB.localFileEngine("./db.stormdb", {
  serialize: data => {
    // ecrypt and serialize data
    return encrypt(JSON.stringify(data));
  },
  deserialize: data => {
    // decrypt and deserialize data
    return JSON.parse(decrypt(data));
  }
});
const db = StormDB(engine);
```

## Credit

Author: [Tom](https://github.com/TomPrograms)

## License

[MIT](LICENSE)
