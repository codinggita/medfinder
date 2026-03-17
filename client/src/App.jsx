import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Pharmacies from "./pages/Pharmacies";
import Reports from "./pages/Reports";
import ProfilePage from "./pages/ProfilePage";
import AddMedicine from "./pages/AddMedicine";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import MyOrders from "./pages/MyOrders";
import PharmacyMedicines from "./pages/PharmacyMedicines";
import About from "./pages/About";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/dashboard", "/reports"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <CartDrawer />
      {children}
      {shouldShowNavbar && <Footer />}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100 flex flex-col">
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/dashboard/add" element={<Dashboard />} />
                  <Route path="/dashboard/inventory" element={<Dashboard />} />
                  <Route path="/medicines/add" element={<AddMedicine />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/pharmacies" element={<Pharmacies />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-success" element={<OrderSuccess />} />
                  <Route path="/profile/orders" element={<MyOrders />} />
                  <Route path="/pharmacy/:pharmacyId/:pharmacyName" element={<PharmacyMedicines />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </Layout>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
