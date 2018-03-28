import { expect } from '../src/testing/index';
import { ApiAdapter, apiAdapterContainer } from '../src/api';
import { mockExpress } from './mocks/mock-express';

const noOp = Function.prototype;

describe('A route adapter', () => {
  before(() => {
    apiAdapterContainer.reRegister('express', mockExpress);
  });

  after(() => {
    apiAdapterContainer.reset();
  });

  context(' add()', () => {
    it('should add routes to an api', () => {
      const handler = (event, context, callback) => noOp(event, context, callback);
      const handler2 = (event, context, callback) => noOp(noOp(event, context, callback));

      const mockHttpPath = path => `/api${path}`;
      const route = (api, httpPath) => api.post(httpPath(`/messages`), handler);
      const route2 = (api, httpPath) => api.get(httpPath(`/messages/123`), handler2);

      // eslint-disable-next-line new-cap
      const mockExpressApp = new (apiAdapterContainer.get('express'))();
      const apiAdapter = new ApiAdapter(mockExpressApp);

      // todo - adpat the lambda interface ...
      // apiAdapter.route(mockHttpPath).isHandledBy(ADAPT_FORM_LAMBDA(route));
      apiAdapter.route(mockHttpPath).isHandledBy(route);
      apiAdapter.route(mockHttpPath).isHandledBy(route2);

      expect(mockExpressApp.routes).to.deep.equal({
        'POST::/api/messages': handler,
        'GET::/api/messages/123': handler2
      });
    });
  });
});
