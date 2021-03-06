const validator  =require('validator');
const  mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const _=require('lodash');
const bcrypt = require('bcryptjs');

var UserSchema = new  mongoose.Schema({

        email:{
            type: String,
            required: true,
            minlength:1,
            trim: true,
            unique:true,
            validate:{
                validator:(value)=>{
                    return validator.isEmail(value);
                },
                //validator: validator.isEmail;
                message:`{value} is not a valid email`
            }
    
        },
        password:{
            type: String,
            require: true,
            minlength:6
    
        },
        tokens:[
            {
                access:{
                    type: String,
                    required: true
    
                },
                token:{
                    type: String,
                    required: true
    
                }
    
             }
        ]
    });

    //what data will be send to user when mongo value converted to jso value
    UserSchema.methods.toJSON = function(){
        var user = this;
        var userObject = user.toObject();
        
        return _.pick(userObject, ['_id', 'email']);



    };

    UserSchema.methods.generateAuthToken = function(){
       var user = this;
       var access = 'auth';
       var token = jwt.sign({_id:user._id.toHexString(), access}, 'abc123').toString();

       user.tokens = user.tokens.concat([{access, token}]);

       return user.save().then(()=>{
          return token;
       });
    };

    UserSchema.statics.findByToken = function(token){
      var User = this;
      var decoded;
      try{
        decoded = jwt.verify(token, 'abc123');
      }catch(e){
        //  return new Promise((resolve, reject)=>{
        //     reject(); 
        //  });
        return Promise.reject();
      }

      return User.findOne({
      '_id': decoded._id,
      'tokens.token':token,
      'tokens.access':'auth'
      });

    };

    UserSchema.pre('save', function(next){
        var user = this;
        if(user.isModified('password')){
            bcrypt.genSalt(10, (err, salt)=>{
                bcrypt.hash(user.password, salt, (err, hash)=>{
                   user.password = hash;
                   next();
                });
            });
        }else{
            next();
        }
         
    });
var user = mongoose.model('Users',UserSchema);

// var newUser = new user({
//     email:"ranzo9430@gmail.com"
// });

// newUser.save().then((doc)=>{
//    console.log('User Added', doc);
// },(err)=>{
//     console.log('Umable to add user');
// })

module.exports = {user};