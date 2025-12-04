// ================================================
// Cashera Capital - Improved Risk Model V4.0 JS
// ================================================

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    addSmoothScrolling();
    addScrollAnimations();
});

// ========================================
// Chart Initialization
// ========================================

function initializeCharts() {
    loadChartJS().then(() => {
        createTierDistributionChart();
    }).catch(error => {
        console.log('Chart.js not loaded, skipping visualizations');
    });
}

function loadChartJS() {
    return new Promise((resolve, reject) => {
        if (typeof Chart !== 'undefined') {
            resolve();
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js';
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// ========================================
// Tier Distribution Chart
// ========================================

function createTierDistributionChart() {
    const ctx = document.getElementById('tierDistributionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tier 4\n(Premium)\n80-100', 'Tier 3\n(Strong)\n65-79', 'Tier 2\n(Good)\n50-64', 'Tier 1\n(Emerging)\n40-49', 'Denied\n<40'],
            datasets: [
                {
                    label: 'Approval Count',
                    data: [10900, 17500, 13600, 10400, 70012],
                    backgroundColor: [
                        'rgba(0, 208, 132, 0.8)',
                        'rgba(45, 90, 61, 0.8)',
                        'rgba(90, 125, 109, 0.8)',
                        'rgba(184, 134, 11, 0.8)',
                        'rgba(229, 62, 62, 0.6)'
                    ],
                    borderColor: [
                        '#00d084',
                        '#2d5a3d',
                        '#5a7d6d',
                        '#b8860b',
                        '#e53e3e'
                    ],
                    borderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'V4.0 Approval Distribution by Tier (122,412 Applications)',
                    font: { size: 16, weight: 'bold' },
                    color: '#1a472a'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const percentage = ((value / 122412) * 100).toFixed(1);
                            return `Borrowers: ${value.toLocaleString()} (${percentage}%)`;
                        },
                        afterLabel: function(context) {
                            const defaultRates = ['3.2%', '6.4%', '10.8%', '14.2%', 'N/A'];
                            const avgLoans = ['$850', '$550', '$350', '$200', '$0'];
                            return [
                                `Default Rate: ${defaultRates[context.dataIndex]}`,
                                `Avg Loan: ${avgLoans[context.dataIndex]}`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    },
                    title: {
                        display: true,
                        text: 'Number of Borrowers',
                        font: { size: 14, weight: 'bold' }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Risk Tier (CFRS Range)',
                        font: { size: 14, weight: 'bold' }
                    }
                }
            }
        }
    });
}

// ========================================
// Smooth Scrolling
// ========================================

function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// Scroll Animations
// ========================================

function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
        '.improvement-card, .metric-detail-card, .comparison-card, .impact-card, .example-card'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// Print Functionality
// ========================================

function setupPrintButton() {
    const printButton = document.createElement('button');
    printButton.className = 'print-button';
    printButton.innerHTML = '🖨️ Print Report';
    printButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: #00d084;
        color: white;
        border: none;
        padding: 1rem 1.5rem;
        border-radius: 25px;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 999;
        transition: all 0.3s ease;
    `;

    printButton.addEventListener('click', () => window.print());
    printButton.addEventListener('mouseenter', () => {
        printButton.style.transform = 'translateY(-3px)';
        printButton.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.3)';
    });
    printButton.addEventListener('mouseleave', () => {
        printButton.style.transform = 'translateY(0)';
        printButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
    });

    document.body.appendChild(printButton);
}

document.addEventListener('DOMContentLoaded', setupPrintButton);

// ========================================
// Console Info
// ========================================

console.log('%c Cashera Capital Risk Model V4.0 ', 'background: #1a472a; color: #00d084; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%c Enhanced Conversion | Controlled Default ', 'background: #00d084; color: white; font-size: 12px; padding: 5px;');
console.log('Target Conversion: 38-42% | Target Default: <15% | Four-Tier Structure');

// ========================================
// Model Data Export (Optional)
// ========================================

window.exportModelData = function() {
    return {
        version: '4.0',
        targetConversion: '38-42%',
        targetDefault: '<15%',
        tiers: [
            { tier: 4, cfrsRange: '80-100', defaultRate: '2-4%', maxLoan: '$500-$2,500', approvalCount: 10900 },
            { tier: 3, cfrsRange: '65-79', defaultRate: '5-7%', maxLoan: '$300-$1,500', approvalCount: 17500 },
            { tier: 2, cfrsRange: '50-64', defaultRate: '9-12%', maxLoan: '$200-$800', approvalCount: 13600 },
            { tier: 1, cfrsRange: '40-49', defaultRate: '13-15%', maxLoan: '$100-$300', approvalCount: 10400 }
        ],
        improvements: [
            'Expanded tier structure (+1 tier)',
            'Enhanced Plaid data integration',
            'Compensating factor logic',
            'Trend & momentum analysis',
            'Graduated red flags',
            'Income source diversity scoring'
        ],
        expectedImpact: {
            conversionIncrease: '+16-20 percentage points',
            additionalApprovals: '~20,000 borrowers',
            portfolioDefault: '12.8%',
            netProfit: '+$85K-$110K annually'
        }
    };
};

console.log('Use window.exportModelData() to access model data programmatically.');