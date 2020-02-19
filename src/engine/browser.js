const Base = require("./base.js");

module.exports = class LocalEngine extends Base {
  constructor(path, options = {}) {
    super();

    this.path = path;

    this.serialize = options.serialize || JSON.stringify;
    this.deserialize = options.deserialize || JSON.parse;
  }

  init() {
    const exists = localStorage.getItem(this.path);
    if (!exists) {
      localStorage.setItem(this.path, this.serialize({}));
      return {};
    } else {
      return this.read();
    }
  }

  read() {
    let data = localStorage.getItem(this.path);

    try {
      let json = this.deserialize(data);
      return json;
    } catch(error) {
      error.message = "Failed to load StormDB database file - invalid or corrupted format.";
      throw error;
    }
  }

  write(data) {
    localStorage.setItem(this.path, this.serialize(data));
  }
};
