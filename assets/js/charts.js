// Cashera Capital Risk Model - Chart.js Implementation

// Global data storage
let riskData = [];
let summaryData = {};

// Color scheme
const colors = {
  primary: '#1a237e',
  secondary: '#283593',
  accent: '#3f51b5',
  success: '#4caf50',
  warning: '#ff9800',
  danger: '#f44336',
  info: '#2196f3'
};

// Initialize dashboard
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await loadData();
    renderDashboard();
    createCharts();
  } catch (error) {
    console.error('Error initializing dashboard:', error);
  }
});

// Load data from CSV and JSON files
async function loadData() {
  try {
    // Load CSV data
    const csvResponse = await fetch('data/risk-model.csv');
    const csvText = await csvResponse.text();
    riskData = parseCSV(csvText);

    // Load summary JSON
    const jsonResponse = await fetch('data/summary.json');
    summaryData = await jsonResponse.json();
  } catch (error) {
    console.error('Error loading data:', error);
    throw error;
  }
}

// Parse CSV data
function parseCSV(csv) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',');
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',');
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index];
    });
    data.push(row);
  }

  return data;
}

// Render dashboard summary cards
function renderDashboard() {
  const summary = summaryData.portfolioSummary;
  const risk = summaryData.riskMetrics;

  // Update portfolio value
  document.getElementById('portfolio-value').textContent =
    `$${Number(summary.currentValue).toLocaleString()}`;
  document.getElementById('portfolio-change').textContent =
    `+${summary.totalReturnPercent}`;
  document.getElementById('portfolio-change').className = 'card-change change-positive';

  // Update VaR 95%
  document.getElementById('var95-value').textContent =
    `$${Number(risk.valueAtRisk.var95).toLocaleString()}`;
  document.getElementById('var95-percent').textContent =
    risk.valueAtRisk.var95Percent;

  // Update VaR 99%
  document.getElementById('var99-value').textContent =
    `$${Number(risk.valueAtRisk.var99).toLocaleString()}`;
  document.getElementById('var99-percent').textContent =
    risk.valueAtRisk.var99Percent;

  // Update Sharpe Ratio
  document.getElementById('sharpe-value').textContent =
    risk.sharpeRatio.current.toFixed(2);
  document.getElementById('sharpe-rating').textContent =
    risk.sharpeRatio.rating;

  // Update Volatility
  document.getElementById('volatility-value').textContent =
    `${(risk.volatility.current * 100).toFixed(1)}%`;
  document.getElementById('volatility-trend').textContent =
    risk.volatility.trend;

  // Update Max Drawdown
  document.getElementById('drawdown-value').textContent =
    risk.maxDrawdown.currentPercent;
}

// Create all charts
function createCharts() {
  createPortfolioValueChart();
  createVaRChart();
  createVolatilityChart();
  createRiskMetricsChart();
  createBetaChart();
  createRiskScoresChart();
}

// Portfolio Value Over Time Chart
function createPortfolioValueChart() {
  const ctx = document.getElementById('portfolioValueChart').getContext('2d');
  const dates = riskData.map(d => d.Date);
  const values = riskData.map(d => parseFloat(d.Portfolio_Value));

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Portfolio Value',
        data: values,
        borderColor: colors.primary,
        backgroundColor: 'rgba(26, 35, 126, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              return 'Value: $' + context.parsed.y.toLocaleString();
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000) + 'K';
            }
          }
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    }
  });
}

// Value at Risk Chart
function createVaRChart() {
  const ctx = document.getElementById('varChart').getContext('2d');
  const dates = riskData.map(d => d.Date);
  const var95 = riskData.map(d => parseFloat(d.VaR_95));
  const var99 = riskData.map(d => parseFloat(d.VaR_99));
  const es = riskData.map(d => parseFloat(d.Expected_Shortfall));

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'VaR 95%',
          data: var95,
          borderColor: colors.warning,
          backgroundColor: 'rgba(255, 152, 0, 0.1)',
          borderWidth: 2,
          tension: 0.4
        },
        {
          label: 'VaR 99%',
          data: var99,
          borderColor: colors.danger,
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
          borderWidth: 2,
          tension: 0.4
        },
        {
          label: 'Expected Shortfall',
          data: es,
          borderColor: colors.primary,
          backgroundColor: 'rgba(26, 35, 126, 0.1)',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: function(value) {
              return '$' + (value / 1000) + 'K';
            }
          }
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    }
  });
}

