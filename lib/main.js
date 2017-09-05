const DOMNodeCollection = require("./dom_node_collection.js");

const queue = [];

Window.prototype.$l = function (arg) {
  if (arg instanceof Function) {
    queue.push(arg);
  }

  if( arg instanceof HTMLElement){
    return new DOMNodeCollection([arg]);
  }

  let NodeList = document.querySelectorAll(arg);
  NodeList = Array.from(NodeList);
  return new DOMNodeCollection(NodeList);

};


  window.$l(alert1);

$( () => {

  if (document.readyState === 'complete') {
    alert('the document is ready');
    trigger(queue);
  }
});


function trigger (array) {
  for (let i = 0; i < array.length; i++) {
    let func = array[i];
    func();
  }
}

function alert1() {
  alert("function3");
}
