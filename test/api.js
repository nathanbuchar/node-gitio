/**
 * @fileoverview Tests the Node API.
 * @author Nathan Buchar
 */

/* globals it, describe, before, after, beforeEach, afterEach */

'use strict';

let chai = require('chai');

let gitio = require('../');

/**
 * Define Chai assertation shorthands.
 */
let expect = chai.expect;
let should = chai.should();

/**
 * Define expected stub data and response.
 */
let stub = {
  url: {
    req: 'https://github.com/nathanbuchar',
    res: 'https://git.io/buchar'
  },
  code: 'buchar'
};

/**
 * Our tests.
 */
describe('Node JS API', function () {

  describe('Shrink', function () {

    it('should shrink a GitHub url', function (done) {
      gitio.shrink({
        url: stub.url.req
      }, function (err, result) {
        should.not.exist(err);
        expect(result).to.be.a('string');
        expect(result).to.have.length.above(0);
        expect(result).to.contain(stub.url.res);
        done();
      });
    });

    it('should shrink a GitHub url with a custom code', function (done) {
      gitio.shrink({
        url: stub.url.req,
        code: stub.code
      }, function (err, result) {
        should.not.exist(err);
        expect(result).to.be.a('string');
        expect(result).to.have.length.above(0);
        expect(result).to.contain(stub.code);
        done();
      });
    });

    it('should fail when shrinking a URL not hosted by GitHub', function (done) {
      gitio.shrink({
        url: 'https://nathanbuchar.com/'
      }, function (err, result) {
        should.exist(err);
        should.not.exist(result);
        expect(err.toString()).to.contain('Error: Must be a GitHub.com URL.');
        done();
      });
    });
  });
});
