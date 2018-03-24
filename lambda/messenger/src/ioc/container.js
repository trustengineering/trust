let containerInstance;

class Container {
  static instance() {
    if (!(containerInstance instanceof Container)) {
      containerInstance = new Container();
    }

    return containerInstance;
  }

  constructor() {
    this.types = [];
    this.store = new Map();
  }

  register(name, Newable) {
    if (typeof Newable !== 'function') {
      throw new Error('Newable must be a constructor');
    }
    this.types[name] = Symbol(name);
    this.store.set(this.types[name], Newable);
  }

  get(name) {
    return this.store.get(this.types[name]);
  }

  init(typeMap) {
    Object.keys(typeMap).forEach(type => {
      this.register(type, typeMap[type]);
    });

    return this;
  }
}

const container = Container.instance();

export { container as default, container };
