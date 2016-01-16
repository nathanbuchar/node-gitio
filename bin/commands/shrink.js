#! /usr/bin/env node

/**
 * This module handles the `shrink` command line interface.
 *
 * @module bin/commands/shrink
 * @author Nathan Buchar
 * @see module:lib/shrink
 */

'use strict';

var chalk = require('chalk');
var copyPaste = require('copy-paste');

var shrink = require('../../lib/shrink');

module.exports = function (yargs) {
  var argv = yargs
    .reset()
    .usage('Usage: gitio shrink <long url> [-c code] [--help]')
    .demand(2)
    .options({
      c: {
        alias: 'code',
        description: 'A custom code for the short link, e.g. http://git.io/mycode',
        demand: false,
        type: 'string'
      }
    })
    .alias('h', 'help')
    .help('h')
    .wrap(74)
    .epilogue('See http://git.io/vZ9RJ for more information.')
    .argv;

  // Perform the shrink given that there are not CLI errors.
  shrink({
    url: argv._[1],
    code: argv.code
  }, (err, result) => {
    if (err) {
      console.error(chalk.red('\n%s'), err);
    } else {
      copyPaste.copy(result, function () {
        console.log('\n%s  %s', result, chalk.dim('✔ copied to clipboard'));
      });
    }
  });
};
