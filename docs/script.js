// ========================================
// Cashera Capital WebReport - JavaScript
// ========================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize charts
    initializeCharts();

    // Add smooth scrolling for navigation links
    addSmoothScrolling();

    // Add intersection observer for animations
    addScrollAnimations();

    // Add progress bar animations
    animateProgressBars();
});

// ========================================
// Chart Initialization
// ========================================

function initializeCharts() {
    // Load Chart.js library
    loadChartJS().then(() => {
        createScoreDistributionChart();
        createLoanComparisonChart();
    });
}

// Load Chart.js from CDN
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

// Portfolio Score Distribution Chart
function createScoreDistributionChart() {
    const ctx = document.getElementById('scoreDistributionChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Tier 3\n(70-100)', 'Tier 2\n(60-69)', 'Tier 1\n(50-59)', 'Denied\n(<50)'],
            datasets: [{
                label: 'Number of Users',
                data: [6716, 6375, 2068, 74393],
                backgroundColor: [
                    'rgba(0, 208, 132, 0.8)',
                    'rgba(45, 90, 61, 0.8)',
                    'rgba(184, 134, 11, 0.8)',
                    'rgba(229, 62, 62, 0.8)'
                ],
                borderColor: [
                    'rgba(0, 208, 132, 1)',
                    'rgba(45, 90, 61, 1)',
                    'rgba(184, 134, 11, 1)',
                    'rgba(229, 62, 62, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Portfolio Distribution by Risk Tier',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#1a472a'
                },
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const value = context.parsed.y;
                            const percentage = ((value / 122412) * 100).toFixed(2);
                            return `Users: ${value.toLocaleString()} (${percentage}%)`;
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
                        text: 'Number of Users',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'CFRS Score Range',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                }
            }
        }
    });
}

// Loan Comparison Chart
function createLoanComparisonChart() {
    const ctx = document.getElementById('loanComparisonChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['$300', '$500', '$800', '$1,000', '$1,200', '$1,500'],
            datasets: [
                {
                    label: 'Conversion Rate (%)',
                    data: [88.5, 90.2, 91.5, 92.2, 92.8, 90.5],
                    borderColor: 'rgba(0, 208, 132, 1)',
                    backgroundColor: 'rgba(0, 208, 132, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'Default Rate (%)',
                    data: [11.5, 9.8, 8.5, 7.8, 7.2, 9.5],
                    borderColor: 'rgba(229, 62, 62, 1)',
                    backgroundColor: 'rgba(229, 62, 62, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                    yAxisID: 'y'
                },
                {
                    label: 'Net Margin ($)',
                    data: [18.20, 32.50, 51.80, 64.30, 75.40, 62.80],
                    borderColor: 'rgba(45, 90, 61, 1)',
                    backgroundColor: 'rgba(45, 90, 61, 0.1)',
                    borderWidth: 3,
                    tension: 0.3,
                    fill: true,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Loan Performance Metrics by Amount',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    color: '#1a472a'
                },
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        boxWidth: 15,
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                if (label.includes('$')) {
                                    label += '$' + context.parsed.y.toFixed(2);
                                } else {
                                    label += context.parsed.y.toFixed(1) + '%';
                                }
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Percentage (%)',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    min: 0,
                    max: 100
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Net Margin ($)',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        drawOnChartArea: false
                    },
                    min: 0,
                    max: 80
                },
                x: {
                    title: {
                        display: true,
                        text: 'Loan Amount',
                        font: {
                            size: 12,
                            weight: 'bold'
                        }
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
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
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

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.indicator-card, .projection-card, .info-card, .metric-box, .redflag-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ========================================
// Progress Bar Animations
// ========================================

function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-fill');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const targetWidth = progressBar.style.width;
                progressBar.style.width = '0%';

                setTimeout(() => {
                    progressBar.style.transition = 'width 1.5s ease-out';
                    progressBar.style.width = targetWidth;
                }, 200);

                observer.unobserve(progressBar);
            }
        });
    }, observerOptions);

    progressBars.forEach(bar => observer.observe(bar));
}

// ========================================
// Score Circle Animation
// ========================================

