/* */

const Validations = {};

Validations.isDefined = value => !!value;
Validations.typeOf = value => primitive => typeof value === primitive; // eslint-disable-line
Validations.isAString = value => Validations.typeOf(value)('string');
Validations.isAFunction = value => Validations.typeOf(value)('function');

export default Validations ;
