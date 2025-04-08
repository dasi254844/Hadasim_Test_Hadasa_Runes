import express from 'express';
import { loginSupplier, addSupplier } from '../controllers/supplierController.js';

const router = express.Router();

// Register a new supplier
router.post('/register', addSupplier);

// Existing supplier login
router.post('/login', loginSupplier);

export default router;



