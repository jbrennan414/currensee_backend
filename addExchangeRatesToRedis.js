var redis = require('redis'), client = redis.createClient();
const { fetchExchangeRates } = require('./fetchExchangeRates');

async function addExchangeRatesToRedis(){

    console.log("fetching exchange rates...")
    
    // if (isProduction) {
        let exchangeRates = await fetchExchangeRates()
        let ratesObject = exchangeRates["rates"]
        ratesObject["timestamp"] = exchangeRates.timestamp
        client.HMSET("rates", ratesObject)
        return "OK";

    // } else {

        // const fs = require('fs');

        // let rawdata = fs.readFileSync('sample_response.json');
        // let sampleExchangeRates = JSON.parse(rawdata);
        // console.log(`Setting TEST EXCHANGE RATES to redis...this better not be production!`)
        // client.HMSET("rates", sampleExchangeRates["rates"])
        // client.set("timestamp", sampleExchangeRates["timestamp"])
        // return "OK";
    // }
}

module.exports = {addExchangeRatesToRedis: addExchangeRatesToRedis};