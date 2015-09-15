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

var argv = yargs
  .usage('Usage: gitio <command>')
  .command('shrink', 'Shrink a GitHub url', shrink)
  .demand(1)
  .alias('h', 'help')
  .help('h')
  .wrap(74)
  .epilogue('See http://git.io/vZ9RJ for more information.')
  .argv;
