import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import Home from "./pages/Home";
import Login from "./components/auth/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ProductPage from "./components/productPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/products" element={<ProductPage />} /> */}
          <Route path="/products/:subCategory" element={<ProductPage />} />
          
          {/* Protected Routes */}
          <Route
              path="/dashboard"
              element={
                <ProtectedRoute adminOnly={true}>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
