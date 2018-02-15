/*
* The MIT License (MIT)
*
* Product:      Extended-Request
* Description:  An enhanced request module for node.js that might be useful when interacting with API servers.
*
* Copyright (c) 2017-2018 Steven Agyekum <agyekum@posteo.de>
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

import { expect } from 'chai'
import ExtendedRequest from '../lib/index'

let api = undefined

describe('Extended Request [TEST]', () => {

  it('creates an api instance', done => {

    api = new ExtendedRequest( {
      host: 'jsonplaceholder.typicode.com',
      port: 443
    })

    expect(api).to.be.a('object')

    expect(api).to.have.property('host')
    expect(api).to.have.property('port')
    expect(api).to.have.property('endpoint')
    expect(api).to.have.property('auth')
    expect(api).to.have.property('request')

    expect(api.request).to.be.a('function')

    done()
  })

  it('performs a GET request w (nodeback)', done => {
    
    api.request('/posts/1', (err, response) => {
      expect(err).to.be.null
      expect(response).to.be.a('object')
      expect(response).to.have.property('userId')
      done()
    })

  })

  it('performs a GET request w (promises)', done => {
    
    api.request('/posts/1')
    .then((response) => {
      expect(response).to.be.a('object')
      expect(response).to.have.property('userId')
      done()
    })
    .catch((err) => {
      expect(err).to.be.null
      done()
    })

  })

})
