const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {validationResult}=require('express-validator');
const User =require('../models/user');

const userregister =async (req,res) =>{
    const result= validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors:result.array()})
    } 
    const {name, email,password,role,phoneNumber}=req.body
    try{
let user = await User.findOne({email});
if(user){
    return res.status(400).json({msg:'User already exist'})
}
user= new User({
    name,
     email,
    password,
    role,
    phoneNumber
})
user.role='user';


const salt =await bcrypt.genSalt(10)
user.password=await bcrypt.hash(password,salt);


await user.save();

const payload={
    user:{
        id:user.id,
    }
}

jwt.sign(payload,process.env.secretkey,{expiresIn:'1hr'},(err,token)=>{
    if(err) throw err
return res.json({token}) 
})

}catch(err){
console.error(err.message)
res.status(500).json({msg:'server error'})        
}
    }
    


const userlogin=async(req,res)=>{
const result = validationResult(req)
if(!result.isEmpty()){
    return res.status(400).json({error:result.array()})
}
const {email,password}=req.body;
try{
    const user =await User.findOne({email})
if(!user){
    return res.status(400).json({msg:'User dosnot exist'})
}
const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.status(400).json({msg:'invalid password'})
}
const payload={
    user:{
        id:user.id,
    },
};
jwt.sign(payload,process.env.secretkey,{expiresIn:'1hr'},(err,token)=>{
    if (err) throw err;
    return res.json({
        token
    })
})
}catch(err){
console.error(err.message)
return res.status(500).json({msg:'server error'})
}


}

const userauth =async (req,res)=>{
try{
    const user=await User.findById(req.user.id).select('-password')
    return res.json(user);
}
catch(err){
    console.error(err.message)
    return res.status(500).json({msg:'server error'})
}

}




// vendor
const vendorregister =async (req,res) =>{
    const result= validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors:result.array()})
    } 
    const {name, email,password,role,phoneNumber}=req.body
    try{
let user = await User.findOne({email});
if(user){
    return res.status(400).json({msg:'vendor already exist'})
}
user= new User({
    name,
    email,
    password,
    role,
    phoneNumber
})
user.role='vendor';


const salt =await bcrypt.genSalt(10)
user.password=await bcrypt.hash(password,salt);


await user.save();

const payload={
    user:{
        id:user.id,
    }
}

jwt.sign(payload,process.env.secretkey,{expiresIn:'1hr'},(err,token)=>{
    if(err) throw err
return res.json({token}) 
})

}catch(err){
console.error(err.message)
res.status(500).json({msg:'server error'})        
}
    }
    


const vendorlogin=async(req,res)=>{
const result = validationResult(req)
if(!result.isEmpty()){
    return res.status(400).json({error:result.array()})
}
const {email,password}=req.body;
try{
    const user =await User.findOne({email})
if(!user){
    return res.status(400).json({msg:'vendor does not exist'})
}
const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.status(400).json({msg:'invalid password'})
}
const payload={
    user:{
        id:user.id,
    },
};
jwt.sign(payload,process.env.secretkey,{expiresIn:'1hr'},(err,token)=>{
    if (err) throw err;
    return res.json({
        token
    })
})
}catch(err){
console.error(err.message)
return res.status(500).json({msg:'server error'})
}


}

const vendorauth =async (req,res)=>{
try{
    const user=await User.findById(req.user.id).select('-password')
    return res.json(user);
}
catch(err){
    console.error(err.message)
    return res.status(500).json({msg:'server error'})
}

}









// admin
const adminregister =async (req,res) =>{
    const result= validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({errors:result.array()})
    } 
    const {name, email,password,role,phoneNumber}=req.body
    try{
let user = await User.findOne({email});
if(user){
    return res.status(400).json({msg:'admin already exist'})
}
user= new User({
    name,
     email,
    password,
    role,
    phoneNumber
})
user.role='admin';


const salt =await bcrypt.genSalt(10)
user.password=await bcrypt.hash(password,salt);


await user.save();

const payload={
    user:{
        id:user.id,
    }
}

jwt.sign(payload,process.env.secretkey,{expiresIn:'1hr'},(err,token)=>{
    if(err) throw err
return res.json({token}) 
})

}catch(err){
console.error(err.message)
res.status(500).json({msg:'server error'})        
}
    }
    


const adminlogin=async(req,res)=>{
const result = validationResult(req)
if(!result.isEmpty()){
    return res.status(400).json({error:result.array()})
}
const {email,password}=req.body;
try{
    const user =await User.findOne({email})
if(!user){
    return res.status(400).json({msg:'admin does not exist'})
}
const isMatch = await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.status(400).json({msg:'invalid password'})
}
const payload={
    user:{
        id:user.id,
    },
};
jwt.sign(payload,process.env.secretkey,{expiresIn:'1hr'},(err,token)=>{
    if (err) throw err;
    return res.json({
        token
    })
})
}catch(err){
console.error(err.message)
return res.status(500).json({msg:'server error'})
}


}

const adminauth = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password -isApproved');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        return res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
};












module.exports={userauth,userlogin,userregister,vendorauth,vendorlogin,vendorregister,adminauth,adminlogin,adminregister}