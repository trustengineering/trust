import { expect } from '../src/testing/index';
import { apiAdapterContainer } from '../src/api/api-adapter-container';
import { ApiAdapter } from '../src/api/api-adapter';
import { mockExpress } from './mocks/mock-express';

const noOp = Function.prototype;

describe('A route adapter', () => {
  before(() => {
    apiAdapterContainer.reRegister('express', mockExpress);
  });

  after(() => {
    apiAdapterContainer.reset();
  });

  context('A api adapter', () => {
    it('has dependencies', () => {
      expect(apiAdapterContainer.get('express')).to.equal(mockExpress);
    });
  });

  context(' add()', () => {

    it.skip('should have access to the expected api ', () => {
      const apiAdapter = new ApiAdapter();

      expect(apiAdapter.api).to.equal(mockExpress);
    });

    it('should add routes to an api', () => {
      const mockLambda = (event, context, callback) => noOp(event, context, callback);
      const mockLambda2 = (event, context, callback) => noOp(noOp(event, context, callback));
      const mockHttpPath = path => `/api${path}`;

      const stubRequest = {
        verb: 'post',
        pathPattern: mockHttpPath(`/messages`)
      };

      const stubRequest2 = {
        verb: 'get',
        pathPattern: mockHttpPath(`/messages/123`)
      };
      //
      const mockRouteAdapter = (api, request) => api[request.verb](request.pathPattern, mockLambda);
      const mockRouteAdapter2 = (api, request) => api[request.verb](request.pathPattern, mockLambda);

      // eslint-disable-next-line new-cap
      const apiAdapter = new ApiAdapter();

      // todo - adapt the lambda interface ...
      // apiAdapter.mockRouteAdapter(mockHttpPathFn).isHandledBy(ADAPT_FORM_LAMBDA(mockRouteAdapter));
      apiAdapter.route(stubRequest).isHandledBy(mockRouteAdapter);
      apiAdapter.route(stubRequest2).isHandledBy(mockRouteAdapter2);

      apiAdapterContainer.debug();

      const mockApi = apiAdapter.api;

     console.log(JSON.stringify(mockApi.routes));

      expect(mockApi.routes).to.deep.equal({
        'POST::/api/messages': mockLambda,
        'GET::/api/messages/123': mockLambda2
      });
    });
  });
});
