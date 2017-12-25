/*
* The MIT License (MIT)
*
* Product:      Extended-Request
* Description:  An enhanced request module for node.js that might be useful when interacting with API servers.
*
* Permission is hereby granted, free of charge, to any person obtaining a copy of this software
* and associated documentation files (the "Software"), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, 
* and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in all copies
* or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
* TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
* THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
* TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*
*/

import http from 'http'
import https from 'https'
import zlib from 'zlib'
import qs from 'querystring'

import { T, CT, BT, ERR, nodebackOrPromise } from './util';

class ExtendedRequest {

  constructor(details) {
    if (!details || typeof details !== T.OBJECT)
      throw ERR.PARAM_NON_OBJECT

    this.host = details.host
    this.port = details.port || 80
    this.endpoint = details.endpoint || ''
    this.auth = details.auth || {}
  }

  request(path, options, cb) {

    return new Promise((done, fail) => {

      options = options || {}
      options.body = options.body || {}
      options.bodyType = options.bodyType || BT.FORM
      options.type = options.type || CT.JSON

      if(typeof options === T.FUNCT)
        cb = options

      let _options = {};

      _options.host = this.host
      _options.port = this.port
      _options.path = this.endpoint + path
      _options.method = options.method || 'GET'

      let headers = {}

      switch ((this.auth && this.auth.provider)) {
        case 'basic':

          headers['Authorization'] = 'Basic ' + new Buffer(
            this.auth.user + ':' + this.auth.password
          ).toString("base64")

          break

        case 'token':

          headers['Authorization'] = 'Token token=' + this.auth.token
          break

        case 'postToken':

          if (_options.method == 'POST')
            options.body.token = this.auth.token

          break;

        case 'bearer':

          headers['Authorization'] = 'Bearer ' + this.auth.token
          break;

      }

      headers['Accept-Encoding'] = 'gzip'

      if (_options.method == 'POST') {

        _options.body = options.body

        if (options.bodyType == BT.FORM) {
          options.type = CT.FORM
          _options.body = qs.stringify(_options.body)
        } else {
          options.type = CT.JSON
          _options.body = JSON.stringify(_options.body)
        }

        headers['Content-Length'] = Buffer.byteLength(_options.body)
      }

      headers['Content-Type'] = options.type

      _options.headers = headers;

      if (this.constructor.DEBUG)
        console.log('Request Debug:', _options)

      const proto = _options.port == 443 ? https : http;

      let req = proto.request(_options, (res) => {

        let output = ''

        if (res.headers['content-encoding'] == 'gzip') {
          let gzip = zlib.createGunzip()
          res.pipe(gzip)
          output = gzip
        } else {
          output = res
        }

        let body = ''

        output.on('data', (chunk) => {
          chunk = chunk.toString('utf-8')
          body += chunk
        })

        output.on('end', () => {
          const ctype = res.headers['content-type']

          if (ctype.search(/application\/json/) != -1)
            body = JSON.parse(body)

          nodebackOrPromise( cb, done, fail, null, body )
        })
      })

      req.on('error', (err) => {
        nodebackOrPromise( cb, done, fail, err, null )
      })

      if (_options.method == 'POST')
        req.write(_options.body)

      req.end()

    })

  }

}

ExtendedRequest.DEBUG = false

export default ExtendedRequest