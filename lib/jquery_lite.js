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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

class DOMNodeCollection {

  constructor(arr) {
    this.elements = arr;
    this.elements.forEach ( (el) => el.callbacks = {});
  }

  html(string) {
    if (string) {
      for (let i = 0; i < this.elements.length; i++) {
        let el = this.elements[i];
        el.innerHTML = string;
      }
    } else {
      return this.elements[0].innerHTML;
    }
  }

  empty() {
    for (let i = 0; i <this.elements.length; i++) {
      let el = this.elements[i];
      el.innerHTML = "";
    }
  }

  append(args) {

    if(args instanceof HTMLElement){
      args = window.$l(args);
    }

    if (args instanceof DOMNodeCollection) {
      for (let i = 0; i < this.elements.length; i++) {
        let el = this.elements[i];
        for (let j = 0; j < args.elements.length; j++) {
          el.innerHTML += args.elements[j].outerHTML;
        }
      }
    } else {
      for (let i = 0; i < this.elements.length; i++) {
        let el = this.elements[i];
          el.innerHTML += args;
      }
    }
  }

  attr(name, value) {
    if(value) {
      for ( let i = 0; i < this.elements.length; i++ ) {
        this.elements[i].setAttribute(name, value);
      }
    } else {
      return this.elements[0].getAttribute(name);
    }
  }


  addClass(value) {
    for (let i = 0; i < this.elements.length; i++) {
      let el = this.elements[i];
      el.className ? el.className += ` ${value}` : el.className = value;
    }
  }

  removeClass(arg = null) {
      for (let i = 0; i < this.elements.length; i++) {
        let el = this.elements[i];
        if(arg === null) {
          el.className = "";
        } else {
          el.classList.remove(arg);
        }
      }
    }


  children() {
    let children = [];
    for( let i = 0; i < this.elements.length; i++ ){
      let subArray = Array.from(this.elements[i].children);
      children = children.concat(subArray);
    }
      return new DOMNodeCollection(children);
  }

  parent() {
    let parents = [];
    for( let i = 0; i < this.elements.length; i++ ){
      if (!parents.includes(this.elements[i].parentElement)) {
      parents.push(this.elements[i].parentElement);
    }
  }
      return new DOMNodeCollection(parents);
  }

  find(selec) {
    let descendants = [];
    for (let i = 0; i < this.elements.length; i++) {
      let el = this.elements[i];
      let subArray = Array.from(el.querySelectorAll(selec));
      descendants = descendants.concat(subArray);
    }
    return new DOMNodeCollection(descendants);
  }

  remove() {
    this.elements.forEach ( (el) => {
      el.remove();
    });
    this.elements = [];
  }

  on(type, callback) {
    for (var i = 0; i < this.elements.length; i++) {
      let el = this.elements[i];
      el.addEventListener(type, callback);
      if ( !el.callbacks[type] ) {
        el.callbacks[type] = [callback];
      } else {
        el.callbacks[type].push(callback);
      }
    }
  }

  off(type) {
    for (let i = 0; i < this.elements.length; i++) {
      let el = this.elements[i];
      for(let j = 0; j < el.callbacks[type].length; j++) {
        el.removeEventListener(type, el.callbacks[type][j]);
      }

      // el.callbacks[type].forEach ( function (f) {
      //   debugger;
      //   el.removeEventListener(type, f);
      // });
      // el.callbacks[type] = [func1, func2]
      // func1.removeEventListener
      // this.elements[i] = <li>

    }


  }
}


module.exports = DOMNodeCollection;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(0);

const queue = [];

Window.prototype.$l =  (arg) => {

  if(arg instanceof HTMLElement){
    return new DOMNodeCollection([arg]);
  } else if(arg instanceof Function) {

    if(document.readyState === 'complete'){
      arg();
    } else {
      queue.push(arg);
    }
  } else {

    let NodeList = document.querySelectorAll(arg);
    NodeList = Array.from(NodeList);
    return new DOMNodeCollection(NodeList);
  }
};

$l.extend = (...args) => {

};

$l.ajax = (options) => {
  defaults = {
    method: 'GET',
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    data: {},
    url: document.URL,
    success: (data) => {},
    error: () => {}
  };

  options = Object.assign({}, defaults, options);

  const xhr = new XMLHttpRequest();
  xhr.open(options.method, options.url);

  xhr.onload = function () {
    console.log(xhr.status);
    console.log(xhr.responseType);
    console.log(xhr.response);
  };

  xhr.send(options.data);

};

$(() => {

});


function trigger (array) {
  for (let i = 0; i < array.length; i++) {
    let func = array[i];
    func();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  trigger(queue);
});


/***/ })
/******/ ]);