const Base = require("./base.js");
const fs = require("fs");

module.exports = class LocalEngine extends Base {
  constructor(path, options = {}) {
    super();

    this.path = path;

    this.async = options.async || false;
    this.serialize = options.serialize || JSON.stringify;
    this.deserialize = options.deserialize || JSON.parse;
  }

  init() {
    const exists = fs.existsSync(this.path);
    if (!exists) {
      fs.writeFileSync(this.path, this.serialize({}));
      return {};
    } else {
      return this.read();
    }
  }

  read() {
    let data = fs.readFileSync(this.path, "UTF-8");
    if (data === '') data = '{}';
    
    try {
      let json = this.deserialize(data);
      return json;
    } catch(error) {
      error.message = "Failed to load StormDB database file - invalid or corrupted format.";
      throw error;
    } 
  }

  write(data) {
    // if async, return promise wrapper around async writefile
    if (this.async) {
      return new Promise(
        function(resolve, reject) {
          fs.writeFile(this.path, this.serialize(data), function() {
            resolve();
          });
        }.bind(this)
      );
    }

    fs.writeFileSync(this.path, this.serialize(data));
    return null;
  }
};
