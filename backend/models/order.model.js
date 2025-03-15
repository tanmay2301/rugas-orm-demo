import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer", required: true }, // Foreign key
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, // Foreign key
                quantity: { type: Number, required: true, min: 1 } // Quantity of the product in the order
            }
        ],
        status: { type: String, enum: ["placed", "shipped", "delivered", "cancelled"], default: "placed" }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
