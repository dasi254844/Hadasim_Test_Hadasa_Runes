import Order from "../models/orderModel.js";


// Function to get all orders
export const getAllOrders = async (req, res) => {
    try {
        let limit = req.query.limit || 20;
        let page = req.query.page || 1;
        let data = await Order.find().skip((page - 1) * limit).limit(limit);

        if (!data)
            return res.status(404).json({ title: "cannot get all", message: "There are no products yet" })
        res.json(data);
    }
    catch (err) {
        return res.status(400).json({ title: "cannot get all", message: err.message })
    }
}

// Function to get all orders of a specific supplier by their ID
export const getOrdersFromSupplierById = async (req, res) => {
    let { id } = req.params;
    let data = await Order.find({ supplierId: id });
    try {
        if (data.length === 0)
            return res.status(404).json({
                title: "No Orders Found",
                message: `No orders found for supplier with ID: ${id}`
            });
        res.json(data);
    }
    catch (err) {
        return res.status(500).json({
            title: "Cannot Retrieve Orders",
            message: err.message
        });
    }
}

// Function to get orders by their status
export const getOrdersByStatus = async (req, res) => {
    let limit = req.query.limit || 20;
    let page = req.query.page || 1;
    let { status } = req.params;
    let data = await Order.find({ status: status }).skip((page - 1) * limit).limit(limit);
    try {
        if (data.length === 0)
            return res.status(404).json({
                title: "No Orders Found",
                message: `No orders found with status: ${status}`
            });
        res.json(data);
    }
    catch (err) {
        return res.status(500).json({
            title: "Cannot Retrieve Orders",
            message: err.message
        });
    }
};

// Function to update the status of an order
export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        // Find the order by its ID
        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                title: "Order Not Found",
                message: `Order with ID: ${id} not found`
            });
        }
        order.status = status; // Update the status

        await Order.save();

        res.json(order);
    } catch (err) {

        return res.status(500).json({
            title: "Cannot Update Order",
            message: err.message
        });
    }
};

// Function to approve an order and change its status to 'In Process'
export const approveOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);  // Find the order by its ID
        console.log("good" + order)

        // Check if the order exists
        if (!order) {
            console.log("notGood" + order)
            return res.status(404).json({ title: "error by found order", message: 'Order not found' });
        }
        order.status = 'In Process';  // Change the status
        await order.save();           // Save the changes
        console.log(order)
        res.status(200).json(order);  // Return the approved order
    } catch (err) {
        res.status(400).json({ title: "error", message: err.message });
    }
};

