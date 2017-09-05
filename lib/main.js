const DOMNodeCollection = require("./dom_node_collection.js");

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
