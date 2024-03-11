const fs = require('fs');
const archiver = require('archiver');
const fse = require('fs-extra');
const path = require('path');
require('dotenv').config();

// Accessing environment variables
console.log(process.env.downloadsFolderPath);
console.log(process.env.externalDrivePath);

const downloadsFolderPath = process.env.downloadsFolderPath;
const externalDrivePath = process.env.externalDrivePath;
const zipFileName = 'DownloadsBackup.zip';
const outputZipPath = path.join(externalDrivePath, zipFileName);

// Create a file to stream archive data to.
const output = fs.createWriteStream(outputZipPath);
const archive = archiver('zip', {
  zlib: { level: 9 } // Sets the compression level.
});

// Listen for errors
archive.on('error', function(err) {
  throw err;
});

// Pipe archive data to the output file
archive.pipe(output);

// Append files from the Downloads folder and finalize the archive
archive.directory(downloadsFolderPath, false);
archive.finalize();

// Listen for completion of the archive operation
output.on('close', function() {
  console.log(`Backup has been finalized. Total size: ${archive.pointer()} bytes`);
  // Since we're already writing directly to the external drive, no need to move the file again.
  console.log('File has been saved successfully');
});

// Optional: If you need to move the file after creation for some reason, use fse.move here.
