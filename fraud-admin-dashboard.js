// ===== DUMMY DATA =====
// This data structure follows the schema provided in the requirements
const dummyAccounts = [
  {
    _id: "60d21b4667d0d8992e610c85",
    account_id: "AC-7829",
    account_address: "0x7829a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9",
    
    metadata: {
      account_age: 237,
      location: "New York, USA",
      account_type: "Business"
    },
    
    behavioral_fingerprint: {
      volume_volatility: 0.87,
      destination_entropy: 0.92,
      transaction_timing_pattern: ["Evening Peaks", "Weekend Spikes", "Irregular Intervals"],
      counterparty_types: ["Exchanges", "High-Risk Merchants", "Offshore Entities"]
    },
    
    risk_scores: {
      metabolism_score: 8.5,
      anomaly_score: 9.2,
      infection_state: "Infected",
      mold_score: 7.6,
      toxicity: 8.8,
      division_score: 4.5,
      spider_web_score: 8.3,
      synapse_score: 7.2,
      mutation_score: 9.1
    },
    
    fraud_zones: {
      suspicious_activities: ["Rapid Fund Movement", "Unusual Transaction Size", "Multiple Currency Conversion", "Unusual Geographic Pattern"],
      dead_zone: true,
      fraud_pattern_detected: true
    },
    
    transaction_graph: {
      edges: [
        {
          from: "AC-7829",
          to: "AC-4532",
          txn_value: 12500,
          txn_type: "TRANSFER",
          txn_timestamp: "2025-05-08T09:45:00Z",
          transaction_id: "TX-98765"
        },
        {
          from: "AC-7829",
          to: "AC-9087",
          txn_value: 8750,
          txn_type: "TRANSFER",
          txn_timestamp: "2025-05-07T14:30:00Z",
          transaction_id: "TX-98764"
        }
      ],
      nodes: [
        {
          account_id: "AC-4532",
          connection_strength: 0.85,
          risk_level: "High"
        },
        {
          account_id: "AC-9087",
          connection_strength: 0.72,
          risk_level: "Medium"
        }
      ]
    },
    
    mold_simulation: {
      mold_path: ["AC-7829", "AC-4532", "AC-9087", "AC-2341"],
      fraud_zone_detected: true,
      last_updated: "2025-05-08T10:15:00Z"
    },
    
    division_detection: {
      parent_wallet: "AC-7829",
      child_wallets: ["AC-9921", "AC-9922", "AC-9923"],
      total_amount_split: 45000,
      division_time: "2025-04-28T15:15:00Z",
      division_flag: true
    },
    
    web_trap_events: [
      {
        web_node: "WN-567",
        triggered_by: "AC-7829",
        risk_score: 8.7,
        amount: 15000,
        reaction: "flag",
        timestamp: "2025-05-07T16:30:00Z"
      }
    ],
    
    mutation_monitor: {
      previous_dna_snapshot: {
        volume_volatility: 0.45,
        destination_entropy: 0.38
      },
      current_dna_snapshot: {
        volume_volatility: 0.87,
        destination_entropy: 0.92
      },
      mutation_flag: true,
      mutation_reason: "Sudden increase in transaction volume and destination diversity"
    },
    
    synaptic_plasticity: {
      connection_weights: [
        {
          counterparty: "AC-4532",
          weight: 0.85,
          last_updated: "2025-05-08T09:45:00Z"
        },
        {
          counterparty: "AC-9087",
          weight: 0.72,
          last_updated: "2025-05-07T14:30:00Z"
        }
      ],
      total_strength: 0.78
    },
    
    history: [
      {
        timestamp: "2025-05-08T10:00:00Z",
        metabolism_score: 8.5,
        anomaly_score: 9.2,
        infection_state: "Infected",
        fraud_zones: ["Rapid Fund Movement", "Unusual Transaction Size"]
      },
      {
        timestamp: "2025-05-01T10:00:00Z",
        metabolism_score: 7.2,
        anomaly_score: 6.8,
        infection_state: "Exposed",
        fraud_zones: ["Unusual Transaction Size"]
      },
      {
        timestamp: "2025-04-24T10:00:00Z",
        metabolism_score: 5.5,
        anomaly_score: 4.9,
        infection_state: "Healthy",
        fraud_zones: []
      }
    ]
  },
  {
    _id: "60d21b4667d0d8992e610c86",
    account_id: "AC-4532",
    account_address: "0x4532a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9",
    
    metadata: {
      account_age: 189,
      location: "London, UK",
      account_type: "Business"
    },
    
    risk_scores: {
      metabolism_score: 7.9,
      anomaly_score: 8.7,
      infection_state: "Infected",
      mold_score: 7.2,
      toxicity: 8.5,
      division_score: 5.1,
      spider_web_score: 7.8,
      synapse_score: 6.9,
      mutation_score: 8.3
    }
  },
  {
    _id: "60d21b4667d0d8992e610c87",
    account_id: "AC-9087",
    account_address: "0x9087a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9",
    
    metadata: {
      account_age: 156,
      location: "Toronto, Canada",
      account_type: "Personal"
    },
    
    risk_scores: {
      metabolism_score: 6.8,
      anomaly_score: 7.8,
      infection_state: "Exposed",
      mold_score: 6.5,
      toxicity: 7.1,
      division_score: 4.2,
      spider_web_score: 6.9,
      synapse_score: 5.8,
      mutation_score: 7.4
    }
  },
  {
    _id: "60d21b4667d0d8992e610c88",
    account_id: "AC-2341",
    account_address: "0x2341a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9",
    
    metadata: {
      account_age: 201,
      location: "Sydney, Australia",
      account_type: "Personal"
    },
    
    risk_scores: {
      metabolism_score: 6.5,
      anomaly_score: 7.4,
      infection_state: "Exposed",
      mold_score: 6.1,
      toxicity: 6.8,
      division_score: 3.9,
      spider_web_score: 6.5,
      synapse_score: 5.4,
      mutation_score: 7.0
    }
  },
  {
    _id: "60d21b4667d0d8992e610c89",
    account_id: "AC-8765",
    account_address: "0x8765a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9",
    
    metadata: {
      account_age: 178,
      location: "Berlin, Germany",
      account_type: "Business"
    },
    
    risk_scores: {
      metabolism_score: 6.2,
      anomaly_score: 6.9,
      infection_state: "Exposed",
      mold_score: 5.8,
      toxicity: 6.5,
      division_score: 7.2,
      spider_web_score: 6.1,
      synapse_score: 5.2,
      mutation_score: 6.7
    }
  }
];

