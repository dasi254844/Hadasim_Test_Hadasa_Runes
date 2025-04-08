import mongoose, { Schema, model } from "mongoose";

// Schema for products offered by suppliers
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },  
    pricePerUnit: { type: Number, required: true },  
    minQuantity: { type: Number, required: true }  
});

// Schema for suppliers
const supplierSchema = new mongoose.Schema({
    id_supplier: { type: String, required: false }, 
    password: { type: String, required: true }, 
    companyName: { type: String, required: true }, 
    phoneNumber: { type: String, required: true },  
    representativeName: { type: String, required: true },  
    products: [productSchema]  
}, { strictPopulate: false });

// Virtual field for orders related to the supplier
supplierSchema.virtual('orders', {
  ref: 'Order', 
  localField: '_id',
  foreignField: 'supplierId' 
});

// Supplier model definition
const Supplier = mongoose.model('Supplier', supplierSchema);
export default Supplier;
