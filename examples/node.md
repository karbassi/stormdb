To avoid blocking the event loop when saving the a StormDB database inside a NodeJS server, it is recommended you enable the async option on the local file engine, in order to enable asynchronous file saving. Async isn't typically necessary to enable when not creating a web server or during use on the CLI, and elsewise saving the StormDB database is synchronous.

Synchronous Use:
```js
const StormDB = require("stormdb");

// start db with "./db.stormdb" storage location
const engine = new StormDB.localFileEngine("./db.stormdb");
const db = StormDB(engine);

db.default({ users: [] });
db.get("users").push({ name: "tom" });

// synchronous database save
db.save(); // equals "null"
```

Asynchronous Use:
```js
const StormDB = require("stormdb");

// start async local file engine
const engine = new StormDB.localFileEngine("./db.stormdb", {
  async: true
});
const db = StormDB(engine);

db.default({ users: [] });
db.get("users").push({ name: "tom" });

// asynchronous database save
db.save().then(function() { // equals "Promise { <pending> }" 
  console.log('Finished Saving Database!');
});
```