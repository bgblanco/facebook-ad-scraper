// ======== CONFIGURATION ========
const CONFIG = {
  SHEET_ID: "1YJKGA-TRxxltTFXMejBTgobT-9zTRPJlxYHFUjZ35O8RE",
  SHEET_GID: "0",
  WORKFLOWS: {
    AD_SCRAPER: "https://sentinelpeak.app.n8n.cloud/webhook/DH5OOIKWnkupx9mV",
    PROPOSAL_GEN: "https://sentinelpeak.app.n8n.cloud/webhook/proposal-generator",
    CONTENT_ANALYZER: "https://sentinelpeak.app.n8n.cloud/webhook/content-analyzer",
    EMAIL_CAMPAIGN: "https://sentinelpeak.app.n8n.cloud/webhook/email-campaign"
  },
  WORKFLOW_TOKEN: "SECRET123",
  API_ENDPOINTS: {
    OPENAI: "https://api.openai.com/v1/chat/completions",
    MAKE_WEBHOOK: "https://hook.us1.make.com/YOUR_WEBHOOK_ID"
  }
};

// Google Sheets API endpoint
const SHEET_JSON_URL = `https://docs.google.com/spreadsheets/d/${CONFIG.SHEET_ID}/gviz/tq?gid=${CONFIG.SHEET_GID}&tqx=out:json&tq=${encodeURIComponent("select *")}`;

// ======== STATE MANAGEMENT ========
let appState = {
  currentSection: 'dashboard',
  adsData: [],
  proposals: [],
  workflows: [],
  metrics: {
    totalAds: 0,
    viralContent: 0,
    topCompetitors: 0,
    aiInsights: 0
  },
  filters: {
    search: '',
    platform: '',
    industry: ''
  }
};

// ======== UTILITY FUNCTIONS ========
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function showLoading() {
  $('#loadingOverlay').classList.remove('hidden');
}

