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
        let finalRates = {}
        finalRates = rates;
        
        return finalRates
    });

}

module.exports = {getRatesFromRedis: getRatesFromRedis}