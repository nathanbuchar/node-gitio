/**
 * Tests the Node API.
 *
 * @module test/api
 * @author Nathan Buchar
 * @ignore
 */

/* globals it, describe, before, after, beforeEach, afterEach */

'use strict';

var chai = require('chai');

var gitio = require('../');

/**
 * Define Chai assertation shorthands.
 */
var expect = chai.expect;
var should = chai.should;

/**
 * Define expected stub data and response.
 */
var stub = {
  url: {
    req: 'http://github.com/nathanbuchar',
    res: 'http://git.io/buchar'
  },
  code: 'buchar'
};

/**
 * Our tests.
 */
describe('Node JS API', function () {

  describe('Shrink', function () {

    describe('Using callbacks', function () {

      it('should shrink a GitHub url', function (done) {
        gitio.shrink({
          url: stub.url.req
        }, function (err, result) {
          expect(err).to.not.exist;
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
          expect(err).to.not.exist;
          expect(result).to.be.a('string');
          expect(result).to.have.length.above(0);
          expect(result).to.contain(stub.code);
          done();
        });
      });

      it('should fail when shrinking a URL not hosted by GitHub', function (done) {
        gitio.shrink({
          url: 'http://nathanbuchar.com/'
        }, function (err, result) {
          expect(err).to.exist;
          expect(result).to.not.exist;
          expect(err.toString()).to.contain('Error: Must be a GitHub.com URL.');
          done();
        });
      });
    });

    describe('Using promises', function () {

      it('should shrink a GitHub url', function (done) {
        gitio.shrink({
          url: stub.url.req
        }).then(function (result) {
          expect(result).to.be.a('string');
          expect(result).to.have.length.above(0);
          expect(result).to.contain(stub.url.res);
          done();
        }, function (err) {
          expect(err).to.not.exist;
          done();
        });
      });

      it('should shrink a GitHub url with a custom code', function (done) {
        gitio.shrink({
          url: stub.url.req,
          code: stub.code
        }).then(function (result) {
          expect(result).to.be.a('string');
          expect(result).to.have.length.above(0);
          expect(result).to.contain(stub.code);
          done();
        }, function (err) {
          expect(err).to.not.exist;
          done();
        });
      });

      it('should fail when shrinking a URL not hosted by GitHub', function (done) {
        gitio.shrink({
          url: 'http://nathanbuchar.com/'
        }).then(function (result) {
          expect(result).to.not.exist;
          done();
        }, function (err) {
          expect(err).to.exist;
          expect(err.toString()).to.contain('Error: Must be a GitHub.com URL.');
          done();
        });
      });
    });
  });
});
