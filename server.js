// server.js
require('dotenv').config({ path:'.env' })
const express = require('express');
const app = express();
var redis = require('redis'), client = redis.createClient(6379, 'redis');
var fetch = require('node-fetch');

async function getRatesFromRedis(){
    console.log("Getting rates from redis...")
    const rates = new Promise((resolve, reject) => {
        // TODO add error handling here
        client.hgetall('rates', function (err, res) {
            resolve(res)
        })
    })

    return rates;
}

async function getLatestTimestampFromRedis(){
    console.log("Getting timestamp from redis...")
    const timestamp = new Promise((resolve, reject) => {
        // TODO add error handling here
        client.get('timestamp', function (err, res) {
            resolve(res)
        })
    })

    return timestamp;
}

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

async function fetchExchangeRates(){
    const res = await fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.API_KEY}`)
    let json = await res.json();

    console.log("THAT WORKED", json)

    return json;
}

app.get('/seed_data', async (req, res) => {
    let exchangeRates = await addExchangeRatesToRedis(true)
    res.send(exchangeRates);
});

app.get('/get_rates', async (req, res) => {
    let exchangeRates = await getRatesFromRedis()
    res.send(exchangeRates);
});

app.get('/get_latest_timestamp', async (req, res) => {
    let timestamp = await getLatestTimestampFromRedis()
    res.send(timestamp);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    
    console.log(`Server listening on port ${PORT}`);
});