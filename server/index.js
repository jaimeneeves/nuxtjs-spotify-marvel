require('dotenv').config()

const express = require('express')
const consola = require('consola')
const axios = require('axios')
const cache = require('./redis')
const redis = require('async-redis')
const authorization = require('./auth')
const user = require('./user')
const { Nuxt, Builder } = require('nuxt')
const app = express()

// Routers
const searchRouter = require('./search/router')
const marvelRouter = require('./marvel/router')

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function callStorage(method, ...args) {
  const redisClient = cache.connectToRedis()
  const response = await redisClient[method](...args)
  redisClient.quit()
  return response
}

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host } = nuxt.options.server
  const port = process.env.PORT || 3000

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.use('/api', searchRouter)
  app.use('/api/marvel', marvelRouter)

  app.all('/api/spotify/data/:key', async ({ params: { key }, query }, res) => {
    try {
      if (key === ('refresh_token' || 'access_token'))
        throw { error: '🔒 Cannot get protected stores. 🔒' }
      const { value } = query
      const reply = await callStorage(...cache.storageArgs(key, { value }))
      res.send({ [key]: reply })
    } catch (err) {
      console.error(`\n🚨 There was an error at /api/spotify/data: ${err} 🚨\n`)
      res.send(err)
    }
  })

  app.get('/api/spotify/callback', async ({ query: { code } }, res) => {
    try {
      const params = {
        code: code,grant_type: 'authorization_code'
      }
      const { data }  = await authorization.getSpotifyToken(params)
      const { access_token, refresh_token, expires_in } = data
      const { data: { id } } = await user.getUserData(access_token)

      callStorage(...cache.storageArgs('is_connected', { value: true }))
      callStorage(...cache.storageArgs('refresh_token', { value: refresh_token }))
      callStorage(...cache.storageArgs('access_token', { value: access_token,expires: expires_in}))

      const success = '🎉 Welcome Back 🎉'
      res.redirect(`/spotify/auth?success=${success}`)
    } catch (error) {
      console.error(
        `\n🚨 There was an error at /api/spotify/callback: ${error} 🚨\n`
      )
      res.redirect(`/spotify/auth?message=${error}`)
    }
  })

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
