#!/usr/bin/env node

const program = require('commander');
const { name, version } = require("../package.json");
const { resolve } = require("path");
const { ncp } = require("ncp");
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


function isInitialized () {
  const destination = resolve(cwd, "./store")
  return fs.existsSync(destination)
}

function createReduxProject () {
  const source = resolve(__dirname, "./template")
  if (isInitialized()) return console.error("Store already exists")
  ncp(source, destination, err => {
    if (err) {
      return console.error(err);
    }
    console.log('Done!');
  });
}

function makeReducer (reducer) {
  const destination = resolve(cwd, "./store/reducers", reducer + ".js")
  if (!isInitialized()) return console.error("Store is not initialized")
  if (fs.existsSync(destination)) return console.error("Reducer already exists")
  const content = `import { createReducer } from '${name}'\n\nexport default createReducer({}, [])`
  fs.writeFileSync(destination, content, "utf8")
  console.log('Done!')
}
