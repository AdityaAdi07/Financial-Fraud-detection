// Cellular Division Fraud Detection Simulation
// Main simulation class to handle the detection of suspicious money-splitting behavior

class CellularDivisionSimulation {
    constructor() {
        // Simulation parameters
        this.minRecipients = 5;
        this.timeWindow = 10; // minutes
        this.minAmount = 5000; // dollars
        
        // Simulation state
        this.wallets = [];
        this.transactions = [];
        this.divisionEvents = [];
        this.simulationTime = 0; // in minutes
        this.isRunning = false;
        this.simulationSpeed = 5; // time multiplier - faster simulation
        this.simulationInterval = null;
        this.maxSimulationTime = 60; // simulation ends after 60 time units
        this.scheduledFrauds = []; // scheduled fraud events
        
        // D3 visualization elements
        this.width = document.getElementById('simulationCanvas').clientWidth;
        this.height = document.getElementById('simulationCanvas').clientHeight;
        this.svg = null;
        this.simulation = null;
        this.nodes = [];
        this.links = [];
        
        // Initialize the simulation
        this.initializeSimulation();
        this.setupEventListeners();
    }
    
    // Initialize the simulation with some sample data
    initializeSimulation() {
        // Create initial wallets
        this.createInitialWallets();
        
        // Initialize D3 visualization
        this.initializeVisualization();
        
        // Update statistics
        this.updateStats();
    }
    
    // Create initial set of wallets
    createInitialWallets() {
        // Create parent wallets (high value)
        const parentWallets = [
            { id: 'W1', name: 'Main Account', balance: 150000, type: 'parent', risk: 0.7, x: this.width / 2, y: this.height / 2, fraudProne: true },
            { id: 'W2', name: 'Business Account', balance: 200000, type: 'parent', risk: 0.8, x: this.width / 3, y: this.height / 3, fraudProne: true },
            { id: 'W3', name: 'Investment Fund', balance: 300000, type: 'parent', risk: 0.6, x: this.width * 2/3, y: this.height * 2/3, fraudProne: true }
        ];
        
        // Create some regular wallets
        const regularWallets = [
            { id: 'W4', name: 'Vendor A', balance: 15000, type: 'regular', risk: 0.4, x: this.width / 4, y: this.height / 2 },
            { id: 'W5', name: 'Client B', balance: 8000, type: 'regular', risk: 0.3, x: this.width * 3/4, y: this.height / 2 },
            { id: 'W6', name: 'Partner C', balance: 12000, type: 'regular', risk: 0.2, x: this.width / 2, y: this.height / 4 },
            { id: 'W7', name: 'Shell Corp 1', balance: 1000, type: 'shell', risk: 0.9, x: this.width / 5, y: this.height / 5 },
            { id: 'W8', name: 'Shell Corp 2', balance: 1000, type: 'shell', risk: 0.9, x: this.width * 4/5, y: this.height / 5 },
            { id: 'W9', name: 'Shell Corp 3', balance: 1000, type: 'shell', risk: 0.9, x: this.width / 5, y: this.height * 4/5 },
            { id: 'W10', name: 'Shell Corp 4', balance: 1000, type: 'shell', risk: 0.9, x: this.width * 4/5, y: this.height * 4/5 },
            { id: 'W11', name: 'Shell Corp 5', balance: 1000, type: 'shell', risk: 0.9, x: this.width / 2, y: this.height * 4/5 }
        ];
        
        this.wallets = [...parentWallets, ...regularWallets];
        
        // Schedule fraud events
        this.scheduleFraudEvents();
    }
    
    // Initialize D3 force simulation for visualization
    initializeVisualization() {
        // Clear previous SVG if it exists
        d3.select('#simulationCanvas svg').remove();
        
        // Create SVG element
        this.svg = d3.select('#simulationCanvas')
            .append('svg')
            .attr('width', this.width)
            .attr('height', this.height);
            
        // Initialize nodes and links for D3
        this.nodes = this.wallets.map(wallet => ({...wallet}));
        this.links = [];
        
        // Create force simulation
        this.simulation = d3.forceSimulation(this.nodes)
            .force('link', d3.forceLink(this.links).id(d => d.id).distance(100))
            .force('charge', d3.forceManyBody().strength(-300))
            .force('center', d3.forceCenter(this.width / 2, this.height / 2))
            .force('x', d3.forceX(this.width / 2).strength(0.05))
            .force('y', d3.forceY(this.height / 2).strength(0.05))
            .on('tick', () => this.ticked());
            
        // Draw the initial visualization
        this.updateVisualization();
    }
    
