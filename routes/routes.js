
const ObjectID = require("mongodb").ObjectID

const appRouter = (app, db) => {
    app.get("/", (req, res) => {
        res.status(200).send("Welcome to our restful API, Aloha")
    })

    app.get("/getSurveys", (req, res) => {
      //TODO: zrobic tak zeby zwracal JSONA 
    const collection = db.collection("surveys")
    const cursor = collection
      .find()
      .limit(1)
      .sort({ $natural: -1 })

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
        text: req.body.text, 
        title: req.body.title,
        forCount: req.body.forCount,
        againstCount: req.body.againstCount
      }
      console.log(req.body)
      db.collection("surveys").update(details, answer, (err, result) => {
        if (err) {
          res.send({ error: "An error has occurred" })
        } else {
          // console.log(req.body)
          res.status(200).send(answer)
        }
      })
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