function animateScoreCircle() {
    const scoreCircle = document.getElementById('scoreCircle');
    if (!scoreCircle) return;

    const scoreNumber = scoreCircle.querySelector('.score-number');
    if (!scoreNumber) return;

    const targetScore = 77.4;
    let currentScore = 0;
    const increment = targetScore / 60; // 60 frames for smooth animation

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationInterval = setInterval(() => {
                    currentScore += increment;
                    if (currentScore >= targetScore) {
                        currentScore = targetScore;
                        clearInterval(animationInterval);
                    }
                    scoreNumber.textContent = currentScore.toFixed(1);
                }, 16); // ~60fps

                observer.unobserve(scoreCircle);
            }
        });
    }, observerOptions);

    observer.observe(scoreCircle);
}

// Initialize score animation
document.addEventListener('DOMContentLoaded', animateScoreCircle);

// ========================================
// Responsive Navigation
// ========================================

// Add mobile menu toggle (if needed in future)
function initMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    // Create mobile menu button
    const menuButton = document.createElement('button');
    menuButton.className = 'mobile-menu-button';
    menuButton.innerHTML = '☰';
    menuButton.style.display = 'none'; // Hidden by default

    // Add button to navbar
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.appendChild(menuButton);
    }

    // Toggle menu on button click
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
    });

    // Show/hide button based on screen size
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
        } else {
            menuButton.style.display = 'none';
            navLinks.classList.remove('mobile-active');
        }
    }

    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
}

// Initialize mobile menu
document.addEventListener('DOMContentLoaded', initMobileMenu);

// ========================================
// Data Export Functions (Optional)
// ========================================

function exportReportData() {
    const reportData = {
        borrowerProfile: {
            cfrsScore: 77.4,
            riskTier: 'Tier 2',
            monthlyIncome: 3500,
            payrollIncome: 2400,
            gigIncome: 1100,
            debtSaturation: 8.0,
            approvalStatus: 'APPROVED'
        },
        indicators: {
            transactionHistory: { value: '6 months', status: 'Strong' },
            cashFlowAffordability: { value: '75%', status: 'Good' },
            debtIndicator: { value: 'Clean', status: 'Excellent' },
            employmentStability: { value: 'Stable', status: 'Good' },
            behaviorFlags: { value: 'Low Risk', status: 'Good' },
            accountStability: { value: 'Strong', status: 'Good' }
        },
        loanProjections: {
            300: { defaultRate: 11.5, conversionRate: 88.5, netMargin: 18.20, decision: 'APPROVE' },
            500: { defaultRate: 9.8, conversionRate: 90.2, netMargin: 32.50, decision: 'APPROVE' },
            800: { defaultRate: 8.5, conversionRate: 91.5, netMargin: 51.80, decision: 'APPROVE' },
            1000: { defaultRate: 7.8, conversionRate: 92.2, netMargin: 64.30, decision: 'CONDITIONAL' },
            1200: { defaultRate: 7.2, conversionRate: 92.8, netMargin: 75.40, decision: 'CONDITIONAL' },
            1500: { defaultRate: 9.5, conversionRate: 90.5, netMargin: 62.80, decision: 'DENY' }
        },
        redFlags: {
            total: 0,
            critical: 0,
            passed: 8
        }
    };

    return reportData;
}

// Make data export available globally
window.exportReportData = exportReportData;

// ========================================
// Print Functionality
// ========================================

function setupPrintButton() {
    // Create print button
    const printButton = document.createElement('button');
    printButton.className = 'print-button';
    printButton.innerHTML = '🖨️ Print Report';
    printButton.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--primary-green);
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

    printButton.addEventListener('click', () => {
        window.print();
    });

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

// Initialize print button
document.addEventListener('DOMContentLoaded', setupPrintButton);

// ========================================
// Performance Monitoring
// ========================================

// Log page load time
window.addEventListener('load', () => {
    const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
    console.log(`WebReport loaded in ${loadTime}ms`);
});

// ========================================
// Console Welcome Message
// ========================================

console.log('%c Cashera Capital WebReport ', 'background: #1a472a; color: #00d084; font-size: 16px; font-weight: bold; padding: 10px;');
console.log('%c Financial Risk Assessment System v3.2 ', 'background: #00d084; color: white; font-size: 12px; padding: 5px;');
console.log('Report generated successfully. Portfolio data: 122,412 borrowers analyzed.');
console.log('Use window.exportReportData() to access the report data programmatically.');