// ===== DOM ELEMENTS =====
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.querySelector('.sidebar');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const currentDate = document.getElementById('current-date');
const currentTime = document.getElementById('current-time');
const exportButton = document.querySelector('.dashboard-actions .btn-primary');
const filterButton = document.querySelector('.dashboard-actions .btn-outline-primary');
const searchInput = document.querySelector('.header-search input');

// Export buttons
const exportButtons = {
  dashboard: document.querySelector('.dashboard-actions .btn-primary'),
  accounts: document.querySelector('.export-accounts-btn'),
  risk: document.querySelector('.export-risk-btn'),
  transactions: document.querySelector('.export-transactions-btn'),
  zones: document.querySelector('.export-zones-btn'),
  mutation: document.querySelector('.export-mutation-btn')
};

// Filter buttons
const filterButtons = {
  dashboard: document.querySelector('.dashboard-actions .btn-outline-primary'),
  accounts: document.querySelector('.filter-accounts-btn'),
  risk: document.querySelector('.filter-risk-btn'),
  transactions: document.querySelector('.filter-transactions-btn'),
  zones: document.querySelector('.filter-zones-btn'),
  mutation: document.querySelector('.filter-mutation-btn')
};

// Section content containers
const dashboardSection = document.getElementById('dashboard');
const accountsSection = document.getElementById('accounts');
const riskAnalysisSection = document.getElementById('risk-analysis');
const transactionsSection = document.getElementById('transactions');
const fraudZonesSection = document.getElementById('fraud-zones');
const mutationMonitorSection = document.getElementById('mutation-monitor');
const settingsSection = document.getElementById('settings');

