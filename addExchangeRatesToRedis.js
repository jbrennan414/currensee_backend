var redis = require('redis'), client = redis.createClient();
const { fetchExchangeRates } = require('./fetchExchangeRates');

async function addExchangeRatesToRedis(isProduction){
    
    if (isProduction) {
        let exchangeRates = await fetchExchangeRates()
        console.log(`Setting fresh exchange rates to redis at ${exchangeRates.timestamp}`)
        client.HMSET("rates", exchangeRates["rates"])
        client.set("timestamp", exchangeRates["timestamp"])
        return "OK";

    } else {

        const fs = require('fs');

        let rawdata = fs.readFileSync('sample_response.json');
        let sampleExchangeRates = JSON.parse(rawdata);
        console.log(`Setting TEST EXCHANGE RATES to redis...this better not be production!`)
        client.HMSET("rates", sampleExchangeRates["rates"])
        client.set("timestamp", sampleExchangeRates["timestamp"])
        return "OK";
        
    }
}

module.exports = {addExchangeRatesToRedis: addExchangeRatesToRedis};