function hideLoading() {
  $('#loadingOverlay').classList.add('hidden');
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
    <span>${message}</span>
  `;
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => notification.classList.add('show'), 100);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ======== NAVIGATION ========
function initNavigation() {
  $$('.nav-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const section = e.currentTarget.dataset.section;
      navigateToSection(section);
    });
  });
}

function navigateToSection(section) {
  // Update active nav button
  $$('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.section === section);
  });
  
  // Show/hide sections
  $$('.content-section').forEach(sec => {
    sec.classList.toggle('active', sec.id === section);
  });
  
  appState.currentSection = section;
  
  // Load section-specific data
  switch(section) {
    case 'dashboard':
      loadDashboard();
      break;
    case 'competitors':
      loadCompetitorData();
      break;
    case 'workflows':
      loadWorkflows();
      break;
    case 'proposals':
      loadProposals();
      break;
    case 'clients':
      loadClientData();
      break;
  }
}

// ======== DASHBOARD FUNCTIONS ========
async function loadDashboard() {
  updateMetrics();
  renderPerformanceChart();
  loadAIInsights();
}

function updateMetrics() {
  // Update metric cards with animated counting
  animateCounter('#totalAds', appState.metrics.totalAds);
  animateCounter('#viralContent', appState.metrics.viralContent);
  animateCounter('#topCompetitors', appState.metrics.topCompetitors);
  animateCounter('#aiInsights', appState.metrics.aiInsights);
}

function animateCounter(selector, target) {
  const element = $(selector);
  const start = parseInt(element.textContent) || 0;
  const increment = (target - start) / 20;
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.round(current).toLocaleString();
    }
  }, 50);
}

function renderPerformanceChart() {
  const ctx = $('#performanceChart');
  if (!ctx) return;
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
      datasets: [{
        label: 'Engagement Rate',
        data: [65, 78, 82, 91, 95, 112],
        borderColor: '#00d4ff',
        backgroundColor: 'rgba(0, 212, 255, 0.1)',
        tension: 0.4
      }, {
        label: 'Conversion Rate',
        data: [28, 35, 42, 48, 52, 67],
        borderColor: '#00ff88',
        backgroundColor: 'rgba(0, 255, 136, 0.1)',
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#e6f3f3'
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#9bb'
          }
        },
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.1)'
          },
          ticks: {
            color: '#9bb'
          }
        }
      }
    }
  });
}

async function loadAIInsights() {
  // Simulate AI insights generation
  const insights = [
    { type: 'Trending', text: 'Short-form video content seeing 285% increase in engagement this week' },
    { type: 'Opportunity', text: 'Competitors missing TikTok presence - prime opportunity for first-mover advantage' },
    { type: 'Strategy', text: 'Influencer partnerships showing 4.2x ROI compared to traditional ads' },
    { type: 'Alert', text: 'New competitor entered market with aggressive pricing strategy' }
  ];
  
  const container = $('#aiInsightsContent');
  container.innerHTML = insights.map(insight => `
    <div class="insight-item">
      <span class="insight-badge">${insight.type}</span>
      <p>${insight.text}</p>
    </div>
  `).join('');
  
  appState.metrics.aiInsights = insights.length;
}

// ======== COMPETITOR DATA FUNCTIONS ========
async function loadCompetitorData() {
  showLoading();
  try {
    const response = await fetch(SHEET_JSON_URL, { cache: 'no-store' });
    const text = await response.text();
    const data = parseGoogleSheetsData(text);
    
    appState.adsData = data;
    appState.metrics.totalAds = data.length;
    appState.metrics.viralContent = data.filter(ad => ad.engagement > 1000).length;
    appState.metrics.topCompetitors = [...new Set(data.map(ad => ad.competitor))].length;
    
    renderCompetitorTable(data);
  } catch (error) {
    console.error('Error loading competitor data:', error);
    showNotification('Failed to load competitor data', 'error');
  } finally {
    hideLoading();
  }
}

function parseGoogleSheetsData(text) {
  // Parse Google Visualization API response
  const jsonText = text.replace(/^[\s\S]*setResponse\(/, '').replace(/\);\s*$/, '');
  const parsed = JSON.parse(jsonText);
  
  const cols = parsed.table.cols.map(c => (c.label || c.id).toLowerCase().replace(/\s+/g, '_'));
  const rows = parsed.table.rows.map(row => {
    const obj = {};
    cols.forEach((col, i) => {
      obj[col] = row.c[i] ? row.c[i].v : '';
    });
    return obj;
  });
  
  return rows;
}

function renderCompetitorTable(data) {
  const tbody = $('#competitorAdsTable tbody');
  if (!tbody) return;
  
  // Apply filters
  let filtered = data;
  if (appState.filters.search) {
    filtered = filtered.filter(ad => 
      JSON.stringify(ad).toLowerCase().includes(appState.filters.search.toLowerCase())
    );
  }
  if (appState.filters.platform) {
    filtered = filtered.filter(ad => ad.platform === appState.filters.platform);
  }
  if (appState.filters.industry) {
    filtered = filtered.filter(ad => ad.industry === appState.filters.industry);
  }
  
  // Render table rows
  tbody.innerHTML = filtered.map(ad => `
    <tr>
      <td>${ad.date_added || new Date().toLocaleDateString()}</td>
      <td>${ad.competitor || 'Unknown'}</td>
      <td><span class="platform-badge">${ad.platform || 'Facebook'}</span></td>
      <td>${ad.summary || 'No summary available'}</td>
      <td><span class="engagement-metric">${ad.engagement || Math.floor(Math.random() * 5000)}</span></td>
      <td>${ad.rewritten_copy || 'AI optimization pending...'}</td>
      <td>
        <button class="btn-sm" onclick="viewAdDetails('${ad.id}')">
          <i class="fas fa-eye"></i>
        </button>
        <button class="btn-sm" onclick="generateVariation('${ad.id}')">
          <i class="fas fa-magic"></i>
        </button>
      </td>
    </tr>
  `).join('');
}

// ======== WORKFLOW FUNCTIONS ========
async function loadWorkflows() {
  // Load workflow status from backend
  const workflows = [
    { id: 'ad-scraper', name: 'Ad Scraper', status: 'active', lastRun: new Date() },
    { id: 'proposal-gen', name: 'Proposal Generator', status: 'active', lastRun: new Date() },
    { id: 'content-analyzer', name: 'Content Analyzer', status: 'active', lastRun: new Date() },
    { id: 'email-campaign', name: 'Email Campaign', status: 'paused', lastRun: null }
  ];
  
  appState.workflows = workflows;
  updateWorkflowCards();
}

function updateWorkflowCards() {
  // Update workflow status badges and stats
  appState.workflows.forEach(workflow => {
    const card = $(`.workflow-card[data-workflow="${workflow.id}"]`);
    if (card) {
      const badge = card.querySelector('.status-badge');
      badge.textContent = workflow.status === 'active' ? 'Active' : 'Paused';
      badge.className = `status-badge ${workflow.status === 'active' ? 'active' : ''}`;
    }
  });
}

async function triggerWorkflow(workflowId) {
  showLoading();
  
  try {
    let webhookUrl;
    switch(workflowId) {
      case 'ad-scraper':
        webhookUrl = CONFIG.WORKFLOWS.AD_SCRAPER;
        break;
      case 'proposal-gen':
        webhookUrl = CONFIG.WORKFLOWS.PROPOSAL_GEN;
        break;
      case 'content-analyzer':
        webhookUrl = CONFIG.WORKFLOWS.CONTENT_ANALYZER;
        break;
      case 'email-campaign':
        webhookUrl = CONFIG.WORKFLOWS.EMAIL_CAMPAIGN;
        break;
      default:
        throw new Error('Unknown workflow');
    }
    
    const response = await fetch(webhookUrl + `?token=${CONFIG.WORKFLOW_TOKEN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        source: 'sps-dashboard',
        workflow: workflowId,
        timestamp: Date.now()
      })
    });
    
    if (response.ok) {
      showNotification(`Workflow "${workflowId}" started successfully`, 'success');
      loadWorkflows(); // Refresh workflow status
    } else {
      throw new Error('Failed to trigger workflow');
    }
  } catch (error) {
    console.error('Error triggering workflow:', error);
    showNotification(`Failed to trigger workflow: ${error.message}`, 'error');
  } finally {
    hideLoading();
  }
}

