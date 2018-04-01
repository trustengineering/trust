/* eslint-disable no-console */
import * as foo from './index';

const Api = foo.apiAdapterContainer.get('express');

const fluent = (name, fn) => {
  const rtn = {};
  rtn[name] = fn;

  return rtn;
};

class ApiAdapter {
  constructor() {
    this.api = new Api();
  }

  // eslint-disable-next-line class-methods-use-this
  route(path) {
    // apiAdapter.route(mockHttpPath).isHandledBy(routeFn);
    // routeFn = (api, httpPath) => api.post(httpPath(`/messages`), messenger);
    // app.post('path', fn);
    const routeFn = adapterFn => adapterFn(this.api, path);

    return fluent('isHandledBy', routeFn);
  }
}

export { ApiAdapter as default, ApiAdapter };
