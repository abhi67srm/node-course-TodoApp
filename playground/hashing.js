const {SHA256} = require('crypto-js');
  const jwt = require('jsonwebtoken');

// var message = 'I am user number 4';
// var hash = SHA256(message).toString();

//injecting hash variable
//console.log(hash);


// var data = {
//     id:4
// };
// data.id = 5;
// var before_HASH = SHA256(JSON.stringify(data)+ 'sonsecret').toString();

//stringify only need when we have object
//when var is already string why the heck will change it to string

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data)+ 'sonsecret').toString()
// };

//check if both hash are equal or not
// if(before_HASH === token.hash){
//     console.log('Data was not compromised');

// }else{
//     console.log('Alert! Data was compromised');
// }

var data = {
    id:10
};

var token  = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('Decoded',decoded);
