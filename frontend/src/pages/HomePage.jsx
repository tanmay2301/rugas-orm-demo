import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-purple-900 mb-3">Admin Dashboard</h1>
        <p className="text-gray-600 max-w-md mx-auto">
          Manage your store, customers, products, and orders all in one place.
        </p>
      </div>

      {/* Cards with buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 h-2"></div>
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Customer Management</h2>
            <p className="text-gray-600 mb-4">Onboard new customers and manage existing ones.</p>
            <button
              onClick={() => navigate("/customers")}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-md"
            >
              Onboard Customer
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
          <div className="bg-gradient-to-r from-teal-500 to-teal-700 h-2"></div>
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-teal-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Product Catalog</h2>
            <p className="text-gray-600 mb-4">Add, edit and manage your product inventory.</p>
            <button
              onClick={() => navigate("/products")}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-md"
            >
              Products
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:translate-y-[-4px]">
          <div className="bg-gradient-to-r from-amber-500 to-amber-700 h-2"></div>
          <div className="p-6">
            <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-amber-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Management</h2>
            <p className="text-gray-600 mb-4">Track and manage customer orders and shipments.</p>
            <button
              onClick={() => navigate("/orders")}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-700 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-md"
            >
              Manage Orders
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage

