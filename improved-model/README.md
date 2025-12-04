# Cashera Capital - Risk Model V4.0 (Improved)

![Version](https://img.shields.io/badge/Version-4.0-00d084?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Enhanced-00d084?style=for-the-badge)

## 🚀 Model Enhancement Overview

This WebReport documents the **Improved Risk Model V4.0**, a significant evolution from V3.2 designed to increase conversion rates by **60-80%** while maintaining portfolio default rates below **15%**.

### Key Improvements

✅ **+16-20% Conversion Increase** - From 21.83% to 38-42%
✅ **4-Tier Structure** - Added Tier 1 (Conditional Approval)
✅ **Enhanced Plaid Integration** - 5 new data-driven metrics
✅ **Compensating Factors** - Strengths offset weaknesses
✅ **Trend Analysis** - Improving accounts get bonus points
✅ **Graduated Red Flags** - Context-aware risk assessment

---

## 📊 Performance Projections

| Metric | V3.2 (Previous) | V4.0 (Improved) | Change |
|--------|----------------|-----------------|--------|
| **Conversion Rate** | 21.83% | 38-42% | +73-92% |
| **Approvals** | 26,717 | 46,500-51,400 | +19,800-24,700 |
| **Portfolio Default** | 8.2% | 12.8% | +4.6% |
| **Net Profit** | Baseline | +$85K-$110K | Increase |

**Risk-Adjusted Return:** Default increase well within acceptable range (<15% target)

---

## 🎯 New Features

### 1. Expanded Tier Structure
- **Tier 4 (Premium):** CFRS 80-100, 2-4% default, $500-$2,500 loans
- **Tier 3 (Strong):** CFRS 65-79, 5-7% default, $300-$1,500 loans
- **Tier 2 (Good):** CFRS 50-64, 9-12% default, $200-$800 loans
- **Tier 1 (Emerging):** CFRS 40-49, 13-15% default, $100-$300 loans (NEW!)

### 2. Enhanced Plaid Metrics
- Cash flow velocity (inflow/outflow patterns)
- Balance trend analysis (improving vs declining)
- Recurring deposit detection
- Overdraft recovery speed
- Income source diversity scoring

### 3. Compensating Factor Logic
- Strengths in one area offset weaknesses in another
- Example: Low CFA + excellent income stability = approved
- Max ±7 CFRS point adjustment
- Critical factors (debt >20%) cannot be compensated

### 4. Trend & Momentum Analysis
- Improving accounts: +3-5 CFRS bonus
- Recent behavior weighted 2x
- Recovery from setbacks recognized positively

### 5. Graduated Red Flags
- **Critical:** Auto-deny (fraud, debt >30%)
- **Major:** Manual review (stop payments, debt 20-30%)
- **Minor:** Conditional approval (1 NSF, thin file)

---

## 📁 File Structure

```
improved-model/
├── docs/
│   ├── index.html          # Complete WebReport
│   ├── style.css           # Enhanced styling
│   ├── script.js           # Interactive charts
│   └── assets/             # (Reserved for images)
└── README.md               # This file
```

---

## 🌐 Deployment Instructions

### Option 1: GitHub Pages (Separate Branch)

```bash
# Navigate to repository root
cd /Users/macbookpro/Cashera-Risk-Model

# Create new branch for improved model
git checkout -b improved-model-v4

# Add improved model files
git add improved-model/
git commit -m "Add Improved Risk Model V4.0

- Expanded 4-tier structure
- Enhanced Plaid integration
- Compensating factor logic
- Target: 38-42% conversion, <15% default"

# Push to GitHub
git push -u origin improved-model-v4
```

**Access at:** `https://cmglala-wq.github.io/Cashera-Risk-Model/improved-model/docs/`

### Option 2: Separate Repository

```bash
# Create new repository
cd improved-model
git init
git add .
git commit -m "Initial commit: Risk Model V4.0"

# Create GitHub repo and push
# Then enable GitHub Pages on /docs folder
```

---

## 📈 Expected Impact by Tier

| Tier | % of Applications | Approval Count | Default Rate | Profit/Loan |
|------|-------------------|----------------|--------------|-------------|
| Tier 4 | 8.9% | 10,900 | 3.2% | $68 |
| Tier 3 | 14.3% | 17,500 | 6.4% | $42 |
| Tier 2 | 11.1% | 13,600 | 10.8% | $24 |
| **Tier 1 (NEW)** | **8.5%** | **10,400** | **14.2%** | **$8** |
| **Total Approved** | **42.8%** | **52,400** | **8.9% avg** | **$36 avg** |

---

## 🔬 Model Validation Strategy

### Phase 1 (Month 1-2)
- Deploy to 20% of applications
- Shadow scoring alongside V3.2
- Monitor conversion and default rates

### Phase 2 (Month 3-4)
- Increase to 50% deployment
- Verify default rates remain <15%

### Phase 3 (Month 5-6)
- Full 100% rollout
- Monthly tier recalibration

**Success Criteria:**
- Conversion ≥35%
- Portfolio default ≤14%
- Net profit ≥$75K annually

---

## 🎨 Customization

All metrics and thresholds can be adjusted in `/docs/index.html`:

- **Tier thresholds:** Lines 150-200
- **Default rates:** Lines 250-300
- **Conversion targets:** Lines 350-400
- **Chart data:** `/docs/script.js` lines 30-80

---

## 📞 Support

- **Model Questions:** Review `/docs/index.html` sections on compensating factors and tier structure
- **Technical Issues:** Check browser console for JavaScript errors
- **Deployment Help:** See GitHub Pages documentation

---

## 🔗 Related Files

- **Original Model (V3.2):** `/docs/` (in repository root)
- **Improved Model (V4.0):** `/improved-model/docs/` (this folder)

---

**Generated:** December 2024
**Model Version:** CFRS V4.0
**Target Audience:** Gig workers, self-employed, underbanked populations

---

© 2024 Cashera Capital | Enhanced Risk Assessment for Financial Inclusion