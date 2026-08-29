/**
 * App.tsx
 *
 * Root component managing the two-screen workflow:
 *   1. Data-entry form
 *   2. Document preview (with print)
 *
 * Form data is preserved in state so navigating back from the preview
 * does not lose entered values.
 */

import { useState, useCallback } from "react";
import type { BirthRecordData } from "./types";
import { getInitialBirthRecordData } from "./types";
import BirthRecordForm from "./components/BirthRecordForm/BirthRecordForm";
import PrintPreview from "./components/PrintPreview/PrintPreview";

type Screen = "form" | "preview";

export default function App() {
  const [screen, setScreen] = useState<Screen>("form");
  const [recordData, setRecordData] = useState<BirthRecordData>(
    getInitialBirthRecordData()
  );

  const handleFormSubmit = useCallback((data: BirthRecordData) => {
    setRecordData(data);
    setScreen("preview");
    // Scroll to top when switching screens
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
