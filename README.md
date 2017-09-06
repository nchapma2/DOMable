# DOMable

DOMable is a JavaScript library that was created for ease of DOM interaction and manipulation. DOMable users can:
* Select DOM elements
* Traverse and transform DOM elements
* Create and append DOM elements
* Create and dispatch simplified HTTP requests

Users have already created great projects using DOMable. Here's one such example.

## Getting Started

You can start using DOMable immediately by downloading this library into your project and including the webpack output `DOMable.js` in your own code.


```html
<head>
  <meta charset="utf-8">
  <link rel="stylesheet" href="./css/reset.css">
  <script type="text/javascript" src="../dist/dom_dom_dom.js"></script>
  ...
</head>
```
You can also use the documents in `src` by running `webpack` in the command line.

## API

[`$d`](#d)  

[DOM Traversal](#dom-traversal)  
  * [`each`](#each)  
  * [`children`](#children)  
  * [`parent`](#parent)  
  * [`find`](#find)

[DOM Manipulation](#dom-manipulation)  
  * [`html`](#html)  
  * [`empty`](#empty)  
  * [`append`](#append)  
  * [`remove`](#remove)  
  * [`attr`](#attr)  
  * [`addClass`](#addclass)  
  * [`removeClass`](#removeclass)  
  * [`toggleClass`](#toggleclass)  

[Event Listeners](#event-listeners)  
  * [`on`](#on)  
  * [`off`](#off)  

[`$l.ajax`](#lajax)  

### `$d(HTMLElement)`

DOMable uses a global variable of `$d` as a wrapper for all of the methods in the library.

It can be used to select elements with CSS selectors. For example, `$d` returns a `DOMNodeCollection` object, a custom array-like that used to hold collections of HTML elements.

`$d` can also be used to create `DOMNodeCollection` objects from HTML elements, giving them access to methods in the library.

Users of DOMable can also use `$d` to take in stringified HTML code and create a `DOMNodeCollection` object of those HTML elements.

`$d` can be used as a tool to queue functions for invocation once the DOM Content is fully loaded.

``` JavaScript
// This function will only run once DOMContent is fully loaded
$d(() => {

  // This variable with wrap all div elements in a DOMNodeCollection
  const divList = $d('div');

  // You can manipulate these HTML Elements in a variety of ways,
  // including appending elements to them, so long as the appended
  // elements are also wrapped in a DOMNodeCollection
  divList.forEach( div => {

    // This creates a DOMNodeCollection of a single HTML span
    const span = $d('<span></span>');


    // Finally, because the original divs are just HTML elements inside the main
    // DOMNodeCollection, they must be wrapped as well
    const $wrappedDiv = $(div);
    $wrappedDiv.append(span);
  })

})
```

### DOM Manipulation

`DOMNodeCollection` methods that allow you to manipulate elements of the DOM

`innerHTML` is referenced frequently below. For reading on this element property, please see [here](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML).

#### `html`
* If given an argument, will set the `innerHTML` of each node
* Without an argument, it returns the `innerHTML` of the first node

#### `empty`
* Clears content from each node, setting the `innerHTML` to an empty string

#### `append`
* Appends `outerHTML` of the argument to the `innerHTML` of each node
* Argument can be strings, HTML elements, or a `DOMNodeCollection` object

#### `attr`
Can take either:
* A single argument, `attr(attribute)`, which reads the value of this attribute from the element
* Two arguments, `attr(attribute, value)`, which acts as a setter for each node

#### `addClass`
* Sets or adds another class to each node

#### `removeClass`
* Takes an optional argument, which if given removes the specified class
* Without an argument, it removes all classes from each node

### DOM Traversal

`DOMNodeCollection` methods that allow you to select specific DOM elements

####`children`
* Returns a `DOMNodeCollection` of the direct child elements of each node in the original `DOMNodeCollection`

#### `parent`
* Returns a `DOMNodeCollection` of each of the parents of the nodes in the original `DOMNodeCollection`

#### `find`
* Returns a `DOMNodeCollection` of all descendants matching the selector passed as an argument

#### `remove`
* Removes the HTML of all nodes from the DOM, including the nodes themselves

### Event Listeners

```Javascript

// Callback to be invoked upon event
function handleSubmit () {
  alert('Form submitted');
}

// Creating a DOMNodeCollection-wrapped button
const button = $d(<button></button>);

// Adding form submission event listener and handler to button
button.on('click', handleSubmit);

// Removing the listener
button.off('click');

```

#### `on`
* Adds an event listener to each node in the `DOMNodeCollection`
* An element is allowed to have multiple callbacks for the same event in DOMable (stored as `callbacks` property on the node)
* A list of events can be found [here](https://developer.mozilla.org/en-US/docs/Web/Events)

#### `off`
* Takes an argument of event type and removes that event from each node

### `$d.ajax`

This method sends an HTTP request and returns a `Promise` object. It can accept an options `hash` with any of the following attributes:
* method (default: 'GET'): HTTP request type
* url (default document.URL): HTTP path
* success: success callback
* error: error callback
* contentType (default: 'application/x-www-form-urlencoded; charset=UTF-8'): HTTP content type

```JavaScript

// HTTP request to get the 17th dog's name
$d.ajax({
  method: 'GET',
  url: 'api/dogs/17'
})
// chaining to the promise to log the dog's name
.then((dog) => {
  console.log(dog.name)
})

```
