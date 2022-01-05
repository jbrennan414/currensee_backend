const { fetchExchangeRates } = require('./fetchExchangeRates');
const redisClient = require('./redis-client');

async function addExchangeRatesToRedis(){

    console.log("setting exchange rates...")
    
    // if (isProduction) {
        let exchangeRates = await fetchExchangeRates()
        let ratesObject = exchangeRates["rates"]
        ratesObject["timestamp"] = exchangeRates.timestamp
        redisClient.hmset("rates", ratesObject)
        return "OK";

    // } else {

        // const fs = require('fs');
        // let rawdata = fs.readFileSync('sample_response.json');
        // let sampleExchangeRates = JSON.parse(rawdata);
        // redisClient.hmset("rates", sampleExchangeRates["rates"])
        // redisClient.setAsync("timestamp", sampleExchangeRates["timestamp"])
        // return "OK";
    // }
}

module.exports = { addExchangeRatesToRedis: addExchangeRatesToRedis };