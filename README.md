# [auto-bind-proxy][npm]

[![License][license-image]][license]
[![Build status][travis-image]][travis]

> Get a proxy that automatically binds methods to their instance

Inspired by Sindre Sorhus's [`auto-bind`][auto-bind] package, but instead of altering the target object, it returns an [ES6 proxy][es6-proxy] that will automatically bind any accessed functions to the instance.

This package assumes the existence of some ES6 features such as Proxy, it works with Node 6+.

## Installation

```
npm install auto-bind-proxy
```

```js
var autoBind = require('auto-bind-proxy');
```

## Example

```js
const ab = require('auto-bind-proxy');

class Unicorn {
    constructor(name) { this.name = name; }
    message() { return `${this.name} is awesome!`; }
}

const unicorn = new Unicorn('Rainbow');

// Grab the method off the instance
// same as `message = unicorn.message.bind(unicorn)`
const message = ab(unicorn).message;

// Still bound to the instance
message();
// -> 'Rainbow is awesome!'

// Properties that are not functions are returned normally
ab(unicorn).name === unicorn.name;
// -> true

const foo = {
    bar() { ... }
    baz() { ... }
    qux() { ... }
    ...
};

// Multiple methods can be retrieved
const { bar, baz, qux } = ab(foo);

```

## API

##### `autoBind(obj)`

```js
var autoBind = require('auto-bind-proxy');
```

  * `obj`: a non-null object;

  * returns a [proxy][es6-proxy] that automatically binds retrieved methods to `obj` on access.



## License

  MIT

[license-image]:https://img.shields.io/badge/license-MIT-blue.svg
[license]: LICENSE
[travis-image]: https://travis-ci.org/JD342/auto-bind-proxy.svg?branch=master
[travis]: https://travis-ci.org/JD342/auto-bind-proxy
[npm]: https://www.npmjs.com/package/auto-bind-proxy
[auto-bind]: https://www.npmjs.com/package/auto-bind
[es6-proxy]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy
