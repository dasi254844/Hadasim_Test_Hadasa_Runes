import express from 'express';
import { getAllOrders, getOrdersByStatus, getOrdersFromSupplierById, updateOrderStatus, approveOrder } from '../controllers/orderController.js';

const router = express.Router();


// Get all orders
router.get('/', getAllOrders);

// Get orders for a specific supplier by supplier ID
router.get("/supplier/:id", getOrdersFromSupplierById);

// Get orders by status
router.get('/status/:status', getOrdersByStatus);

// Update the status of an order
router.put('/updatestatus/:id/:status', updateOrderStatus);

// Approve an order by the supplier
router.put('/approve/:id', approveOrder);

export default router;
