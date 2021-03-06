import Validations from '../validations';

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
    this.reset();
  }

  register(name, Newable) {
    if (!Validations.isAFunction(Newable)) {
      throw new Error(Container.errors.notAConstructor);
    }

    if (Validations.isDefined(this.types[name])) {
      throw new Error(Container.errors.typeAlreadyRegistered);
    }

    return context(this).registerType(name, Newable);
  }

  reRegister(name, Newable) {
    if (!Validations.isAFunction(Newable)) {
      throw new Error(Container.errors.notAConstructor);
    }

    if (!Validations.isDefined(this.types[name])) {
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

  reset() {
    this.types = [];
    this.store = new Map();
  }

  debug() {
    console.log(`
    types: ${JSON.stringify(this.types)}
    `);
  }
}

Container.errors = {
  notAConstructor: `Newable must be a constructor`,
  typeAlreadyRegistered: `Type already registered`,
  typeNotRegistered: `Type not registered`
};

const container = Container.instance();

export { container as default, container };