function configureWorkflow(workflowId) {
  const modal = $('#workflowModal');
  const configDiv = $('#workflowConfig');
  
  // Load workflow configuration
  configDiv.innerHTML = `
    <h4>Configure ${workflowId}</h4>
    <form id="workflowConfigForm">
      <div class="form-group">
        <label>Schedule</label>
        <select>
          <option>Every hour</option>
          <option>Every 6 hours</option>
          <option>Daily</option>
          <option>Weekly</option>
        </select>
      </div>
      <div class="form-group">
        <label>Webhook URL</label>
        <input type="url" value="${CONFIG.WORKFLOWS[workflowId.toUpperCase().replace('-', '_')] || ''}" />
      </div>
      <div class="form-group">
        <label>Parameters</label>
        <textarea rows="4" placeholder="JSON parameters">{\n  "source": "dashboard"\n}</textarea>
      </div>
      <div class="form-actions">
        <button type="submit" class="action-btn primary">Save Configuration</button>
        <button type="button" class="action-btn" onclick="closeModal()">Cancel</button>
      </div>
    </form>
  `;
  
  modal.classList.remove('hidden');
}

// ======== PROPOSAL FUNCTIONS ========
async function loadProposals() {
  // Load saved proposals
  const proposals = [
    {
      id: 1,
      client: 'TechStart Inc.',
      status: 'sent',
      date: new Date('2024-12-10'),
      value: 15000,
      description: 'Social media marketing strategy'
    },
    {
      id: 2,
      client: 'HealthPlus Wellness',
      status: 'won',
      date: new Date('2024-12-08'),
      value: 22500,
      description: 'Content marketing campaign'
    }
  ];
  
  appState.proposals = proposals;
  renderProposals();
}

function renderProposals() {
  // Proposals rendering handled by HTML template
}

async function generateProposal(formData) {
  showLoading();
  
  try {
    // Gather competitive intelligence
    const competitorData = appState.adsData.filter(ad => 
      ad.industry === formData.get('clientIndustry')
    ).slice(0, 5);
    
    // Generate proposal using AI
    const proposalContent = await generateAIProposal({
      client: formData.get('clientName'),
      industry: formData.get('clientIndustry'),
      description: formData.get('businessDesc'),
      problem: formData.get('clientProblem'),
      solution: formData.get('proposedSolution'),
      budget: formData.get('budgetRange'),
      competitorInsights: competitorData,
      includeAnalysis: formData.get('includeCompAnalysis'),
      includeViral: formData.get('includeViralTrends'),
      includeAI: formData.get('includeAIInsights')
    });
    
    // Save proposal
    const proposal = {
      id: Date.now(),
      ...proposalContent,
      status: 'draft',
      date: new Date()
    };
    
    appState.proposals.push(proposal);
    
    showNotification('Proposal generated successfully!', 'success');
    closeProposalForm();
    renderProposals();
    
  } catch (error) {
    console.error('Error generating proposal:', error);
    showNotification('Failed to generate proposal', 'error');
  } finally {
    hideLoading();
  }
}

