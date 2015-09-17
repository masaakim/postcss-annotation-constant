# postcss-annotation-constant [![Build Status](https://travis-ci.org/morishitter/postcss-annotation-constant.svg)](https://travis-ci.org/morishitter/postcss-annotation-constant)

PostCSS plugin for the annotation based binding rule set

## Installation

```shell
$ npm install postcss-annotation-constant
```

## Example

```js
// dependencies
var fs = require("fs")
var postcss = require("postcss")
var constant = require("postcss-annotation-constant")

// css to be processed
var css = fs.readFileSync("input.css", "utf8")

// process css
var output = postcss()
  .use(constant(css))
  .process(css)
  .css
```

Using this `input.css`:

```css
.class {
  /*
   * @constant
   */
  padding: 20px;
}

.class {
  padding: 0;
}
```

Run error: Cannot cascade `.class`

## License

The MIT License (MIT)

Copyright (c) 2014 Masaaki Morishita
