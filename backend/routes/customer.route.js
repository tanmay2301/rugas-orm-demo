import express from "express"
import { createCustomer, getCustomer, getCustomers } from "../controllers/customer.controller.js"

const router = express.Router()

router.get("/", getCustomers )

router.get("/:id", getCustomer )

router.post("/", createCustomer )

export default router