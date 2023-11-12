require('dotenv').config()
let express = require('express');
let app = express();
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use("/public", express.static(__dirname + "/public"))
app.use(function (req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip)
  next()
})

app.get("/", function(_req, res) {
  res.sendFile(__dirname + "/views/index.html")
})

app.get("/json", function(req, res) {
  const message = "Hello json"
  const isUpperCase = process.env['MESSAGE_STYLE'] == "uppercase"
  const response = {
    "message": isUpperCase ? message.toUpperCase() : message
  }
  res.json(response)
})

app.get("/now", 
  function(req, res , next) {
    req.time = new Date().toString()
    next()
  },
  function(req, res) {
    res.json({"time": req.time})
  }
)

app.get("/:word/echo", function (req, res) {
  const word = req.params.word
  res.send({ echo: word })
})


app.route("/name")
  .get(function (req, res) {
    const fullName = req.query.first + " " + req.query.last
    res.json({ name: fullName })
  })
  .post(function (req, res) {
    const fullName = req.body.first + " " + req.body.last
    console.log(req.body)
    res.json({ name: fullName })
  })

module.exports = app;