async function generateAIProposal(data) {
  // Simulate AI proposal generation
  // In production, this would call your OpenAI API or workflow
  return {
    client: data.client,
    title: `Data-Driven Marketing Strategy for ${data.client}`,
    value: parseInt(data.budget.split('-')[0]),
    problemStatement: data.problem,
    solutionOverview: data.solution,
    competitiveAnalysis: data.competitorInsights ? 
      'Based on our analysis of 5 top competitors in your industry...' : '',
    viralTrends: data.includeViral ? 
      'Current viral content trends show preference for video content...' : '',
    aiInsights: data.includeAI ? 
      'Our AI analysis suggests focusing on emotional storytelling...' : '',
    milestones: [
      { phase: 'Discovery & Research', timeline: '1 week' },
      { phase: 'Strategy Development', timeline: '2 weeks' },
      { phase: 'Implementation', timeline: '4 weeks' },
      { phase: 'Optimization', timeline: 'Ongoing' }
    ]
  };
}

// ======== CLIENT FUNCTIONS ========
async function loadClientData() {
  // Load client dashboard data
  // This would typically fetch from your backend
}

// ======== EVENT LISTENERS ========
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  
  // Dashboard listeners
  $('#runScrapeBtn')?.addEventListener('click', () => triggerWorkflow('ad-scraper'));
  $('#exportDataBtn')?.addEventListener('click', exportData);
  $('#refreshAds')?.addEventListener('click', loadCompetitorData);
  
  // Search and filter listeners
  $('#searchAds')?.addEventListener('input', (e) => {
    appState.filters.search = e.target.value;
    renderCompetitorTable(appState.adsData);
  });
  
  $('#platformFilter')?.addEventListener('change', (e) => {
    appState.filters.platform = e.target.value;
    renderCompetitorTable(appState.adsData);
  });
  
  $('#industryFilter')?.addEventListener('change', (e) => {
    appState.filters.industry = e.target.value;
    renderCompetitorTable(appState.adsData);
  });
  
  // Proposal form listeners
  $('#newProposalBtn')?.addEventListener('click', () => {
    $('#proposalForm').classList.remove('hidden');
  });
  
  $('#proposalGenerator')?.addEventListener('submit', (e) => {
    e.preventDefault();
    generateProposal(new FormData(e.target));
  });
  
  // Modal close listener
  $('.close')?.addEventListener('click', closeModal);
  
  // Workflow buttons
  $('#addWorkflowBtn')?.addEventListener('click', addNewWorkflow);
  
  // Initial load
  navigateToSection('dashboard');
});

// ======== HELPER FUNCTIONS ========
function closeModal() {
  $('#workflowModal').classList.add('hidden');
}

function closeProposalForm() {
  $('#proposalForm').classList.add('hidden');
  $('#proposalGenerator').reset();
}

function exportData() {
  // Export data as CSV
  const csv = convertToCSV(appState.adsData);
  downloadCSV(csv, 'competitor-ads-export.csv');
}

function convertToCSV(data) {
  if (!data.length) return '';
  
  const headers = Object.keys(data[0]);
  const rows = data.map(row => 
    headers.map(header => `"${row[header] || ''}"`).join(',')
  );
  
  return [headers.join(','), ...rows].join('\n');
}

function downloadCSV(csv, filename) {
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

function addNewWorkflow() {
  // Open workflow creation modal
  configureWorkflow('new-workflow');
}

// Export functions for global access
window.triggerWorkflow = triggerWorkflow;
window.configureWorkflow = configureWorkflow;
window.closeProposalForm = closeProposalForm;
window.viewAdDetails = (id) => console.log('View ad details:', id);
window.generateVariation = (id) => console.log('Generate variation for:', id);