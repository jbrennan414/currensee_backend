var redis = require('redis'), client = redis.createClient();

async function getRatesFromRedis(){
    console.log("Getting rates from redis...")
    const rates = new Promise((resolve, reject) => {
        // TODO add error handling here
        client.hgetall('rates', function (err, res) {
            if (err){
                return
            }
            resolve(res)
        })
    })

    return rates;
}

module.exports = {getRatesFromRedis: getRatesFromRedis}