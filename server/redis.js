const redis = require('async-redis')

require('dotenv').config()

const cache = {
  connectToRedis: function () {
    const redisClient = redis.createClient(process.env.REDIS_URL)
    redisClient.on('connect', () => {
      console.log('\n🎉 Redis client connected 🎉\n')
    })
    redisClient.on('error', err => {
      console.error(`\n🚨 Redis client could not connect: ${err} 🚨\n`)
    })
    return redisClient
  }
}

module.exports = cache
