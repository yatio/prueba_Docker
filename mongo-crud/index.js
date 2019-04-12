var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://mongo:27017/";

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  // db.close();
});

// app.get('/', req,res =>{

// })


// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   dbo.collection("customers").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// }); 


function addData(){
  var dbo = db.db("mydb");
  var myobj = { name: id_name, address: "pepe" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
}






// MongoClient.connect(url, function(err, db) {
//   let id_name = "yatio";
//   if (err) throw err;
//   var dbo = db.db("mydb");
//   var myobj = { name: id_name, address: "pepe" };
//   dbo.collection("customers").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// }); 
