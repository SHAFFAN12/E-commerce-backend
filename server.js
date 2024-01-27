const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();



app.use(express.json());

app.use('/api/auth',require('./routes/auth'))
app.use('/api/vendor',require('./routes/vendor'))
app.use('/api/products',require('./routes/user'))
app.use('/api/admin',require('./routes/admin'))

console.log('Sabr Rakho');





const dbConnect = async()=>{
try{
 const res= await  mongoose.connect(process.env.mongoUrl)
console.log("Mongo is connected")
}catch(err){
    console.error(err.message)
    process.exit(1);
}
}
    
dbConnect();
const PORT = process.env.PORT || 1000;

app.listen(PORT, () =>{
    console.log(`SERVER IS RUNNNG ON ${PORT}`);
})
