const app = require('express')()
const srv = require('http').createServer(app)
const bodyParser = require('body-parser')
const request = require('request')
const cors = require('cors')
const SPOTIFY_TOKEN_API_URL = 'https://accounts.spotify.com/api/token'
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', (req, res, next) => {
  res.json({ name:'Fabio Sakamoto' })
})
app.post('/api/spotify_auth', (req, res, next) => {
  const { client_id, client_secret } = req.body
  const idSecret = Buffer.from(client_id + ':' + client_secret).toString('base64')
  const config = {
    url: SPOTIFY_TOKEN_API_URL,
    headers: {
      Authorization: `Basic ${ idSecret }`
    },
    form: {
      grant_type: 'client_credentials'
    }
  }
  request.post(config, (err, r, body) => {
    if (err) return res.json(err)
    res.json(body)
  })
})
srv.listen(3000, () => {
  console.log('listening on 3000')
})