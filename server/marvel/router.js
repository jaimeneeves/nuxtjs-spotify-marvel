var express = require('express')
var router = express.Router()
const axios = require('axios')
const qs = require('qs');

const auth = `ts=1&apikey=${process.env.MARVEL_KEY}&hash=${process.env.MARVEL_HASH}`

router.get('/characters', async (req, res) => {
    try {
      const params = qs.stringify(req.query)
      const url = `${process.env.MARVEL_BASEURL}/v1/public/characters?limit=10&${auth}&${params}`
      const response = await axios.get(`${url}`)
      res.send(response.data)
    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
})

router.get('/comics', async (req, res) => {
    try {
      const params = qs.stringify(req.query)
      const url = `${process.env.MARVEL_BASEURL}/v1/public/comics?limit=10&${auth}&${params}`
      const response = await axios.get(`${url}`)
      res.send(response.data)
    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
})

router.get('/series', async (req, res) => {
    try {
      const params = qs.stringify(req.query)
      const url = `${process.env.MARVEL_BASEURL}/v1/public/series?limit=10&${auth}&${params}`
      const response = await axios.get(`${url}`)
      res.send(response.data)
    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
})


module.exports = router