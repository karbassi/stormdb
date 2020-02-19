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
    }
    else {
      return this.read();
    }
  }

  read() {
    let data = localStorage.getItem(this.path);
    return this.deserialize(data);
  }

  write(data) {
    localStorage.setItem(this.path, this.serialize(data));
  }
};
