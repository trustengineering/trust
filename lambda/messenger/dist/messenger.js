/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./messenger/handler.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./messenger/handler.js":
/*!******************************!*\
  !*** ./messenger/handler.js ***!
  \******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_lambda__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/lambda */ \"./messenger/src/lambda.js\");\n\n\n\n//# sourceURL=webpack:///./messenger/handler.js?");

/***/ }),

/***/ "./messenger/src/domain/index.js":
/*!***************************************!*\
  !*** ./messenger/src/domain/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/*\n\n */\nconst moduleExports = {};\n\nmoduleExports.Message = __webpack_require__(/*! ./message */ \"./messenger/src/domain/message.js\");\nmoduleExports.Messenger = __webpack_require__(/*! ./messenger */ \"./messenger/src/domain/messenger.js\");\n\nmodule.exports = moduleExports;\n\n\n//# sourceURL=webpack:///./messenger/src/domain/index.js?");

/***/ }),

/***/ "./messenger/src/domain/message.js":
/*!*****************************************!*\
  !*** ./messenger/src/domain/message.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n *\n */\n\nconst validations = __webpack_require__(/*! ./validations */ \"./messenger/src/domain/validations.js\");\n\nclass Message{\n  constructor(rawMessage){\n    this.rawMessage = rawMessage;\n  }\n\n  validate(){\n    const isValid = rawMessage =>\n      validations.isDefined(rawMessage) &&\n      validations.isDefined(rawMessage.sender) &&\n      validations.isAString(rawMessage.subject) &&\n      validations.isAString(rawMessage.body) &&\n      validations.isAString(rawMessage.sender.email) &&\n      validations.isAString(rawMessage.sender.name);\n\n    if (!isValid(this.rawMessage)) {\n      throw new Error(Message.Errors.invalidMessage);\n    }\n\n    return true;\n  }\n}\n\nMessage.Errors = {\n  invalidMessage: 'Invalid message'\n};\n\nmodule.exports = Message;\n\n\n//# sourceURL=webpack:///./messenger/src/domain/message.js?");

/***/ }),

/***/ "./messenger/src/domain/messenger.js":
/*!*******************************************!*\
  !*** ./messenger/src/domain/messenger.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * A Messenger receives messages. Tries to validate them and sends them on via a specified channel\n *\n */\n\nconst validations = __webpack_require__(/*! ./validations */ \"./messenger/src/domain/validations.js\");\n\nclass Messenger{\n\n  static send(message, channel){\n    const m = new Messenger(channel);\n\n    m.receive(message);\n    m.send();\n  }\n\n  constructor(channel){\n    if (!validations.isDefined(channel) || !validations.isAFunction(channel.send)) {\n      throw new Error(Messenger.Errors.InvalidChannel);\n    }\n\n    this.messagingAdapter = channel;\n    this.readyToSend = false;\n    this.message = null;\n\n    Object.seal(this);\n  }\n\n  receive(message){\n    if (!validations.isDefined(message) || !validations.isAFunction(message.validate)){\n      throw new Error(Messenger.Errors.InvalidMessage);\n    }\n\n    this.message = message;\n    this.readyToSend = message.validate();\n    Object.freeze(this);\n\n    return this.readyToSend;\n  }\n\n  send(){\n    return this.readyToSend && this.messagingAdapter.send(this.message);\n  }\n}\n\n\nMessenger.Errors = {\n  InvalidChannel: 'Invalid channel',\n  InvalidMessage: 'Invalid message',\n};\n\n\nmodule.exports = Messenger;\n\n\n//# sourceURL=webpack:///./messenger/src/domain/messenger.js?");

/***/ }),

/***/ "./messenger/src/domain/validations.js":
/*!*********************************************!*\
  !*** ./messenger/src/domain/validations.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\n\n */\n\nconst moduleExports = {};\n\nmoduleExports.isDefined = value => !!value;\nmoduleExports.typeOf = value => primitive => typeof value === primitive; // eslint-disable-line\nmoduleExports.isAString = value => moduleExports.typeOf(value)('string');\nmoduleExports.isAFunction = value => moduleExports.typeOf(value)('function');\n\nmodule.exports = moduleExports;\n\n\n//# sourceURL=webpack:///./messenger/src/domain/validations.js?");

/***/ }),

/***/ "./messenger/src/lambda.js":
/*!*********************************!*\
  !*** ./messenger/src/lambda.js ***!
  \*********************************/
/*! exports provided: messenger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"messenger\", function() { return messenger; });\n/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domain */ \"./messenger/src/domain/index.js\");\n/* harmony import */ var _domain__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_domain__WEBPACK_IMPORTED_MODULE_0__);\n/*\n\n */\n\n\n\nconst messenger = (event, context, callback) => {\n\n  _domain__WEBPACK_IMPORTED_MODULE_0__[\"Messenger\"].send(event.body, LogChannel(() => {\n        console.log(`msg = `, msg);\n        callback(null, msg);\n  }));\n\n  // const response = {\n  //   statusCode: 200,\n  //   body: JSON.stringify({\n  //     message: 'Go Serverless v1.0! Your function executed successfully!',\n  //     input: event\n  //   })\n  // };\n  //\n  // callback(null, response);\n\n  // Use this code if you don't use the http event with the LAMBDA-PROXY integration\n  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });\n};\n\n\n\n\n//# sourceURL=webpack:///./messenger/src/lambda.js?");

/***/ })

/******/ });