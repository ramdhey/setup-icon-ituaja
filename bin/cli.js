#!/usr/bin/env node

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const path = require("path");
const setIcon = require("../src/seticon");

const argv = yargs(hideBin(process.argv)).option("path", {
  alias: "p",
  describe: "Path to icon PNG (min 512x512)",
  type: "string",
  demandOption: true,
}).argv;

setIcon(path.resolve(argv.path));
