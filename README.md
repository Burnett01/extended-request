
# extended-request

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](../master/LICENSE.MD)

An enhanced request module for node.js that might be useful when interacting with API servers.

Features:
  * Supports various auth providers (Basic, Bearer, Token, ..)
  * Supports HTTP and HTTP/S (TLS) protocols
  * Auto response content-type negotiation (JSON, HTML, Plain, ...)
  * GZIP compression
  * ES6 & ES5 support
  * Promises & classic nodeback

---

# Table of contents
* [API Reference](#api-reference)
  * [Basket](#basket)
  * [Product](#product)
* [Property Reference](#property-reference)
* [Function Reference](#function-reference)
  * [Creating a request container](#creating-a-request-container)
  * [Performing a request](#performing-a-request)
* [Setup / Install](#setup-install)
* [Build](#build)
  * [NPM](#npm)
* [Unit-Tests](#unit-tests)
* [Contributing](#contributing)
* [License](#license)

---

## API Reference

### Basket:

```javascript
ExtendedRequest(
    [Object {
        host: String='',
        port: String='',
        endpoint: String='',
        auth: Object { 
            provider: String='basic|bearer|token',
            username: String='',
            password: String='',
            token: String=''
        }
    } details]
) -> Object {
    /* Constants */
    this:  Object=this,

    /* Methods */
    request:  [String=path, Object {
        method: String='GET|POST|HEAD|...',
        body: String='',
    } options, function(class ErrorClass err, null ok) cb] | Promise
}
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
| auth | Authentication details 
|  |``.provider`` = Either basic, bearer, token' |
|  |``.username`` = Set HTTP basic auth username when provider is 'basic' |
|  |``.token`` = Set HTTP token auth when provider is 'token' or 'bearer'  |

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
//=> ES6
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
| body | Body for a post request | If method is 'POST' |

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

/* Promise */

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

Use `npm install extended-request` 

```javascript
import ExtendedRequest from 'extended-request';
```

---

## Build

### NPM

```npm run build```

---

## Unit-Tests

Later.

---

## Contributing

You're very welcome and free to contribute. Thank you.

---

## License

[MIT](../master/LICENSE.MD)