    // Update the visualization based on current nodes and links
    updateVisualization() {
        // Update links
        const link = this.svg.selectAll('.link')
            .data(this.links, d => `${d.source.id}-${d.target.id}`);
            
        link.exit().remove();
        
        const linkEnter = link.enter()
            .append('line')
            .attr('class', d => `link ${d.type || ''}`)
            .attr('stroke-width', d => Math.sqrt(d.value || 1));
            
        this.linkElements = linkEnter.merge(link);
        
        // Update nodes
        const node = this.svg.selectAll('.node')
            .data(this.nodes, d => d.id);
            
        node.exit().remove();
        
        const nodeEnter = node.enter()
            .append('g')
            .attr('class', d => `node ${d.type}`)
            .call(d3.drag()
                .on('start', (event, d) => this.dragstarted(event, d))
                .on('drag', (event, d) => this.dragged(event, d))
                .on('end', (event, d) => this.dragended(event, d)))
            .on('click', (event, d) => this.nodeClicked(event, d));
            
        nodeEnter.append('circle')
            .attr('r', d => this.getNodeRadius(d))
            .attr('fill', d => this.getNodeColor(d))
            .attr('class', d => d.flagged ? 'division-pulse' : '');
            
        nodeEnter.append('text')
            .attr('dy', 4)
            .attr('text-anchor', 'middle')
            .text(d => d.name.substring(0, 10));
            
        this.nodeElements = nodeEnter.merge(node);
        
        // Update simulation
        this.simulation.nodes(this.nodes);
        this.simulation.force('link').links(this.links);
        this.simulation.alpha(0.3).restart();
    }
    
    // Handle simulation tick for D3 force layout
    ticked() {
        // Update link positions
        if (this.linkElements) {
            this.linkElements
                .attr('x1', d => d.source.x)
                .attr('y1', d => d.source.y)
                .attr('x2', d => d.target.x)
                .attr('y2', d => d.target.y);
        }
        
        // Update node positions
        if (this.nodeElements) {
            this.nodeElements
                .attr('transform', d => `translate(${d.x},${d.y})`);
        }
    }
    
    // Get node radius based on wallet balance
    getNodeRadius(d) {
        return Math.max(10, Math.min(30, Math.sqrt(d.balance) / 10));
    }
    
    // Get node color based on wallet type and risk
    getNodeColor(d) {
        if (d.flagged) return '#ef4444'; // Red for flagged
        if (d.type === 'shell') return '#9333ea'; // Purple for shell companies
        if (d.type === 'child') return '#10b981'; // Green for child wallets
        if (d.type === 'parent') return '#6366f1'; // Blue for parent wallets
        return '#f59e0b'; // Yellow/orange for regular wallets
    }
    
    // Schedule fraud events to occur at specific times
    scheduleFraudEvents() {
        // Clear any existing scheduled frauds
        this.scheduledFrauds = [];
        
        // Schedule 3 fraud events at different times
        this.scheduledFrauds.push({
            time: 10, // At 10 minutes
            sourceId: 'W1',
            targetCount: 6,
            amountPerTarget: 5000
        });
        
        this.scheduledFrauds.push({
            time: 25, // At 25 minutes
            sourceId: 'W2',
            targetCount: 8,
            amountPerTarget: 8000
        });
        
        this.scheduledFrauds.push({
            time: 40, // At 40 minutes
            sourceId: 'W3',
            targetCount: 10,
            amountPerTarget: 12000
        });
    }
    
    // Start the simulation
    startSimulation() {
        if (this.isRunning) return;
        
        // Update parameters from UI
        this.updateParametersFromUI();
        
        this.isRunning = true;
        document.getElementById('startSimulation').textContent = '⏸️ Pause Simulation';
        document.getElementById('resetSimulation').disabled = true;
        document.getElementById('addWallet').disabled = true;
        
        // Start the simulation loop - faster updates
        this.simulationInterval = setInterval(() => this.simulationStep(), 500 / this.simulationSpeed);
    }
    
    // Pause the simulation
    pauseSimulation() {
        this.isRunning = false;
        document.getElementById('startSimulation').textContent = '▶️ Start Simulation';
        document.getElementById('resetSimulation').disabled = false;
        document.getElementById('addWallet').disabled = false;
        
        clearInterval(this.simulationInterval);
    }
    
