const DefaultEngine = require("./engine/local.js");

class StormDB {
  constructor(engine, options = {}) {
    this.engine = engine;

    this.state = this.engine.init();
    this.pointers = [];
  }

  default(defaultValue) {
    let stateEmpty =
      Object.keys(this.state).length === 0 && this.state.constructor === Object;

    if (stateEmpty) this.state = defaultValue;

    return this;
  }

  push(value) {
    let list = this.value();

    if (!Array.isArray(list)) throw new Error("You can only push to lists.");

    list.push(value);
    this.set(list);

    return this;
  }

  get(value) {
    let clone = Object.assign(Object.create(Object.getPrototypeOf(this)), this);

    clone.pointers = [...clone.pointers];
    clone.pointers.push(value);

    return clone;
  }

  set(key, value) {
    if (value === undefined) {
      this.setValue(key);
    } else {
      let extraPointers = key.split(".");
      this.setValue(value, extraPointers);
    }
    return this;
  }

  value() {
    let data = this.state;
    for (let i = 0; i < this.pointers.length; i++) {
      data = data[this.pointers[i]];
    }

    return data;
  }

  setValue(value, pointers = [], setrecursively = true) {
    let depth = 0;

    pointers = [...this.pointers, ...pointers];

    const func = (a, b) => {
      depth += 1;

      let finalLevel = depth === pointers.length;
      if (setrecursively && typeof a[b] === "undefined" && !finalLevel) {
        a[b] = {};
        return a[b];
      }

      if (finalLevel) {
        a[b] = value;
        return value;
      } else {
        return a[b];
      }
    };
    pointers.reduce(func, this.state);
  }

  save() {
    this.engine.write(this.state);
    return this;
  }
}

module.exports = function(path, options = {}) {
  const engine = options.engine || new DefaultEngine(path);

  return new StormDB(engine, options);
};
