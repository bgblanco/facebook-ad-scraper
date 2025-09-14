// ======== CONFIG ========
// 1) Publish your Google Sheet to the web (File → Share → Publish to web) and get the sheet ID.
// 2) Set SHEET_ID below. Optionally, set SHEET_GID (numeric gid for the tab; default 0).
// 3) If your workflow supports a webhook trigger, set WORKFLOW_WEBHOOK_URL and WORKFLOW_TOKEN (if used).

const SHEET_ID = "1YJKGA-TRxxltTFXMejBTgobT-9zTRPJlxYHFUjZ35O8RE";
const SHEET_GID = "0"; // The first tab is usually gid=0

// Google Visualization API JSON endpoint (works for published sheets)
const SHEET_JSON_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?gid=${SHEET_GID}&tqx=out:json&tq=${encodeURIComponent("select *")}`;

// Optional webhook to trigger your scrape
const WORKFLOW_WEBHOOK_URL = "https://sentinelpeak.app.n8n.cloud/workflow/DH5OOIKWnkupx9mV"; // e.g., n8n/apify webhook
const WORKFLOW_TOKEN = "SECRET123"; // Optional: e.g., ?key=SECRET or header-based token

// ======== UTILITIES ========
const $ = (sel) => document.querySelector(sel);
const adsTableBody = $("#adsTable tbody");
const pageFilter = $("#pageFilter");
const searchInput = $("#search");
const updatedAt = $("#updatedAt");
const runBtn = $("#runBtn");
const runStatus = $("#runStatus");

let rawRows = []; // Keep raw for filtering

function parseGVizJSON(text) {
  // The response is like: "/*O_o*/\ngoogle.visualization.Query.setResponse({...});"
  const jsonText = text.replace(/^[\s\S]*setResponse\(/, "").replace(/\);\s*$/, "");
  return JSON.parse(jsonText);
}

function rowToObject(headers, row) {
  const obj = {};
  headers.forEach((h, i) => {
    obj[h] = row.c[i] ? row.c[i].v : "";
  });
  return obj;
}

function normalizeHeader(h) {
  // lower_snake
  return h.toLowerCase().replace(/\s+/g, "_").replace(/[^\w_]/g, "");
}

async function fetchSheet() {
  updatedAt.textContent = "Loading…";
  const res = await fetch(SHEET_JSON_URL, { cache: "no-store" });
  const text = await res.text();
  const parsed = parseGVizJSON(text);

  const cols = parsed.table.cols.map((c) => normalizeHeader(c.label || c.id));
  const rows = (parsed.table.rows || []).map((r) => rowToObject(cols, r));

  rawRows = rows;
  renderTable(rows);
  buildFilters(rows);
  updatedAt.textContent = "Updated " + new Date().toLocaleString();
}

function buildFilters(rows) {
  const pages = Array.from(new Set(rows.map(r => r.page_name).filter(Boolean))).sort();
  pageFilter.innerHTML = `<option value="">All pages</option>` + pages.map(p => `<option value="${p}">${p}</option>`).join("");
}

function renderTable(rows) {
  const q = (searchInput.value || "").toLowerCase();
  const page = pageFilter.value;

  const filtered = rows.filter(r => {
    const hay = `${r.summary} ${r.rewritten_ad_copy} ${r.image_prompt} ${r.video_prompt} ${r.page_name} ${r.page_url}`.toLowerCase();
    const matchQ = q ? hay.includes(q) : true;
    const matchPage = page ? r.page_name === page : true;
    return matchQ && matchPage;
  });

  adsTableBody.innerHTML = filtered.map(r => {
    const date = r.date_added || "";
    const page = r.page_name || "";
    const pageUrl = r.page_url || "";
    const summary = r.summary || "";
    const copy = r.rewritten_ad_copy || "";
    const imgPrompt = r.image_prompt || "";
    const vidPrompt = r.video_prompt || "";
    const source = pageUrl ? `<a href="${pageUrl}" target="_blank" rel="noopener">Open</a>` : "";

    return `<tr>
      <td data-label="Date">${date}</td>
      <td data-label="Page">${page}</td>
      <td data-label="Summary">${summary}</td>
      <td data-label="Rewritten Copy">${copy}</td>
      <td data-label="Image Prompt">${imgPrompt}</td>
      <td data-label="Video Prompt">${vidPrompt}</td>
      <td data-label="Source">${source}</td>
    </tr>`;
  }).join("");
}

async function runWorkflow() {
  runBtn.disabled = true;
  runStatus.textContent = "Triggering…";
  try {
    const res = await fetch(WORKFLOW_WEBHOOK_URL + (WORKFLOW_TOKEN ? `?key=${encodeURIComponent(WORKFLOW_TOKEN)}` : ""), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "sps-dashboard", ts: Date.now() })
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    runStatus.textContent = "Workflow started ✔";
  } catch (e) {
    runStatus.textContent = "Failed to start: " + e.message;
  } finally {
    runBtn.disabled = false;
    setTimeout(() => runStatus.textContent = "", 5000);
  }
}

// Events
$("#refreshBtn").addEventListener("click", fetchSheet);
searchInput.addEventListener("input", () => renderTable(rawRows));
pageFilter.addEventListener("change", () => renderTable(rawRows));
runBtn.addEventListener("click", runWorkflow);

// Auto refresh every 2 minutes
setInterval(fetchSheet, 120000);

// First load
fetchSheet();
