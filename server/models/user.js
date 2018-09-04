var mongoose = require('mongoose');
//create user model

var user = mongoose.model('Users',{

    email:{
        type: String,
        required: true,
        minlength:2,
        trim: true

    }
});

// var newUser = new user({
//     email:"ranzo9430@gmail.com"
// });

// newUser.save().then((doc)=>{
//    console.log('User Added', doc);
// },(err)=>{
//     console.log('Umable to add user');
// })

module.exports = {user};