#!/usr/bin/env node

// Use of this source code is governed by an Apache 2.0 license
// that can be found in the LICENSE file.

'use strict';

const program = require('commander');
const {ChromeBuilder} = require('../src/chrome_builder');
const {ChromeBuilderConf} = require('../src/chrome_builder_conf');

program
  .version(require('../package.json').version)
  // TODO(halton): show supported actions
  .usage('[options] action <dir>')
  .option('-c, --conf <conf>', 'Configuration file', '.bot_config.json')
  .parse(process.argv);

try {
  let conf = new ChromeBuilderConf(program.args[1], program.conf);
  conf.init();

  let builder = new ChromeBuilder(conf);
  builder.run(program.args[0]);
} catch (e) {
  console.log(e);
  process.exit(1);
}
