import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./config/db.js"
import customerRoutes from "./routes/customer.route.js"
import orderRoutes from "./routes/order.route.js"
import productRoutes from "./routes/product.route.js"
import path from "path"


dotenv.config()

const app = express()
const PORT = process.env.PORT || 5004

const __dirname = path.resolve()

app.use(express.json())

app.use("/api/customers", customerRoutes)
app.use("/api/products", productRoutes)
app.use("/api/orders", orderRoutes)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
}



app.listen(PORT, () => {
    connectDB()
    console.log(`Server started at PORT ${PORT}`)
})