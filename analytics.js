// ======== ANALYTICS & INSIGHTS ENGINE ========

class AnalyticsEngine {
  constructor() {
    this.charts = new Map();
    this.insights = [];
    this.metrics = {
      engagement: [],
      conversion: [],
      reach: [],
      sentiment: []
    };
  }

  // ======== DATA VISUALIZATION ========
  
  initializeCharts() {
    // Performance Chart
    this.createPerformanceChart();
    
    // Competitor Analysis Chart
    this.createCompetitorChart();
    
    // Content Performance Heatmap
    this.createContentHeatmap();
    
    // ROI Dashboard
    this.createROIDashboard();
  }

  createPerformanceChart() {
    const ctx = document.getElementById('performanceChart');
    if (!ctx) return;

    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.generateTimeLabels(30),
        datasets: [
          {
            label: 'Engagement Rate',
            data: this.generateTrendData(30, 65, 112, 0.15),
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Conversion Rate',
            data: this.generateTrendData(30, 28, 67, 0.12),
            borderColor: '#00ff88',
            backgroundColor: 'rgba(0, 255, 136, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Viral Coefficient',
            data: this.generateTrendData(30, 1.2, 2.8, 0.08),
            borderColor: '#ff00ff',
            backgroundColor: 'rgba(255, 0, 255, 0.1)',
            tension: 0.4,
            fill: true,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#e6f3f3',
              usePointStyle: true,
              padding: 15
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#00d4ff',
            bodyColor: '#e6f3f3',
            borderColor: '#00d4ff',
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.dataset.label.includes('Rate') ? 
                    context.parsed.y.toFixed(1) + '%' : 
                    context.parsed.y.toFixed(2);
                }
                return label;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              drawBorder: false
            },
            ticks: {
              color: '#9bb',
              maxRotation: 45,
              minRotation: 45
            }
          },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: {
              color: 'rgba(255, 255, 255, 0.05)',
              drawBorder: false
            },
            ticks: {
              color: '#9bb',
              callback: function(value) {
                return value + '%';
              }
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: {
              drawOnChartArea: false
            },
            ticks: {
              color: '#ff00ff',
              callback: function(value) {
                return value.toFixed(1) + 'x';
              }
            }
          }
        }
      }
    });

    this.charts.set('performance', chart);
  }

  createCompetitorChart() {
    const canvas = document.createElement('canvas');
    canvas.id = 'competitorChart';
    
    const container = document.querySelector('.chart-container');
    if (container) {
      container.appendChild(canvas);
    }

    const chart = new Chart(canvas, {
      type: 'radar',
      data: {
        labels: ['Content Quality', 'Engagement', 'Frequency', 'Reach', 'Innovation', 'ROI'],
        datasets: [
          {
            label: 'Your Performance',
            data: [85, 92, 78, 88, 95, 82],
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.2)',
            pointBackgroundColor: '#00d4ff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#00d4ff'
          },
          {
            label: 'Industry Average',
            data: [65, 70, 82, 75, 60, 68],
            borderColor: '#ff00ff',
            backgroundColor: 'rgba(255, 0, 255, 0.1)',
            pointBackgroundColor: '#ff00ff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ff00ff'
          },
          {
            label: 'Top Competitor',
            data: [88, 85, 90, 82, 78, 75],
            borderColor: '#ffaa00',
            backgroundColor: 'rgba(255, 170, 0, 0.1)',
            pointBackgroundColor: '#ffaa00',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#ffaa00'
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#e6f3f3'
            }
          }
        },
        scales: {
          r: {
            angleLines: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            },
            pointLabels: {
              color: '#00d4ff',
              font: {
                size: 12
              }
            },
            ticks: {
              color: '#9bb',
              backdropColor: 'transparent'
            }
          }
        }
      }
    });

    this.charts.set('competitor', chart);
  }

  createContentHeatmap() {
    // Create content performance heatmap
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const hours = Array.from({length: 24}, (_, i) => `${i}:00`);
    
    const heatmapData = [];
    days.forEach((day, dayIndex) => {
      hours.forEach((hour, hourIndex) => {
        heatmapData.push({
          day: dayIndex,
          hour: hourIndex,
          value: Math.random() * 100
        });
      });
    });

    // This would typically use a heatmap library
    // For now, we'll create a simple representation
    return heatmapData;
  }

  createROIDashboard() {
    const roiData = {
      totalSpend: 45000,
      totalRevenue: 187500,
      roi: 316.67,
      campaigns: [
        { name: 'Social Media', spend: 15000, revenue: 67500, roi: 350 },
        { name: 'Content Marketing', spend: 10000, revenue: 45000, roi: 350 },
        { name: 'Email Campaign', spend: 8000, revenue: 32000, roi: 300 },
        { name: 'Influencer', spend: 12000, revenue: 43000, roi: 258 }
      ]
    };

    return roiData;
  }

  // ======== AI INSIGHTS GENERATION ========
  
  async generateInsights(data) {
    const insights = [];

    // Engagement Analysis
    const engagementInsight = this.analyzeEngagement(data);
    if (engagementInsight) insights.push(engagementInsight);

    // Competitor Analysis
    const competitorInsight = this.analyzeCompetitors(data);
    if (competitorInsight) insights.push(competitorInsight);

    // Content Performance
    const contentInsight = this.analyzeContent(data);
    if (contentInsight) insights.push(contentInsight);

    // Trend Prediction
    const trendInsight = await this.predictTrends(data);
    if (trendInsight) insights.push(trendInsight);

    // Opportunity Detection
    const opportunityInsight = this.detectOpportunities(data);
    if (opportunityInsight) insights.push(opportunityInsight);

    this.insights = insights;
    return insights;
  }

  analyzeEngagement(data) {
    // Analyze engagement patterns
    const avgEngagement = data.reduce((sum, item) => sum + (item.engagement || 0), 0) / data.length;
    const trend = this.calculateTrend(data.map(d => d.engagement || 0));

    if (trend > 0.1) {
      return {
        type: 'success',
        category: 'Engagement',
        title: 'Engagement Trending Up',
        description: `Your engagement rate has increased by ${(trend * 100).toFixed(1)}% over the past week`,
        actionable: 'Continue with current content strategy and consider increasing posting frequency',
        priority: 'high',
        metrics: {
          current: avgEngagement,
          change: trend,
          target: avgEngagement * 1.2
        }
      };
    } else if (trend < -0.05) {
      return {
        type: 'warning',
        category: 'Engagement',
        title: 'Engagement Declining',
        description: `Engagement has dropped by ${Math.abs(trend * 100).toFixed(1)}% this week`,
        actionable: 'Review recent content performance and adjust strategy',
        priority: 'critical',
        metrics: {
          current: avgEngagement,
          change: trend,
          target: avgEngagement * 1.5
        }
      };
    }

    return null;
  }

  analyzeCompetitors(data) {
    // Analyze competitor strategies
    const competitors = [...new Set(data.map(d => d.competitor).filter(Boolean))];
    const topPerformer = this.findTopPerformer(data);

    if (topPerformer) {
      return {
        type: 'insight',
        category: 'Competitive Analysis',
        title: 'Competitor Strategy Identified',
        description: `${topPerformer.competitor} is seeing ${topPerformer.performance}% better engagement using ${topPerformer.strategy}`,
        actionable: 'Consider adapting this strategy for your campaigns',
        priority: 'medium',
        data: topPerformer
      };
    }

    return null;
  }

  analyzeContent(data) {
    // Analyze content performance patterns
    const contentTypes = this.categorizeContent(data);
    const bestPerforming = Object.entries(contentTypes)
      .sort((a, b) => b[1].avgEngagement - a[1].avgEngagement)[0];

    if (bestPerforming) {
      return {
        type: 'recommendation',
        category: 'Content Strategy',
        title: 'High-Performing Content Type',
        description: `${bestPerforming[0]} content generates ${bestPerforming[1].avgEngagement.toFixed(0)} average engagement`,
        actionable: `Increase ${bestPerforming[0]} content to ${Math.ceil(bestPerforming[1].count * 1.5)} posts per week`,
        priority: 'high',
        data: bestPerforming[1]
      };
    }

    return null;
  }

  async predictTrends(data) {
    // Use historical data to predict future trends
    const prediction = this.runPredictionModel(data);

    if (prediction.confidence > 0.7) {
      return {
        type: 'prediction',
        category: 'Trend Forecast',
        title: `${prediction.trend} Expected Next Week`,
        description: `Our AI model predicts a ${prediction.change}% ${prediction.direction} in engagement`,
        actionable: prediction.recommendation,
        priority: 'medium',
        confidence: prediction.confidence,
        data: prediction
      };
    }

    return null;
  }

  detectOpportunities(data) {
    // Detect market opportunities
    const gaps = this.findMarketGaps(data);

    if (gaps.length > 0) {
      const topGap = gaps[0];
      return {
        type: 'opportunity',
        category: 'Market Opportunity',
        title: 'Untapped Market Segment',
        description: `${topGap.segment} shows high potential with low competition`,
        actionable: `Launch targeted campaign for ${topGap.segment} audience`,
        priority: 'high',
        potential: topGap.potential,
        data: topGap
      };
    }

    return null;
  }

  // ======== HELPER FUNCTIONS ========
  
  generateTimeLabels(days) {
    const labels = [];
    const now = new Date();
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    
    return labels;
  }

  generateTrendData(points, min, max, volatility = 0.1) {
    const data = [];
    let current = min + (max - min) * 0.3;
    const trend = (max - min) / points;
    
    for (let i = 0; i < points; i++) {
      current += trend + (Math.random() - 0.5) * volatility * (max - min);
      current = Math.max(min, Math.min(max, current));
      data.push(current);
    }
    
    return data;
  }

  calculateTrend(values) {
    if (values.length < 2) return 0;
    
    const n = values.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
    
    for (let i = 0; i < n; i++) {
      sumX += i;
      sumY += values[i];
      sumXY += i * values[i];
      sumX2 += i * i;
    }
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope / (sumY / n); // Normalized slope
  }

  findTopPerformer(data) {
    const performers = data
      .filter(d => d.competitor && d.engagement)
      .sort((a, b) => b.engagement - a.engagement);
    
    if (performers.length > 0) {
      return {
        competitor: performers[0].competitor,
        performance: ((performers[0].engagement / (performers.reduce((sum, p) => sum + p.engagement, 0) / performers.length) - 1) * 100).toFixed(0),
        strategy: performers[0].strategy || 'Video content',
        engagement: performers[0].engagement
      };
    }
    
    return null;
  }

  categorizeContent(data) {
    const categories = {};
    
    data.forEach(item => {
      const type = item.content_type || 'Unknown';
      if (!categories[type]) {
        categories[type] = {
          count: 0,
          totalEngagement: 0,
          avgEngagement: 0
        };
      }
      
      categories[type].count++;
      categories[type].totalEngagement += item.engagement || 0;
      categories[type].avgEngagement = categories[type].totalEngagement / categories[type].count;
    });
    
    return categories;
  }

  runPredictionModel(data) {
    // Simplified prediction model
    const trend = this.calculateTrend(data.map(d => d.engagement || 0));
    const confidence = Math.min(0.95, Math.abs(trend) * 10);
    
    return {
      trend: trend > 0 ? 'Growth' : 'Decline',
      direction: trend > 0 ? 'increase' : 'decrease',
      change: Math.abs(trend * 100).toFixed(1),
      confidence,
      recommendation: trend > 0 ? 
        'Maintain current strategy and scale successful campaigns' : 
        'Pivot strategy and test new content formats'
    };
  }

  findMarketGaps(data) {
    // Identify underserved market segments
    const segments = [
      { segment: 'Gen Z Mobile Users', competition: 0.3, potential: 0.9 },
      { segment: 'B2B Decision Makers', competition: 0.7, potential: 0.8 },
      { segment: 'Health & Wellness Enthusiasts', competition: 0.5, potential: 0.85 }
    ];
    
    return segments
      .filter(s => s.competition < 0.5 && s.potential > 0.8)
      .sort((a, b) => (b.potential - b.competition) - (a.potential - a.competition));
  }

  // ======== EXPORT FUNCTIONS ========
  
  exportAnalytics(format = 'json') {
    const data = {
      metrics: this.metrics,
      insights: this.insights,
      charts: Array.from(this.charts.keys()),
      generated: new Date().toISOString()
    };

    switch (format) {
      case 'csv':
        return this.convertToCSV(data);
      case 'pdf':
        return this.generatePDF(data);
      default:
        return JSON.stringify(data, null, 2);
    }
  }

  convertToCSV(data) {
    // Convert analytics data to CSV format
    const rows = [];
    
    // Add metrics
    rows.push(['Metric', 'Value']);
    Object.entries(data.metrics).forEach(([key, value]) => {
      rows.push([key, Array.isArray(value) ? value.length : value]);
    });
    
    // Add insights
    rows.push(['', '']);
    rows.push(['Insights', '']);
    data.insights.forEach(insight => {
      rows.push([insight.title, insight.description]);
    });
    
    return rows.map(row => row.join(',')).join('\n');
  }

  generatePDF(data) {
    // Generate PDF report (would use a library like jsPDF in production)
    console.log('Generating PDF report...', data);
    return 'PDF generation not implemented';
  }
}

// Initialize analytics engine
const analyticsEngine = new AnalyticsEngine();

// Auto-initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    analyticsEngine.initializeCharts();
  }, 1000);
});

// Export for global access
window.analyticsEngine = analyticsEngine;