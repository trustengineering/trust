let containerInstance;

const register = (name, Newable, context) => {
  context.types[name] = Symbol(name); // eslint-disable-line
  context.store.set(context.types[name], Newable);

  return context;
};

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
      throw new Error(Container.errors.notAConstructor);
    }

    if (this.types[name] !== undefined) {
      throw new Error(Container.errors.typeAlreadyRegistered);
    }

    return register(name, Newable, this);
  }

  reRegister(name, Newable) {
    if (typeof Newable !== 'function') {
      throw new Error(Container.errors.notAConstructor);
    }

    if (this.types[name] === undefined) {
      throw new Error(Container.errors.typeAlreadyRegistered);
    }

    return register(name, Newable, this);
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

Container.errors = {
  notAConstructor: 'Newable must be a constructor',
  typeAlreadyRegistered: 'Type already registered'
};

const container = Container.instance();

export { container as default, container };
