/**
 * VerifyPage.tsx
 *
 * Scanned QR code lands here.
 * Loads the certificate record by ID from the URL params
 * and displays the details table.
 *
 * Route: /#/verify/:id
 */

import { useParams, Link } from "react-router-dom";
import { getCertRecord } from "../utils/certStore";
import "../pages/ValidateCertificate/ValidateCertificate.css";

type CertificateField = {
  label: string;
  value: string;
};

function fmtDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  return `${d}-${m}-${y}`;
}

function merge(en: string, mr: string): string {
  if (!en && !mr) return "";
  if (!mr) return en;
  if (!en) return mr;
  return `${en} / ${mr}`;
}

export default function VerifyPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="workflow-container">
        <h2 className="workflow-title">Invalid Link</h2>
        <p style={{ textAlign: "center" }}>No record ID provided.</p>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link to="/" className="vc-btn vc-btn-reset">
            ← Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const record = getCertRecord(id);

  if (!record) {
    return (
      <div className="workflow-container">
        <h2 className="workflow-title">Record Not Found</h2>
        <p style={{ textAlign: "center" }}>
          No certificate record found for ID: <strong>{id}</strong>
        </p>
        <p style={{ textAlign: "center", color: "#888", fontSize: 13 }}>
          This QR code may be invalid or the record was not saved.
        </p>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link to="/" className="vc-btn vc-btn-reset">
            ← Go to Home
          </Link>
        </div>
      </div>
    );
  }

  const { data, createdAt } = record;

  const tableData: CertificateField[] = [
    { label: "Registration Number", value: data.registrationNumber },
    { label: "NAME", value: merge(data.nameEn, data.nameMr) },
    { label: "GENDER", value: merge(data.gender, data.genderMr) },
    { label: "DOB", value: fmtDate(data.dob) },
    { label: "Name Of Mother", value: merge(data.motherNameEn, data.motherNameMr) },
    { label: "Name Of Father", value: merge(data.fatherNameEn, data.fatherNameMr) },
    { label: "Place  of Birth", value: merge(data.placeOfBirthEn, data.placeOfBirthMr) },
    { label: "Registration Date", value: fmtDate(data.registrationDate) },
    { label: "Registration Unit Name", value: merge(data.unitNameEn, data.unitNameMr) },
    { label: "Registration Unit Code", value: data.unitCode },
  ];

  return (
    <div className="workflow-container">
      <h2 className="workflow-title">Certificate Verification</h2>

      <div className="cert-table-wrapper">
        <div className="validate-content">
          <div className="validate-container">
            <div className="validate-card">
              <h3 className="validate-table-title">Certificate Details</h3>
              <table className="validate-table">
                <tbody>
                  {tableData.map((field) => (
                    <tr key={field.label}>
                      <td className="validate-td-label text-left">
                        {field.label}
                      </td>
                      <td className="validate-td-value text-left">
                        {field.value || (
                          <span className="validate-empty">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Record info footer */}
              {/* <div className="verify-record-info">
                <p>
                  Record ID: <strong>{id}</strong>
                </p>
                <p>
                  Created:{" "}
                  {new Date(createdAt).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div> */}
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link to="/" className="vc-btn vc-btn-reset">
            ← Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