// Current active section
let currentSection = 'dashboard';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
  // Initialize date and time
  updateDateTime();
  setInterval(updateDateTime, 60000); // Update every minute
  
  // Initialize charts
  initializeCharts();
  
  // Populate tables with dummy data
  populateAccountsTable();
  populateTransactionsTable();
  
  // Set up event listeners
  setupEventListeners();
  
  // Set up export buttons
  setupExportButtons();
  
  // Set up filter buttons
  setupFilterButtons();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
  // Sidebar toggle
  sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });
  
  // Theme toggle
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
    
    const isDarkTheme = body.classList.contains('dark-theme');
    
    // Update theme toggle icon and text
    if (isDarkTheme) {
      themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i><span>Light Mode</span>';
    } else {
      themeToggle.innerHTML = '<i class="bi bi-moon-fill"></i><span>Dark Mode</span>';
    }
    
    // Reinitialize charts with new theme colors
    initializeCharts();
    
    // Save theme preference
    localStorage.setItem('fraudDashboardTheme', isDarkTheme ? 'dark' : 'light');
  });
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('fraudDashboardTheme');
  if (savedTheme === 'dark' && !body.classList.contains('dark-theme')) {
    themeToggle.click();
  }
  
  // Sidebar menu items
  const menuItems = document.querySelectorAll('.sidebar-menu li a');
  menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all items
      menuItems.forEach(i => i.parentElement.classList.remove('active'));
      
      // Add active class to clicked item
      item.parentElement.classList.add('active');
      
      // Get the target section from href
      const targetId = item.getAttribute('href').substring(1);
      currentSection = targetId;
      
      // Hide all sections
      document.querySelectorAll('.dashboard-content').forEach(section => {
        section.style.display = 'none';
      });
      
      // Show target section
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.style.display = 'block';
        targetSection.classList.add('fade-in-animation');
        
        // Remove animation class after animation completes
        setTimeout(() => {
          targetSection.classList.remove('fade-in-animation');
        }, 1000);
        
        // Show toast notification
        showToast(`Viewing ${targetId.replace('-', ' ')} section`, 'info');
      }
    });
  });
  
  // Account details buttons
  const detailButtons = document.querySelectorAll('.btn-outline-primary');
  detailButtons.forEach(button => {
    if (button.classList.contains('filter-accounts-btn') || 
        button.classList.contains('filter-risk-btn') || 
        button.classList.contains('filter-transactions-btn') || 
        button.classList.contains('filter-zones-btn') || 
        button.classList.contains('filter-mutation-btn')) {
      return; // Skip filter buttons
    }
    
    button.addEventListener('click', () => {
      document.getElementById('dashboard').style.display = 'none';
      document.getElementById('account-details').style.display = 'block';
      
      // Add animation to the account details section
      const accountDetails = document.getElementById('account-details');
      accountDetails.classList.add('fade-in-animation');
      
      // Remove animation class after animation completes
      setTimeout(() => {
        accountDetails.classList.remove('fade-in-animation');
      }, 1000);
    });
  });
  
  // Back button
  const backButton = document.querySelector('.back-btn');
  if (backButton) {
    backButton.addEventListener('click', () => {
      document.getElementById('dashboard').style.display = 'block';
      document.getElementById('account-details').style.display = 'none';
    });
  }
  
  // Alert action buttons
  const alertActionButtons = document.querySelectorAll('.alert-actions button');
  alertActionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const alertItem = button.closest('.alert-item');
      
      // Show action feedback
      const originalText = button.textContent;
      button.innerHTML = '<i class="bi bi-check-circle"></i> Done';
      button.classList.add('btn-success');
      
      // Add a visual effect to the alert
      alertItem.style.opacity = '0.7';
      alertItem.style.transform = 'translateX(10px)';
      
      // Reset after 2 seconds
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('btn-success');
        alertItem.style.opacity = '';
        alertItem.style.transform = '';
      }, 2000);
    });
  });
  
  // Time period buttons (Daily, Weekly, Monthly)
  const timeButtons = document.querySelectorAll('.card-actions .btn');
  timeButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Find all buttons in the same card-actions container
      const siblingButtons = button.closest('.card-actions').querySelectorAll('.btn');
      
      // Remove active class from all sibling buttons
      siblingButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Update chart data based on selected time period
      const timePeriod = button.textContent.toLowerCase();
      updateChartData(timePeriod);
    });
  });
  
  // Refresh button
  const refreshBtn = document.querySelector('.refresh-btn');
  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      // Add rotation animation
      refreshBtn.classList.add('rotate-animation');
      
      // Simulate data refresh
      setTimeout(() => {
        // Reinitialize charts
        initializeCharts();
        
        // Update stats with animation
        updateStatCounters();
        
        // Refresh tables if they're visible
        if (accountsSection.style.display === 'block') {
          populateAccountsTable();
        }
        
        if (transactionsSection.style.display === 'block') {
          populateTransactionsTable();
        }
        
        // Remove rotation animation
        refreshBtn.classList.remove('rotate-animation');
        
        // Show toast notification
        showToast('Dashboard refreshed successfully!', 'success');
      }, 1000);
    });
  }
  
  // Notification button
  const notificationBtn = document.querySelector('.notification-btn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
      // Toggle notification panel
      const notificationPanel = document.createElement('div');
      notificationPanel.className = 'notification-panel';
      notificationPanel.innerHTML = `
        <div class="notification-header">
          <h3>Notifications</h3>
          <button class="close-btn"><i class="bi bi-x"></i></button>
        </div>
        <div class="notification-body">
          <div class="notification-item unread">
            <div class="notification-icon danger"><i class="bi bi-exclamation-circle-fill"></i></div>
            <div class="notification-content">
              <h4>Critical Alert</h4>
              <p>Account AC-7829 has triggered multiple fraud indicators</p>
              <span class="notification-time">5 minutes ago</span>
            </div>
          </div>
          <div class="notification-item unread">
            <div class="notification-icon warning"><i class="bi bi-exclamation-triangle-fill"></i></div>
            <div class="notification-content">
              <h4>New Risk Pattern Detected</h4>
              <p>System has identified a new fraud pattern affecting 3 accounts</p>
              <span class="notification-time">20 minutes ago</span>
            </div>
          </div>
          <div class="notification-item">
            <div class="notification-icon info"><i class="bi bi-info-circle-fill"></i></div>
            <div class="notification-content">
              <h4>System Update</h4>
              <p>Fraud detection algorithms have been updated to version 2.4.1</p>
              <span class="notification-time">2 hours ago</span>
            </div>
          </div>
        </div>
        <div class="notification-footer">
          <button class="btn btn-sm btn-outline-primary">Mark All as Read</button>
          <button class="btn btn-sm btn-outline-secondary">View All</button>
        </div>
      `;
      
      // Add to body
      document.body.appendChild(notificationPanel);
      
      // Add animation
      setTimeout(() => {
        notificationPanel.classList.add('active');
      }, 10);
      
      // Close button functionality
      const closeBtn = notificationPanel.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        notificationPanel.classList.remove('active');
        setTimeout(() => {
          notificationPanel.remove();
        }, 300);
      });
      
      // Close when clicking outside
      document.addEventListener('click', function closeNotif(e) {
        if (!notificationPanel.contains(e.target) && e.target !== notificationBtn) {
          notificationPanel.classList.remove('active');
          setTimeout(() => {
            notificationPanel.remove();
          }, 300);
          document.removeEventListener('click', closeNotif);
        }
      });
    });
  }
  
  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm.length < 2) return; // Only search for 2+ characters
    
    // Determine which section to search based on current view
    if (accountsSection.style.display === 'block') {
      searchAccounts(searchTerm);
    } else if (transactionsSection.style.display === 'block') {
      searchTransactions(searchTerm);
    } else {
      // Default to searching alerts on dashboard
      searchAlerts(searchTerm);
    }
  });
  
  // Settings form controls
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) {
    themeSelect.addEventListener('change', () => {
      const selectedTheme = themeSelect.value;
      
      if (selectedTheme === 'dark' && !body.classList.contains('dark-theme')) {
        themeToggle.click();
      } else if (selectedTheme === 'light' && body.classList.contains('dark-theme')) {
        themeToggle.click();
      }
    });
  }
  
  // Range inputs
  const rangeInputs = document.querySelectorAll('.form-range');
  rangeInputs.forEach(input => {
    const valueDisplay = input.nextElementSibling;
    
    input.addEventListener('input', () => {
      valueDisplay.textContent = input.value;
    });
  });
  
  // Save settings button
  const saveSettingsBtn = document.querySelector('.save-settings-btn');
  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener('click', () => {
      // Simulate saving settings
      saveSettingsBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Saving...';
      saveSettingsBtn.disabled = true;
      
      setTimeout(() => {
        saveSettingsBtn.innerHTML = '<i class="bi bi-save"></i> Save Settings';
        saveSettingsBtn.disabled = false;
        
        showToast('Settings saved successfully!', 'success');
      }, 1500);
    });
  }
  
  // Reset settings button
  const resetSettingsBtn = document.querySelector('.reset-settings-btn');
  if (resetSettingsBtn) {
    resetSettingsBtn.addEventListener('click', () => {
      // Simulate resetting settings
      resetSettingsBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Resetting...';
      resetSettingsBtn.disabled = true;
      
      setTimeout(() => {
        resetSettingsBtn.innerHTML = '<i class="bi bi-arrow-counterclockwise"></i> Reset to Default';
        resetSettingsBtn.disabled = false;
        
        // Reset form values
        document.getElementById('theme-select').value = 'light';
        document.getElementById('refresh-interval').value = '60';
        document.getElementById('default-time-range').value = 'day';
        document.getElementById('enable-notifications').checked = true;
        document.getElementById('enable-sound-alerts').checked = false;
        
        // Reset range inputs
        document.getElementById('high-risk-threshold').value = '8.0';
        document.getElementById('medium-risk-threshold').value = '6.0';
        document.querySelectorAll('.range-value')[0].textContent = '8.0';
        document.querySelectorAll('.range-value')[1].textContent = '6.0';
        
        showToast('Settings reset to default values', 'info');
      }, 1500);
    });
  }
}

