#!/usr/bin/env node

const program = require('commander');
const { name, version } = require("../package.json");
const { resolve } = require("path");
const { ncp } = require("ncp");
const fs = require("fs");
const cwd = process.cwd();
const red = color("\x1b[31m")
const green = color("\x1b[32m")

program
  .name(name)
  .version(version)
  .option('-s, --source [directory]', 'Path to source directory', 'store');

program
  .command('status')
  .description(`Display current ${name} status`)
  .action(middleware(
    isInitialized,
    currentStatus
  ));

program
  .command('create')
  .description(`Create a ${name} store in the source directory`)
  .action(middleware(
    notInitialized,
    createReduxProject,
    successful
  ));

program
  .command('action <action>')
  .description(`Create a ${name} action`)
  .action(middleware(
    drop(1, isInitialized),
    drop(1, ensureDirectory("./actions")),
    setFilename("./actions"),
    drop(1, filenameIsAvailable),
    setActionContent,
    drop(1, makeFile),
    successful
  ));

program
  .command('reducer <reducer>')
  .description(`Create a ${name} reducer`)
  .action(middleware(
    drop(1, isInitialized),
    drop(1, ensureDirectory("./reducers")),
    setFilename("./reducers"),
    drop(1, filenameIsAvailable),
    setReducerContent,
    drop(1, makeFile),
    successful
  ));

try {
  program.parse(process.argv);
} catch (err) {
  process.stdout.write(`${red("Error")}: ${err.message}\n`);
}

if (!process.argv.slice(2).length) {
  program.outputHelp();
}

function getSourcePath () {
  return resolve(cwd, program.source)
}

function isInitialized (cmd, next) {
  if (!fs.existsSync(getSourcePath())) throw new Error("store is not initialized")
  return next()
}

function notInitialized (cmd, next) {
  if (fs.existsSync(getSourcePath())) throw new Error("store already exists in " + getSourcePath())
  return next()
}

function ensureDirectory (subdir) {
  return function (cmd, next) {
    const dir = resolve(getSourcePath(), subdir)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    return next()
  }
}

function setFilename (subdir) {
  return function (name, cmd, next) {
    if (!name) throw new Error("No name was supplied")
    cmd.filename = resolve(getSourcePath(), subdir, name + ".js")
    return next()
  }
}

function setContent (content) {
  return function (cmd, next) {
    cmd.content = content
    next()
  }
}

function filenameIsAvailable (cmd, next) {
  if (fs.existsSync(cmd.filename)) throw new Error(cmd.filename + " already exists")
  return next()
}

function currentStatus (cmd, next) {
  console.log(cmd, next)
}

function createReduxProject (cmd, next) {
  const source = resolve(__dirname, "./template")
  ncp(source, getSourcePath(), err => {
    if (err) throw err;
    next()
  });
}

function successful () {
  process.stdout.write(green("Done!\n"));
}

function makeFile (cmd, next) {
  fs.writeFileSync(cmd.filename, cmd.content, "utf8")
  next()
}

function setActionContent (action, cmd, next) {
  cmd.content = `import { createAction as ca } from '${name}'\n\nexport default ca("${action.toUpperCase()}")`
  next()
}

function setReducerContent (reducer, cmd, next) {
  cmd.content = `import { createReducer as cr } from '${name}'\n\nexport default cr({}, [])`
  next()
}

function middleware(...fns) {
  return (...args) => {
    return fns.reduceRight((acc, fn) => () => fn(...args, acc), () => {})();
  };
};

function drop (count=0, fn) {
  return (...args) => {
    return fn(...args.slice(count))
  }
}

function color (f) {
  return function (text) {
    return `${f}${text}\x1b[0m`
  }
}
