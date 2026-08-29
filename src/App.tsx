/**
 * App.tsx
 *
 * Root component managing routes via HashRouter:
 *   1. / — Data-entry form + document preview (existing workflow)
 *   2. /validate — Validate Certificate page (CRS gov.in replica)
 *
 * Form data is preserved in state so navigating back from the preview
 * does not lose entered values.
 */

import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import type { BirthRecordData } from "./types";
import { getInitialBirthRecordData } from "./types";
import BirthRecordForm from "./components/BirthRecordForm/BirthRecordForm";
import PrintPreview from "./components/PrintPreview/PrintPreview";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ValidateCertificate from "./pages/ValidateCertificate/ValidateCertificate";
import body_background from "./assets/body_bg.png"
type Screen = "form" | "preview";

function MainForm() {
  const [screen, setScreen] = useState<Screen>("form");
  const [recordData, setRecordData] = useState<BirthRecordData>(
    getInitialBirthRecordData()
  );

  const handleFormSubmit = useCallback((data: BirthRecordData) => {
    setRecordData(data);
    setScreen("preview");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = useCallback(() => {
    setScreen("form");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="app">
      {screen === "form" ? (
        <BirthRecordForm
          onSubmit={handleFormSubmit}
          initialData={recordData}
        />
      ) : (
        <PrintPreview data={recordData} onBack={handleBack} />
      )}
    </div>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <div className="content-body" style={{
        backgroundImage: `url("${body_background}")`, 
      }}>
        <Routes>
          <Route path="/" element={<MainForm />} />
          <Route path="/validate" element={<ValidateCertificate />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
