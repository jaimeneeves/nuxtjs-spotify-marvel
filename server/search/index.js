const request = require('../request')
const cache = require('../redis')

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

const Search = {
  search: async function (q, type='album,artist,playlist,track', offset, limit, market, include_external) {
    const access_token = await getAccessToken()

    return request.get(`search`, {
      headers: {
        withCredentials: true,
        Authorization: `Bearer ${access_token}`
      },
      params: {
        q,
        type,
        limit,
        offset,
        market,
        include_external,
      }
    });
  }
}

module.exports = Search