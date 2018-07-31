#!/usr/bin/env node

const program = require('commander');
const { name, version } = require("../package.json");
const { ncp } = require("ncp");
const { resolve } = require("path");
const fs = require("fs");
const cwd = process.cwd();

program
  .command('create')
  .description('Create a redux-sauce store in the current directory')
  .action(createReduxProject);

program
  .command('reducer <reducer>')
  .description('Create a redux-sauce reducer')
  .action(makeReducer);


program.parse(process.argv);


function createReduxProject () {
  const destination = resolve(cwd, "./store")
  const source = resolve(__dirname, "./template")
  if (fs.existsSync(destination)) return console.error("Store already exists")
  ncp(source, destination, err => {
    if (err) {
      return console.error(err);
    }
    console.log('Done!');
  });
}

function makeReducer (reducer) {
  const destination = resolve(cwd, "./store/reducers", reducer + ".js")
  if (fs.existsSync(destination)) return console.error("Reducer already exists")
  const content = `import { createReducer } from '${name}'\n\nexport default createReducer({}, [])`
  fs.writeFileSync(destination, "utf8", content)
  console.log('Done!')
}
