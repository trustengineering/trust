(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Core"] = factory();
	else
		root["Core"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./@trust-core/src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./@trust-core/src/index.js":
/*!**********************************!*\
  !*** ./@trust-core/src/index.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.container = exports.Validations = exports.default = undefined;\n\nvar _validations = __webpack_require__(/*! ./validations */ \"./@trust-core/src/validations.js\");\n\nvar _validations2 = _interopRequireDefault(_validations);\n\nvar _container = __webpack_require__(/*! ./ioc/container */ \"./@trust-core/src/ioc/container.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar Core = {\n  Validations: _validations2.default,\n  container: _container.container\n};\n\nexports.default = Core;\nexports.Validations = _validations2.default;\nexports.container = _container.container;\n\n//# sourceURL=webpack://Core/./@trust-core/src/index.js?");

/***/ }),

/***/ "./@trust-core/src/ioc/container.js":
/*!******************************************!*\
  !*** ./@trust-core/src/ioc/container.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar containerInstance = void 0;\n\nvar context = function context(ctx) {\n  return {\n    registerType: function registerType(name, Newable) {\n      ctx.types[name] = Symbol(name); // eslint-disable-line\n      ctx.store.set(ctx.types[name], Newable);\n\n      return ctx;\n    }\n  };\n};\n\nvar Container = function () {\n  _createClass(Container, null, [{\n    key: 'instance',\n    value: function instance() {\n      if (!(containerInstance instanceof Container)) {\n        containerInstance = new Container();\n      }\n\n      return containerInstance;\n    }\n  }]);\n\n  function Container() {\n    _classCallCheck(this, Container);\n\n    this.types = [];\n    this.store = new Map();\n  }\n\n  _createClass(Container, [{\n    key: 'register',\n    value: function register(name, Newable) {\n      if (typeof Newable !== 'function') {\n        throw new Error(Container.errors.notAConstructor);\n      }\n\n      if (this.types[name] !== undefined) {\n        throw new Error(Container.errors.typeAlreadyRegistered);\n      }\n\n      return context(this).registerType(name, Newable);\n    }\n  }, {\n    key: 'reRegister',\n    value: function reRegister(name, Newable) {\n      if (typeof Newable !== 'function') {\n        throw new Error(Container.errors.notAConstructor);\n      }\n\n      if (this.types[name] === undefined) {\n        throw new Error(Container.errors.typeAlreadyRegistered);\n      }\n\n      return context(this).registerType(name, Newable);\n    }\n  }, {\n    key: 'get',\n    value: function get(name) {\n      return this.store.get(this.types[name]);\n    }\n  }, {\n    key: 'init',\n    value: function init(typeMap) {\n      var _this = this;\n\n      Object.keys(typeMap).forEach(function (type) {\n        _this.register(type, typeMap[type]);\n      });\n\n      return this;\n    }\n  }]);\n\n  return Container;\n}();\n\nContainer.errors = {\n  notAConstructor: 'Newable must be a constructor',\n  typeAlreadyRegistered: 'Type already registered'\n};\n\nvar container = Container.instance();\n\nexports.default = container;\nexports.container = container;\n\n//# sourceURL=webpack://Core/./@trust-core/src/ioc/container.js?");

/***/ }),

/***/ "./@trust-core/src/validations.js":
/*!****************************************!*\
  !*** ./@trust-core/src/validations.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _typeof = typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; };\n\n/* */\n\nvar Validations = {};\n\nValidations.isDefined = function (value) {\n  return !!value;\n};\nValidations.typeOf = function (value) {\n  return function (primitive) {\n    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === primitive;\n  };\n}; // eslint-disable-line\nValidations.isAString = function (value) {\n  return Validations.typeOf(value)('string');\n};\nValidations.isAFunction = function (value) {\n  return Validations.typeOf(value)('function');\n};\n\nexports.default = Validations;\n\n//# sourceURL=webpack://Core/./@trust-core/src/validations.js?");

/***/ })

/******/ });
});