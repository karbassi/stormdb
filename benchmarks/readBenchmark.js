const StormDB = require("../index.js");
const fs = require("fs");

const path = "./db.stormdb";

function parseToDP(num, dp) {
  return num.toFixed(dp);
}

function deleteDB(path) {
  fs.unlinkSync(path);
}

function createDatabase(num) {
  const engine = new StormDB.localFileEngine(path);
  const db = StormDB(engine);

  for (let i = 0; i < num; i++) {
    db.set(i, "val");
  }
  db.save();
}

function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats["size"];
  return fileSizeInBytes / 1024 / 1024;
}

function runBenchmark(numberToInsert) {
  if (fs.existsSync(path)) deleteDB(path);
  createDatabase(numberToInsert);

  /* start of core speed test */
  let start = +new Date();

  const engine = new StormDB.localFileEngine(path);
  const db = StormDB(engine);

  let end = +new Date();
  /* end of core speed test */

  let time = end - start;
  let timeInSecs = time / 1000;
  let sizeOfDB = getFilesizeInBytes(path);

  let speedPerSec = parseToDP(numberToInsert / timeInSecs, 2);

  console.log(`Number Read: ${numberToInsert}.
  Time Elapsed: ${time}ms
  Speed: ${speedPerSec}/sec
  Size of Data Write: ${parseToDP(sizeOfDB, 2)}mb\n`);
}

console.log("Read Benchmarks:\n");
let numbers = [100000, 1000000, 10000000];
numbers.forEach(val => {
  runBenchmark(val);
});
