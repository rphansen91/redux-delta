#!/usr/bin/env node

const program = require("commander")
const { name, version } = require("../package.json")
const { resolve } = require("path")
const { ncp } = require("ncp")
const fs = require("fs")
const cwd = process.cwd()
const red = color("\x1b[31m")
const green = color("\x1b[32m")

program
  .name(name)
  .version(version)
  .option("-s, --source [directory]", "Path to source directory", "store")

program
  .command("status")
  .description(`Display current ${name} status`)
  .action(middleware(isInitialized, currentStatus))

program
  .command("create")
  .description(`Create a ${name} store in the source directory`)
  .action(middleware(notInitialized, createReduxProject, successful))

program
  .command("action <action>")
  .description(`Create a ${name} action`)
  .action(
    middleware(
      isInitialized,
      ensureDirectory("./actions"),
      setFilename("./actions"),
      filenameIsAvailable,
      setActionContent,
      makeFile,
      successful
    )
  )

program
  .command("reducer <reducer>")
  .description(`Create a ${name} reducer`)
  .action(
    middleware(
      isInitialized,
      ensureDirectory("./reducers"),
      setFilename("./reducers"),
      filenameIsAvailable,
      setReducerContent,
      makeFile,
      successful
    )
  )

try {
  program.parse(process.argv)
} catch (err) {
  process.stdout.write(`${red("Error")}: ${err.message}\n`)
}

if (!process.argv.slice(2).length) {
  program.outputHelp()
}

function getSourcePath() {
  return resolve(cwd, program.source)
}

function isInitialized(next, cmd) {
  if (!fs.existsSync(getSourcePath()))
    throw new Error("store is not initialized")
  return next()
}

function notInitialized(next, cmd) {
  if (fs.existsSync(getSourcePath()))
    throw new Error("store already exists in " + getSourcePath())
  return next()
}

function ensureDirectory(subdir) {
  return function(next, cmd) {
    const dir = resolve(getSourcePath(), subdir)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    return next()
  }
}

function setFilename(subdir) {
  return function(next, name, cmd) {
    if (!name) throw new Error("No name was supplied")
    cmd.filename = resolve(getSourcePath(), subdir, name + ".js")
    return next()
  }
}

function setContent(content) {
  return function(next, cmd) {
    cmd.content = content
    next()
  }
}

function filenameIsAvailable(next, cmd) {
  if (fs.existsSync(cmd.filename))
    throw new Error(cmd.filename + " already exists")
  return next()
}

function currentStatus(next, cmd) {
  console.log(cmd, next)
}

function createReduxProject(next, cmd) {
  const source = resolve(__dirname, "./template")
  ncp(source, getSourcePath(), err => {
    if (err) throw err
    next()
  })
}

function successful() {
  process.stdout.write(green("Done!\n"))
}

function makeFile(next, cmd) {
  fs.writeFileSync(cmd.filename, cmd.content, "utf8")
  next()
}

function setActionContent(next, action, cmd) {
  cmd.content = `import { createAction as ca } from '${name}'\n\nexport default ca("${action.toUpperCase()}")`
  next()
}

function setReducerContent(next, reducer, cmd) {
  cmd.content = `import { createReducer as cr } from '${name}'\n\nexport default cr({}, [])`
  next()
}

function middleware(...fns) {
  return (...args) => {
    return fns.reduceRight((next, fn) => () => fn(next, ...args), () => {})()
  }
}

function color(f) {
  return function(text) {
    return `${f}${text}\x1b[0m`
  }
}
