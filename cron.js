var CronJob = require('cron').CronJob;

const { addExchangeRatesToRedis } = require('./addExchangeRatesToRedis');

// Every hour from 6 am - 10 pm
new CronJob('* * * * *', addExchangeRatesToRedis, null, true, "America/Denver");