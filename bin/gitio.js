#! /usr/bin/env node

/**
 * Core node CLI wrapper for git.io.
 *
 * @author Nathan Buchar
 * @module bin/gitio
 */

'use strict';

var yargs = require('yargs');

var shrink = require('./commands/shrink');

var version = require('../package').version;

var argv = yargs
  .version(version)
  .usage('Usage: gitio <command>')
  .command('shrink', 'Shrink a GitHub url', shrink)
  .demand(1)
  .alias('v', 'version')
  .alias('h', 'help')
  .help('h')
  .wrap(74)
  .epilogue('See http://git.io/vZ9RJ for more information.')
  .argv;
