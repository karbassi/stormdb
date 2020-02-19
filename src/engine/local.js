const Base = require("./base.js");
const fs = require("fs");

module.exports = class LocalEngine extends Base {
  constructor(path, options = {}) {
    super();

    this.path = path;

    this.serialize = options.serialize || JSON.stringify;
    this.deserialize = options.deserialize || JSON.parse;
  }

  init() {
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, this.serialize({}));
      return {};
    } else {
      return this.read();
    }
  }

  read() {
    let data = fs.readFileSync(this.path, "UTF-8");
    return this.deserialize(data);
  }

  write(data) {
    fs.writeFileSync(this.path, this.serialize(data));
  }
};
