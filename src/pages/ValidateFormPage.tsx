/**
 * ValidateFormPage.tsx
 *
 * Validate certificate data entry form.
 * On submit → saves record + downloads QR → navigates to /#/qr/:id
 *
 * Route: /#/validate
 */

import { useNavigate } from "react-router-dom";
import ValidateCertificateForm from "./ValidateCertificate/ValidateCertificateForm";
import { saveCertRecord } from "../utils/certStore";

export default function ValidateFormPage() {
  const navigate = useNavigate();

  return (
    <div className="workflow-container">
      <h2 className="workflow-title">Validate Certificate</h2>
      <ValidateCertificateForm
        onSubmit={async (data) => {
          const id = await saveCertRecord(data);
          navigate(`/qr/${id}`);
        }}
      />
    </div>
  );
}
