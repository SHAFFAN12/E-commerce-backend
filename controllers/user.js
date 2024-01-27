const Product = require('../models/product')
const Order =require('../models/order')
const User =require('../models/user')
const mongoose = require('mongoose');

const getallProduct =async(req,res)=>{
    try{
        const products =await Product.find()
        res.json(products);
    }
    catch(err){
        console.error(err.message)
        res.status(500).json({msg:'server error'})
    }
    
}

const makeOrder = async (req, res) => {
    try {
      const userId = req.user.id;
      const orders = req.body;
      console.log('Received Request Body:', req.body);
  
      const orderResults = await Promise.all(
        orders.map(async (order) => {
          const { productId, quantity } = order;
  
          const product = await Product.findById(productId);
  
          if (!product) {
            throw new Error(`Product with ID ${productId} not found`);
          }
  
          const newOrder = new Order({
            user: userId,
            productId: productId,
            quantity,
            totalPrice: product.price * quantity,
            vendor: product.storeName,
            storeName: product.storeName,
          });
  
          await newOrder.save();
          return newOrder;
        })
      );
  
      res.status(201).json(orderResults);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Server error' });
    }
  };
  





 const getuserprofile =async(req,res)=>{
try {
      const userId = req.user.id;
    const userprofile =await User.findById(userId).select('-password');
    if(!userprofile) throw new Error('User Not found');
    res.json(userprofile)
    

} catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
}
 }

// const updateuserprofile =()=>{

// }


 const orderhistory =async(req,res)=>{
    try {
    const userId=req.user.id;
    const orderHistory= await Order.find({user:userId}).sort({
        created_at:-1
    });

res.json(orderHistory);
 } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'Server error'})
 }

 }


module.exports={getallProduct,makeOrder,getuserprofile, orderhistory}

