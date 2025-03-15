import { Link, Outlet, useLocation } from "react-router-dom"

const Layout = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-6">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-teal-300"
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
            <h1 className="text-2xl font-bold tracking-tight">My Store</h1>
          </Link>
          <div className="flex space-x-6">
            <Link
              to="/"
              className={`transition-all duration-200 hover:text-teal-300 ${
                location.pathname === "/" ? "font-semibold text-teal-300 border-b-2 border-teal-300" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/products"
              className={`transition-all duration-200 hover:text-teal-300 ${
                location.pathname === "/products" ? "font-semibold text-teal-300 border-b-2 border-teal-300" : ""
              }`}
            >
              Products
            </Link>
            <Link
              to="/customers"
              className={`transition-all duration-200 hover:text-teal-300 ${
                location.pathname === "/customers" ? "font-semibold text-teal-300 border-b-2 border-teal-300" : ""
              }`}
            >
              Customers
            </Link>
            <Link
              to="/orders"
              className={`transition-all duration-200 hover:text-teal-300 ${
                location.pathname === "/orders" ? "font-semibold text-teal-300 border-b-2 border-teal-300" : ""
              }`}
            >
              Orders
            </Link>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout

