const express = require('express')
const methodOverride = require('method-override')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
require('dotenv/config')


// MIDDLEWARE
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded())
app.use(methodOverride('_method'))


// SET VIEW ENGINE
app.set('view engine', 'ejs')


//IMPORT ROUTES
const routersRoute = require('./routers/routes')
app.use('/', routersRoute)


// MONGODB CONNECTION
console.log(
  process.env.DB_CONNECTION
)


// CONNECT TO DB
mongoose.connect(
  process.env.DB_CONNECTION, 
  { useNewUrlParser: true, useUnifiedTopology: true }, 
  () => console.log('connected to DB!'))



// LISTEN TO SERVER
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
