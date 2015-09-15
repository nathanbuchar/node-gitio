/**
 * The shrink command logic. Supports both Promises and callbacks.
 *
 * @module lib/shrink
 * @author Nathan Buchar
 */

'use strict';

var Promise = require('promise');

var extend = require('extend');
var request = require('request');

/**
 * Performs the shrink method by sending a post request to the Git.io API.
 *
 * @param {Object} payload - The form payload that will be sent to the API.
 *   * {string} url - The long url to be shortened.
 *   * {string} [code] - The custom code for the shortened URL.
 *   * {boolean} [force]
 * @param {Function} [callback]
 * @returns {Promise}
 */
module.exports = function shrink(payload, callback) {
  return new Promise(function (resolve, reject) {
    if (payload.url && typeof payload.url === 'string') {
      return request.post({
        url: 'http://git.io',
        form: extend(payload, {
          url: parseUrl(payload.url)
        })
      }, function (err, res, body) {
        var statusCode = Number(res.headers.status.split(' ')[0]);
        var error;
        var result;

        // Determine if there was an error.
        if (err) {
          error = new Error(err);
        } else if (statusCode !== 201) {
          error = new Error(res.body);
        } else {
          result = res.headers.location;
        }

        // Handle Promise resolutions.
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }

        // Handle callback.
        if (callback) {
          callback(error, result);
        }
      });
    }
  });
};

/**
 * Parses the URL so that it is in compliance with Git.io's backend.
 *
 * @param {string} url
 * @returns {string}
 */
function parseUrl(url) {
  if (url.indexOf('//') === 0) {
    return 'https:' + url;
  } else if (url.indexOf('http') !== 0) {
    return 'https://' + url;
  } else {
    return url.replace('http://', 'https://');
  }
}
