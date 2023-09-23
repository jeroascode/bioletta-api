const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api/swagger.yaml');

const port = 5555

const user = require('./firebase/config')

app.set('json spaces', 2)
app.use(bodyParser.json({ limit: '5000mb' }))
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }))
app.use(cors({ origin: '*' }))

app.use('/biometric/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/biometric/v1/voice/', require('./routes/biometric-voice-v1-routes'))

const server = app.listen(port, () => {
  console.log(`Biometric Voice listening on port ${port}`)
})

module.exports = server