    // Reset the simulation
    resetSimulation() {
        this.pauseSimulation();
        
        // Reset simulation state
        this.wallets = [];
        this.transactions = [];
        this.divisionEvents = [];
        this.simulationTime = 0;
        
        // Update timeline marker
        document.getElementById('timeMarker').style.left = '0%';
        
        // Clear events log
        document.getElementById('eventsContainer').innerHTML = '';
        
        // Reinitialize
        this.createInitialWallets();
        this.initializeVisualization();
        this.updateStats();
    }
    
    // Single step of the simulation
    simulationStep() {
        // Increment simulation time
        this.simulationTime += 1;
        
        // Update timeline marker
        const timelinePercentage = (this.simulationTime / this.maxSimulationTime) * 100;
        document.getElementById('timeMarker').style.left = `${timelinePercentage}%`;
        
        // Check for scheduled fraud events
        this.checkScheduledFrauds();
        
        // Generate random transactions
        this.generateRandomTransactions();
        
        // Check for division events
        this.detectDivisionEvents();
        
        // Update statistics
        this.updateStats();
        
        // Every 15 simulation minutes, add a new wallet
        if (this.simulationTime % 15 === 0) {
            this.addRandomWallet();
        }
        
        // End simulation after maxSimulationTime
        if (this.simulationTime >= this.maxSimulationTime) {
            this.pauseSimulation();
            // Show completion message
            alert('Simulation completed! Detected ' + this.divisionEvents.length + ' fraud events.');
        }
    }
    
    // Check for scheduled fraud events
    checkScheduledFrauds() {
        // Find any frauds scheduled for this time
        const fraudsToExecute = this.scheduledFrauds.filter(fraud => fraud.time === this.simulationTime);
        
        // Execute each fraud
        for (const fraud of fraudsToExecute) {
            this.executeFraudEvent(fraud);
        }
    }
    
    // Execute a fraud event
    executeFraudEvent(fraud) {
        const sourceWallet = this.wallets.find(w => w.id === fraud.sourceId);
        if (!sourceWallet) return;
        
        // Find shell company wallets or create new ones if needed
        const shellWallets = this.wallets.filter(w => w.type === 'shell');
        const availableShells = [...shellWallets];
        
        // If we don't have enough shells, create more
        while (availableShells.length < fraud.targetCount) {
            const newShell = this.createShellWallet();
            availableShells.push(newShell);
        }
        
        // Select target wallets
        const targetWallets = availableShells.slice(0, fraud.targetCount);
        
        // Create transactions from source to each target
        for (const targetWallet of targetWallets) {
            // Calculate amount (with slight variations)
            const amount = fraud.amountPerTarget * (0.9 + Math.random() * 0.2);
            
            // Create transaction
            const transaction = {
                id: `T${this.transactions.length + 1}`,
                sourceId: sourceWallet.id,
                targetId: targetWallet.id,
                amount: amount,
                timestamp: this.simulationTime,
                fraudulent: true
            };
            
            // Update wallet balances
            sourceWallet.balance -= amount;
            targetWallet.balance += amount;
            
            // Add transaction to list
            this.transactions.push(transaction);
            
            // Add link to visualization
            const link = {
                source: sourceWallet.id,
                target: targetWallet.id,
                value: Math.sqrt(amount) / 10,
                type: 'division',
                transactionId: transaction.id
            };
            
            this.links.push(link);
        }
        
        // Update visualization
        this.updateVisualization();
    }
    
    // Create a new shell wallet
    createShellWallet() {
        const id = `W${this.wallets.length + 1}`;
        const name = `Shell Corp ${id}`;
        
        const wallet = {
            id,
            name,
            balance: 1000,
            type: 'shell',
            risk: 0.9,
            x: this.width * Math.random(),
            y: this.height * Math.random()
        };
        
        this.wallets.push(wallet);
        this.nodes.push({...wallet});
        
        return wallet;
    }
    
