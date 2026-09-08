import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import AuthPage from "./components/AuthPage";
import SignupPage from "./components/SignupPage";

import BackgroundImage from "../assets/Background-image.png";

export default function App() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${BackgroundImage})`,
      }}
    >
      <Header />

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      <Footer />
    </div>
  );
}