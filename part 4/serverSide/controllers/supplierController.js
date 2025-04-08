import Supplier from "../models/supplierModel.js";
import Order from "../models/orderModel.js";

// Function to add a new supplier
export const addSupplier = async (req, res) => {
    try {
        const { companyName, representativeName, phone, products } = req.body;

        // Check if the supplier already exists
        const existingSupplier = await Supplier.findOne({ companyName: req.body.companyName });
        if (existingSupplier) {
            return res.status(400).json({ message: "Supplier already exists" });
        }

        const newSupplier = new Supplier(req.body);

        const savedSupplier = await newSupplier.save();
        res.status(201).json(savedSupplier);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Function to login a supplier
export const loginSupplier = async (req, res) => {
    try {
        const { representativeName, password } = req.body;

        const data = await Supplier.findOne({ representativeName });

        if (!data) {
            return res.status(400).json({ message: "No supplier with such details" });
        }
        if (data.password != password)
            return res.status(400).json({ message: "The password is incorrect." });

        res.json(data)
    } catch (err) {
        console.error('Login error:', err); // Added log for errors
        res.status(500).json({ message: err.message });
    }
};

// Function to view the orders made by a specific supplier (grocery store owner)
export const getSupplierOrders = async (req, res) => {
    try {
        const supplier = await Supplier.findById(req.params.id);  // Retrieve the supplier's orders
        if (!supplier) {
            return res.status(404).json({ title: "Error finding supplier", message: 'Supplier not found' });
        }
        res.status(200).json(supplier.orders);  // Return the list of orders
    } catch (err) {
        res.status(400).json({ title: "Error", message: err.message });
    }
};
