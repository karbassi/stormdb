StormDB can be used within the browser, by importing the necessary code using a CDN and using the StormDB browser engine. The data will be stored in the `localStorage` of the browser.

```html
<!-- import code using CDN -->
<script src="https://unpkg.com/stormdb/dist/StormDB.min.js"></script>
<script src="https://unpkg.com/stormdb/dist/BrowserEngine.min.js"></script>

<script>
  // start DB with browser engine
  const engine = new BrowserEngine("./db.stormdb");
  const db = StormDB(engine);

  // set default value for empty database
  db.default({ name: "tom" });

  // output name in database
  console.log(db.get("name").value());
</script>
```
