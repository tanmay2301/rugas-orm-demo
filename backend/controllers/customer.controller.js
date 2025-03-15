import Customer from "../models/customer.model.js"
import mongoose from "mongoose"

export const getCustomers = async (req, res) => {
    try {
        const customer = await Customer.find({})
        res.status(201).json({success: true, data: customer})
    } catch (error) {
        console.log("Error in fetching customers", error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
        
    }
}

export const getCustomer = async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id)
        res.status(201).json({success: true, data: customer})
    } catch (error) {
        console.log("Error in fetching customer", error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
        
    }
}

export const createCustomer = async (req, res) => {
    const customer = req.body

    if (!customer.name || !customer.email || !customer.address || !customer.phone){
        return res.status(400).json({success: false, message: "Please fill all fields"})
    }
    
    const newCustomer = new Customer(customer)

    try {
        await newCustomer.save()
        res.status(201).json({success: true, data: newCustomer})
    } catch (error) {
        console.error("Error Registering Customer", error.message)
        res.status(500).json({success: false, message: "Internal Server Error"})
    }
}