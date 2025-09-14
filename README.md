# Sentinel Peak Solutions - Marketing Intelligence Hub

## 🚀 Data-Driven Marketing Platform

A comprehensive marketing intelligence dashboard that combines competitor analysis, AI-powered proposal generation, and workflow automation to deliver superior marketing results for clients.

## 🎯 Key Features

### 1. **Competitor Intelligence System**
- Real-time Facebook Ad Library scraping
- Multi-platform ad tracking (Facebook, Instagram, LinkedIn, TikTok)
- AI-powered ad copy optimization
- Engagement metrics and viral content detection

### 2. **AI Proposal Generator**
- GPT-4 powered proposal creation
- Competitive intelligence integration
- Market trend analysis
- Custom pricing and milestone generation
- PandaDoc integration for professional delivery

### 3. **Marketing Workflow Automation**
- n8n/Make.com workflow integration
- Automated ad scraping schedules
- Content performance analysis
- Email campaign automation
- Real-time webhook triggers

### 4. **Analytics & Insights Engine**
- Performance trend visualization
- Competitor benchmarking
- ROI tracking and reporting
- AI-generated strategic insights
- Predictive trend analysis

### 5. **Client Portal**
- White-labeled client dashboards
- Real-time campaign performance
- Competitive advantage metrics
- Custom reporting

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: Chart.js
- **Automation**: n8n, Make.com (Integromat)
- **AI**: OpenAI GPT-4 API
- **Data Source**: Google Sheets API
- **Document Generation**: PandaDoc API

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/bgblanco/facebook-ad-scraper.git
cd facebook-ad-scraper
```

2. Configure your API keys in `script-enhanced.js`:
```javascript
const CONFIG = {
  SHEET_ID: "YOUR_GOOGLE_SHEET_ID",
  WORKFLOWS: {
    AD_SCRAPER: "YOUR_N8N_WEBHOOK_URL",
    PROPOSAL_GEN: "YOUR_PROPOSAL_WEBHOOK",
    // ... other webhooks
  },
  WORKFLOW_TOKEN: "YOUR_SECRET_TOKEN"
};
```

3. Open `index-enhanced.html` in your browser or deploy to your web server.

## 🔧 Configuration

### Google Sheets Setup
1. Create a Google Sheet with competitor ad data
2. Publish to web: File → Share → Publish to web
3. Copy the Sheet ID from the URL
4. Update `SHEET_ID` in configuration

### Workflow Integration
1. Set up n8n or Make.com workflows
2. Create webhook triggers for each workflow
3. Update webhook URLs in `CONFIG.WORKFLOWS`

### AI Integration
1. Obtain OpenAI API key
2. Set up Make.com scenario for proposal generation
3. Configure PandaDoc templates

## 📊 Data Structure

### Competitor Ad Data Schema
```javascript
{
  date_added: "2024-12-13",
  competitor: "CompanyName",
  platform: "facebook",
  summary: "Ad description",
  engagement: 5000,
  rewritten_copy: "AI-optimized version",
  image_prompt: "DALL-E prompt",
  video_prompt: "Video creation prompt"
}
```

### Proposal Data Schema
```javascript
{
  client: "ClientName",
  industry: "tech",
  businessDescription: "...",
  problem: "Current challenges",
  solution: "Proposed solution",
  competitorInsights: [...],
  milestones: [...]
}
```

## 🎨 Customization

### Branding
- Replace `sps-logo.png` with your company logo
- Update color scheme in `styles-enhanced.css`:
```css
:root {
  --primary: #00d4ff;    /* Your primary color */
  --secondary: #00ff88;  /* Your secondary color */
  --accent: #ff00ff;     /* Your accent color */
}
```

### Adding New Workflows
1. Register workflow in `workflows.js`:
```javascript
workflowManager.registerWorkflow('new-workflow', {
  name: 'Workflow Name',
  webhook: 'https://your-webhook-url',
  // ... configuration
});
```

2. Add UI card in `index-enhanced.html`
3. Implement execution logic

## 📈 Analytics

The platform tracks:
- Total ads scraped
- Viral content patterns
- Competitor strategies
- Campaign performance
- ROI metrics
- Engagement trends

## 🔐 Security

- All webhooks use authentication tokens
- Client data stored securely
- API keys should be environment variables in production
- HTTPS required for all external connections

## 🚦 Workflow Automation

### Available Workflows

1. **Ad Scraper** - Automated competitor ad collection
2. **Proposal Generator** - AI-powered proposal creation
3. **Content Analyzer** - Viral content pattern detection
4. **Email Campaign** - Automated email marketing

### Trigger Methods
- Manual triggers via dashboard
- Scheduled automation (cron)
- Webhook-based triggers
- Event-driven execution

## 📝 Usage Examples

### Generating a Proposal
1. Navigate to Proposals section
2. Click "New Proposal"
3. Fill in client information
4. Select competitive intelligence options
5. Generate and review

### Running Ad Scraper
1. Go to Competitors section
2. Click "Run Scraper"
3. View real-time results
4. Export data as needed

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines.

## 📄 License

Copyright © 2024 Sentinel Peak Solutions. All rights reserved.

## 📞 Support

For support, email info@sentinelpeaksolutions.com

---

**Built with ❤️ by Sentinel Peak Solutions**  
*Empowering businesses with data-driven marketing intelligence*