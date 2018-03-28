/* eslint-disable no-console */

const fluent = (name, fn) => {
  const rtn = {};
  rtn[name] = fn;

  return rtn;
};

class ApiAdapter {
  constructor(api) {
    this.api = api;
  }

  // eslint-disable-next-line class-methods-use-this
  route(path) {
    // apiAdapter.route(mockHttpPath).isHandledBy(routeFn);
    // routeFn = (api, httpPath) => api.post(httpPath(`/messages`), messenger);
    // app.post('path', fn);
    const routeFn = adapterFn => adapterFn(this.api, path);

    const pipe = fluent('isHandledBy', routeFn);

    return pipe;
  }
}

export { ApiAdapter as default, ApiAdapter };
