const {MongoClient, ObjectID}  = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client)=>{
    if(err) return console.log('Unable to connect to database', err);
    console.log('Connected to database server');

    const db = client.db('TodoApp');
    
    // db.collection('Users').insertOne({
    //     name:"fs",
    //     age:20,
    //     location:"chennai"
    // }, (err, result)=>{
    //     if(err) return console.log('Unable to insert data into collections');
    //     console.log('Document inserted successfully', result.ops);
    // })
    
    //query data insde mongo database
    // db.collection('Todos').find({completed: false}).toArray().then((document)=>{
    //      console.log('Todos');
    //      console.log(JSON.stringify(document, undefined, 2));
    // },(err)=>{
    //     console.log('Unable to fetch document', err);
    // });

//     db.collection('Todos').find({
//         _id:new ObjectID('5b86530f3e363b1c58e93a06')})
//         .toArray().then((document)=>{
//         console.log('Todos');
//         console.log(JSON.stringify(document, undefined, 2));
//    },(err)=>{
//        console.log('Unable to fetch document', err);
//    });

        // db.collection('Users').find({name:"Abhishek"})
        //     .count().then((count)=>{
        //     console.log(`Todos count: ${count}`);
            
        // },(err)=>{
        // console.log('Unable to fetch document', err);
        // });

        db.collection('Users').find({name:"Abhishek"})
        .toArray().then((docs)=>{
        console.log(JSON.stringify(docs, undefined, 2));
        
    },(err)=>{
    console.log('Unable to fetch document', err);
    });



    // client.close();
})