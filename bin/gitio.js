#! /usr/bin/env node

/**
 * Node CLI wrapper for git.io.
 *
 * @author Nathan Buchar <hello@nathanbuchar.com>
 * @copyright 2015 Nathan Buchar
 * @license MIT
 * @see {@link http://git.io/}
 */

'use strict';

var yargs = require('yargs');

var shrink = require('./commands/shrink');

var argv = yargs
  .usage('Usage: gitio shrink <long url> [-c code] [-f]')
  .command('shrink', 'Shrink a GitHub url', shrink)
  .alias('h', 'help')
  .help('h')
  .wrap(74)
  .epilogue('See http://git.io/vZ9RJ for more information.')
  .argv;

if (['shrink'].indexOf(argv._[0]) === -1) {
  yargs.showHelp();
}
