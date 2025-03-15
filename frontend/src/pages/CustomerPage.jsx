"use client"

import { useState } from "react"
import { Link } from "react-router-dom"

const API_URL = "/api/customers" // Proxying to backend

const CustomersPage = () => {
  const [customers, setCustomers] = useState([])
  const [customerId, setCustomerId] = useState("")
  const [customerDetails, setCustomerDetails] = useState(null)
  const [showCustomerForm, setShowCustomerForm] = useState(false)
  const [newCustomer, setNewCustomer] = useState({ name: "", email: "", phone: "", address: "" })
  const [newCustomerId, setNewCustomerId] = useState(null)

  // Fetch all customers
  const fetchAllCustomers = async () => {
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      if (data.success) {
        setCustomers(data.data)
      } else {
        alert("Failed to fetch customers")
      }
    } catch (error) {
      console.error("Error fetching customers:", error)
      alert("Error fetching customers")
    }
  }

  // Fetch customer by ID
  const fetchCustomerById = async () => {
    if (!customerId) {
      alert("Please enter a customer ID.")
      return
    }

    try {
      const response = await fetch(`${API_URL}/${customerId}`)
      const data = await response.json()
      if (data.success) {
        setCustomerDetails(data.data)
      } else {
        alert("Customer not found")
      }
    } catch (error) {
      console.error("Error fetching customer:", error)
      alert("Error fetching customer")
    }
  }

  // Create a new customer
  const createCustomer = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      })

      const data = await response.json()
      if (data.success) {
        setNewCustomerId(data.data._id)
        setNewCustomer({ name: "", email: "", phone: "", address: "" }) // Reset form
      } else {
        alert("Failed to create customer")
      }
    } catch (error) {
      console.error("Error creating customer:", error)
      alert("Error creating customer")
    }
  }

  return (
    <div className="py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-purple-900 mb-2">Customer Management</h1>
        <p className="text-gray-600">Onboard and manage your customers</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 py-4 px-6">
            <h2 className="text-xl font-semibold text-white">Customer Lookup</h2>
          </div>
          <div className="p-6">
            {/* Fetch All Customers */}
            <button
              onClick={fetchAllCustomers}
              className="w-full mb-6 py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 shadow-md flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              View Previous Customers
            </button>

            {customers.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-4 mb-6 max-h-60 overflow-y-auto">
                <h3 className="font-medium text-gray-700 mb-2">Customer List</h3>
                <ul className="divide-y divide-gray-200">
                  {customers.map((customer) => (
                    <li key={customer._id} className="py-3 flex items-start">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
                        {customer.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">
                          {customer.email} • ID: {customer._id}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Fetch Customer by ID */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-2">Find Customer by ID</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customerId}
                  onChange={(e) => setCustomerId(e.target.value)}
                  placeholder="Enter Customer ID"
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                />
                <button
                  onClick={fetchCustomerById}
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:opacity-90 transition-colors duration-200 shadow-md"
                >
                  Search
                </button>
              </div>
            </div>

            {customerDetails && (
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-purple-500">
                <h3 className="font-medium text-gray-700 mb-2">Customer Details</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p className="text-gray-500">Name:</p>
                  <p className="font-medium">{customerDetails.name}</p>
                  <p className="text-gray-500">Email:</p>
                  <p className="font-medium">{customerDetails.email}</p>
                  <p className="text-gray-500">Phone:</p>
                  <p className="font-medium">{customerDetails.phone}</p>
                  <p className="text-gray-500">Address:</p>
                  <p className="font-medium">{customerDetails.address}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-teal-700 py-4 px-6">
            <h2 className="text-xl font-semibold text-white">Customer Management</h2>
          </div>
          <div className="p-6">
            {newCustomerId ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Customer Created Successfully!</h3>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4 text-left">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-amber-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-amber-700 font-medium">
                        Please store the customer ID safely for future transactions
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-500 mb-1">Customer ID:</p>
                  <p className="text-lg font-mono font-medium text-purple-800 break-all">{newCustomerId}</p>
                </div>
                <div className="flex justify-center space-x-4">
                  <button
                    onClick={() => {
                      setNewCustomerId(null)
                      setShowCustomerForm(true)
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg hover:opacity-90 transition-colors duration-200 shadow-md"
                  >
                    Create Another Customer
                  </button>
                  <button
                    onClick={() => setNewCustomerId(null)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : !showCustomerForm ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 mx-auto bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-teal-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Create New Customer</h3>
                <p className="text-gray-500 mb-6">Add a new customer to your database</p>
                <button
                  onClick={() => setShowCustomerForm(true)}
                  className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg hover:opacity-90 transition-colors duration-200 shadow-md"
                >
                  Create New Customer
                </button>
              </div>
            ) : (
              <form onSubmit={createCustomer} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={newCustomer.phone}
                    onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    placeholder="Enter address"
                    value={newCustomer.address}
                    onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    required
                  />
                </div>
                <div className="pt-4 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setShowCustomerForm(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg hover:opacity-90 transition-colors duration-200 shadow-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <Link
          to="/"
          className="flex items-center px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-medium rounded-lg hover:opacity-90 transition-colors duration-200 shadow-md"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default CustomersPage

