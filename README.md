
# extended-request

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![Build Status](https://travis-ci.com/Burnett01/extended-request.svg?branch=master)](https://travis-ci.com/Burnett01/extended-request) [![npm version](https://badge.fury.io/js/%40burnett01%2Fextended-request.svg)](https://badge.fury.io/js/%40burnett01%2Fextended-request)

An enhanced request module for node.js for REST-/API servers.

Features:
  * Supports various auth providers (Basic, Bearer, Token, PostToken, Custom ..)
  * Supports HTTP and HTTP/S (TLS) protocols
  * Auto response content-type negotiation (JSON, HTML, Plain, ...)
  * GZIP compression
  * ES6 & ES5 support
  * Promises & classic nodeback
  * Debugging

---

# Table of contents
* [API Reference](#api-reference)
* [Property Reference](#property-reference)
* [Function Reference](#function-reference)
  * [Creating a request container](#creating-a-request-container)
  * [Performing a request](#performing-a-request)
* [Setup / Install](#setup-install)
* [Build](#build)
  * [NPM](#npm)
  * [Make](#make)
* [Unit-Tests](#unit-tests)
  * [NPM](#npm-1)
  * [Make](#make-1)
* [Contributing](#contributing)
* [License](#license)

---

## API Reference

```javascript
ExtendedRequest(
    [Object {
        host: String='',
        port: Number='',
        endpoint: String='',
        auth: Object { 
            provider: String='basic|bearer|token|postToken|custom',
            username: String='',
            password: String='',
            token: String='',
            custom: String=''
        }
    } details]
) -> Object {
    /* Constants */
    this:  Object=this,

    /* Methods */
    request:  [String=path, Object {
        method: String='GET|POST|HEAD|...',
        type: String='text/plain|application/json|...',
        bodyType: String='application/x-www-form-urlencoded|application/json|...',
        body: String='',
    } options, function(class ErrorClass err, null ok) cb] | Promise
}

/* Statics */

ExtendedRequest.DEBUG = true/false
```

---

## Property reference:

| Property | Description |
| ------ | ----------- |
| details | An object with some connection details |
| options | An object containing request options |
| host | FQDN used for requests (eg. myapi.com) |
| port | ``Default`` = 80
|  | 443 enables https |
| path | URI path (eg. /get/users)
| endpoint | ``host`` endpoint/prefix for a ``path`` (eg. /api/v1)
| type | The HTTP Content-Type for the request. Check lib/util.js for valid types Default is BT.JSON
| body | POST payload
| bodyType | The type of the body payload. Check lib/util.js for valid types. Default is BT.FORM
| auth | Authentication details 
|  |``.provider`` = Either 'basic, bearer, token, postToken, custom' |
|  |``.username`` = Set HTTP basic auth username when provider is 'basic' |
|  |``.password`` = Set HTTP basic auth password when provider is 'basic' |
|  |``.token`` = <br />Set HTTP auth token (header) when provider is 'token' or 'bearer'. <br />Set POST token when provider is 'postToken' and ``request.method`` is 'POST'  |
|  |``.custom`` = <br />Set HTTP auth header when provider is 'custom' |

---

## Function reference:

### Creating a request container

**Available options:**

| |  | Required | 
| ------ | ----------- | ------ |
| host | FQDN (eg. myapi.com) | Yes |
| port | Port | No |
| endpoint | Path prefix | No |
| auth | Authentication details | No |

```javascript
const api = new ExtendedRequest({
  host: 'jsonplaceholder.typicode.com',
  port: 443
})
```

---

### Performing a request

**Available options:**

| |  | Required | 
| ------ | ----------- | ------ |
| method | HTTP method (Default: GET) | No |
| type | Content-Type (Default: 'application/json') | No |
| body | Body for a post request | If method is 'POST' |
| bodyType | Set specific type <br />(Default: 'application/x-www-form-urlencoded')| No|
| headers | Set optional headers object | No|

```javascript
api.request('/posts/1', (err, response) => {
  console.log(err, response)
})

api.request('/store/post', {
  method: 'POST',
  body: 'My new Post!'
}, (err, response) => {
  console.log(err, response)
})

/* Promises */

api.request('/posts/1')
.then((response) => {
  console.log(response)
})
.catch((err) => {
  console.log(err)
})

api.request('/store/post', {
  method: 'POST',
  body: 'My new Post!'
})
.then((response) => {
  console.log(response)
})
.catch((err) => {
  console.log(err)
})
```

---

## Setup / Install

Use `npm install @burnett01/extended-request` 

```javascript
// ES6
import ExtendedRequest from '@burnett01/extended-request'

// ES5
var ExtendedRequest = require('@burnett01/extended-request')
```

---

## Build

### NPM

```npm run build```

### Make

```make build```

---

## Unit-Tests

The testing-framework used by this module is [Mocha](https://github.com/mochajs/mocha) with the BDD / TDD assertion library [Chai](https://github.com/chaijs/chai).

* test/test.default.js `Performs 9 tests` | [Source](../master/test/test.default.js)

Default reporter: `list`

### Make

```make test```

### NPM

```npm test```

---

## Contributing

You're very welcome and free to contribute. Thank you.

---

## License

[MIT](LICENSE)
