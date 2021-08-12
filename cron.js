var CronJob = require('cron').CronJob;

const { addExchangeRatesToRedis } = require('./addExchangeRatesToRedis');

// Every hour from 6 am - 10 pm
new CronJob('0 */12 * * *', addExchangeRatesToRedis, null, true, "America/Denver");