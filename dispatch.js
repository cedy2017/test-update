// dispatch.js
// EGG_SERVER_ENV=prod nohup node dispatch.js > stdout.log 2> stderr.log &
const egg = require('egg');
egg.startCluster({
  baseDir: __dirname
});