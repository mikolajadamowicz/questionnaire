const express = require("express")
const bodyParser = require("body-parser")
const MongoClient = require("mongodb").MongoClient

const db = require("./config/db")
const routes = require("./routes/routes.js")
const app = express()

const port = 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes(app)

MongoClient.connect(db.url, (err, database) => {
  // if (err) return console.log(err)

  require("./routes/routes")(app, database);
  app.listen(port, () => {
    console.log("We are live on " + port);
  }); 
})


