const mongoose = require('mongoose');

const userSchema= mongoose.Schema({
    fname:String,
    lname:String,
    email:String,
    pwd:String,
    postcode:Number,
    country:String,
    city:String,
    phone:Number,
    role : {
        type : String,
        default : 'Admin'
    }
});


const user = mongoose.model('User',userSchema);

module.exports= user;