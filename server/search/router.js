var express = require('express')
var router = express.Router()
const request = require('./index')

// define the about route
router.get('/search', async function (req, res) {
  const response = await request.search(req.query.q)
  const { data } = response
  res.json(data)
})

module.exports = router