// Volatility Chart
function createVolatilityChart() {
  const ctx = document.getElementById('volatilityChart').getContext('2d');
  const dates = riskData.map(d => d.Date);
  const volatility = riskData.map(d => parseFloat(d.Volatility) * 100);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: dates,
      datasets: [{
        label: 'Volatility (%)',
        data: volatility,
        backgroundColor: colors.accent,
        borderColor: colors.primary,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return 'Volatility: ' + context.parsed.y.toFixed(2) + '%';
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    }
  });
}

// Risk Metrics Radar Chart
function createRiskMetricsChart() {
  const ctx = document.getElementById('riskMetricsChart').getContext('2d');

  // Get latest data point
  const latest = riskData[riskData.length - 1];

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Liquidity', 'Credit Quality', 'Volatility', 'Beta', 'Sharpe Ratio', 'Drawdown'],
      datasets: [{
        label: 'Current Risk Profile',
        data: [
          parseFloat(latest.Liquidity_Score),
          10 - parseFloat(latest.Credit_Risk_Score), // Inverted for better visualization
          (1 - parseFloat(latest.Volatility)) * 10,
          (2 - parseFloat(latest.Beta)) * 5,
          parseFloat(latest.Sharpe_Ratio) * 5,
          (1 + parseFloat(latest.Max_Drawdown)) * 10
        ],
        backgroundColor: 'rgba(26, 35, 126, 0.2)',
        borderColor: colors.primary,
        borderWidth: 2,
        pointBackgroundColor: colors.primary,
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: colors.primary
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 10,
          ticks: {
            stepSize: 2
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        }
      }
    }
  });
}

// Beta Over Time Chart
function createBetaChart() {
  const ctx = document.getElementById('betaChart').getContext('2d');
  const dates = riskData.map(d => d.Date);
  const beta = riskData.map(d => parseFloat(d.Beta));

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [{
        label: 'Beta',
        data: beta,
        borderColor: colors.info,
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        annotation: {
          annotations: {
            line1: {
              type: 'line',
              yMin: 1,
              yMax: 1,
              borderColor: colors.danger,
              borderWidth: 2,
              borderDash: [5, 5],
              label: {
                content: 'Market Beta = 1.0',
                enabled: true,
                position: 'end'
              }
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 0.8,
          max: 1.2
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    }
  });
}

// Risk Scores Chart
function createRiskScoresChart() {
  const ctx = document.getElementById('riskScoresChart').getContext('2d');
  const dates = riskData.map(d => d.Date);
  const liquidity = riskData.map(d => parseFloat(d.Liquidity_Score));
  const credit = riskData.map(d => parseFloat(d.Credit_Risk_Score));

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: dates,
      datasets: [
        {
          label: 'Liquidity Score',
          data: liquidity,
          borderColor: colors.success,
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          borderWidth: 2,
          yAxisID: 'y',
          tension: 0.4
        },
        {
          label: 'Credit Risk Score',
          data: credit,
          borderColor: colors.danger,
          backgroundColor: 'rgba(244, 67, 54, 0.1)',
          borderWidth: 2,
          yAxisID: 'y',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          type: 'linear',
          display: true,
          position: 'left',
          beginAtZero: true,
          max: 10
        },
        x: {
          ticks: {
            maxRotation: 45,
            minRotation: 45
          }
        }
      }
    }
  });
}

// Navigation functionality
document.querySelectorAll('nav ul li').forEach(item => {
  item.addEventListener('click', function() {
    // Remove active class from all items
    document.querySelectorAll('nav ul li').forEach(i => i.classList.remove('active'));

    // Add active class to clicked item
    this.classList.add('active');

    // Scroll to section
    const sectionId = this.getAttribute('data-section');
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Utility function to format numbers
function formatNumber(num, decimals = 2) {
  return Number(num).toFixed(decimals);
}

// Utility function to format currency
function formatCurrency(num) {
  return '$' + Number(num).toLocaleString();
}

// Export data functionality (optional)
function exportData(format) {
  if (format === 'csv') {
    const csvContent = Papa.unparse(riskData);
    downloadFile(csvContent, 'risk-model-export.csv', 'text/csv');
  } else if (format === 'json') {
    const jsonContent = JSON.stringify({ riskData, summaryData }, null, 2);
    downloadFile(jsonContent, 'risk-model-export.json', 'application/json');
  }
}

function downloadFile(content, filename, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}
