#!/usr/bin/env node
var i = 10;
function run() {
    console.log(process.argv[2]);
    if (--i) setTimeout(run, 10);
}
run();
