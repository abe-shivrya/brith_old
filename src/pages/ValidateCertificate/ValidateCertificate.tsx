/**
 * ValidateCertificate.tsx
 *
 * Exact replica of the CRS gov.in "Validate Certificate" page.
 * Uses a Bootstrap-style card with a bordered, stripped table
 * containing the certificate verification details.
 *
 * Route: /validate (via HashRouter)
 */

import "./ValidateCertificate.css";

type CertificateField = {
  label: string;
  value: string;
};

const CERTIFICATE_DATA: CertificateField[] = [
  {
    label: "Registration Number",
    value: "B-2022: 27-90217-009309",
  },
  {
    label: "NAME",
    value:
      "ADEEBANAAZ AZARODDIN ATTAR     / अदीबानाज अझरोद्दीन अत्तार",
  },
  {
    label: "GENDER",
    value: "Female / स्त्री",
  },
  {
    label: "DOB",
    value: "17-05-2022",
  },
  {
    label: "Name Of Mother",
    value:
      "FARHAT JHAN  AZARODDIN  ATTAR  / फरहत जहाँ  अझरोद्दींन  अत्तार",
  },
  {
    label: "Name Of Father",
    value:
      "AZARODDIN  KHUTBODDIN  ATTAR  / अझरोद्दींन  खुतबोद्दीन  अत्तार",
  },
  {
    label: "Place  of Birth",
    value:
      "SUYASH NURSING HOME SOLAPUR , SOLAPUR, SOLAPUR NORTH, SOLAPUR, MAHARASHTRA / सोलापूर, सोलापूर उत्तर, सोलापूर, महाराष्ट्र",
  },
  {
    label: "Registration Date",
    value: "19-05-2022",
  },
  {
    label: "Registration Unit Name",
    value:
      "MUNICIPAL CORPORATION SOLAPUR  / नगर निगम सोलापूर",
  },
  {
    label: "Registration Unit Code",
    value: "90217",
  },
];

export default function ValidateCertificate() {
  return (
    <div className="validate-content">
      <div className="validate-container">
        <div className="validate-card">
          <table className="validate-table">
            <tbody>
              {CERTIFICATE_DATA.map((field) => (
                <tr key={field.label}>
                  <td className="validate-td-label text-left">
                    {field.label}
                  </td>
                  <td className="validate-td-value text-left">
                    {field.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
