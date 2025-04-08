import axios from "axios";

let baseUrl = "http://localhost:3001/api/supplier";

// Function to register a new supplier
export const addSupplierApi = async (supplier) => {
    return axios.post(baseUrl + "/register", supplier)
};

// Function to log in an existing supplier
export const loginSupplierApi = async (supplier) => {
    return axios.post(baseUrl + "/login", supplier)
};



