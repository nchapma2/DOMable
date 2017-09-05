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

### $d
