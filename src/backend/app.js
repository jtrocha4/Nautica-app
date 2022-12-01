const express = require('express')
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())

const configuracion = require("./config/config")

require("./models/index")

//Servicios
const AvionService = require("./services/avion")
const avionsService = new AvionService();

//EndPoint

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  res.send('Consultaste por POST')
})

//Consulta de avion por id
app.get('/avion/:id', async (req, res) => {
  const avion = await avionsService.getAvion(req.params.id)
  res.send(avion)
})

//Consulta de todos los aviones
app.post('/avion/getAviones', async (req, res) => {
  const body = req.body
  const result = await avionsService.getAviones(body)
  res.send(result)
})

//Create de avion
app.post('/avion/', async (req, res) => {
  const body = req.body
  const result = await avionsService.createAvion(body)
  res.send(result)
})

//Update de avion
app.put('/avion/:id', async (req, res) => {
  const body = req.body
  const result = await avionsService.updateAvion(req.params.id, body)
  res.send(result)
})

//Delete de avion
app.delete('/avion/:id', async (req, res) => {
  const result = await avionsService.deleteAvion(req.params.id)
  res.send(result)
})

app.listen(configuracion.addPort, () => {
  console.log(`Example app listening on port http://localhost:${configuracion.addPort}/`)
})

