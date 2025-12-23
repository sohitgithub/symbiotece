export const FORM_SCHEMAS = {
  document_simple: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "file", label: "Upload PDF", type: "file", accept: ".pdf", required: true },
  ],

  people_profile: [
    { name: "title", label: "Name", type: "text", required: true },
    { name: "summary", label: "Designation / Role", type: "text", required: true },
    { name: "file", label: "Profile Image", type: "file", accept: "image/*", required: false },
  ],

  media_link_or_file: [
    { name: "title", label: "Section Title", type: "text", required: true },
    { name: "summary", label: "External Link (optional)", type: "url", required: false },
    { name: "file", label: "Upload PDF (optional)", type: "file", accept: ".pdf", required: false },
  ],

  // ✅ UPDATED
  quarterly_results: [
    {
      name: "fy",
      label: "Financial Year",
      type: "select",
      required: true,
      options: ["FY2026", "FY2025", "FY2024", "FY2023", "FY2022"],
    },
    {
      name: "quarter",
      label: "Quarter",
      type: "select",
      options: ["Q1", "Q2", "Q3", "Q4"],
      required: true,
    },
    {
      name: "docType",
      label: "Document Type",
      type: "select",
      options: [
        "Earnings call invite",
        "Shareholders' letter",
        "Financial results",
        "KPI handbook",
        "Earnings call replay",
      ],
      required: true,
    },
    {
      name: "file",
      label: "Upload PDF",
      type: "file",
      accept: ".pdf",
      required: true,
    },
  ],

  annual_company: [
    { name: "year", label: "Year", type: "number", required: true },
    { name: "title", label: "Report Title", type: "text", required: true },
    { name: "file", label: "Upload PDF", type: "file", accept: ".pdf", required: true },
  ],

  annual_subsidiary: [
    { name: "company", label: "Company Name", type: "text", required: true },
    { name: "title", label: "Report Title", type: "text", required: true },
    { name: "year", label: "Year", type: "number", required: true },
    { name: "file", label: "Upload PDF", type: "file", accept: ".pdf", required: true },
  ],

  annual_group: [
    { name: "year", label: "Year", type: "number", required: true },
    { name: "title", label: "Report Title", type: "text", required: true },
    { name: "file", label: "Upload PDF", type: "file", accept: ".pdf", required: true },
  ],

  committee_composition: [
    { name: "title", label: "Committee Name", type: "text", required: true },
    {
      name: "summary",
      label: "Members (JSON format)",
      type: "textarea",
      placeholder: `[{"name":"John","role":"Chairperson"}]`,
      required: true,
    },
  ],
};
