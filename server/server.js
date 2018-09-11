require('./config/config');
//do not make server file complex
const _=require('lodash');
var express = require('express');
// mporting objectid
var {ObjectId} = require('mongodb');
var {authenticate} = require('./middleware/authenticate');

//used to send the json to server
var bodyParser = require('body-parser');

//port
const port = process.env.PORT ;


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
    });
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

app.delete('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectId.isValid(id)){
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then((todo)=>{
        if(!todo){
            return res.status(404).send();
        }
        //return object as a response body
        res.status(200).send({todo});
    }).catch((e)=>res.status(404).send('Invalid id'));
});


// patch is use to update the resources
app.patch('/todos/:id', (req, res)=>{
  var id  = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectId.isValid(id)){
       return res.status(400).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
      body.completedAt = new Date().getTime();

  }else{
      body.completed = false;
      body.completedAt = null;

  }
   Todo.findByIdAndUpdate(id,
    {$set:body},
    {new: true}

   ).then((todo)=>{
       if(!todo) return res.status(404).send();
       res.send({todo});
      
   }).catch((e)=>{
       //401 means authentication is required
       res.status(401).send();
   });


});

app.post('/users', (req, res)=>{
     //fetch the selected property using lodash
     var body = _.pick(req.body, ['email', 'password']);
     var _user = new user(body);

     _user.save().then(()=>{
        return _user.generateAuthToken();
     }).then((token)=>{
             res.header('x-auth', token).send(_user);
     }).catch((e)=>{
        res.status(400).send(e);
     });

});
//actual route would not get call untill it get authenticated


app.get('/users/me',authenticate, (req, res)=>{
    // var token  = req.header('x-auth');


    // user.findByToken(token).then((User)=>{
    //     if(!User){
    //         // res.status(401).send();
    //         return Promise.reject();
    //     }
    //     //happy path
    //     res.send(User);
    // }).catch((err)=>{
    //       res.status(401).send();
    // });
    res.send(req.User);
});

app.listen(port ,  ()=>{
    console.log(`Started up at port ${port}`);
});

module.exports = {app};