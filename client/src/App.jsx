import { Routes, Route, Navigate } from "react-router-dom";
import MenuPage from "./pages/MenuPage.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/menu" />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="*" element={<div className="p-6">404</div>} />
    </Routes>
  );
}
