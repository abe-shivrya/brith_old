/**
 * QRResultPage.tsx
 *
 * Shown after the validate form is submitted.
 * Displays the certificate details table.
 * QR code PNG + JSON data are saved to the output/ folder.
 *
 * Route: /#/qr/:id
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

export default function QRResultPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="workflow-container">
        <h2 className="workflow-title">Invalid Link</h2>
        <p style={{ textAlign: "center" }}>No record ID provided.</p>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link to="/validate" className="vc-btn vc-btn-reset">
            ← Go to Validate Form
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
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link to="/validate" className="vc-btn vc-btn-reset">
            ← Go to Validate Form
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

      {/* Success banner */}
      {/* <div className="save-success-banner">
        <span className="material-icons" style={{ color: "#4caf50", fontSize: 22 }}>check_circle</span>
        <span>
          QR code saved to <strong>output/{id}_qr.png</strong> and data to <strong>output/{id}_data.json</strong>
        </span>
      </div> */}

      <div className="cert-table-wrapper">
        {/* <div className="cert-table-actions">
          <Link to="/validate" className="vc-btn vc-btn-reset">
            ← New Search
          </Link>
        </div> */}

        {/* Table */}
        <div className="validate-content">
          <div className="validate-container">
            <div className="validate-card">
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
      </div>
    </div>
  );
}
