import express from "express"
import {getProduct, getProducts, createProduct} from "../controllers/product.controller.js"

const router = express.Router()

router.get("/", getProducts)
router.get("/:id", getProduct)
router.post("/", createProduct)

export default router