var mongoose = require('mongoose');
//create Todo model
var Todo = mongoose.model('Todo',{
    text:{
       type: String,
       required: true,
       minlength: 1,
       trim: true

    },
    completed:{
        type:Boolean,
        default: false
    },
    completedAt:{
        type:Number,
        default:null
    }
});

//create an instance for todo model
//Todo constructor function takes few arguments
// var newTodo = new Todo({
//     text: ' Edit this video ' 
// });

// var newTodo2 = new Todo({
//     text:'Completed Node today',
//     completed:false,
//     completedAt:9

// })

//create an method on todo to store the data into mongodb

// newTodo.save().then((doc)=>{
//     console.log('Saved todo', doc);
// },(err)=>{
//    console.log('Unable to save todo'); 
// });

// newTodo2.save().then((doc)=>{
//    console.log('Saved todo', doc);
// },(err)=>{
//     console.log('Unable to save todo');
// });

module.exports  ={Todo};