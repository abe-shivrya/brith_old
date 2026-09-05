/**
 * App.tsx
 *
 * HashRouter routes:
 *   /#/             — Login gate (until authenticated) → Choose workflow
 *   /#/birth        — Birth record form
 *   /#/birth/preview — Birth record document preview
 *   /#/validate     — Validate certificate form
 *   /#/validate/table — Validate certificate table
 *
 * Form data shared via AppContext.
 */

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import ChoosePage from "./pages/ChoosePage";
import BirthFormPage from "./pages/BirthFormPage";
import BirthPreviewPage from "./pages/BirthPreviewPage";
import ValidateFormPage from "./pages/ValidateFormPage";
import QRResultPage from "./pages/QRResultPage";
import VerifyPage from "./pages/VerifyPage";
import body_background from "./assets/body_bg.png";
import "./App.css";

const AUTH_KEY = "crs-auth";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem(AUTH_KEY) === "1",
  );

  const handleLoginSuccess = () => {
    sessionStorage.setItem(AUTH_KEY, "1");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AppProvider>
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <div
        className="content-body"
        style={{ backgroundImage: `url("${body_background}")` }}
      >
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <ChoosePage />
              ) : (
                <Login onSuccess={handleLoginSuccess} />
              )
            }
          />
          <Route path="/birth" element={<BirthFormPage />} />
          <Route path="/birth/preview" element={<BirthPreviewPage />} />
          <Route path="/validate" element={<ValidateFormPage />} />
          <Route path="/qr/:id" element={<QRResultPage />} />
          <Route path="/verify/:id" element={<VerifyPage />} />
        </Routes>
      </div>
      <Footer />
    </AppProvider>
  );
}
