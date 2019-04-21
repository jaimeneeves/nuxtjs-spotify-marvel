const express = require('express')
const consola = require('consola')
const axios = require('axios')
const redis = require('async-redis')
const { Nuxt, Builder } = require('nuxt')
const app = express()


// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

const spotifyBaseUrl = 'https://api.spotify.com/v1/'

// Redis
function connectToRedis() {
  const redisClient = redis.createClient(process.env.REDIS_URL)
  redisClient.on('connect', () => {
    console.log('\n🎉 Redis client connected 🎉\n')
  })
  redisClient.on('error', err => {
    console.error(`\n🚨 Redis client could not connect: ${err} 🚨\n`)
  })
  return redisClient
}

async function callStorage(method, ...args) {
  const redisClient = connectToRedis()
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

const getSpotifyToken = (props = {}) => 
  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    params: {
      client_id: process.env.SPOTIFY_CLIENT_ID,
      client_secret: process.env.SPOTIFY_CLIENT_SECRET,
      redirect_uri: `${process.env.CLIENT_URL}/api/spotify/callback`,
      ...props
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

const getUserData = access_token =>
  axios.get(`${spotifyBaseUrl}me`, {
    headers: {
      withCredentials: true,
      Authorization: `Bearer ${access_token}`
    }
  })

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  app.get('/api/spotify/callback', async ({ query: { code } }, res) => {
    try {
        const params = {
          code: code,grant_type: 'authorization_code'
        }
        const { data }  = await getSpotifyToken(params)
        const { access_token, refresh_token, expires_in } = data
        const { data: { id } } = await getUserData(access_token)

        console.log(' asd ', data)
        console.log(' id ', id)

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
