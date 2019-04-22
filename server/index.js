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


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const spotifyBaseUrl = 'https://api.spotify.com/v1/'

async function callStorage(method, ...args) {
  const redisClient = cache.connectToRedis()
  const response = await redisClient[method](...args)
  redisClient.quit()
  return response
}

function storageArgs(key, props) {
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

async function setLastPlayed(access_token, item) {
  if (!Boolean(item)) {
    const { data } = await axios.get(
      `${spotifyBaseUrl}me/player/recently-played?market=US`,
      {
        headers: {
          withCredentials: true,
          Authorization: `Bearer ${access_token}`
        }
      }
    )
    postStoredTrack(data.items[0].track)
  } else {
    postStoredTrack(item.item)
  }
}

function postStoredTrack(props) {
  callStorage(
    ...storageArgs('last_played', {
      body: props
    })
  )
}

async function getAccessToken() {
  const redisClient = cache.connectToRedis()
  const accessTokenObj = { value: await redisClient.get('access_token') }
  if (!Boolean(accessTokenObj.value)) {
    const refresh_token = await redisClient.get('refresh_token')
    const { data: { access_token, expires_in } } = await authorization.getSpotifyToken({
      refresh_token,
      grant_type: 'refresh_token'
    })
    Object.assign(accessTokenObj, {
      value: access_token,
      expires: expires_in
    })
    callStorage(...storageArgs('access_token', { ...accessTokenObj }))
  }
  redisClient.quit()
  return accessTokenObj.value
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

  app.all('/api/spotify/data/:key', async ({ params: { key }, query }, res) => {
    try {
      if (key === ('refresh_token' || 'access_token'))
        throw { error: '🔒 Cannot get protected stores. 🔒' }
      const { value } = query
      const reply = await callStorage(...storageArgs(key, { value }))
      res.send({ [key]: reply })
    } catch (err) {
      console.error(`\n🚨 There was an error at /api/spotify/data: ${err} 🚨\n`)
      res.send(err)
    }
  })

  app.get('/api/spotify/now-playing/', async (req, res) => {
    try {
      const access_token = await getAccessToken()
      const response = await axios.get(
        `${spotifyBaseUrl}me/player/currently-playing?market=US`,
        {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${access_token}`
          }
        }
      )
      const { data } = response
      setLastPlayed(access_token, data)
      const reply = await callStorage('get', 'last_played')
      res.send({
        item: JSON.parse(reply),
        is_playing: Boolean(data.is_playing),
        progress_ms: data.progress_ms || 0
      })
    } catch (err) {
      console.error(err)
      res.send({ error: err.message })
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

      callStorage(...storageArgs('is_connected', { value: true }))
      callStorage(...storageArgs('refresh_token', { value: refresh_token }))
      callStorage(
        ...storageArgs('access_token', {
          value: access_token,
          expires: expires_in
        })
      )

      const success = '🎉 Welcome Back 🎉'
      res.redirect(`/auth?success=${success}`)
    } catch (error) {
      console.error(
        `\n🚨 There was an error at /api/spotify/callback: ${error} 🚨\n`
      )
      res.redirect(`/auth?message=${error}`)
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
