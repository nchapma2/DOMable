const DOMNodeCollection = require("./dom_node_collection.js");

const queue = [];

Window.prototype.$d =  (arg) => {

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

$d.extend = (obj, ...args) => {
  args.forEach((arg) => {
    for(let i in arg) {
      obj[i] = arg[i];
    }
  });
  return obj;
};

$d.ajax = (options) => {
  return new Promise(function(resolve, reject) {
    defaults = {
      method: 'GET',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {},
      url: document.URL,
      success: () => {},
      error: () => {}
    };

    options = $d.extend(defaults, options);
    if(options.method === 'GET'){
      options.url += "?" + addToQueryString(options.data);
    }

    const xhr = new XMLHttpRequest();

    xhr.open(options.method, options.url, true);
    xhr.onload = function() {
      if(xhr.status >= 200 && xhr.status < 300){
        options.success(JSON.parse(xhr.response));
        resolve(JSON.parse(xhr.response));
      } else {
        options.error(xhr.response);
        reject({
          status: xhr.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function() {
      reject({
        status: xhr.status,
        statusText: xhr.statusText
      });
    };
    xhr.send(JSON.stringify(options.data));
  });
};

addToQueryString = obj => {
  let results = "";
  for(let property in obj){
    if(obj.hasOwnProperty(`${property}`)){
      results += "=" + obj[property] + "&";
    }
  }
  return results.substring(0, results.length - 1);
};

function trigger (array) {
  for (let i = 0; i < array.length; i++) {
    let func = array[i];
    func();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  trigger(queue);
});