    // Generate random transactions between wallets
    generateRandomTransactions() {
        // Each step, generate 2-5 random transactions (increased frequency)
        const numTransactions = 2 + Math.floor(Math.random() * 4);
        
        for (let i = 0; i < numTransactions; i++) {
            // Select random source wallet with sufficient balance
            const sourceWallets = this.wallets.filter(w => w.balance > 1000);
            if (sourceWallets.length === 0) continue;
            
            const sourceWallet = sourceWallets[Math.floor(Math.random() * sourceWallets.length)];
            
            // Select random target wallet (not the same as source)
            const targetWallets = this.wallets.filter(w => w.id !== sourceWallet.id);
            if (targetWallets.length === 0) continue;
            
            const targetWallet = targetWallets[Math.floor(Math.random() * targetWallets.length)];
            
            // Generate random amount (1-20% of source balance)
            const maxAmount = sourceWallet.balance * 0.2;
            const minAmount = Math.min(1000, sourceWallet.balance * 0.01);
            const amount = Math.floor(minAmount + Math.random() * (maxAmount - minAmount));
            
            // Create transaction
            const transaction = {
                id: `T${this.transactions.length + 1}`,
                sourceId: sourceWallet.id,
                targetId: targetWallet.id,
                amount: amount,
                timestamp: this.simulationTime
            };
            
            // Update wallet balances
            sourceWallet.balance -= amount;
            targetWallet.balance += amount;
            
            // Add transaction to list
            this.transactions.push(transaction);
            
            // Add temporary link to visualization
            const link = {
                source: sourceWallet.id,
                target: targetWallet.id,
                value: Math.sqrt(amount) / 10,
                type: 'active',
                transactionId: transaction.id
            };
            
            this.links.push(link);
            
            // Remove link after animation
            setTimeout(() => {
                this.links = this.links.filter(l => l.transactionId !== transaction.id);
                this.updateVisualization();
            }, 2000);
            
            // Update visualization
            this.updateVisualization();
        }
    }
    
    // Detect division events (suspicious splitting behavior)
    detectDivisionEvents() {
        // For each wallet, check if it has made multiple outgoing transactions in the time window
        for (const wallet of this.wallets) {
            // Skip wallets with low balance
            if (wallet.balance < this.minAmount) continue;
            
            // Get recent outgoing transactions within time window
            const recentTransactions = this.transactions.filter(t => 
                t.sourceId === wallet.id && 
                (this.simulationTime - t.timestamp) <= this.timeWindow
            );
            
            // Count unique recipients
            const uniqueRecipients = [...new Set(recentTransactions.map(t => t.targetId))];
            
            // Calculate total amount transferred
            const totalAmount = recentTransactions.reduce((sum, t) => sum + t.amount, 0);
            
            // Check if this could be a division event
            if (uniqueRecipients.length >= this.minRecipients && totalAmount >= this.minAmount) {
                // Check if recipients are mostly new or inactive wallets
                const childWallets = uniqueRecipients.map(id => this.wallets.find(w => w.id === id))
                    .filter(w => w.type !== 'parent');
                
                if (childWallets.length >= this.minRecipients) {
                    // Calculate division score (risk level)
                    const divisionScore = this.calculateDivisionScore(wallet, childWallets, totalAmount);
                    
                    // Create division event
                    const divisionEvent = {
                        id: `E${this.divisionEvents.length + 1}`,
                        parentWallet: wallet.id,
                        childWallets: childWallets.map(w => w.id),
                        eventTime: this.simulationTime,
                        totalAmountSplit: totalAmount,
                        divisionScore: divisionScore,
                        status: divisionScore > 0.7 ? 'high-risk' : (divisionScore > 0.4 ? 'medium-risk' : 'low-risk')
                    };
                    
                    // Check if we already have a similar event recently
                    const similarEvent = this.divisionEvents.find(e => 
                        e.parentWallet === divisionEvent.parentWallet && 
                        Math.abs(e.eventTime - divisionEvent.eventTime) < 20
                    );
                    
                    if (!similarEvent) {
                        // Add to division events
                        this.divisionEvents.push(divisionEvent);
                        
                        // Flag the parent wallet
                        wallet.flagged = true;
                        
                        // Add division event to the log
                        this.addEventToLog(divisionEvent);
                        
                        // Create division links in visualization
                        childWallets.forEach(childWallet => {
                            const link = {
                                source: wallet.id,
                                target: childWallet.id,
                                value: 2,
                                type: 'division',
                                divisionId: divisionEvent.id
                            };
                            
                            // Mark child wallets
                            childWallet.type = 'child';
                            
                            this.links.push(link);
                        });
                        
                        // Update visualization
                        this.updateVisualization();
                    }
                }
            }
        }
    }
    
