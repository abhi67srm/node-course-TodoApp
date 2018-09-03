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

    //     db.collection('Users').find({name:"Abhishek"})
    //     .toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs, undefined, 2));
        
    // },(err)=>{
    // console.log('Unable to fetch document', err);
    // });

    // Delete documents from Todos collections
    
    // db.collection('Todos').deleteMany({text: `Eat lunch`}).then((result)=>{
    //     console.log(result);
    // });

    // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
    //        console.log(result);
    // });
     
    // db.collection('Todos').findOneAndDelete({text:'Something to do'}).then((result)=>{
    //     console.log(result);
    // });

    //db.collection('Users').deleteMany({name: 'fs'});
    // db.collection('Users').findOneAndDelete({
    //     _id: new ObjectID('5b88ba5c2c4d672b5decac5f')
    //     }).then((result)=>{
    //         console.log(JSON.stringify(result, undefined,2));
    // })
    //  db.collection('Todos').findOneAndUpdate({
    //      _id:new ObjectID('5b865f228e0fff43bd8e763f')
    //  },{
    //    $set:{
    //      completed: true
    //    }  
    //  },{
    //     returnOriginal: false 
    //  }).then((result)=>{
    //      console.log(result);
    //  })
    db.collection('Users').findOneAndUpdate({
        _id:new ObjectID('5b8654b22f446e1cd1490242')
    },{
      $set:{
        name: 'Ambuj'
      },
      $inc:{
          age:-2
      } 
    },
    {
       returnOriginal: false 
    }).then((result)=>{
        console.log(result);
    })

    
    // client.close();
})