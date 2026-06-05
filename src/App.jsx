import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';

// Theme, Slices, Pages, Components
import theme from './theme';
import { checkAuth, fetchCart } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import AdminUsers from './pages/AdminUsers';

// Fallback or Environment Google Client ID
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "1036848231264-mockgoogleclientid.apps.googleusercontent.com";

// Helper component for Admin-only routes
function AdminRoute({ children }) {
  const { user, loading } = useSelector((state) => state.auth);
  
  if (loading) {
    return null; // wait until auth finishes initialization
  }
  
  const isAdmin = user && ['kingsenterprises1414@gmail.com', 'ayaanpathan14@gmail.com'].includes(user.email.toLowerCase());
  
  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // Load user profile on app startup if token exists
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  // Load cart once user authenticated
  useEffect(() => {
    if (user) {
      dispatch(fetchCart());
    }
  }, [user, dispatch]);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh',
              bgcolor: 'background.default',
            }}
          >
            {/* Navigation Bar */}
            <Navbar />

            {/* Main Content Area */}
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />} />
                <Route 
                  path="/admin/dashboard" 
                  element={
                    <AdminRoute>
                      <Dashboard />
                    </AdminRoute>
                  } 
                />
                <Route 
                  path="/admin/users" 
                  element={
                    <AdminRoute>
                      <AdminUsers />
                    </AdminRoute>
                  } 
                />
              </Routes>
            </Box>

            {/* Footer Section */}
            <Footer />
          </Box>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

