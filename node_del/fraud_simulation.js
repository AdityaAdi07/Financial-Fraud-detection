// Advanced Fraud Simulation with Cytoscape.js
// Main simulation class to handle the detection and visualization of fraudulent activities

class FraudSimulation {
  constructor() {
    // Simulation data
    this.accounts = [];
    this.transactions = [];
    this.fraudAlerts = [];
    
    // Cytoscape instance
    this.cy = null;
    
    // DOM elements
    this.statsElements = {
      totalAccounts: document.getElementById('totalAccounts'),
      infectedAccounts: document.getElementById('infectedAccounts'),
      flaggedTransactions: document.getElementById('flaggedTransactions')
    };
    
    // Initialize the simulation
    this.initialize();
  }
  
  // Initialize the simulation
  async initialize() {
    try {
      // Load data
      await this.loadData();
      
      // Initialize Cytoscape
      this.initializeCytoscape();
      
      // Set up event listeners
      this.setupEventListeners();
      
      // Update statistics
      this.updateStats();
      
      // Populate alerts
      this.populateAlerts();
      
      // Add animation effects
      this.addAnimationEffects();
      
      console.log('Fraud simulation initialized successfully');
    } catch (error) {
      console.error('Error initializing fraud simulation:', error);
    }
  }
  
  // Load data from JSON
  async loadData() {
    try {
      // For demonstration, we'll use the hardcoded data
      // In a real application, this would be fetched from a server
      this.fraudAlerts = [];
      this.accounts = [
        { "_id": "1", "account_id": "account123", "risk_score": 5.2, "infection_status": "Healthy", "transactions": ["t1", "t2"], "created_at": "2025-05-01T12:00:00Z", "updated_at": "2025-05-01T12:00:00Z" },
        { "_id": "2", "account_id": "account456", "risk_score": 9.1, "infection_status": "Infected", "transactions": ["t3", "t4"], "created_at": "2025-05-02T12:00:00Z", "updated_at": "2025-05-02T12:00:00Z" },
        { "_id": "3", "account_id": "account789", "risk_score": 3.5, "infection_status": "Healthy", "transactions": ["t5"], "created_at": "2025-05-03T12:00:00Z", "updated_at": "2025-05-03T12:00:00Z" },
        { "_id": "4", "account_id": "account999", "risk_score": 8.7, "infection_status": "Infected", "transactions": ["t6"], "created_at": "2025-05-04T12:00:00Z", "updated_at": "2025-05-04T12:00:00Z" },
        { "_id": "5", "account_id": "account555", "risk_score": 4.2, "infection_status": "Healthy", "transactions": ["t7"], "created_at": "2025-05-05T12:00:00Z", "updated_at": "2025-05-05T12:00:00Z" },
        { "_id": "6", "account_id": "account222", "risk_score": 7.8, "infection_status": "Infected", "transactions": ["t8"], "created_at": "2025-05-06T12:00:00Z", "updated_at": "2025-05-06T12:00:00Z" },
        { "_id": "7", "account_id": "account333", "risk_score": 6.4, "infection_status": "Healthy", "transactions": ["t9"], "created_at": "2025-05-07T12:00:00Z", "updated_at": "2025-05-07T12:00:00Z" },
        { "_id": "8", "account_id": "account888", "risk_score": 9.3, "infection_status": "Infected", "transactions": ["t10"], "created_at": "2025-05-08T12:00:00Z", "updated_at": "2025-05-08T12:00:00Z" },
        { "_id": "9", "account_id": "account444", "risk_score": 5.6, "infection_status": "Healthy", "transactions": ["t11"], "created_at": "2025-05-09T12:00:00Z", "updated_at": "2025-05-09T12:00:00Z" }
      ];
      
      this.transactions = [
        { "_id": "t1", "from_account": "account123", "to_account": "account456", "txn_value": 500, "txn_timestamp": "2025-05-01T12:30:00Z", "txn_type": "TRANSFER", "is_flagged": false, "risk_factor": 7.8 },
        { "_id": "t2", "from_account": "account456", "to_account": "account123", "txn_value": 1000, "txn_timestamp": "2025-05-01T13:00:00Z", "txn_type": "TRANSFER", "is_flagged": false, "risk_factor": 8.5 },
        { "_id": "t3", "from_account": "account456", "to_account": "account789", "txn_value": 1500, "txn_timestamp": "2025-05-02T12:30:00Z", "txn_type": "TRANSFER", "is_flagged": true, "risk_factor": 9.0 },
        { "_id": "t4", "from_account": "account456", "to_account": "account999", "txn_value": 2000, "txn_timestamp": "2025-05-02T14:30:00Z", "txn_type": "TRANSFER", "is_flagged": true, "risk_factor": 9.2 },
        { "_id": "t5", "from_account": "account789", "to_account": "account555", "txn_value": 300, "txn_timestamp": "2025-05-03T10:15:00Z", "txn_type": "TRANSFER", "is_flagged": false, "risk_factor": 3.2 },
        { "_id": "t6", "from_account": "account999", "to_account": "account222", "txn_value": 1800, "txn_timestamp": "2025-05-04T09:45:00Z", "txn_type": "TRANSFER", "is_flagged": true, "risk_factor": 8.9 },
        { "_id": "t7", "from_account": "account555", "to_account": "account333", "txn_value": 750, "txn_timestamp": "2025-05-05T16:20:00Z", "txn_type": "TRANSFER", "is_flagged": false, "risk_factor": 4.5 },
        { "_id": "t8", "from_account": "account222", "to_account": "account888", "txn_value": 1200, "txn_timestamp": "2025-05-06T11:10:00Z", "txn_type": "TRANSFER", "is_flagged": true, "risk_factor": 7.6 },
        { "_id": "t9", "from_account": "account333", "to_account": "account444", "txn_value": 950, "txn_timestamp": "2025-05-07T13:30:00Z", "txn_type": "TRANSFER", "is_flagged": false, "risk_factor": 5.8 },
        { "_id": "t10", "from_account": "account888", "to_account": "account123", "txn_value": 2500, "txn_timestamp": "2025-05-08T15:45:00Z", "txn_type": "TRANSFER", "is_flagged": true, "risk_factor": 9.5 },
        { "_id": "t11", "from_account": "account444", "to_account": "account456", "txn_value": 600, "txn_timestamp": "2025-05-09T10:00:00Z", "txn_type": "TRANSFER", "is_flagged": false, "risk_factor": 6.2 },
        { "_id": "t4", "from_account": "account789", "to_account": "account999", "txn_value": 2000, "txn_timestamp": "2025-05-03T12:30:00Z", "txn_type": "TRANSFER", "is_flagged": false, "risk_factor": 6.5 },
        { "_id": "t5", "from_account": "account999", "to_account": "account555", "txn_value": 2500, "txn_timestamp": "2025-05-04T12:30:00Z", "txn_type": "TRANSFER", "is_flagged": false, "risk_factor": 8.9 },
        { "_id": "t6", "from_account": "account555", "to_account": "account123", "txn_value": 3000, "txn_timestamp": "2025-05-05T12:30:00Z", "txn_type": "TRANSFER", "is_flagged": true, "risk_factor": 9.5 },
        { "_id": "t7", "from_account": "account123", "to_account": "account999", "txn_value": 3500, "txn_timestamp": "2025-05-06T12:30:00Z", "txn_type": "TRANSFER", "is_flagged": false, "risk_factor": 7.0 },
        { "_id": "t8", "from_account": "account222", "to_account": "account888", "txn_value": 4000, "txn_timestamp": "2025-05-07T12:30:00Z", "txn_type": "TRANSFER", "is_flagged": true, "risk_factor": 9.8 },
        { "_id": "t9", "from_account": "account333", "to_account": "account888", "txn_value": 5000, "txn_timestamp": "2025-05-08T12:30:00Z", "txn_type": "TRANSFER", "is_flagged": false, "risk_factor": 7.5 },
        { "_id": "t10", "from_account": "account888", "to_account": "account333", "txn_value": 6000, "txn_timestamp": "2025-05-09T12:30:00Z", "txn_type": "TRANSFER", "is_flagged": true, "risk_factor": 10.0 },
        { "_id": "t11", "from_account": "account444", "to_account": "account123", "txn_value": 7000, "txn_timestamp": "2025-05-10T12:30:00Z", "txn_type": "TRANSFER", "is_flagged": false, "risk_factor": 7.2 }
      ];
      
      // Generate fraud alerts based on transactions and accounts
      this.generateFraudAlerts();
      
      console.log('Data loaded successfully');
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }
  
  // Generate fraud alerts based on transaction and account data
  generateFraudAlerts() {
    // Clear existing alerts
    this.fraudAlerts = [];
    
    // Find flagged transactions and create alerts
    const flaggedTransactions = this.transactions.filter(txn => txn.is_flagged);
    
    flaggedTransactions.forEach((txn, index) => {
      // Get source and target accounts
      const sourceAccount = this.accounts.find(acc => acc.account_id === txn.from_account);
      const targetAccount = this.accounts.find(acc => acc.account_id === txn.to_account);
      
      if (sourceAccount && targetAccount) {
        // Create alert based on transaction risk factor
        const alertType = txn.risk_factor > 8.5 ? 'High-Risk Transaction' : 'Suspicious Activity';
        const severity = txn.risk_factor > 8.5 ? 'Critical' : 'Moderate';
        
        this.fraudAlerts.push({
          _id: `alert-${index + 1}`,
          alert_type: alertType,
          alert_message: `Suspicious transfer of ₹${txn.txn_value} from ${this.formatAccountLabel(txn.from_account)} to ${this.formatAccountLabel(txn.to_account)}`,
          severity: severity,
          triggered_at: txn.txn_timestamp,
          affected_account: txn.from_account,
          related_transaction: txn._id
        });
      }
    });
    
    // Add alerts for infected accounts
    const infectedAccounts = this.accounts.filter(acc => acc.infection_status === 'Infected');
    
    infectedAccounts.forEach((acc, index) => {
      this.fraudAlerts.push({
        _id: `alert-inf-${index + 1}`,
        alert_type: 'Account Compromised',
        alert_message: `${this.formatAccountLabel(acc.account_id)} shows signs of compromise with risk score ${acc.risk_score.toFixed(1)}`,
        severity: acc.risk_score > 8.5 ? 'Critical' : 'High',
        triggered_at: acc.updated_at,
        affected_account: acc.account_id,
        related_transaction: null
      });
    });
    
    // Sort alerts by severity (critical first) and then by time (newest first)
    this.fraudAlerts.sort((a, b) => {
      if (a.severity === 'Critical' && b.severity !== 'Critical') return -1;
      if (a.severity !== 'Critical' && b.severity === 'Critical') return 1;
      
      return new Date(b.triggered_at) - new Date(a.triggered_at);
    });
  }
  
  // Initialize Cytoscape visualization
  initializeCytoscape() {
    // Build elements for Cytoscape
    const elements = this.buildCytoscapeElements();
    
    // Initialize Cytoscape instance
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      elements,
      style: this.getCytoscapeStyle(),
      layout: {
        name: 'cose',
        padding: 30,
        idealEdgeLength: 100,
        nodeRepulsion: 2000,
        animationDuration: 800,
        animate: true,
        animationEasing: 'ease-in-out',
        randomize: true,
        componentSpacing: 100,
        nodeOverlap: 20,
        refresh: 20
      },
      wheelSensitivity: 0.3
    });
    