// ===== UTILITY FUNCTIONS =====
function updateDateTime() {
  const now = new Date();
  
  // Format date: May 8, 2025
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  currentDate.textContent = now.toLocaleDateString('en-US', options);
  
  // Format time: 10:03 PM
  currentTime.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

// Update chart data based on selected time period
function updateChartData(timePeriod) {
  // Get all charts
  const charts = {
    riskScore: Chart.getChart('risk-score-chart'),
    metabolism: Chart.getChart('metabolism-chart'),
    mutation: Chart.getChart('mutation-chart'),
    synapse: Chart.getChart('synapse-chart')
  };
  
  // Generate new data based on time period
  let labels = [];
  let dataPoints = [];
  
  const today = new Date();
  
  if (timePeriod === 'daily') {
    // Last 24 hours in 4-hour intervals
    for (let i = 6; i >= 0; i--) {
      const hour = today.getHours() - (i * 4);
      const date = new Date(today);
      date.setHours(hour);
      labels.push(date.toLocaleTimeString('en-US', { hour: '2-digit' }));
      
      // Random data with slight upward trend
      dataPoints.push(5 + (6 - i) * 0.4 + Math.random() * 0.8);
    }
  } else if (timePeriod === 'weekly') {
    // Last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      // Random data with slight upward trend
      dataPoints.push(5 + (6 - i) * 0.4 + Math.random() * 0.8);
    }
  } else if (timePeriod === 'monthly') {
    // Last 30 days in weekly intervals
    for (let i = 4; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - (i * 7));
      labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      
      // Random data with slight upward trend
      dataPoints.push(4 + (4 - i) * 0.5 + Math.random() * 0.8);
    }
  }
  
  // Update risk score chart
  if (charts.riskScore) {
    charts.riskScore.data.labels = labels;
    
    // Update each dataset with slightly different values
    charts.riskScore.data.datasets.forEach((dataset, index) => {
      const baseValue = 4 + index * 0.5; // Different base for each metric
      dataset.data = dataPoints.map(point => point + baseValue * Math.random());
    });
    
    charts.riskScore.update();
  }
  
  // Update metabolism chart
  if (charts.metabolism) {
    charts.metabolism.data.labels = labels;
    charts.metabolism.data.datasets[0].data = dataPoints.map(point => point + Math.random());
    charts.metabolism.update();
  }
  
  // Show toast notification
  showToast(`Updated to ${timePeriod} view`, 'info');
}

// Update stat counters with animation
function updateStatCounters() {
  // Get all stat value elements
  const statElements = {
    highRisk: document.querySelector('.overview-card:nth-child(1) .card-content h2'),
    infected: document.querySelector('.overview-card:nth-child(2) .card-content h2'),
    avgRisk: document.querySelector('.overview-card:nth-child(3) .card-content h2'),
    healthy: document.querySelector('.overview-card:nth-child(4) .card-content h2')
  };
  
  // Generate new random values
  const newValues = {
    highRisk: Math.floor(Math.random() * 10) + 20, // 20-29
    infected: Math.floor(Math.random() * 5) + 6,   // 6-10
    avgRisk: (Math.random() * 1 + 6).toFixed(1),   // 6.0-7.0
    healthy: Math.floor(Math.random() * 20) + 140  // 140-159
  };
  
  // Animate each counter
  Object.keys(statElements).forEach(key => {
    if (statElements[key]) {
      animateCounter(statElements[key], newValues[key]);
    }
  });
}

// Animate a counter from current to target value
function animateCounter(element, targetValue) {
  const startValue = parseFloat(element.textContent);
  const duration = 1500; // milliseconds
  const steps = 30;
  const stepValue = (targetValue - startValue) / steps;
  let currentStep = 0;
  
  const interval = setInterval(() => {
    currentStep++;
    const newValue = startValue + (stepValue * currentStep);
    
    // Format the value (keep decimal points if they exist)
    if (Number.isInteger(targetValue)) {
      element.textContent = Math.round(newValue);
    } else {
      element.textContent = newValue.toFixed(1);
    }
    
    if (currentStep >= steps) {
      clearInterval(interval);
      element.textContent = targetValue;
    }
  }, duration / steps);
}

