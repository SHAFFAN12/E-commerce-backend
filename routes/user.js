const express=require('express')
const router =express.Router()
const userController =require('../controllers/user')
const auth =require('../middleware/auth')


router.get('/',userController.getallProduct)
router.get('/profile',auth,userController.getuserprofile)
router.get('/order-history', auth,userController.orderhistory);

router.post('/',auth,userController.makeOrder)



module.exports=router