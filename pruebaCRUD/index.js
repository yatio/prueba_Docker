const express = require('express');
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

var url = "mongodb://mongo:27017/yatio-test";
var dbo;
// app.listen(3000, function() {
//   console.log('listening on 3000')
// })

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
//   // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
//   // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
// })


//coneccion a mongodb
MongoClient.connect(url, (err, client) => {
  if (err) return console.log(err)
  dbo = client.db('star-wars-quotes'); // whatever your database name is
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

//paraguardar en la base de datos
app.post('/quotes', (req, res) => {
  dbo.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})

//lee y pone en array
app.get('/', (req, res) => {
  dbo.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})

app.put('/quotes', (req, res) => {
  dbo.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: "req.body.name",
      quote: "req.body.quote"
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/quotes', (req, res) => {
  dbo.collection('quotes').findOneAndDelete({name: req.body.name}, (err, result) => {
    if (err) return res.send(500, err)
    res.send('A darth vadar quote got deleted')
  })
})

