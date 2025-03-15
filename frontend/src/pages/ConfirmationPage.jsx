import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"

const ConfirmationPage = () => {
  const [searchParams] = useSearchParams()
  const productId = searchParams.get("productId")
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const [orderDetails, setOrderDetails] = useState({
    customerId: "",
    quantity: 1,
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (!productId) {
      navigate("/products")
      return
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`)
        const data = await response.json()
        if (data.success) {
          setProduct(data.data)
        } else {
          console.error("Product not found:", data.message)
          navigate("/products")
        }
      } catch (error) {
        console.error("Error fetching product:", error)
        navigate("/products")
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId, navigate])

  const handleInputChange = (e) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value })
  }

  const handleSubmitOrder = async (e) => {
    e.preventDefault()

    const orderPayload = {
      customer: orderDetails.customerId,
      products: [{ product: productId, quantity: orderDetails.quantity }],
      status: "placed",
    }

    console.log("🚀 Sending Order Payload:", JSON.stringify(orderPayload, null, 2))

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      })

      const data = await response.json()
      console.log("🛠️ Server Response:", data)

      if (data.success) {
        alert("✅ Order placed successfully!")
        navigate("/products")
      } else {
        console.error("❌ Order failed:", data.message)
      }
    } catch (error) {
      console.error("❌ Error placing order:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-700"></div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-4 px-6">
          <h2 className="text-xl font-semibold text-white">Confirm Your Order</h2>
        </div>

        {product && (
          <div className="p-6">
            <div className="flex items-center bg-gray-50 p-4 rounded-lg mb-6">
              <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                <img
                  src={product.image || "https://via.placeholder.com/150"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-1">{product.category}</p>
                <p className="text-lg font-bold text-teal-600">${product.price}</p>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer ID</label>
                <input
                  type="text"
                  name="customerId"
                  value={orderDetails.customerId}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  placeholder="Enter customer ID"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  min="1"
                  value={orderDetails.quantity}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  required
                />
              </div>

              <div className="pt-4 flex justify-between items-center">
                <div className="text-lg font-bold text-gray-800">
                  Total: <span className="text-teal-600">${(product.price * orderDetails.quantity).toFixed(2)}</span>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => navigate("/products")}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:opacity-90 transition-colors duration-200 shadow-md flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Confirm Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConfirmationPage

