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
      args = window.$d(args);
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
    }
  }
}


module.exports = DOMNodeCollection;
