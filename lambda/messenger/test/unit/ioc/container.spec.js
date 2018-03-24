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
  before(() => {
    container.register('Value', Value);
    container.register('Value2', Value2);
  });

  it('should register Newables', () => {
    expect(container.register('NewOne', Value)).not.to.throw; // eslint-disable-line
  });

  it('should throw when registering things other than functions', () => {
    expect(() => container.register('throw1', 1)).to.throw; // eslint-disable-line
    expect(() => container.register('throw2', {})).to.throw; // eslint-disable-line
    expect(() => container.register('throw3', 'abc')).to.throw; // eslint-disable-line
    expect(() => container.register('throw4', function(){})).not.to.throw; // eslint-disable-line
  });

  it('should be able to retrieve Newables', () => {
    expect(container.get('Value')).to.be.equal(Value); //
  });

  it('should register multiple Newables', () => {
    const typeMap = {
      NewValue: Value,
      NewValue2: Value
    };

    container.init(typeMap);

    expect(container.get('Value')).to.be.equal(Value); //
    expect(container.get('Value2')).to.be.equal(Value2); //
  });

  it('should throw when a registering a type more than once', () => {
    expect(() => container.register('Value', Value)).to.throw();
  });

  it(`should not throw when a reregistering a type that has been registered`, () => {
    expect(() => container.reRegister('Value', Value)).not.to.throw();
  });

  it(`should throw when a reregistering a type that hasn't been registered`, () => {
    expect(() => container.reRegister('NotBeenRegdValue', Value)).to.throw();
  });
});
