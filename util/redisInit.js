const redis = require('redis');
require("dotenv").config();

exports.initialize = async() => {
    global.redisClient = redis.createClient({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    })

    await redisClient.connect();
}