    // Add event listeners to Cytoscape elements
    this.addCytoscapeEventListeners();
  }
  
  // Build elements for Cytoscape from data
  buildCytoscapeElements() {
    const nodes = this.accounts.map(account => ({
      data: {
        id: account.account_id,
        label: this.formatAccountLabel(account.account_id),
        infection_status: account.infection_status,
        risk_score: account.risk_score,
        color: account.infection_status === 'Infected' ? '#f72585' : '#4cc9f0',
        created_at: account.created_at,
        updated_at: account.updated_at,
        _id: account._id
      },
      classes: account.infection_status === 'Infected' ? 'infected' : 'healthy'
    }));
    
    const edges = this.transactions.map(txn => ({
      data: {
        id: txn._id,
        source: txn.from_account,
        target: txn.to_account,
        label: `₹${txn.txn_value}${txn.is_flagged ? ' (flagged)' : ''}`,
        is_flagged: txn.is_flagged,
        risk_factor: txn.risk_factor,
        txn_timestamp: txn.txn_timestamp,
        txn_type: txn.txn_type,
        txn_value: txn.txn_value
      },
      classes: txn.is_flagged ? 'fraudulent' : ''
    }));
    
    return [...nodes, ...edges];
  }
  
  // Format account label to be more readable
  formatAccountLabel(accountId) {
    return accountId.replace('account', 'Acc-');
  }
  
  // Get Cytoscape style
  getCytoscapeStyle() {
    return [
      {
        selector: 'node',
        style: {
          label: 'data(label)',
          'background-color': 'data(color)',
          color: '#fff',
          'text-halign': 'center',
          'text-valign': 'center',
          'font-size': 14,
          'border-width': 3,
          'border-color': '#fff',
          'text-outline-color': '#000',
          'text-outline-width': 1,
          'width': 50,
          'height': 50,
          'shape': 'ellipse',
          'overlay-opacity': 0.1,
          'font-family': 'Roboto, sans-serif',
          'transition-property': 'background-color, border-color, width, height',
          'transition-duration': '0.3s',
          'transition-timing-function': 'ease-in-out'
        }
      },
      {
        selector: 'node.infected',
        style: {
          'background-color': '#f72585',
          'border-color': '#ffcc00',
          'border-width': 4,
          'border-style': 'double',
          'width': 55,
          'height': 55
        }
      },
      {
        selector: 'node.healthy',
        style: {
          'background-color': '#4cc9f0',
          'border-color': '#fff'
        }
      },
      {
        selector: 'node.selected',
        style: {
          'border-color': '#ffcc00',
          'border-width': 5,
          'width': 60,
          'height': 60,
          'box-shadow': '0 0 15px #ffcc00'
        }
      },
      {
        selector: 'node.hidden',
        style: {
          'opacity': 0,
          'visibility': 'hidden'
        }
      },
      {
        selector: 'node.highlight',
        style: {
          'border-color': '#06d6a0',
          'border-width': 5,
          'width': 58,
          'height': 58
        }
      },
      {
        selector: 'edge',
        style: {
          width: 3,
          'line-color': '#cccccc',
          'target-arrow-color': '#cccccc',
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          label: 'data(label)',
          'font-size': 10,
          'font-family': 'Roboto, sans-serif',
          'color': '#fff',
          'text-outline-color': '#000',
          'text-outline-width': 1,
          'text-background-opacity': 1,
          'text-background-color': '#16213e',
          'text-background-padding': 3,
          'text-background-shape': 'roundrectangle',
          'opacity': 0.8,
          'text-opacity': 1,
          'transition-property': 'line-color, target-arrow-color, width, opacity',
          'transition-duration': '0.3s',
          'transition-timing-function': 'ease-in-out'
        }
      },
      {
        selector: 'edge.fraudulent',
        style: {
          'line-color': '#f72585',
          'target-arrow-color': '#f72585',
          'width': 5,
          'line-style': 'dashed',
          'opacity': 1
        }
      },
      {
        selector: 'edge.highlight',
        style: {
          'line-color': '#06d6a0',
          'target-arrow-color': '#06d6a0',
          'width': 5,
          'opacity': 1
        }
      },
      {
        selector: 'edge.faded',
        style: {
          'opacity': 0.3
        }
      }
    ];
  }
  
  // Add event listeners to Cytoscape elements
  addCytoscapeEventListeners() {
    // Node click event
    this.cy.on('tap', 'node', event => {
      const node = event.target;
      
      // Clear previous selections
      this.cy.elements().removeClass('selected highlight faded');
      
      // Add selected class to clicked node
      node.addClass('selected');
      
      // Highlight connected edges and nodes
      const connectedEdges = node.connectedEdges();
      connectedEdges.addClass('highlight');
      
      // Fade other edges
      this.cy.edges().difference(connectedEdges).addClass('faded');
      
      // Highlight connected nodes
      const connectedNodes = connectedEdges.connectedNodes();
      connectedNodes.difference(node).addClass('highlight');
      
      // Show node details
      this.showNodeDetails(node.data());
    });
    
    // Edge click event
    this.cy.on('tap', 'edge', event => {
      const edge = event.target;
      
      // Clear previous selections
      this.cy.elements().removeClass('selected highlight faded');
      
      // Add selected class to clicked edge
      edge.addClass('selected');
      
      // Highlight connected nodes
      const connectedNodes = edge.connectedNodes();
      connectedNodes.addClass('highlight');
      
      // Fade other edges
      this.cy.edges().difference(edge).addClass('faded');
      
      // Show edge details
      this.showEdgeDetails(edge.data());
    });
    
    // Background click event (deselect all)
    this.cy.on('tap', event => {
      if (event.target === this.cy) {
        this.cy.elements().removeClass('selected highlight faded');
        this.clearNodeDetails();
      }
    });
  }
  
  // Show node details in the details panel
  showNodeDetails(nodeData) {
    const nodeDetailsElement = document.getElementById('nodeDetails');
    
    // Find account data
    const account = this.accounts.find(acc => acc.account_id === nodeData.id);
    
    if (!account) {
      nodeDetailsElement.innerHTML = '<p class="placeholder">No details available</p>';
      return;
    }
    
    // Format dates
    const createdDate = new Date(account.created_at).toLocaleDateString();
    const updatedDate = new Date(account.updated_at).toLocaleDateString();
    
    // Get related transactions
    const relatedTransactions = this.transactions.filter(
      txn => txn.from_account === account.account_id || txn.to_account === account.account_id
    );
    
    // Calculate total transaction value
    const totalValue = relatedTransactions.reduce((sum, txn) => sum + txn.txn_value, 0);
    
    // Count flagged transactions
    const flaggedCount = relatedTransactions.filter(txn => txn.is_flagged).length;
    
    // Generate HTML
    nodeDetailsElement.innerHTML = `
      <div class="node-detail-row">
        <span class="node-detail-label">Account ID:</span>
        <span class="node-detail-value">${account.account_id}</span>
      </div>
      <div class="node-detail-row">
        <span class="node-detail-label">Status:</span>
        <span class="node-detail-value" style="color: ${account.infection_status === 'Infected' ? 'var(--infected-color)' : 'var(--healthy-color)'}">
          ${account.infection_status}
        </span>
      </div>
      <div class="node-detail-row">
        <span class="node-detail-label">Risk Score:</span>
        <span class="node-detail-value">${account.risk_score.toFixed(1)}/10</span>
      </div>
      <div class="node-detail-row">
        <span class="node-detail-label">Created:</span>
        <span class="node-detail-value">${createdDate}</span>
      </div>
      <div class="node-detail-row">
        <span class="node-detail-label">Updated:</span>
        <span class="node-detail-value">${updatedDate}</span>
      </div>
      <div class="node-detail-row">
        <span class="node-detail-label">Transactions:</span>
        <span class="node-detail-value">${relatedTransactions.length}</span>
      </div>
      <div class="node-detail-row">
        <span class="node-detail-label">Total Value:</span>
        <span class="node-detail-value">₹${totalValue.toLocaleString()}</span>
      </div>
      <div class="node-detail-row">
        <span class="node-detail-label">Flagged Txns:</span>
        <span class="node-detail-value" style="color: ${flaggedCount > 0 ? 'var(--danger-color)' : 'var(--text-light)'}">
          ${flaggedCount}
        </span>
      </div>
    `;
    
    // Add a fade-in animation
    nodeDetailsElement.classList.add('fade-in');
  }
  
  // Show edge (transaction) details in the modal panel
  showEdgeDetails(edgeData) {
    const detailsPanel = document.getElementById('detailsPanel');
    const detailsContent = document.getElementById('detailsContent');
    
    // Find transaction data
    const transaction = this.transactions.find(txn => txn._id === edgeData.id);
    
    if (!transaction) {
      return;
    }
    
    // Format date
    const txnDate = new Date(transaction.txn_timestamp).toLocaleString();
    
    // Find source and target accounts
    const sourceAccount = this.accounts.find(acc => acc.account_id === transaction.from_account);
    const targetAccount = this.accounts.find(acc => acc.account_id === transaction.to_account);
    
    // Generate HTML
    detailsContent.innerHTML = `
      <div class="detail-section">
        <h4>Transaction Details</h4>
        <div class="detail-row">
          <span class="detail-label">Transaction ID:</span>
          <span class="detail-value">${transaction._id}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Amount:</span>
          <span class="detail-value">₹${transaction.txn_value.toLocaleString()}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Type:</span>
          <span class="detail-value">${transaction.txn_type}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Timestamp:</span>
          <span class="detail-value">${txnDate}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Risk Factor:</span>
          <span class="detail-value" style="color: ${this.getRiskColor(transaction.risk_factor)}">
            ${transaction.risk_factor.toFixed(1)}/10
          </span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Status:</span>
          <span class="detail-value" style="color: ${transaction.is_flagged ? 'var(--danger-color)' : 'var(--success-color)'}">
            ${transaction.is_flagged ? '⚠️ FLAGGED' : '✓ NORMAL'}
          </span>
        </div>
      </div>
      
      <div class="detail-section">
        <h4>Accounts Involved</h4>
        <div class="detail-row">
          <span class="detail-label">From:</span>
          <span class="detail-value">${sourceAccount ? sourceAccount.account_id : transaction.from_account}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">From Status:</span>
          <span class="detail-value" style="color: ${sourceAccount && sourceAccount.infection_status === 'Infected' ? 'var(--infected-color)' : 'var(--healthy-color)'}">
            ${sourceAccount ? sourceAccount.infection_status : 'Unknown'}
          </span>
        </div>
        <div class="detail-row">
          <span class="detail-label">To:</span>
          <span class="detail-value">${targetAccount ? targetAccount.account_id : transaction.to_account}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">To Status:</span>
          <span class="detail-value" style="color: ${targetAccount && targetAccount.infection_status === 'Infected' ? 'var(--infected-color)' : 'var(--healthy-color)'}">
            ${targetAccount ? targetAccount.infection_status : 'Unknown'}
          </span>
        </div>
      </div>
    `;
    
    // Show panel
    detailsPanel.classList.add('active');
  }
  
  // Get color based on risk factor
  getRiskColor(riskFactor) {
    if (riskFactor >= 8.5) return 'var(--danger-color)';
    if (riskFactor >= 6) return 'var(--warning-color)';
    return 'var(--success-color)';
  }
  
  // Clear node details
  clearNodeDetails() {
    const nodeDetailsElement = document.getElementById('nodeDetails');
    nodeDetailsElement.innerHTML = '<p class="placeholder">Click on a node to view details</p>';
  }
  
  // Update statistics
  updateStats() {
    // Count total accounts
    const totalAccounts = this.accounts.length;
    
    // Count infected accounts
    const infectedAccounts = this.accounts.filter(acc => acc.infection_status === 'Infected').length;
    
    // Count flagged transactions
    const flaggedTransactions = this.transactions.filter(txn => txn.is_flagged).length;
    
    // Update DOM elements with animation
    this.animateCounter(this.statsElements.totalAccounts, totalAccounts);
    this.animateCounter(this.statsElements.infectedAccounts, infectedAccounts);
    this.animateCounter(this.statsElements.flaggedTransactions, flaggedTransactions);
  }
  
  // Animate counter for statistics
  animateCounter(element, targetValue) {
    const currentValue = parseInt(element.textContent) || 0;
    const duration = 1000; // milliseconds
    const steps = 20;
    const stepValue = (targetValue - currentValue) / steps;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      const newValue = Math.round(currentValue + (stepValue * currentStep));
      element.textContent = newValue;
      
      if (currentStep >= steps) {
        clearInterval(interval);
        element.textContent = targetValue;
      }
    }, duration / steps);
  }
  
  // Populate fraud alerts
  populateAlerts() {
    const alertsContainer = document.getElementById('alertsContainer');
    alertsContainer.innerHTML = '';
    
    this.fraudAlerts.forEach(alert => {
      const alertCard = document.createElement('div');
      alertCard.className = 'alert-card fade-in';
      alertCard.dataset.alertId = alert._id;
      alertCard.dataset.accountId = alert.affected_account;
      
      // Format date
      const alertDate = new Date(alert.triggered_at).toLocaleString();
      
      alertCard.innerHTML = `
        <div class="alert-header">
          <span class="alert-title">${alert.alert_type}</span>
          <span class="alert-time">${alertDate}</span>
        </div>
        <div class="alert-message">${alert.alert_message}</div>
        <div class="alert-severity">Severity: ${alert.severity}</div>
      `;
      
      // Add click event to highlight related account
      alertCard.addEventListener('click', () => {
        this.highlightAccountFromAlert(alert.affected_account);
      });
      
      alertsContainer.appendChild(alertCard);
    });
  }
  
  // Highlight account from alert
  highlightAccountFromAlert(accountId) {
    // Find the node
    const node = this.cy.getElementById(accountId);
    
    if (node.length === 0) {
      console.warn(`Node with ID ${accountId} not found`);
      return;
    }
    
    // Clear previous selections
    this.cy.elements().removeClass('selected highlight faded');
    
    // Add a flash animation to make the node stand out
    node.animation({
      style: {
        'background-color': '#ff9e00',
        'border-color': '#ff9e00',
        'border-width': 6,
        'border-opacity': 1
      },
      duration: 300
    }).play().promise().then(() => {
      // Return to original color but keep highlighted
      node.animation({
        style: {
          'background-color': node.data('color'),
          'border-color': node.data('color'),
          'border-width': 3,
          'border-opacity': 0.8
        },
        duration: 300
      }).play();
    });
    
    // Center view on node with better fit
    this.cy.animate({
      fit: {
        eles: node.neighborhood().add(node),
        padding: 50
      },
      duration: 800,
      easing: 'ease-in-out'
    });
    
    // Add selected class to node
    node.addClass('selected');
    
    // Highlight connected edges and nodes
    const connectedEdges = node.connectedEdges();
    connectedEdges.addClass('highlight');
    
    // Fade other edges
    this.cy.edges().difference(connectedEdges).addClass('faded');
    
    // Highlight connected nodes
    const connectedNodes = connectedEdges.connectedNodes();
    connectedNodes.difference(node).addClass('highlight');
    
    // Show node details
    this.showNodeDetails(node.data());
  }
  
  // Add animation effects to nodes
  addAnimationEffects() {
    // Add pulse animation to infected nodes
    const infectedNodes = this.cy.nodes().filter(node => node.data('infection_status') === 'Infected');
    
    // Add animation to infected nodes
    infectedNodes.forEach(node => {
      // Create a pulsing animation
      node.animate({
        style: {
          'border-width': 4,
          'border-opacity': 0.8,
          'background-color': '#f72585',
          'border-color': '#f72585'
        }
      }, {
        duration: 800,
        easing: 'ease-in-out',
        complete: function() {
          node.animate({
            style: {
              'border-width': 2,
              'border-opacity': 0.5,
              'background-color': '#f72585',
              'border-color': '#f72585'
            }
          }, {
            duration: 800,
            easing: 'ease-in-out',
            complete: function() {
              // Restart the animation
              if (node.data('infection_status') === 'Infected') {
                setTimeout(() => {
                  if (node.data('infection_status') === 'Infected') {
                    node.trigger('addAnimationEffects');
                  }
                }, 100);
              }
            }
          });
        }
      });
    });
    
    // Add animation to flagged transaction edges
    const flaggedEdges = this.cy.edges().filter(edge => edge.data('is_flagged'));
    
    flaggedEdges.forEach(edge => {
      // Create a blinking animation
      edge.animate({
        style: {
          'line-color': '#f72585',
          'target-arrow-color': '#f72585',
          'width': 3,
          'opacity': 1
        }
      }, {
        duration: 600,
        easing: 'ease-in-out',
        complete: function() {
          edge.animate({
            style: {
              'line-color': '#f72585',
              'target-arrow-color': '#f72585',
              'width': 1.5,
              'opacity': 0.7
            }
          }, {
            duration: 600,
            easing: 'ease-in-out',
            complete: function() {
              // Restart the animation
              if (edge.data('is_flagged')) {
                setTimeout(() => {
                  if (edge.data('is_flagged')) {
                    edge.trigger('addAnimationEffects');
                  }
                }, 100);
              }
            }
          });
        }
      });
    });
    
    // Set up event listeners for restarting animations
    this.cy.on('addAnimationEffects', 'node', function() {
      const node = this;
      if (node.data('infection_status') === 'Infected') {
        node.animate({
          style: {
            'border-width': 4,
            'border-opacity': 0.8,
            'background-color': '#f72585',
            'border-color': '#f72585'
          }
        }, {
          duration: 800,
          easing: 'ease-in-out'
        });
      }
    });
    
    this.cy.on('addAnimationEffects', 'edge', function() {
      const edge = this;
      if (edge.data('is_flagged')) {
        edge.animate({
          style: {
            'line-color': '#f72585',
            'target-arrow-color': '#f72585',
            'width': 3,
            'opacity': 1
          }
        }, {
          duration: 600,
          easing: 'ease-in-out'
        });
      }
    });
  }
  
  // Delete fraudulent nodes with animation
  deleteFraudulentNodes() {
    // Get all infected nodes
    const infectedNodes = this.cy.nodes().filter(node => node.data('infection_status') === 'Infected');
    
    if (infectedNodes.length === 0) {
      alert('No infected nodes to delete');
      return;
    }
    
    // Confirm deletion
    if (!confirm(`Delete ${infectedNodes.length} infected nodes?`)) {
      return;
    }
    
    // Highlight nodes to be deleted
    infectedNodes.addClass('highlight-delete');
    
    // Animate nodes before removal
    infectedNodes.animate({
      style: {
        'background-color': '#ff0000',
        'border-color': '#ff0000',
        'opacity': 0.5,
        'width': 10,
        'height': 10
      }
    }, {
      duration: 800,
      easing: 'ease-in-out',
      complete: () => {
        // Get connected edges
        const connectedEdges = infectedNodes.connectedEdges();
        
        // Animate edges before removal
        connectedEdges.animate({
          style: {
            'opacity': 0,
            'width': 0
          }
        }, {
          duration: 500,
          easing: 'ease-in-out',
          complete: () => {
            // Remove nodes and edges
            this.cy.remove(infectedNodes);
            
            // Update data structures
            this.accounts = this.accounts.filter(acc => acc.infection_status !== 'Infected');
            this.transactions = this.transactions.filter(txn => {
              return !infectedNodes.some(node => {
                return node.id() === txn.from_account || node.id() === txn.to_account;
              });
            });
            
            // Regenerate fraud alerts
            this.generateFraudAlerts();
            
            // Update statistics
            this.updateStats();
            
            // Populate alerts with new data
            this.populateAlerts();
            
            // Clear node details
            this.clearNodeDetails();
            
            // Run layout again
            this.cy.layout({
              name: 'cose',
              animate: true,
              animationDuration: 800,
              randomize: false,
              fit: true
            }).run();
          }
        });
      }
    });
  }
  
  // Toggle infected nodes visibility
  toggleInfectedNodes() {
    const infectedNodes = this.cy.nodes().filter(node => node.data('infection_status') === 'Infected');
    
    if (infectedNodes.length === 0) {
      alert('No infected nodes to toggle');
      return;
    }
    
    // Check if nodes are hidden
    const areHidden = infectedNodes.first().hasClass('hidden');
    
    if (areHidden) {
      // Show nodes
      infectedNodes.removeClass('hidden');
      
      // Show connected edges
      infectedNodes.connectedEdges().removeClass('hidden');
      
      // Update button text
      document.getElementById('toggleInfectedButton').textContent = '👁️ Hide Infected Nodes';
    } else {
      // Hide nodes
      infectedNodes.addClass('hidden');
      
      // Hide edges connected only to infected nodes
      infectedNodes.connectedEdges().forEach(edge => {
        const source = edge.source();
        const target = edge.target();
        
        if (source.data('infection_status') === 'Infected' && target.data('infection_status') === 'Infected') {
          edge.addClass('hidden');
        }
      });
      
      // Update button text
      document.getElementById('toggleInfectedButton').textContent = '👁️ Show Infected Nodes';
    }
    
    // Clear node details
    this.clearNodeDetails();
  }
  
  // Reset the simulation
  resetSimulation() {
    // Destroy current Cytoscape instance
    if (this.cy) {
      this.cy.destroy();
    }
    
    // Re-initialize
    this.initialize();
  }
  
  // Set up event listeners for UI controls
  setupEventListeners() {
    // Delete fraudulent nodes button
    document.getElementById('deleteFraudulentNodesButton').addEventListener('click', () => {
      this.deleteFraudulentNodes();
    });
    
    // Toggle infected nodes button
    document.getElementById('toggleInfectedButton').addEventListener('click', () => {
      this.toggleInfectedNodes();
    });
    
    // Reset simulation button
    document.getElementById('resetSimulation').addEventListener('click', () => {
      this.resetSimulation();
    });
    
    // Close details panel button
    document.getElementById('closeDetails').addEventListener('click', () => {
      document.getElementById('detailsPanel').classList.remove('active');
    });
  }
}

// Initialize the fraud simulation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const fraudSimulation = new FraudSimulation();
  
  // Make simulation accessible globally for debugging
  window.fraudSimulation = fraudSimulation;
});
