const express = require("express");
const bodyParser = require("body-parser");
// const { ObjectId } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;

const MongoClient = require('mongodb').MongoClient;
 

const password = "plxU1BzIulYs0uiO"

const uri = "mongodb+srv://organicUser:plxU1BzIulYs0uiO@cluster0.dhmoa.mongodb.net/organicdb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req,res)=>{
res.sendFile(__dirname + "/index.html")
  
})



client.connect(err => {
  const productCollection = client.db("organicdb").collection("projects");

  app.get("/products", (req,res)=>{
    productCollection.find({}).limit(4)
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })

  app.post("/addProduct", (req,res)=>{
   const product = req.body
  productCollection.insertOne(product)
  .then(result=>{
    console.log("data added succesfully")
    res.send('success')
  })
  })
app.delete ('/delete/:id', (req,res)=>{
 productCollection.deleteOne({_id: ObjectId(req.params.id)})
 .then(result=>{
  console.log(result);
 })
})

});

app.listen(3000);

// collection.insertOne(product)

// .then(result=>{
//     console.log("one product added")