    // Calculate division score (risk level) for a potential division event
    calculateDivisionScore(parentWallet, childWallets, totalAmount) {
        // Factors that increase risk:
        // 1. Number of recipients (more = higher risk)
        const recipientFactor = Math.min(1, childWallets.length / 15);
        
        // 2. Amount split (higher = higher risk)
        const amountFactor = Math.min(1, totalAmount / 50000);
        
        // 3. Similarity of amounts (more similar = higher risk)
        const amounts = this.transactions
            .filter(t => t.sourceId === parentWallet.id && childWallets.some(w => w.id === t.targetId))
            .map(t => t.amount);
            
        const avgAmount = amounts.reduce((sum, a) => sum + a, 0) / amounts.length;
        const variance = amounts.reduce((sum, a) => sum + Math.pow(a - avgAmount, 2), 0) / amounts.length;
        const stdDev = Math.sqrt(variance);
        const similarityFactor = Math.max(0, 1 - (stdDev / avgAmount));
        
        // 4. Parent wallet risk
        const parentRiskFactor = parentWallet.risk || 0.3;
        
        // Combine factors with weights
        const score = (
            recipientFactor * 0.3 + 
            amountFactor * 0.25 + 
            similarityFactor * 0.25 + 
            parentRiskFactor * 0.2
        );
        
        return Math.min(0.99, Math.max(0.1, score));
    }
    
    // Add event to the log UI
    addEventToLog(event) {
        const eventsContainer = document.getElementById('eventsContainer');
        
        const eventCard = document.createElement('div');
        eventCard.className = `event-card ${event.status} fade-in`;
        eventCard.dataset.eventId = event.id;
        
        // Format time as HH:MM
        const hours = Math.floor(event.eventTime / 60);
        const minutes = event.eventTime % 60;
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        
        eventCard.innerHTML = `
            <div class="event-header">
                <span class="event-title">Division Event ${event.id}</span>
                <span class="event-time">${timeString}</span>
            </div>
            <div class="event-details">
                <span class="event-amount">$${event.totalAmountSplit.toLocaleString()}</span>
                <span class="event-score ${event.status}">Risk: ${(event.divisionScore * 100).toFixed(0)}%</span>
            </div>
        `;
        
        // Add click event to show details
        eventCard.addEventListener('click', () => this.showEventDetails(event));
        
        // Add to container
        eventsContainer.prepend(eventCard);
    }
    
    // Show detailed information about a division event
    showEventDetails(event) {
        const detailsPanel = document.getElementById('detailsPanel');
        const detailsContent = document.getElementById('detailsContent');
        
        // Get parent wallet
        const parentWallet = this.wallets.find(w => w.id === event.parentWallet);
        
        // Get child wallets
        const childWallets = event.childWallets.map(id => this.wallets.find(w => w.id === id));
        
        // Format time as HH:MM
        const hours = Math.floor(event.eventTime / 60);
        const minutes = event.eventTime % 60;
        const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
        
        // Create content
        detailsContent.innerHTML = `
            <div class="detail-section">
                <h4>Event Information</h4>
                <div class="detail-row">
                    <span class="detail-label">Event ID:</span>
                    <span class="detail-value">${event.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Time:</span>
                    <span class="detail-value">${timeString}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Risk Score:</span>
                    <span class="detail-value ${event.status}">${(event.divisionScore * 100).toFixed(0)}%</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Total Amount Split:</span>
                    <span class="detail-value">$${event.totalAmountSplit.toLocaleString()}</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Parent Wallet</h4>
                <div class="detail-row">
                    <span class="detail-label">Wallet ID:</span>
                    <span class="detail-value">${parentWallet.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span class="detail-value">${parentWallet.name}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Current Balance:</span>
                    <span class="detail-value">$${parentWallet.balance.toLocaleString()}</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Child Wallets (${childWallets.length})</h4>
                <div class="child-wallets">
                    ${childWallets.map(wallet => `
                        <div class="child-wallet-item">
                            <span>${wallet.id} - ${wallet.name}</span>
                            <span>$${wallet.balance.toLocaleString()}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        // Show panel
        detailsPanel.classList.add('active');
    }
    
