const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {user} = require('./../server/models/user');

// var id='5b8fdb97278ce3205f7789cd';

// if(ObjectId.isValid(id)){
//     console.log('Id not valid');
// }

// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos', todos);

// },(e)=>{
//     console.log(e);

// });

// Todo.findOne({
//     _id:id
// }).then((todo)=>{
//     console.log('Todo', todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Id not found');
//     }
//     console.log('Todo Ny Id', todo);
// }).catch((e)=>console.log(e));

var id = '5b8d71141893e116dc2c2e44';
user.findById(id).then((user)=>{
    if(!user) return console.log('User not found');
    console.log('User', user);
}).catch((e)=>console.log(e));