// Show toast notification
function showToast(message, type = 'info') {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <div class="toast-icon">
      <i class="bi bi-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}-fill"></i>
    </div>
    <div class="toast-content">${message}</div>
    <button class="toast-close"><i class="bi bi-x"></i></button>
  `;
  
  // Add to body
  document.body.appendChild(toast);
  
  // Add show class after a small delay (for animation)
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);
  
  // Close button functionality
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  });
  
  // Auto close after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}

// Setup export buttons
function setupExportButtons() {
  // Dashboard export button
  if (exportButtons.dashboard) {
    exportButtons.dashboard.addEventListener('click', () => {
      exportFraudReport();
    });
  }
  
  // Accounts export button
  if (exportButtons.accounts) {
    exportButtons.accounts.addEventListener('click', () => {
      exportAccountsData();
    });
  }
  
  // Risk export button
  if (exportButtons.risk) {
    exportButtons.risk.addEventListener('click', () => {
      exportRiskReport();
    });
  }
  
  // Transactions export button
  if (exportButtons.transactions) {
    exportButtons.transactions.addEventListener('click', () => {
      exportTransactionsData();
    });
  }
  
  // Zones export button
  if (exportButtons.zones) {
    exportButtons.zones.addEventListener('click', () => {
      exportZonesReport();
    });
  }
  
  // Mutation export button
  if (exportButtons.mutation) {
    exportButtons.mutation.addEventListener('click', () => {
      exportMutationData();
    });
  }
}

// Export fraud report (PDF)
function exportFraudReport() {
  // Show loading state
  exportButtons.dashboard.innerHTML = '<i class="bi bi-hourglass-split"></i> Generating...';
  exportButtons.dashboard.disabled = true;
  
  setTimeout(() => {
    try {
      // Create PDF document
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(20);
      doc.setTextColor(59, 130, 246); // Primary color
      doc.text('Fraud Detection Report', 105, 15, { align: 'center' });
      
      // Add date
      doc.setFontSize(10);
      doc.setTextColor(100, 116, 139); // Secondary color
      const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      doc.text(`Generated on: ${today}`, 105, 22, { align: 'center' });
      
      // Add summary section
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text('Summary', 14, 35);
      
      // Add summary data
      doc.setFontSize(10);
      doc.text('High Risk Accounts: 24', 14, 45);
      doc.text('Infected Accounts: 8', 14, 50);
      doc.text('Average Risk Score: 6.7', 14, 55);
      doc.text('Healthy Accounts: 152', 14, 60);
      
      // Add fraud zones section
      doc.setFontSize(14);
      doc.text('Fraud Zones', 14, 75);
      
      // Add fraud zones data
      doc.setFontSize(10);
      doc.text('Rapid Fund Movement: 24 accounts', 14, 85);
      doc.text('Unusual Transaction Size: 18 accounts', 14, 90);
      doc.text('Multiple Currency Conversion: 15 accounts', 14, 95);
      doc.text('Unusual Geographic Pattern: 12 accounts', 14, 100);
      
      // Add table with account data
      doc.setFontSize(14);
      doc.text('High Risk Accounts', 14, 115);
      
      // Create table
      doc.autoTable({
        startY: 120,
        head: [['Account ID', 'Risk Score', 'Infection State', 'Location']],
        body: [
          ['AC-7829', '8.5', 'Infected', 'New York, USA'],
          ['AC-4532', '7.8', 'Exposed', 'London, UK'],
          ['AC-2341', '7.2', 'Exposed', 'Sydney, Australia']
        ],
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] }
      });
      
      // Save the PDF
      doc.save('fraud-detection-report.pdf');
      
      // Reset button state
      exportButtons.dashboard.innerHTML = '<i class="bi bi-download"></i> Export Report';
      exportButtons.dashboard.disabled = false;
      
      // Show success message
      showToast('Fraud report exported successfully!', 'success');
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Reset button state
      exportButtons.dashboard.innerHTML = '<i class="bi bi-download"></i> Export Report';
      exportButtons.dashboard.disabled = false;
      
      // Show error message
      showToast('Failed to export report. Please try again.', 'error');
    }
  }, 1500);
}

// Export accounts data (CSV)
function exportAccountsData() {
  // Show loading state
  exportButtons.accounts.innerHTML = '<i class="bi bi-hourglass-split"></i> Generating...';
  exportButtons.accounts.disabled = true;
  
  setTimeout(() => {
    try {
      // Create CSV content
      let csvContent = 'Account ID,Account Type,Location,Risk Score,Infection State\n';
      
      // Add data rows
      dummyAccounts.forEach(account => {
        csvContent += `${account.account_id},${account.metadata.account_type},${account.metadata.location},${account.risk_scores.metabolism_score},${account.risk_scores.infection_state}\n`;
      });
      
      // Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'accounts-data.csv');
      link.style.visibility = 'hidden';
      
      // Append to document, click and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Reset button state
      exportButtons.accounts.innerHTML = '<i class="bi bi-download"></i> Export Accounts';
      exportButtons.accounts.disabled = false;
      
      // Show success message
      showToast('Accounts data exported successfully!', 'success');
    } catch (error) {
      console.error('Error exporting accounts data:', error);
      
      // Reset button state
      exportButtons.accounts.innerHTML = '<i class="bi bi-download"></i> Export Accounts';
      exportButtons.accounts.disabled = false;
      
      // Show error message
      showToast('Failed to export accounts data. Please try again.', 'error');
    }
  }, 1000);
}

// Setup filter buttons
function setupFilterButtons() {
  // Dashboard filter button
  if (filterButtons.dashboard) {
    filterButtons.dashboard.addEventListener('click', () => {
      showFilterPanel('dashboard');
    });
  }
  
  // Accounts filter button
  if (filterButtons.accounts) {
    filterButtons.accounts.addEventListener('click', () => {
      showFilterPanel('accounts');
    });
  }
  
  // Risk filter button
  if (filterButtons.risk) {
    filterButtons.risk.addEventListener('click', () => {
      showFilterPanel('risk');
    });
  }
  
  // Transactions filter button
  if (filterButtons.transactions) {
    filterButtons.transactions.addEventListener('click', () => {
      showFilterPanel('transactions');
    });
  }
  
  // Zones filter button
  if (filterButtons.zones) {
    filterButtons.zones.addEventListener('click', () => {
      showFilterPanel('zones');
    });
  }
  
  // Mutation filter button
  if (filterButtons.mutation) {
    filterButtons.mutation.addEventListener('click', () => {
      showFilterPanel('mutation');
    });
  }
}

// Show filter panel
function showFilterPanel(type) {
  // Create filter panel
  const filterPanel = document.createElement('div');
  filterPanel.className = 'filter-panel';
  
  // Set panel content based on type
  let panelTitle = '';
  let filterContent = '';
  
  switch (type) {
    case 'dashboard':
      panelTitle = 'Dashboard Filters';
      filterContent = `
        <div class="filter-section">
          <h4>Time Range</h4>
          <div class="filter-group">
            <label class="filter-group-label">Select Period</label>
            <select class="form-control" id="time-range-filter">
              <option value="day">Last 24 Hours</option>
              <option value="week" selected>Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
            </select>
          </div>
        </div>
        
        <div class="filter-section">
          <h4>Risk Level</h4>
          <div class="filter-group">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="high-risk-filter" checked>
              <label class="form-check-label" for="high-risk-filter">High Risk</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="medium-risk-filter" checked>
              <label class="form-check-label" for="medium-risk-filter">Medium Risk</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="low-risk-filter" checked>
              <label class="form-check-label" for="low-risk-filter">Low Risk</label>
            </div>
          </div>
        </div>
        
        <div class="filter-section">
          <h4>Infection State</h4>
          <div class="filter-group">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="infected-filter" checked>
              <label class="form-check-label" for="infected-filter">Infected</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="exposed-filter" checked>
              <label class="form-check-label" for="exposed-filter">Exposed</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="healthy-filter" checked>
              <label class="form-check-label" for="healthy-filter">Healthy</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="recovered-filter" checked>
              <label class="form-check-label" for="recovered-filter">Recovered</label>
            </div>
          </div>
        </div>
      `;
      break;
      
    case 'accounts':
      panelTitle = 'Account Filters';
      filterContent = `
        <div class="filter-section">
          <h4>Account Type</h4>
          <div class="filter-group">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="business-filter" checked>
              <label class="form-check-label" for="business-filter">Business</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="personal-filter" checked>
              <label class="form-check-label" for="personal-filter">Personal</label>
            </div>
          </div>
        </div>
        
        <div class="filter-section">
          <h4>Risk Score</h4>
          <div class="filter-group">
            <label class="filter-group-label">Minimum Score</label>
            <input type="range" class="form-range" min="0" max="10" step="0.1" value="0" id="min-risk-filter">
            <div class="range-value">0</div>
          </div>
          <div class="filter-group">
            <label class="filter-group-label">Maximum Score</label>
            <input type="range" class="form-range" min="0" max="10" step="0.1" value="10" id="max-risk-filter">
            <div class="range-value">10</div>
          </div>
        </div>
        
        <div class="filter-section">
          <h4>Location</h4>
          <div class="filter-group">
            <select class="form-control" id="location-filter">
              <option value="all">All Locations</option>
              <option value="New York, USA">New York, USA</option>
              <option value="London, UK">London, UK</option>
              <option value="Sydney, Australia">Sydney, Australia</option>
            </select>
          </div>
        </div>
      `;
      break;
      
    case 'transactions':
      panelTitle = 'Transaction Filters';
      filterContent = `
        <div class="filter-section">
          <h4>Transaction Type</h4>
          <div class="filter-group">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="transfer-filter" checked>
              <label class="form-check-label" for="transfer-filter">Transfer</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="deposit-filter" checked>
              <label class="form-check-label" for="deposit-filter">Deposit</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="withdrawal-filter" checked>
              <label class="form-check-label" for="withdrawal-filter">Withdrawal</label>
            </div>
          </div>
        </div>
        
        <div class="filter-section">
          <h4>Amount Range</h4>
          <div class="filter-group">
            <label class="filter-group-label">Minimum Amount</label>
            <input type="number" class="form-control" id="min-amount-filter" value="0">
          </div>
          <div class="filter-group">
            <label class="filter-group-label">Maximum Amount</label>
            <input type="number" class="form-control" id="max-amount-filter" value="50000">
          </div>
        </div>
        
        <div class="filter-section">
          <h4>Date Range</h4>
          <div class="filter-group">
            <label class="filter-group-label">From</label>
            <input type="date" class="form-control" id="from-date-filter">
          </div>
          <div class="filter-group">
            <label class="filter-group-label">To</label>
            <input type="date" class="form-control" id="to-date-filter">
          </div>
        </div>
      `;
      break;
      
    default:
      panelTitle = 'Filter Data';
      filterContent = `
        <div class="filter-section">
          <h4>Time Range</h4>
          <div class="filter-group">
            <select class="form-control" id="time-range-filter">
              <option value="day">Last 24 Hours</option>
              <option value="week" selected>Last 7 Days</option>
              <option value="month">Last 30 Days</option>
              <option value="quarter">Last 90 Days</option>
            </select>
          </div>
        </div>
        
        <div class="filter-section">
          <h4>Risk Level</h4>
          <div class="filter-group">
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="high-risk-filter" checked>
              <label class="form-check-label" for="high-risk-filter">High Risk</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="medium-risk-filter" checked>
              <label class="form-check-label" for="medium-risk-filter">Medium Risk</label>
            </div>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" id="low-risk-filter" checked>
              <label class="form-check-label" for="low-risk-filter">Low Risk</label>
            </div>
          </div>
        </div>
      `;
  }
  
  // Create panel HTML
  filterPanel.innerHTML = `
    <div class="filter-panel-header">
      <h3>${panelTitle}</h3>
      <button class="filter-panel-close"><i class="bi bi-x"></i></button>
    </div>
    <div class="filter-panel-body">
      ${filterContent}
    </div>
    <div class="filter-panel-footer">
      <button class="btn btn-outline-secondary reset-filters-btn">Reset</button>
      <button class="btn btn-primary apply-filters-btn">Apply Filters</button>
    </div>
  `;
  
  // Add to body
  document.body.appendChild(filterPanel);
  
  // Add animation
  setTimeout(() => {
    filterPanel.classList.add('active');
  }, 10);
  
  // Close button functionality
  const closeBtn = filterPanel.querySelector('.filter-panel-close');
  closeBtn.addEventListener('click', () => {
    filterPanel.classList.remove('active');
    setTimeout(() => {
      filterPanel.remove();
    }, 300);
  });
  
  // Reset filters button
  const resetBtn = filterPanel.querySelector('.reset-filters-btn');
  resetBtn.addEventListener('click', () => {
    // Reset all inputs
    filterPanel.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = true;
    });
    
    filterPanel.querySelectorAll('input[type="range"]').forEach(range => {
      if (range.id === 'min-risk-filter') {
        range.value = 0;
        range.nextElementSibling.textContent = '0';
      } else if (range.id === 'max-risk-filter') {
        range.value = 10;
        range.nextElementSibling.textContent = '10';
      }
    });
    
    filterPanel.querySelectorAll('select').forEach(select => {
      if (select.id === 'time-range-filter') {
        select.value = 'week';
      } else if (select.id === 'location-filter') {
        select.value = 'all';
      }
    });
    
    filterPanel.querySelectorAll('input[type="number"]').forEach(input => {
      if (input.id === 'min-amount-filter') {
        input.value = 0;
      } else if (input.id === 'max-amount-filter') {
        input.value = 50000;
      }
    });
    
    // Clear date inputs
    filterPanel.querySelectorAll('input[type="date"]').forEach(input => {
      input.value = '';
    });
  });
  
  // Apply filters button
  const applyBtn = filterPanel.querySelector('.apply-filters-btn');
  applyBtn.addEventListener('click', () => {
    // Show loading state
    applyBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Applying...';
    applyBtn.disabled = true;
    
    setTimeout(() => {
      // Apply filters based on type
      switch (type) {
        case 'dashboard':
          // Update charts with new time range
          const timeRange = filterPanel.querySelector('#time-range-filter').value;
          updateChartData(timeRange === 'day' ? 'daily' : timeRange === 'week' ? 'weekly' : 'monthly');
          break;
          
        case 'accounts':
          // Filter accounts table
          filterAccountsTable(filterPanel);
          break;
          
        case 'transactions':
          // Filter transactions table
          filterTransactionsTable(filterPanel);
          break;
      }
      
      // Close filter panel
      filterPanel.classList.remove('active');
      setTimeout(() => {
        filterPanel.remove();
      }, 300);
      
      // Show success message
      showToast('Filters applied successfully!', 'success');
    }, 1000);
  });
  
  // Range input event listeners
  filterPanel.querySelectorAll('input[type="range"]').forEach(input => {
    const valueDisplay = input.nextElementSibling;
    
    input.addEventListener('input', () => {
      valueDisplay.textContent = input.value;
    });
  });
  
  // Close when clicking outside
  document.addEventListener('click', function closeFilter(e) {
    if (filterPanel.classList.contains('active') && !filterPanel.contains(e.target) && 
        !e.target.classList.contains('btn-outline-primary') && 
        !e.target.classList.contains('bi-filter')) {
      filterPanel.classList.remove('active');
      setTimeout(() => {
        filterPanel.remove();
      }, 300);
      document.removeEventListener('click', closeFilter);
    }
  });
}

// Populate accounts table
function populateAccountsTable() {
  const tableBody = document.getElementById('accounts-table-body');
  if (!tableBody) return;
  
  // Clear existing rows
  tableBody.innerHTML = '';
  
  // Add rows for each account
  dummyAccounts.forEach(account => {
    const row = document.createElement('tr');
    
    // Determine badge class based on infection state
    let badgeClass = '';
    switch (account.risk_scores.infection_state) {
      case 'Infected':
        badgeClass = 'badge-danger';
        break;
      case 'Exposed':
        badgeClass = 'badge-warning';
        break;
      case 'Healthy':
        badgeClass = 'badge-success';
        break;
      case 'Recovered':
        badgeClass = 'badge-info';
        break;
    }
    
    row.innerHTML = `
      <td>${account.account_id}</td>
      <td>${account.metadata.account_type}</td>
      <td>${account.metadata.location}</td>
      <td>${account.risk_scores.metabolism_score.toFixed(1)}</td>
      <td><span class="badge ${badgeClass}">${account.risk_scores.infection_state}</span></td>
      <td>
        <div class="btn-group">
          <button class="btn btn-sm btn-outline-primary view-account-btn" data-account-id="${account.account_id}">View</button>
          <button class="btn btn-sm btn-outline-secondary monitor-account-btn" data-account-id="${account.account_id}">Monitor</button>
        </div>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
  
  // Add event listeners to view buttons
  const viewButtons = document.querySelectorAll('.view-account-btn');
  viewButtons.forEach(button => {
    button.addEventListener('click', () => {
      const accountId = button.getAttribute('data-account-id');
      viewAccountDetails(accountId);
    });
  });
}