    // Add a new random wallet to the simulation
    addRandomWallet() {
        const id = `W${this.wallets.length + 1}`;
        const types = ['regular', 'parent'];
        const type = types[Math.floor(Math.random() * types.length)];
        const names = ['Account', 'Wallet', 'Fund', 'Vendor', 'Client', 'Partner', 'Business'];
        const name = `${names[Math.floor(Math.random() * names.length)]} ${id}`;
        
        const balance = type === 'parent' 
            ? 20000 + Math.floor(Math.random() * 80000)
            : 1000 + Math.floor(Math.random() * 19000);
            
        const risk = Math.random() * 0.5;
        
        const wallet = {
            id,
            name,
            balance,
            type,
            risk,
            x: this.width / 2 + (Math.random() - 0.5) * 100,
            y: this.height / 2 + (Math.random() - 0.5) * 100
        };
        
        this.wallets.push(wallet);
        this.nodes.push({...wallet});
        
        // Connect to 1-3 existing wallets
        const numConnections = 1 + Math.floor(Math.random() * 3);
        const existingWallets = [...this.wallets];
        existingWallets.pop(); // Remove the wallet we just added
        
        for (let i = 0; i < numConnections && i < existingWallets.length; i++) {
            const targetIndex = Math.floor(Math.random() * existingWallets.length);
            const targetWallet = existingWallets[targetIndex];
            
            // Remove this wallet from candidates for future connections
            existingWallets.splice(targetIndex, 1);
            
            // Add a link
            this.links.push({
                source: wallet.id,
                target: targetWallet.id,
                value: 1
            });
        }
        
        // Update visualization
        this.updateVisualization();
    }
    
    // Add a new wallet (triggered by button)
    addWallet() {
        this.addRandomWallet();
        this.updateStats();
    }
    
    // Update statistics in the UI
    updateStats() {
        document.getElementById('totalWallets').textContent = this.wallets.length;
        document.getElementById('totalTransactions').textContent = this.transactions.length;
        document.getElementById('divisionEvents').textContent = this.divisionEvents.length;
        document.getElementById('flaggedWallets').textContent = this.wallets.filter(w => w.flagged).length;
    }
    
    // Update simulation parameters from UI inputs
    updateParametersFromUI() {
        this.minRecipients = parseInt(document.getElementById('minRecipients').value) || 5;
        this.timeWindow = parseInt(document.getElementById('timeWindow').value) || 10;
        this.minAmount = parseInt(document.getElementById('minAmount').value) || 5000;
    }
    
    // Handle node click
    nodeClicked(event, d) {
        console.log('Node clicked:', d);
        // Highlight connected nodes and links
        this.highlightConnections(d);
    }
    
    // Highlight connections for a node
    highlightConnections(node) {
        // Reset all nodes and links
        this.svg.selectAll('.node').classed('highlighted', false);
        this.svg.selectAll('.link').classed('highlighted', false);
        
        // Find connected links
        const connectedLinks = this.links.filter(
            link => link.source.id === node.id || link.target.id === node.id
        );
        
        // Find connected nodes
        const connectedNodes = new Set();
        connectedLinks.forEach(link => {
            connectedNodes.add(link.source.id);
            connectedNodes.add(link.target.id);
        });
        
        // Highlight the node
        this.svg.selectAll('.node')
            .filter(d => d.id === node.id)
            .classed('highlighted', true);
            
        // Highlight connected nodes
        this.svg.selectAll('.node')
            .filter(d => connectedNodes.has(d.id) && d.id !== node.id)
            .classed('highlighted', true);
            
        // Highlight links
        this.svg.selectAll('.link')
            .filter(d => d.source.id === node.id || d.target.id === node.id)
            .classed('highlighted', true);
    }
    
    // D3 drag handlers
    dragstarted(event, d) {
        if (!event.active) this.simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }
    
    dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }
    
    dragended(event, d) {
        if (!event.active) this.simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }
    
    // Set up event listeners for UI controls
    setupEventListeners() {
        // Start/pause button
        document.getElementById('startSimulation').addEventListener('click', () => {
            if (this.isRunning) {
                this.pauseSimulation();
            } else {
                this.startSimulation();
            }
        });
        
        // Reset button
        document.getElementById('resetSimulation').addEventListener('click', () => {
            this.resetSimulation();
        });
        
        // Add wallet button
        document.getElementById('addWallet').addEventListener('click', () => {
            this.addWallet();
        });
        
        // Close details panel button
        document.getElementById('closeDetails').addEventListener('click', () => {
            document.getElementById('detailsPanel').classList.remove('active');
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.width = document.getElementById('simulationCanvas').clientWidth;
            this.height = document.getElementById('simulationCanvas').clientHeight;
            
            if (this.svg) {
                this.svg.attr('width', this.width).attr('height', this.height);
                this.simulation.force('center', d3.forceCenter(this.width / 2, this.height / 2));
                this.simulation.alpha(0.3).restart();
            }
        });
    }
}

// Initialize the simulation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const simulation = new CellularDivisionSimulation();
    
    // Make simulation accessible globally for debugging
    window.cellularSimulation = simulation;
});
