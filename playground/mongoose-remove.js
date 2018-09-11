const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {user} = require('./../server/models/user');

//Todo.remove

Todo.remove({}).then((result)=>{
    console.log(result);
});
//it is gonna match very first argument
//Todo.findOneAndRemove()
//Todo.findByIdRemove

// Todo.findByIdAndRemove('5b92af5a33584df53bd68441').then((todo)=>{
//    console.log(todo);
// });

//passing the query string
Todo.findOneAndRemove({_id:'5b92b05233584df53bd68491'}).then((todo)=>{
   console.log(todo);
});