var express = require('express');

//used to send the json to server
var bodyParser = require('body-parser');


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
    })
});



app.listen('3000',()=>{
    console.log('Started on port 3000');
});

module.exports = {app};