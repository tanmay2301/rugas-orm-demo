import Order from "../models/order.model.js";
import Customer from "../models/customer.model.js";  // ✅ Add this
import Product from "../models/product.model.js";  

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("customer") // Populate customer details
            .populate("products.product"); // Populate product details inside products array
        
        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log("Error fetching orders:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getOrder = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id)
            .populate("customer") // Populate customer details
            .populate("products.product"); // Populate product details inside products array

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.log("Error fetching order:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const getOrdersByStatus = async (req, res) => {
    const { status } = req.params;

    // Validate status
    const validStatuses = ["placed", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid order status" });
    }

    try {
        const orders = await Order.find({ status })
            .populate("customer")
            .populate("products.product");

        res.status(200).json({ success: true, data: orders });
    } catch (error) {
        console.log("Error fetching orders by status:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ["placed", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Invalid order status" });
    }

    try {
        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true } // Return updated document
        ).populate("customer").populate("products.product");

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, data: order });
    } catch (error) {
        console.log("Error updating order status:", error.message);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export const createOrder = async (req, res) => {
    try {
        console.log("Received Order Request:", req.body);

        const { customer, products } = req.body; 

        if (!customer || !products || !products.length) {
            console.log(" Validation Error: Missing customer or products");
            return res.status(400).json({ success: false, message: "Please provide customer and at least one product with quantity" });
        }

        console.log("Checking if Customer Exists...");
        const customerExists = await Customer.findById(customer);
        if (!customerExists) {
            console.log("❌ Customer Not Found:", customer);
            return res.status(404).json({ success: false, message: "Customer not found" });
        }

        console.log(" Validating Products...");
        const productIds = products.map(p => p.product);
        const existingProducts = await Product.find({ _id: { $in: productIds } });

        if (existingProducts.length !== products.length) {
            console.log(" One or more products not found:", productIds);
            return res.status(404).json({ success: false, message: "One or more products not found" });
        }

        console.log(" Creating Order...");
        const newOrder = new Order({
            customer, // Now using 'customer' instead of 'customerId'
            products,
            status: "placed",
        });

        await newOrder.save();
        console.log("Order Created Successfully:", newOrder);

        res.status(201).json({ success: true, data: newOrder });
    } catch (error) {
        console.log(" Error in createOrder:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};
