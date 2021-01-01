/*
* The MIT License (MIT)
*
* Product:      Extended-Request
* Description:  An enhanced request module for node.js for REST-/API servers.
*
* Copyright (c) 2017-2021 Steven Agyekum <agyekum@posteo.de>
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

/**
 * Variable Type
 */
export const T = {
  OBJECT: 'object'
, STRING: 'string'
, NUMBER: 'number'
, FUNCT:  'function'
}

/**
 * Content Type
 */
export const CT = {
  PLAIN: 'text/plain',
  HTML:  'text/html',
  JSON:  'application/json',
  FORM:  'application/x-www-form-urlencoded'
}

/**
 * Body Type
 */
export const BT = {
  RAW:  CT.PLAIN,
  JSON: CT.JSON,
  FORM: CT.FORM
}

/**
 * Errors
 */
export const ERR = {
  PARAM_NON_OBJECT: new Error('The first parameter must be an object!')
}

/**
 * Functions
 */
export const nodebackOrPromise = ( cb, res, rej, err, val ) => {
  let prom = null
  if( !cb ) prom = ( err ) ? rej( err ) : res( val )
  return ( cb ) ? cb( err, val ) : prom
}