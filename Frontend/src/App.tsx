import { Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./components/HomePage"
import Dashboard from "./components/Dashboard"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import HistoryPage from "./components/HistoryPage"
import SettingsPage from "./components/SettingsPage"
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to={"/"} replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}


