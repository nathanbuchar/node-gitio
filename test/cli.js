/**
 * Tests the package CLI.
 *
 * @module test/cli
 * @author Nathan Buchar
 * @ignore
 */

/* globals it, describe, before, after, beforeEach, afterEach */
/* globals which, echo, exit, exec */

'use strict';

require('shelljs/global');

var chai = require('chai');

var pkg = require('../package');

var gitio = './bin/gitio.js';

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
 * Verify the command line tool exists before running tests.
 */
if (!which('gitio')) {
  echo('gitio must exist.');
  exit(1);
}

/**
 * Our tests.
 */
describe('CLI', function () {
  describe('Core functionality', function () {

    describe('The help menu', function () {

      it('should accept -h', function (done) {
        var cmd = gitio + ' -h';

        exec(cmd, { silent: true }, function (code, output) {
          expect(output).to.be.a('string');
          expect(output).to.have.length.above(0);
          expect(output).to.not.contain('Not enough non-option arguments');
          done();
        });
      });

      it('should accept --help', function (done) {
        var cmd = gitio + ' --help';

        exec(cmd, { silent: true }, function (code, output) {
          expect(output).to.be.a('string');
          expect(output).to.have.length.above(0);
          expect(output).to.not.contain('Not enough non-option arguments');
          done();
        });
      });
    });

    describe('The version', function () {

      it('should accept -v', function (done) {
        var cmd = gitio + ' -v';

        exec(cmd, { silent: true }, function (code, output) {
          expect(output).to.be.a('string');
          expect(output).to.have.length.above(0);
          expect(output).to.equal(pkg.version + '\n');
          done();
        });
      });

      it('should accept --version', function (done) {
        var cmd = gitio + ' --version';

        exec(cmd, { silent: true }, function (code, output) {
          expect(output).to.be.a('string');
          expect(output).to.have.length.above(0);
          expect(output).to.equal(pkg.version + '\n');
          done();
        });
      });
    });
  });

  describe('Shrink command', function () {

    describe('The help menu', function () {

      it('should accept -h', function (done) {
        var cmd = gitio + ' shrink -h';

        exec(cmd, { silent: true }, function (code, output) {
          expect(output).to.be.a('string');
          expect(output).to.have.length.above(0);
          expect(output).to.not.contain('Not enough non-option arguments');
          done();
        });
      });

      it('should accept --help', function (done) {
        var cmd = gitio + ' shrink --help';

        exec(cmd, { silent: true }, function (code, output) {
          expect(output).to.be.a('string');
          expect(output).to.have.length.above(0);
          expect(output).to.not.contain('Not enough non-option arguments');
          done();
        });
      });
    });

    describe('Shrink', function () {

      it('should shrink a GitHub url', function (done) {
        var cmd = gitio + ' shrink ' + stub.url.req;

        exec(cmd, { silent: true }, function (code, output) {
          expect(output).to.be.a('string');
          expect(output).to.have.length.above(0);
          expect(output).to.contain(stub.url.res);
          done();
        });
      });

      it('should shrink a GitHub url with a custom code', function (done) {
        var cmd = gitio + ' shrink ' + stub.url.req + ' -c ' + stub.code;

        exec(cmd, { silent: true }, function (code, output) {
          expect(output).to.be.a('string');
          expect(output).to.have.length.above(0);
          expect(output).to.contain(stub.code);
          done();
        });
      });

      it('should fail when shrinking a URL not hosted by GitHub', function (done) {
        var cmd = gitio + ' shrink http://nathanbuchar.com/';

        exec(cmd, { silent: true }, function (code, output) {
          expect(output).to.contain('Error: Must be a GitHub.com URL.');
          done();
        });
      });
    });
  });
});
