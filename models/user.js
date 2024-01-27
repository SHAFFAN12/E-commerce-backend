const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type : String
    },
    email:{
        type: String,
        unique:true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    role:{
        type:String,
        enum:['user','vendor','admin'],
        default:'user',
    },
    phoneNumber: {
        type: String,  
        unique:true,
        require: true
    },
    isApproved:{
        type:Boolean,
        default:false,
    },
    created_at:{
        type:Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('user',userSchema)