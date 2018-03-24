let containerInstance;

const context = ctx => ({
  registerType: (name, Newable) => {
    ctx.types[name] = Symbol(name); // eslint-disable-line
    ctx.store.set(ctx.types[name], Newable);

    return ctx;
  }
});

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

    return context(this).registerType(name, Newable);
  }

  reRegister(name, Newable) {
    if (typeof Newable !== 'function') {
      throw new Error(Container.errors.notAConstructor);
    }

    if (this.types[name] === undefined) {
      throw new Error(Container.errors.typeAlreadyRegistered);
    }

    return context(this).registerType(name, Newable);
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
