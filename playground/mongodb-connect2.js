//  const MongoClinet = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

//object destructuring
// var user = {name:"Abhishek", age:22};
// var {name} = user;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{

   if(err){
       //function will stop after returning
      return console.log('Unable to connect to mongodb server');

   }
   console.log('Connected to mongodb server');
   const db = client.db('TodoApp');

   //insert a new record into collection
//    db.collection('Todos').insertOne({
//        text: 'Something to do',
//        completed: false

//    },(err, result)=>{
//        if(err) return console.log('Unable to insert todo',err);
//        console.log(JSON.stringify(result.ops, undefined, 2));


//    })
   //Insert new doc into  Users(name, age, location)
//    db.collection('Users').insertOne(
//        {
//        name:"Abhishek",
//        age:22,
//        location:"Chennai 603203",
//        completed:false
//    },
// (err, result)=>{
//        if(err) return console.log("Unable to insert data", err);
//        //result.ops is array result of all the document got inserted 
//        //getTimestamp() retun times at which document was created
//        console.log(JSON.stringify(result.ops[0]._id.getTimestamp()));
//    })
   client.close();
});