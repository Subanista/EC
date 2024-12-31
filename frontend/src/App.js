import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Optional for global styles
import Home from './pages/Home';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import AdminDashboard from './pages/AdminDashboard';
import Products from './pages/Products';
import axios from 'axios';
import ProductsGrid from './pages/ProductsGrid';
import MakeOrder from './components/makeOrder';
import CartPage from './pages/CartPage';
import Explore from './pages/explore';
import UpdateProduct from './components/UpdateProduct';
import Login from './pages/Login';
import Register from './pages/Register';
import ManageUsers from './components/ManageUsers';
import CheckoutAndPayment from './pages/CheckoutAndPayment';
import Payment from './pages/Payment';
import SearchResults from './pages/SearchResultsPage';
import ProductsView from './pages/ProductsView';
import Layout from './pages/Layout';


axios.defaults.baseURL = 'http://localhost:5000'; // Update with your backend URL
function App() {
  return (
    <Router>
      <Navbar/>
      <div className="bg-background min-h-screen text-dark">
      
        {/* Main App Wrapper */}
        <Routes>
        
          <Route path="/" element={<Home />} />
          
          <Route path='/admin/*' element={<AdminDashboard/>} />
          <Route path='admin/products' element={<Products/>} />
          <Route path="/products" element={<ProductsGrid />} />
          <Route path="/make-order/:id" element={<MakeOrder />} />
          
          <Route path="/explore" element={<Explore/>} />
          <Route path="/checkout" element={<CheckoutAndPayment />} />
          <Route path='/payment' element={<Layout><Payment/> </Layout>} />
          <Route path="/update-product/:id" element={<UpdateProduct />} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/admin/users' element={<ManageUsers/>}/>
          <Route path="/search" element={<SearchResults />} />
          <Route path='/productsView' element={<ProductsView/>}/>
          <Route path="/cart" element={<Layout><CartPage /></Layout>} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
