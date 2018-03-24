import { expect } from '../../support/expect';
import { container } from '../../../src/ioc/container';

/* eslint-disable */
class Value {
  name() {
    return 'name';
  }
  value() {
    return 'value';
  }
}

class Value2 {
  name() {
    return 'name';
  }
  value() {
    return 'value';
  }
}
/* eslint-enable */

describe('A Container', () => {
  it('should register Newables', () => {
    expect(container.register('Value', Value)).not.to.throw; // eslint-disable-line
  });

  it('should throw when registering things other than functions', () => {
    expect(() => container.register('throw1', 1)).to.throw; // eslint-disable-line
    expect(() => container.register('throw2', {})).to.throw; // eslint-disable-line
    expect(() => container.register('throw3', 'abc')).to.throw; // eslint-disable-line
    expect(() => container.register('throw4', function(){})).not.to.throw; // eslint-disable-line
  });

  it('should be able to retrieve Newables', () => {
    container.register('Value', Value);
    container.register('Value2', Value2);

    expect(container.get('Value')).to.be.equal(Value); //
  });

  it('should register multiple Newables', () => {
    const typeMap = {
      Value,
      Value2
    };

    container.init(typeMap);

    expect(container.get('Value')).to.be.equal(Value); //
    expect(container.get('Value2')).to.be.equal(Value2); //
  });
});
