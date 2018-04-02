const addRoute = (verb, path, handler, context) => {
  console.log(`ROUTE ADDED: `)
  // eslint-disable-next-line no-param-reassign
  context.routes[`${verb}::${path}`] = handler;
  return context;
};

class MockExpressApp {
  constructor() {
    console.log('creating MockExpressApp')
    this.routes = {};
  }

  get(path, handler) {
    return addRoute(`GET`, path, handler, this);
  }

  delete(path, handler) {
    return addRoute(`DELETE`, path, handler, this);
  }

  options(path, handler) {
    return addRoute(`options`, path, handler, this);
  }

  put(path, handler) {
    return addRoute(`PUT`, path, handler, this);
  }

  patch(path, handler) {
    return addRoute(`POST`, path, handler, this);
  }

  post(path, handler) {
    return addRoute(`POST`, path, handler, this);
  }
}

// eslint-disable-next-line arrow-body-style
const mockExpress = () => {
  return new MockExpressApp();
};

export { mockExpress as default, mockExpress, MockExpressApp };
