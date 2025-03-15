import express from "express"
import { getOrders, getOrder, getOrdersByStatus, updateOrderStatus, createOrder} from "../controllers/order.controller.js"


const router = express.Router()

router.get("/", getOrders )

router.get("/:id", getOrder )

router.get("/status/:status", getOrdersByStatus)

router.put("/:id/status", updateOrderStatus)

router.post("/", createOrder )

export default router