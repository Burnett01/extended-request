/*
* The MIT License (MIT)
*
* Product:      Extended-Request
* Description:  An enhanced request module for node.js for REST-/API servers.
*
* Copyright (c) Steven Agyekum <agyekum@posteo.de>
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

const timeout = 7000
let api = undefined
let host = 'jsonplaceholder.typicode.com'
let port = 443

describe('Extended Request [TEST]', () => {

  it('creates an api instance', done => {

    api = new ExtendedRequest( {
      host,
      port
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

  }).timeout(timeout)

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

  }).timeout(timeout)

  it('changes host of api instance', done => {

    host = 'httpstat.us'
    api = new ExtendedRequest( {
      host,
      port
    })
    
    expect(api.host).to.equal(host)
    done()

  })

  it('performs a GET request and expects 302 response', done => {

    api.request('/302', (err, response) => {
      expect(err).to.be.a('object')
      expect(err).to.have.property('code')
      expect(err.code).to.equal(302)
      expect(response).to.be.null
      done()
    })

  }).timeout(timeout)

  it('performs a GET request and expects 403 response', done => {

    api.request('/403', (err, response) => {
      expect(err).to.be.a('object')
      expect(err).to.have.property('code')
      expect(err.code).to.equal(403)
      expect(response).to.be.null
      done()
    })

  }).timeout(timeout)

  it('performs a GET request and expects 503 response', done => {

    api.request('/503', (err, response) => {
      expect(err).to.be.a('object')
      expect(err).to.have.property('code')
      expect(err.code).to.equal(503)
      expect(response).to.be.null
      done()
    })

  }).timeout(timeout)

  it('changes host of api instance', done => {

    host = 'invalidhost'
    api = new ExtendedRequest( {
      host,
      port
    })
    
    expect(api.host).to.equal(host)
    done()

  })

  it('performs a GET request and expects networking error', done => {

    api.request('/invalid', (err, response) => {
      expect(err).to.be.a('object')
      expect(err).to.have.property('code')
      expect(err.code).to.equal('ENOTFOUND')
      expect(response).to.be.null
      done()
    })

  }).timeout(timeout)

})
