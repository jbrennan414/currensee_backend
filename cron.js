var CronJob = require('cron').CronJob;

const { addExchangeRatesToRedis } = require('./addExchangeRatesToRedis');

new CronJob('* * * * *', addExchangeRatesToRedis, null, true, "America/Denver");