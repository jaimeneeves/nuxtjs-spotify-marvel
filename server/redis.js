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
  },

  callStorage: async function (method, ...args) {
    const redisClient = cache.connectToRedis()
    const response = await redisClient[method](...args)
    redisClient.quit()
    return response
  },

  storageArgs: function (key, props) {
    const { expires, body, value } = props
    const val = Boolean(body) ? JSON.stringify(body) : value
    return [
      Boolean(val) ? 'set' : 'get',
      key,
      val,
      Boolean(expires) ? 'EX' : null,
      expires
    ].filter(arg => Boolean(arg))
  }
  
}

module.exports = cache
