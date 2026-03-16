import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Pharmacies from "./pages/Pharmacies";
import ProfilePage from "./pages/ProfilePage";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";

const Layout = ({ children }) => {
  const location = useLocation();
  // Don't show Navbar on login, signup, and dashboard pages
  const hideNavbarRoutes = ["/login", "/signup", "/dashboard"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      {children}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 dark:text-gray-100 flex flex-col">
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<Search />} />
                <Route path="/pharmacies" element={<Pharmacies />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Routes>
            </Layout>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
