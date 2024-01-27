const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin');
const auth = require('../middleware/auth');



// user management
router.get('/users', auth, adminController.getAllUsers);
router.put('/users/:userId/deactivate', auth, adminController.deactivateUser);



// vendor management
router.get('/vendors', auth, adminController.getAllVendors);
router.put('/vendors/:vendorId/approve', auth, adminController.approveVendor);
router.put('/vendors/:vendorId/reject', auth, adminController.rejectVendor);




// Product Management
router.get('/products', auth, adminController.getAllProducts);
router.put('/products/:productId/approve', auth, adminController.approveProduct);
router.put('/products/:productId/reject', auth, adminController.rejectProduct);







// / Order Management
router.get('/orders', auth, adminController.getAllOrders);
router.put('/orders/:orderId/shipped', auth, adminController.shippedOrderStatus);
router.put('/orders/:orderId/cancel', auth, adminController.cancelOrderStatus);
















router.get('/getvendors',)
router.get('/getproduct',)




router.put('/approveproduct',)


module.exports= router;