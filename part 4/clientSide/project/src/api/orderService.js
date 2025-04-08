import axios from "axios";

let baseUrl = "http://localhost:3001/api/order";

// Function to get all orders of a supplier by ID
export const getOrdersFromSupplierByIdApi = (supplierId) => {
    return axios.get(`${baseUrl}/supplier/` + supplierId)
}

// Function to approve an order
export const approveOrderApi = (orderId) => {
    return axios.put(`${baseUrl}/approve/${orderId}`)
};

