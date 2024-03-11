const fs = require('fs');
const archiver = require('archiver');
const fse = require('fs-extra');
const path = require('path');
require('dotenv').config();

// Now you can use process.env to access your variables
console.log(process.env.downloadsFolderPath);
// define the paths according to your system
// print all environment variables
console.table(process.env);