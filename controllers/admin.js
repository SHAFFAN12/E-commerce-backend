
const User =require('../models/user')
const Order =require('../models/order')
const Product =require('../models/product')
const Vendor =require('../models/vendor')

// i change this function

const getAllUsers =async(req,res)=>{
    try {
        const users = await User.find().select('-password -isApproved');

        // Filter out admin users
        const filteredUsers = users.filter(user => user.role !== 'admin');

        // Map the remaining users to include id, name,phoneNumber and role
        const userDetails = filteredUsers.map(user => ({
            id: user._id,
            name: user.name,
            role: user.role,
            phoneNumber: user.phoneNumber
        }));

        res.json(userDetails);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
}

// i change this function
const deactivateUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findOneAndDelete({ _id: userId });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ msg: 'User deactivated or deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};






const getAllVendors =async(req,res)=>{
    try {
        const vendors = await User.find({ role: 'vendor' }).select('-password');
        res.json(vendors);
    } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}

const approveVendor =async(req,res)=>{
 const vendorId= req.params.vendorId
 try {
     
     await User.findByIdAndUpdate(vendorId, { isApproved: true }, { new: true });
    res.json(`${vendorId} vendor approved`)
 } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}
const rejectVendor =async(req,res)=>{
    const vendorId= req.params.vendorId
    try {
        await User.findByIdAndUpdate(vendorId, { isApproved: false }, { new: true });
    res.json(`${vendorId} vendor is rejected `)
} catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}










const getAllProducts =async(req,res)=>{
    try {
        const products =await Product.find()
        res.json(products)
    } catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}


const approveProduct =async(req,res)=>{
    const productId= req.params.productId
    try {
        await Product.findByIdAndUpdate(productId,{isApproved: true})
        res.json(`${productId} product is approved `) }
     catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
}
}
const rejectProduct =async(req,res)=>{
    const productId= req.params.productId
    try {
        await Product.findByIdAndUpdate(productId,{isApproved: false})
        res.json(`${productId} product is rejected `) }
        catch (err) {
            console.error(err.message)
            res.status(500).json({msg:'server error'})
 }
}

























const getAllOrders =async(req,res)=>{

    try {
        const order= await Order.find()
        res.json(order)
    }
     catch (err) {
    console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}

const shippedOrderStatus =async(req,res)=>{
const orderId = req.params.orderId;
try {
await Order.findByIdAndUpdate(orderId,{orderstatus:{ enum:['shipped']}})
        res.json(orderId+`Order is shipped`)
    }
    catch (err) {
        console.error(err.message)
        res.status(500).json({msg:'server error'})
    }
}
const cancelOrderStatus =async(req,res)=>{
    const orderId = req.params.orderId;
    try {
await Order.findByIdAndUpdate(orderId,{orderstatus:{ enum:['cancel']}})
        res.json(orderId+`Order is cancel`)
            }
     catch (err) {
         console.error(err.message)
    res.status(500).json({msg:'server error'})
 }
}




module.exports={getAllOrders,getAllProducts,getAllUsers,getAllVendors, 
    deactivateUser , approveVendor , rejectVendor , approveProduct , rejectProduct , shippedOrderStatus  ,cancelOrderStatus}