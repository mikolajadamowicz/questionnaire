const ObjectID = require("mongodb").ObjectID

const appRouter = (app, db) => {
  app.get("/", (req, res) => {
      res.status(200).send("Welcome to our restful API, Aloha")
  })

  app.get("/getUsers", (req, res) => {
    const collection = db.collection("users")
    const cursor = collection.find()
      .limit(1)
      .sort({ $natural: -1 });
    cursor.toArray((err, results) => {
      if (err) throw err
      console.log("%j", results[0])
      res.setHeader("Content-Type", "application/json")
      res.status(200).send(results[0])
    })
  })

  app.get("/getSurveys", (req, res) => {
  const collection = db.collection("surveys")
    const cursor = collection.find({}).sort({ $natural: -1 })
  cursor.toArray((err, results) => {
    if (err) throw err
    console.log("%j", results)
    res.setHeader("Content-Type", "application/json")
    res.status(200).send(results)
  })
  })
  app.put("/answer/:id", (req, res) => {
    const id = req.params.id
    const details = { _id: new ObjectID(id) }
    const answer = { 
      // _id: req.body.id,
      text: req.body.text, 
      title: req.body.title,
      forCount: req.body.forCount,
      againstCount: req.body.againstCount,
      answered: req.body.answered
    }
    console.log(req.body)
    db.collection("surveys").update(details, answer, (err, result) => {
      if (err) {
        res.send({ error: "An error has occurred" })
      } else {
        res.status(200).send(answer)
      }
    })
  })    

  app.post("/addSurvey", (req, res) => {
    const survey = { 
      text: req.body.text, 
      title: req.body.title,
      forCount: req.body.forCount,
      againstCount: req.body.againstCount,
      answered: req.body.answered
    }
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

