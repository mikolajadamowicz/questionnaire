
const ObjectID = require("mongodb").ObjectID

const appRouter = (app, db) => {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to our restful API, Aloha")
    })
    // app.get("/getSurveys/:id", function(req, res) {
    //   const id = req.params.id

    //   const details = { _id: new ObjectID(id) }
    //   db.collection("surveys").findOne(details, (err, item) => {
    //     if (err) {
    //       res.send({ error: "An error has occurred" })
    //     } else {
    //       res.send(item)
    //     }
    //   })
    // })
    app.get("/getSurveys", (req, res) => {
    //   db.collection("surveys").findOne({}, function(err, result) {
    //     if (err) throw err
    //     console.log(result)
    //     res.send(result)
    //   })
    var collection = db.collection("surveys");
    var cursor = collection
      .find()
      .limit(1)
      .sort({ $natural: -1 });

    cursor.toArray(function(err, results) {
      if (err) throw err;
      console.log("%j", results);
    });
    })
    app.post("/postAnswer", (req, res) => {
          console.log(req.body) // your JSON
          res.send(req.body)     
    })
    app.post("/addSurvey", (req, res) => {
        const survey = { text: req.body.body, title: req.body.title }
        db.collection("surveys").insert(survey, (err, result) => {
          if (err) {
            res.send({ error: "An error has occurred" })
          } else {
            res.status(200).send(result.ops[0])
          }
        })
    })
}

module.exports = appRouter

