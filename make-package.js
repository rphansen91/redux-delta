const { resolve } = require("path");
const { ncp } = require("ncp");
const package = require("./package.json")
const fs = require("fs");

middleware(
  makePackageJson,
  copyReadme,
  copyCli
)()

function makePackageJson (next) {
  const dest = resolve(__dirname, "./dist/package/package.json")
  const content = Object.assign({}, package, {
    "main": "lib/index.js",
    "module": "es/index.js"
  })
  fs.writeFileSync(
    dest,
    JSON.stringify(content, null, 2),
    "utf8"
  )
  next();
}

function copyReadme (next) {
  const src = resolve(__dirname, "./README.md")
  const dest = resolve(__dirname, "./dist/package/README.md")
  ncp(src, dest, err => {
    if (err) throw err;
    next()
  });
}

function copyCli (next) {
  const src = resolve(__dirname, "./cli")
  const dest = resolve(__dirname, "./dist/package/cli")
  ncp(src, dest, err => {
    if (err) throw err;
    next()
  });
}

function done () {
  console.log("Done!")
}

function middleware(...fns) {
  return (...args) => {
    return fns.reduceRight((acc, fn) => () => fn(...args, acc), () => {})();
  };
};
