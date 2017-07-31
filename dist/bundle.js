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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions__ = __webpack_require__(1);


document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
  // have fun!
  // have fun!
})

=======
  const textSubmitButton = document.querySelector(".text-submission button")
  const text = document.querySelector(".text-submission textarea")

  textSubmitButton.addEventListener("click", handleTextSubmit(text))
  text.addEventListener("keyup", Object(__WEBPACK_IMPORTED_MODULE_0__functions__["a" /* checkEnter */])(handleTextSubmit, text, 10))
})

function textEnter (text) {
  return event => {
    if (event.keyCode === 13) {
      handleTextSubmit(text)(event)
      return false
    }
  }
}

function handleTextSubmit (text) {
  return event => {
    const wordCount = Object(__WEBPACK_IMPORTED_MODULE_0__functions__["b" /* wordCountFor */])(text.value)
    text.value = ""
    const words = Object.keys(wordCount)
    const presenter = document.querySelector(".word-count")
    words.forEach(word => {
      const para = document.createElement("p")
      para.innerHTML = `${word}<span>${wordCount[word]} times</span>`
      para.style.fontSize = `${wordCount[word]}em`
      para.tabIndex = 0
      presenter.append(para)
    })
  }
}

>>>>>>> 3a04634... Fix bugs


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = checkEnter;
/* harmony export (immutable) */ __webpack_exports__["b"] = wordCountFor;
function checkEnter (handleTextSubmit, text) {
  return event => {
    if (event.keyCode === 13) {
      handleTextSubmit(text)(event)
      return false
    }
  }
}

function wordCountFor (text) {
  const markers = /[^a-z']/i
  return text.split(markers).filter(x => x)
    .reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1
      return acc
    }, {})
}


/***/ })
/******/ ]);