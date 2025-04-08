import mongoose, { Schema, model } from "mongoose";

// Schema for individual order items
const orderItemSchema = new mongoose.Schema({
    name: { type: String, required: true },  
    quantity: { type: Number, required: true },  
    pricePerUnit: { type: Number, required: true }  
});

// Main schema for orders
const orderSchema = new mongoose.Schema({
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },  
    items: [orderItemSchema], 
    status: {
        type: String,
        enum: ['Pending Approval', 'In Process', 'Completed'], 
        default: 'Pending Approval' 
    },
    date: { type: Date, default: Date.now }  
});

// Model for orders
const Order = mongoose.model('Order', orderSchema);
export default Order;
