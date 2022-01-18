const redisClient = require('./redis-client');

async function getRatesFromRedis(){

    console.log("Getting rates from redis...")

    const rates = new Promise((resolve, reject) => { 
        resolve(redisClient.hgetall("rates"))
    })

    const timestamp = new Promise((resolve, reject) => {
        resolve(redisClient.getAsync("timestamp"))
    })

    return Promise.all([rates, timestamp]).then((values) => {
        return values[0]
        // return {
        //     "rates": values[0],
        //     "timestamp":values[1]
        // }
    });
}

module.exports = {getRatesFromRedis: getRatesFromRedis}