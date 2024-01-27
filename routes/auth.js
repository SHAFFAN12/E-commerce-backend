const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');

const auth = require('../middleware/auth')
const {check} = require('express-validator')


router.post('/userregister',[
check('name','Enter your full name').not().isEmpty(),
check('email','Enter your full email').isEmail(),
check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
check('phoneNumber', 'Phone number is required').not().isEmpty(),
],authController.userregister);


router.post('/userlogin',
[
    check('email','Enter your full email').isEmail(),
    check('password','Enter your valid password').exists(),
],authController.userlogin);

router.get('/userlogin',auth,authController.userauth);


















router.post('/vendorregister',[
    check('name','Enter your full name').not().isEmpty(),
    check('email','Enter your full email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),
    ],authController.vendorregister);
    
    
    
router.post('/vendorlogin',
[
    check('email','Enter your full email').isEmail(),
    check('password','Enter your valid password').exists(),
],authController.vendorlogin);


    router.get('/vendorlogin',auth,authController.vendorauth);































    
router.post('/adminregister',[
    check('name','Enter your full name').not().isEmpty(),
    check('email','Enter your full email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 4 }),
    check('phoneNumber', 'Phone number is required').not().isEmpty(),

    ],authController.adminregister);
    
    
    router.post('/adminlogin',
[
    check('email','Enter your full email').isEmail(),
    check('password','Enter your valid password').exists(),
],authController.adminlogin);


    router.get('/adminlogin',auth,authController.adminauth);



module.exports = router;