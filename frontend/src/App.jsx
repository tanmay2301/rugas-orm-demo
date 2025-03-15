import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CustomerPage from './pages/CustomerPage';
import ProductPage from './pages/ProductPage';
import ConfirmationPage from './pages/ConfirmationPage';
import OrderPage from './pages/OrderPage'
import Layout from "./components/Layout";

function App() {
  
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element = {<HomePage />} />
          <Route path='/customers' element = {<CustomerPage />} />
          <Route path='/products' element = {<ProductPage />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/orders" element={<OrderPage />} />
        </Route>
        </Routes>
      </Router>
    </>
  )
} 

export default App
