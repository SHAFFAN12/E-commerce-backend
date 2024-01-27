const { validationResult } = require('express-validator');
const Vendor = require('../models/vendor');
const Product = require('../models/product')

const addstore = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const { storeName, category } = req.body;

    // Check if a store with the given name already exists for the vendor
    const existingStore = await Vendor.findOne({ storeName });

    if (existingStore) {
      return res.status(400).json({ msg: 'Store already exists' });
    }

    // Create a new store using the Vendor model
    const vendor = new Vendor({
      storeName,
      category,
      vendor: req.user.id,
    });

    // Save the new store to the database
    await vendor.save();

    res.status(201).json(vendor);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server error' });
  }
};

const getallstore = async (req, res) => {
  try {
    const store = await Vendor.find({ vendor: req.user.id }).sort({
      created_at: -1,
    });
    res.json(store);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

const updatestore = async (req, res) => {
  const id = req.params.id;
  const { storeName, category } = req.body;
  try {
    let storeField = {};
    if (storeName) storeField.storeName = storeName;
    if (category) storeField.category = category;

    // Find the store by ID
    let updatedStore = await Vendor.findById(id);

    if (!updatedStore) {
      return res.status(404).json({ msg: 'Store not found' });
    }

    // Check if the authenticated vendor is authorized to update the store
    if (req.user.id.toString() !== updatedStore.vendor.toString()) {
      return res.status(401).json({
        msg: 'Invalid authorization',
      });
    }

    // Update the store and return the updated document
    updatedStore = await Vendor.findByIdAndUpdate(
      id,
      { $set: storeField },
      { new: true }
    );

    return res.json(updatedStore);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
};

const deletestore = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStore = await Vendor.findByIdAndDelete(id);

    if (!deleteStore) {
      return res.status(404).json({ msg: 'Store not found' });
    }

    res.json({ message: 'Store deleted successfully' });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: 'Server error' });
  }
};








































const addProduct =async(req,res)=>{

    try {
        const result = validationResult(req);
        if (!result.isEmpty()) {
          return res.status(400).json({ errors: result.array() });
        }
    
        const { product, price, category } = req.body;
    


        const storeId = req.params.storeId;

        // Create a new product using the Vendor model
        const newProduct = new Product({
          product,
          price,
          category,
          storeName: storeId,
        });
        console.log('newProduct:', newProduct);

        // Save the new store to the database
        await newProduct.save();
    
        res.status(201).json(newProduct);
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
      }
}

const getallProduct =async(req, res)=>{
    try {
        const product = await Product.find({ storeName: req.vendor.id }).sort({
          created_at: -1,
        });
        res.json(product);
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: 'Server error' });
      }

}

const updateProduct =async(req ,res)=>{
    const id = req.params.id;
    const { product, price,category } = req.body;
    try {
      let productField = {};
      if (product) productField.product = product;
      if (price) productField.price = price;
      if (category) productField.category = category;
  
      // Find the store by ID
      let updatedProduct = await Product.findById(id);
  
      if (!updatedProduct) {
        return res.status(404).json({ msg: 'Store not found' });
      }
  
      // Check if the authenticated vendor is authorized to update the store
      if (req.vendor.id.toString() !== updatedProduct.product.toString()) {
        return res.status(401).json({
          msg: 'Invalid authorization',
        });
      }
  
      // Update the store and return the updated document
      updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: storeField },
        { new: true }
      );
  
      return res.json(updatedProduct);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }

}

const deleteProduct =async(req, res)=>{

    try {
        const id = req.params.id;
        const deleteProduct = await Product.findByIdAndDelete(id);
    
        if (!deleteProduct) {
          return res.status(404).json({ msg: 'Product not found' });
        }
    
        res.json({ message: 'Product deleted successfully' });
      } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: 'Server error' });
      }
}

module.exports = { addstore, getallstore, updatestore, deletestore ,addProduct,getallProduct,updateProduct,deleteProduct };