// Populate transactions table
function populateTransactionsTable() {
  const tableBody = document.getElementById('transactions-table-body');
  if (!tableBody) return;
  
  // Clear existing rows
  tableBody.innerHTML = '';
  
  // Create sample transactions
  const transactions = [];
  
  // Add transactions from dummy accounts
  dummyAccounts.forEach(account => {
    if (account.transaction_graph && account.transaction_graph.edges) {
      account.transaction_graph.edges.forEach(edge => {
        transactions.push({
          id: edge.transaction_id,
          from: edge.from,
          to: edge.to,
          amount: edge.txn_value,
          type: edge.txn_type,
          date: new Date(edge.txn_timestamp),
          riskLevel: getRiskLevel(account.risk_scores.metabolism_score)
        });
      });
    }
  });
  
  // Add additional sample transactions
  const transactionTypes = ['TRANSFER', 'DEPOSIT', 'WITHDRAWAL'];
  const accountIds = dummyAccounts.map(account => account.account_id);
  
  for (let i = 0; i < 10; i++) {
    const fromIndex = Math.floor(Math.random() * accountIds.length);
    let toIndex = Math.floor(Math.random() * accountIds.length);
    
    // Ensure from and to are different
    while (toIndex === fromIndex) {
      toIndex = Math.floor(Math.random() * accountIds.length);
    }
    
    const type = transactionTypes[Math.floor(Math.random() * transactionTypes.length)];
    const amount = Math.floor(Math.random() * 10000) + 1000;
    
    // Create date within last 7 days
    const date = new Date();
    date.setDate(date.getDate() - Math.floor(Math.random() * 7));
    date.setHours(Math.floor(Math.random() * 24));
    date.setMinutes(Math.floor(Math.random() * 60));
    
    transactions.push({
      id: `TX-${10000 + i}`,
      from: accountIds[fromIndex],
      to: type === 'DEPOSIT' ? 'EXTERNAL' : accountIds[toIndex],
      amount: amount,
      type: type,
      date: date,
      riskLevel: Math.random() > 0.7 ? 'High' : Math.random() > 0.4 ? 'Medium' : 'Low'
    });
  }
  
  // Sort transactions by date (newest first)
  transactions.sort((a, b) => b.date - a.date);
  
  // Add rows for each transaction
  transactions.forEach(transaction => {
    const row = document.createElement('tr');
    
    // Determine badge class based on risk level
    let badgeClass = '';
    switch (transaction.riskLevel) {
      case 'High':
        badgeClass = 'badge-danger';
        break;
      case 'Medium':
        badgeClass = 'badge-warning';
        break;
      case 'Low':
        badgeClass = 'badge-success';
        break;
    }
    
    // Format date
    const formattedDate = transaction.date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    row.innerHTML = `
      <td>${transaction.id}</td>
      <td>${transaction.from}</td>
      <td>${transaction.to}</td>
      <td>$${transaction.amount.toLocaleString()}</td>
      <td>${transaction.type}</td>
      <td>${formattedDate}</td>
      <td><span class="badge ${badgeClass}">${transaction.riskLevel}</span></td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Get risk level based on score
function getRiskLevel(score) {
  if (score >= 8) return 'High';
  if (score >= 6) return 'Medium';
  return 'Low';
}

// Filter accounts table
function filterAccountsTable(filterPanel) {
  // Get filter values
  const businessChecked = filterPanel.querySelector('#business-filter').checked;
  const personalChecked = filterPanel.querySelector('#personal-filter').checked;
  const minRisk = parseFloat(filterPanel.querySelector('#min-risk-filter').value);
  const maxRisk = parseFloat(filterPanel.querySelector('#max-risk-filter').value);
  const location = filterPanel.querySelector('#location-filter').value;
  
  // Filter accounts
  const filteredAccounts = dummyAccounts.filter(account => {
    // Filter by account type
    if (account.metadata.account_type === 'Business' && !businessChecked) return false;
    if (account.metadata.account_type === 'Personal' && !personalChecked) return false;
    
    // Filter by risk score
    const riskScore = account.risk_scores.metabolism_score;
    if (riskScore < minRisk || riskScore > maxRisk) return false;
    
    // Filter by location
    if (location !== 'all' && account.metadata.location !== location) return false;
    
    return true;
  });
  
  // Update table with filtered accounts
  const tableBody = document.getElementById('accounts-table-body');
  if (!tableBody) return;
  
  // Clear existing rows
  tableBody.innerHTML = '';
  
  // Add rows for filtered accounts
  filteredAccounts.forEach(account => {
    const row = document.createElement('tr');
    
    // Determine badge class based on infection state
    let badgeClass = '';
    switch (account.risk_scores.infection_state) {
      case 'Infected':
        badgeClass = 'badge-danger';
        break;
      case 'Exposed':
        badgeClass = 'badge-warning';
        break;
      case 'Healthy':
        badgeClass = 'badge-success';
        break;
      case 'Recovered':
        badgeClass = 'badge-info';
        break;
    }
    
    row.innerHTML = `
      <td>${account.account_id}</td>
      <td>${account.metadata.account_type}</td>
      <td>${account.metadata.location}</td>
      <td>${account.risk_scores.metabolism_score.toFixed(1)}</td>
      <td><span class="badge ${badgeClass}">${account.risk_scores.infection_state}</span></td>
      <td>
        <div class="btn-group">
          <button class="btn btn-sm btn-outline-primary view-account-btn" data-account-id="${account.account_id}">View</button>
          <button class="btn btn-sm btn-outline-secondary monitor-account-btn" data-account-id="${account.account_id}">Monitor</button>
        </div>
      </td>
    `;
    
    tableBody.appendChild(row);
  });
}

// Filter transactions table
function filterTransactionsTable(filterPanel) {
  // Implementation would be similar to filterAccountsTable
  // For brevity, we'll just show a toast notification
  showToast('Transaction filters applied', 'success');
}

// Search accounts
function searchAccounts(searchTerm) {
  const tableBody = document.getElementById('accounts-table-body');
  if (!tableBody) return;
  
  // Get all rows
  const rows = tableBody.querySelectorAll('tr');
  
  // Check each row for matches
  rows.forEach(row => {
    const accountId = row.querySelector('td:first-child').textContent;
    const accountType = row.querySelector('td:nth-child(2)').textContent;
    const location = row.querySelector('td:nth-child(3)').textContent;
    
    // Check if any field matches the search term
    const matches = accountId.toLowerCase().includes(searchTerm) ||
                   accountType.toLowerCase().includes(searchTerm) ||
                   location.toLowerCase().includes(searchTerm);
    
    // Show/hide row based on match
    row.style.display = matches ? '' : 'none';
  });
}

// Search transactions
function searchTransactions(searchTerm) {
  const tableBody = document.getElementById('transactions-table-body');
  if (!tableBody) return;
  
  // Get all rows
  const rows = tableBody.querySelectorAll('tr');
  
  // Check each row for matches
  rows.forEach(row => {
    const transactionId = row.querySelector('td:first-child').textContent;
    const fromAccount = row.querySelector('td:nth-child(2)').textContent;
    const toAccount = row.querySelector('td:nth-child(3)').textContent;
    const type = row.querySelector('td:nth-child(5)').textContent;
    
    // Check if any field matches the search term
    const matches = transactionId.toLowerCase().includes(searchTerm) ||
                   fromAccount.toLowerCase().includes(searchTerm) ||
                   toAccount.toLowerCase().includes(searchTerm) ||
                   type.toLowerCase().includes(searchTerm);
    
    // Show/hide row based on match
    row.style.display = matches ? '' : 'none';
  });
}

// Search alerts
function searchAlerts(searchTerm) {
  // Implementation would search through alerts on the dashboard
  // For brevity, we'll just show a toast notification
  showToast(`Searching alerts for: ${searchTerm}`, 'info');
}

// View account details
function viewAccountDetails(accountId) {
  // Find the account
  const account = dummyAccounts.find(acc => acc.account_id === accountId);
  if (!account) {
    showToast(`Account ${accountId} not found`, 'error');
    return;
  }
  
  // Show toast notification
  showToast(`Viewing details for account ${accountId}`, 'info');
  
  // In a real implementation, this would navigate to an account details page
  // or open a modal with account details
}

// ===== CHART INITIALIZATION =====
function initializeCharts() {
  initializeRiskScoreChart();
  initializeInfectionStateChart();
  initializeMetabolismChart();
  initializeMutationChart();
  initializeSynapseChart();
}

function initializeRiskScoreChart() {
  const ctx = document.getElementById('risk-score-chart').getContext('2d');
  
  // Generate data for the past 7 days
  const labels = [];
  const metabolismData = [];
  const anomalyData = [];
  const toxicityData = [];
  const mutationData = [];
  
  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    
    // Generate random data with an upward trend for demonstration
    const baseMeta = 5 + (6 - i) * 0.5 + Math.random() * 0.5;
    const baseAnomaly = 4 + (6 - i) * 0.7 + Math.random() * 0.6;
    const baseToxicity = 4.5 + (6 - i) * 0.6 + Math.random() * 0.5;
    const baseMutation = 5.5 + (6 - i) * 0.6 + Math.random() * 0.4;
    
    metabolismData.push(baseMeta);
    anomalyData.push(baseAnomaly);
    toxicityData.push(baseToxicity);
    mutationData.push(baseMutation);
  }
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Metabolism Score',
          data: metabolismData,
          borderColor: '#4361ee',
          backgroundColor: 'rgba(67, 97, 238, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Anomaly Score',
          data: anomalyData,
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Toxicity',
          data: toxicityData,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Mutation Score',
          data: mutationData,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        y: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 2
          }
        }
      }
    }
  });
}

function initializeInfectionStateChart() {
  const ctx = document.getElementById('infection-state-chart').getContext('2d');
  
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Healthy', 'Exposed', 'Infected', 'Recovered'],
      datasets: [{
        data: [152, 24, 8, 4],
        backgroundColor: [
          '#10b981', // Healthy - Green
          '#f59e0b', // Exposed - Yellow
          '#ef4444', // Infected - Red
          '#3b82f6'  // Recovered - Blue
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      },
      cutout: '70%'
    }
  });
}

function initializeMetabolismChart() {
  const ctx = document.getElementById('metabolism-chart').getContext('2d');
  
  // Generate data for the past 12 weeks
  const labels = [];
  const data = [];
  
  const today = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i * 7);
    labels.push(`Week ${12 - i}`);
    
    // Generate random data with an upward trend for demonstration
    const base = 4 + (11 - i) * 0.4 + Math.random() * 0.8;
    data.push(base);
  }
  
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Metabolism Score',
        data: data,
        borderColor: '#4361ee',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          min: 0,
          max: 10,
          ticks: {
            stepSize: 2
          }
        }
      }
    }
  });
}

function initializeMutationChart() {
  const ctx = document.getElementById('mutation-chart').getContext('2d');
  
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
      datasets: [{
        label: 'Number of Accounts',
        data: [42, 68, 48, 22, 8],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',  // 0-2: Green
          'rgba(16, 185, 129, 0.6)',  // 2-4: Light Green
          'rgba(245, 158, 11, 0.6)',  // 4-6: Light Yellow
          'rgba(245, 158, 11, 0.8)',  // 6-8: Yellow
          'rgba(239, 68, 68, 0.8)'    // 8-10: Red
        ],
        borderWidth: 0,
        borderRadius: 4
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true
        },
        x: {
          title: {
            display: true,
            text: 'Mutation Score Range'
          }
        }
      }
    }
  });
}

function initializeSynapseChart() {
  const ctx = document.getElementById('synapse-chart').getContext('2d');
  
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['Connection Strength', 'Trust Level', 'Transaction Frequency', 'Relationship Age', 'Interaction Pattern'],
      datasets: [{
        label: 'High Risk Accounts',
        data: [8.5, 3.2, 9.1, 5.4, 7.8],
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 0.8)',
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(239, 68, 68, 1)'
      }, {
        label: 'Low Risk Accounts',
        data: [5.2, 8.7, 4.3, 7.8, 4.5],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 0.8)',
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(16, 185, 129, 1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: {
            display: true
          },
          suggestedMin: 0,
          suggestedMax: 10
        }
      }
    }
  });
}
