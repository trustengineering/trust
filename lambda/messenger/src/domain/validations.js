/*

 */

const moduleExports = {};

moduleExports.isDefined = value => !!value;
moduleExports.typeOf = value => primitive => typeof value === primitive; // eslint-disable-line
moduleExports.isAString = value => moduleExports.typeOf(value)('string');
moduleExports.isAFunction = value => moduleExports.typeOf(value)('function');

module.exports = moduleExports;
