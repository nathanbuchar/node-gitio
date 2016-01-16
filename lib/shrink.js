/**
 * @fileoverview The shrink command logic.
 * @author Nathan Buchar
 */

'use strict';

let noop = require('no-op');
let request = require('request');
let schema = require('validate');

/**
 * @const {string} GITIO_API
 * @description The Git.io API location.
 */
const GITIO_API = 'https://git.io/create';

/**
 * Performs the shrink method by sending a post request to the Git.io API.
 *
 * @param {Object} payload
 * @param {Function} [callback=noop]
 */
module.exports = function shrink(payload, callback) {
  callback = callback || noop;

  // Validate payload and return any errors.
  let errors = validatePayload(payload);

  if (errors.length) {
    callback(new Error(errors[0].message));
    return;
  }

  // Make the shrink request.
  request.post({
    url: GITIO_API,
    form: payload
  }, (err, res, body) => {
    let statusCode = Number(res.headers.status.split(' ')[0]);

    // Determine if there was an error.
    if (err) {
      callback(new Error(err));
    } else if (statusCode !== 200) {
      callback(new Error(res.body));
    } else {
      callback(null, 'https://git.io/' + res.body);
    }
  });
};

/**
 * Validates the payload and verifies that there are no errors.
 *
 * @param {Object} payload
 * @returns {Array}
 */
function validatePayload(payload) {
  let errors = schema({
    url: {
      type: 'string',
      required: true,
      message: '"url" is required and must be a string.'
    },
    code: {
      type: 'string',
      required: false,
      message: '"code" must be a string'
    }
  }).validate(payload);

  // Validate that the URL is HTTPS.
  if (payload.url && !payload.url.match(/^https:\/\/.+/)) {
    errors.push({
      name: 'url',
      message: 'Only HTTPS is supported.'
    });
  }

  return errors;
}
