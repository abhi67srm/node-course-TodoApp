var express = require('express');
// mporting objectid
var {ObjectId} = require('mongodb');

//used to send the json to server
var bodyParser = require('body-parser');

//port
const port = process.env.port || 3000;


//load in mongoose
var {mongoose} = require('./db/mongoose');
var {user} = require('./models/user');
var {Todo} = require('./models/todos');

var app = express();
app.use(bodyParser.json());

app.post('/todos', (req, res)=>{
    var todo = new Todo({
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.send(JSON.stringify(doc, undefined, 2));
    },(e)=>{
         res.status(400).send(e);
    })
});

app.get('/todos', (req, res)=>{
    Todo.find().then((todos)=>{
         res.send({todos});
    },(e)=>{
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res)=>{
    var id = req.params.id;
    // valid id using isValid
    if(!ObjectId.isValid(id)){
        return res.status(404).send();

    }
    
    Todo.findById(id).then((todo)=>{
        if(!todo) return res.status(404).send();
        console.log('Todo', todo);
        res.send({todo});
    }).catch((e)=>{res.status(404).send()});
});



app.listen(port,()=>{
    console.log(`Started up at port ${port}`);
});

module.exports = {app};