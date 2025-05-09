// Spider Silk Trap Fraud Detection Simulation
// Main simulation class to handle the detection of suspicious transactions

class SpiderSilkTrapSimulation {
    constructor() {
        // Simulation parameters
        this.webSensitivity = 5; // How sensitive web nodes are (1-10)
        this.trapThreshold = 1000; // Threshold for triggering traps
        this.maxFraudDetections = 4; // Maximum number of fraud detections before stopping
        
        // Simulation state
        this.wallets = [];
        this.links = [];
        this.transactions = [];
        this.trapEvents = [];
        this.simulationTime = 0; // in seconds
        this.isRunning = false;
        this.simulationSpeed = 1; // time multiplier
        this.simulationInterval = null;
        this.scheduledFrauds = []; // Scheduled fraud attempts
        this.detectionCount = 0; // Counter for fraud detections
        
        // D3 visualization elements
        this.width = document.getElementById('simulationCanvas').clientWidth;
        this.height = document.getElementById('simulationCanvas').clientHeight;
        this.svg = null;
        this.simulation = null;
        this.nodes = [];
        this.webSilks = [];
        
        // Initialize the simulation
        this.initializeSimulation();
        this.setupEventListeners();
    }
    
    // Initialize the simulation with initial wallets and web nodes
    initializeSimulation() {
        // Create initial wallets
        this.createInitialWallets();
        
        // Create web nodes around fraud zones
        this.createWebNodes();
        
        // Initialize D3 visualization
        this.initializeVisualization();
        
        // Update statistics
        this.updateStats();
    }
    
    // Create initial set of wallets including fraud zones
    createInitialWallets() {
        // Create normal wallets
        const normalWallets = [
            { id: 'W1', name: 'User Account', balance: 15000, type: 'normal', risk: 0.2, x: this.width / 2, y: this.height / 2 },
            { id: 'W2', name: 'Savings Account', balance: 25000, type: 'normal', risk: 0.1, x: this.width / 3, y: this.height / 3 },
            { id: 'W3', name: 'Business Account', balance: 50000, type: 'normal', risk: 0.3, x: this.width * 2/3, y: this.height * 2/3 },
            { id: 'W4', name: 'Vendor A', balance: 12000, type: 'normal', risk: 0.2, x: this.width / 4, y: this.height / 2 },
            { id: 'W5', name: 'Client B', balance: 8000, type: 'normal', risk: 0.3, x: this.width * 3/4, y: this.height / 2 }
        ];
        
        // Create fraud zone wallets
        const fraudWallets = [
            { id: 'F1', name: 'Known Fraud 1', balance: 30000, type: 'fraud', risk: 0.9, x: this.width / 5, y: this.height / 5 },
            { id: 'F2', name: 'Known Fraud 2', balance: 20000, type: 'fraud', risk: 0.85, x: this.width * 4/5, y: this.height * 4/5 }
        ];
        
        // Create suspicious wallets (not yet flagged as fraud)
        const suspiciousWallets = [
            { id: 'S1', name: 'High Risk Entity', balance: 15000, type: 'suspicious', risk: 0.7, x: this.width * 3/5, y: this.height / 5 },
            { id: 'S2', name: 'Shell Company', balance: 10000, type: 'suspicious', risk: 0.75, x: this.width / 5, y: this.height * 4/5 }
        ];
        
        this.wallets = [...normalWallets, ...fraudWallets, ...suspiciousWallets];
        
        // Create initial links between wallets
        this.createInitialLinks();
    }
    
    // Create initial links between wallets
    createInitialLinks() {
        // Connect normal wallets to each other
        this.addLink('W1', 'W2', 'normal');
        this.addLink('W2', 'W3', 'normal');
        this.addLink('W3', 'W4', 'normal');
        this.addLink('W4', 'W5', 'normal');
        this.addLink('W5', 'W1', 'normal');
        
        // Connect some normal wallets to suspicious ones
        this.addLink('W3', 'S1', 'normal');
        this.addLink('W5', 'S2', 'normal');
        
        // Connect suspicious wallets to fraud zones
        this.addLink('S1', 'F1', 'normal');
        this.addLink('S2', 'F2', 'normal');
    }
    
    // Create web nodes around fraud zones
    createWebNodes() {
        // Find fraud wallets
        const fraudWallets = this.wallets.filter(w => w.type === 'fraud');
        
        // For each fraud wallet, create web nodes around it
        fraudWallets.forEach(fraudWallet => {
            // Find wallets connected to the fraud wallet
            const connectedWalletIds = this.links
                .filter(link => 
                    link.source === fraudWallet.id || 
                    link.target === fraudWallet.id
                )
                .map(link => 
                    link.source === fraudWallet.id ? link.target : link.source
                );
            
            // Create web nodes for each connected wallet
            connectedWalletIds.forEach(walletId => {
                const wallet = this.wallets.find(w => w.id === walletId);
                if (wallet && wallet.type !== 'web') {
                    // Create a web node near this wallet
                    const webNodeId = `WEB_${wallet.id}`;
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 30 + Math.random() * 20;
                    
                    const webNode = {
                        id: webNodeId,
                        name: `Web Node ${webNodeId}`,
                        type: 'web',
                        sensitivity: this.webSensitivity / 10, // 0.1 to 1.0
                        x: wallet.x + Math.cos(angle) * distance,
                        y: wallet.y + Math.sin(angle) * distance,
                        monitoringWalletId: wallet.id,
                        fraudZoneId: fraudWallet.id,
                        vibrations: 0,
                        lastTriggered: 0
                    };
                    
                    this.wallets.push(webNode);
                    
                    // Connect web node to the wallet it's monitoring
                    this.addLink(webNodeId, wallet.id, 'web');
                    
                    // Create web silks (visual effect)
                    this.createWebSilks(webNode);
                }
            });
        });
    }
    
    // Create web silks around a web node (visual effect)
    createWebSilks(webNode) {
        const silkCount = 3;
        for (let i = 1; i <= silkCount; i++) {
            this.webSilks.push({
                nodeId: webNode.id,
                radius: 20 * i,
                x: webNode.x,
                y: webNode.y
            });
        }
    }
    
    // Add a link between two wallets
    addLink(sourceId, targetId, type = 'normal', value = 1) {
        this.links.push({
            source: sourceId,
            target: targetId,
            type,
            value
        });
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
            
        // Create web silks (concentric circles around web nodes)
        this.webSilks.forEach(silk => {
            this.svg.append('circle')
                .attr('class', 'web-silk')
                .attr('cx', silk.x)
                .attr('cy', silk.y)
                .attr('r', silk.radius)
                .attr('data-node-id', silk.nodeId);
        });
            
        // Initialize nodes and links for D3
        this.nodes = this.wallets.map(wallet => ({...wallet}));
        
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
        // Update web silks positions
        this.svg.selectAll('.web-silk').each((d, i, nodes) => {
            const silkElement = nodes[i];
            const nodeId = silkElement.getAttribute('data-node-id');
            const node = this.nodes.find(n => n.id === nodeId);
            
            if (node) {
                d3.select(silkElement)
                    .attr('cx', node.x)
                    .attr('cy', node.y);
            }
        });
        
        // Update links
        const link = this.svg.selectAll('.link')
            .data(this.links, d => `${d.source.id || d.source}-${d.target.id || d.target}`);
            
        link.exit().remove();
        
        const linkEnter = link.enter()
            .append('line')
            .attr('class', d => `link ${d.type || 'normal'}`)
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
            .attr('class', d => d.trapped ? 'trapped' : '');
            
        nodeEnter.append('text')
            .attr('dy', 4)
            .attr('text-anchor', 'middle')
            .text(d => d.name.substring(0, 10));
            
        this.nodeElements = nodeEnter.merge(node);
        
        // Update simulation
        this.simulation.nodes(this.nodes);
        this.simulation.force('link').links(this.links.map(link => {
            // Convert string IDs to node references if needed
            if (typeof link.source === 'string') {
                const sourceNode = this.nodes.find(n => n.id === link.source);
                const targetNode = this.nodes.find(n => n.id === link.target);
                return { ...link, source: sourceNode, target: targetNode };
            }
            return link;
        }));
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
    
    // Get node radius based on wallet type and balance
    getNodeRadius(d) {
        if (d.type === 'web') return 8;
        if (d.type === 'fraud') return 15;
        return Math.max(10, Math.min(20, Math.sqrt(d.balance) / 30));
    }
    
    // Start the simulation
    startSimulation() {
        if (this.isRunning) return;
        
        // Update parameters from UI
        this.updateParametersFromUI();
        
        this.isRunning = true;
        document.getElementById('startSimulation').textContent = '⏸️ Pause Simulation';
        document.getElementById('resetSimulation').disabled = true;
        document.getElementById('triggerFraud').disabled = true;
        
        // Schedule some fraud attempts
        this.scheduleFraudAttempts();
        
        // Start the simulation loop
        this.simulationInterval = setInterval(() => this.simulationStep(), 1000 / this.simulationSpeed);
    }
    
    // Pause the simulation
    pauseSimulation() {
        this.isRunning = false;
        document.getElementById('startSimulation').textContent = '▶️ Start Simulation';
        document.getElementById('resetSimulation').disabled = false;
        document.getElementById('triggerFraud').disabled = false;
        
        clearInterval(this.simulationInterval);
    }
    
    // Reset the simulation
    resetSimulation() {
        this.pauseSimulation();
        
        // Reset simulation state
        this.wallets = [];
        this.links = [];
        this.transactions = [];
        this.trapEvents = [];
        this.simulationTime = 0;
        this.webSilks = [];
        this.scheduledFrauds = [];
        
        // Clear events log
        document.getElementById('eventsContainer').innerHTML = '';
        
        // Reinitialize
        this.initializeSimulation();
        this.updateStats();
    }
    
    // Schedule fraud attempts at specific times
    scheduleFraudAttempts() {
        this.scheduledFrauds = [
            {
                time: 10, // At 10 seconds
                sourceId: 'S1',
                targetId: 'W1',
                amount: 2000
            },
            {
                time: 20, // At 20 seconds
                sourceId: 'F1',
                targetId: 'S1',
                amount: 5000
            },
            {
                time: 30, // At 30 seconds
                sourceId: 'S2',
                targetId: 'W3',
                amount: 3000
            },
            {
                time: 40, // At 40 seconds
                sourceId: 'F2',
                targetId: 'S2',
                amount: 8000
            }
        ];
    }
    
    // Single step of the simulation
    simulationStep() {
        // Increment simulation time
        this.simulationTime += 1;
        
        // Check for scheduled fraud attempts
        this.checkScheduledFrauds();
        
        // Generate random transactions
        this.generateRandomTransactions();
        
        // Update statistics
        this.updateStats();
    }
    
    // Check for scheduled fraud attempts
    checkScheduledFrauds() {
        // Find any frauds scheduled for this time
        const fraudsToExecute = this.scheduledFrauds.filter(fraud => fraud.time === this.simulationTime);
        
        // Execute each fraud
        for (const fraud of fraudsToExecute) {
            this.executeTransaction(fraud.sourceId, fraud.targetId, fraud.amount, true);
        }
    }
    
    // Generate random transactions between wallets
    generateRandomTransactions() {
        // Each step, generate 0-2 random transactions
        const numTransactions = Math.floor(Math.random() * 3);
        
        for (let i = 0; i < numTransactions; i++) {
            // Select random source wallet with sufficient balance
            const sourceWallets = this.wallets.filter(w => w.balance > 1000 && !w.trapped);
            if (sourceWallets.length === 0) continue;
            
            const sourceWallet = sourceWallets[Math.floor(Math.random() * sourceWallets.length)];
            
            // Select random target wallet (not the same as source)
            const targetWallets = this.wallets.filter(w => w.id !== sourceWallet.id && w.type !== 'web');
            if (targetWallets.length === 0) continue;
            
            const targetWallet = targetWallets[Math.floor(Math.random() * targetWallets.length)];
            
            // Generate random amount (1-10% of source balance)
            const maxAmount = sourceWallet.balance * 0.1;
            const minAmount = Math.min(500, sourceWallet.balance * 0.01);
            const amount = Math.floor(minAmount + Math.random() * (maxAmount - minAmount));
            
            // Execute the transaction
            this.executeTransaction(sourceWallet.id, targetWallet.id, amount, false);
        }
    }
    
    // Execute a transaction between two wallets
    executeTransaction(sourceId, targetId, amount, isSuspicious = false) {
        const sourceWallet = this.wallets.find(w => w.id === sourceId);
        const targetWallet = this.wallets.find(w => w.id === targetId);
        
        if (!sourceWallet || !targetWallet) return;
        if (sourceWallet.trapped) return; // Trapped wallets can't send money
        
        // Check if transaction is throttled (reduced amount)
        if (sourceWallet.throttled) {
            amount = Math.floor(amount * 0.3); // Reduce to 30%
        }
        
        // Create transaction
        const transaction = {
            id: `T${this.transactions.length + 1}`,
            sourceId: sourceWallet.id,
            targetId: targetWallet.id,
            amount: amount,
            timestamp: this.simulationTime,
            isSuspicious: isSuspicious || sourceWallet.type === 'fraud' || sourceWallet.type === 'suspicious' || targetWallet.type === 'fraud'
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
            type: 'transaction',
            transactionId: transaction.id
        };
        
        this.links.push(link);
        
        // Check for web node detection
        this.checkWebNodeDetection(transaction);
        
        // Remove link after animation
        setTimeout(() => {
            this.links = this.links.filter(l => l.transactionId !== transaction.id);
            this.updateVisualization();
        }, 2000);
        
        // Update visualization
        this.updateVisualization();
    }
    
    // Check if a transaction is detected by web nodes
    checkWebNodeDetection(transaction) {
        // Get source and target wallets
        const sourceWallet = this.wallets.find(w => w.id === transaction.sourceId);
        const targetWallet = this.wallets.find(w => w.id === transaction.targetId);
        
        // Find web nodes monitoring these wallets
        const webNodes = this.wallets.filter(w => 
            w.type === 'web' && 
            (w.monitoringWalletId === sourceWallet.id || w.monitoringWalletId === targetWallet.id)
        );
        
        // Check each web node
        webNodes.forEach(webNode => {
            // Calculate vibration strength based on transaction amount, risk, and web sensitivity
            const monitoredWallet = webNode.monitoringWalletId === sourceWallet.id ? sourceWallet : targetWallet;
            const otherWallet = webNode.monitoringWalletId === sourceWallet.id ? targetWallet : sourceWallet;
            
            const riskFactor = monitoredWallet.risk || 0.2;
            const otherRiskFactor = otherWallet.risk || 0.2;
            const combinedRisk = (riskFactor + otherRiskFactor) / 2;
            
            const vibrationStrength = transaction.amount * combinedRisk * webNode.sensitivity;
            
            // Add vibration to the web node
            webNode.vibrations += vibrationStrength;
            
            // Create ripple effect
            this.createRippleEffect(webNode);
            
            // Check if trap should be triggered
            if (webNode.vibrations >= this.trapThreshold) {
                // Trigger trap
                this.triggerTrap(webNode, transaction, monitoredWallet, otherWallet);
                
                // Reset vibrations
                webNode.vibrations = 0;
                webNode.lastTriggered = this.simulationTime;
            }
        });
    }
    
    // Create ripple effect around a web node
    createRippleEffect(webNode) {
        // Create ripple element
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        ripple.style.left = `${webNode.x}px`;
        ripple.style.top = `${webNode.y}px`;
        
        // Add to canvas
        document.getElementById('simulationCanvas').appendChild(ripple);
        
        // Remove after animation completes
        setTimeout(() => {
            ripple.remove();
        }, 2000);
    }
    
    // Trigger a trap when a web node detects suspicious activity
    triggerTrap(webNode, transaction, monitoredWallet, otherWallet) {
        // Determine reaction based on risk level
        const combinedRisk = (monitoredWallet.risk + otherWallet.risk) / 2;
        let reaction = 'flag';
        
        if (combinedRisk > 0.8) {
            reaction = 'block';
        } else if (combinedRisk > 0.5) {
            reaction = 'throttle';
        }
        
        // Create trap event
        const trapEvent = {
            id: `E${this.trapEvents.length + 1}`,
            webNode: webNode.id,
            triggeredBy: transaction.sourceId,
            targetWallet: transaction.targetId,
            riskScore: combinedRisk,
            amount: transaction.amount,
            timestamp: this.simulationTime,
            reaction: reaction
        };
        
        // Add to trap events
        this.trapEvents.push(trapEvent);
        
        // Increment detection counter
        this.detectionCount++;
        
        // Check if we've reached the maximum number of detections
        if (this.detectionCount >= this.maxFraudDetections) {
            this.pauseSimulation();
            this.showSimulationSummary();
        }
        
        // Apply reaction
        switch (reaction) {
            case 'block':
                // Block the wallet (can't send money)
                const walletToBlock = otherWallet.type === 'fraud' || otherWallet.type === 'suspicious' ? 
                    otherWallet : monitoredWallet;
                walletToBlock.trapped = true;
                
                // Add visual effect
                const nodeElement = this.svg.select(`.node#${walletToBlock.id}`);
                if (nodeElement) {
                    nodeElement.select('circle').classed('trapped', true);
                    nodeElement.classed('vibrate', true);
                }
                break;
                
            case 'throttle':
                // Throttle the wallet (reduced transaction amounts)
                const walletToThrottle = otherWallet.type === 'fraud' || otherWallet.type === 'suspicious' ? 
                    otherWallet : monitoredWallet;
                walletToThrottle.throttled = true;
                break;
                
            case 'flag':
                // Just flag the transaction
                break;
        }
        
        // Add trap event to the log
        this.addEventToLog(trapEvent);
        
        // Update visualization
        this.updateVisualization();
    }
    
    // Add event to the log UI
    addEventToLog(event) {
        const eventsContainer = document.getElementById('eventsContainer');
        
        const eventCard = document.createElement('div');
        eventCard.className = `event-card ${event.reaction} fade-in`;
        eventCard.dataset.eventId = event.id;
        
        // Format time as MM:SS
        const minutes = Math.floor(event.timestamp / 60);
        const seconds = event.timestamp % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Determine risk level class
        let riskClass = 'low';
        if (event.riskScore > 0.7) riskClass = 'high';
        else if (event.riskScore > 0.4) riskClass = 'medium';
        
        eventCard.innerHTML = `
            <div class="event-header">
                <span class="event-title">Trap ${event.id} - ${event.reaction.toUpperCase()}</span>
                <span class="event-time">${timeString}</span>
            </div>
            <div class="event-details">
                <span class="event-amount">$${event.amount.toLocaleString()}</span>
                <span class="event-score ${riskClass}">Risk: ${(event.riskScore * 100).toFixed(0)}%</span>
            </div>
        `;
        
        // Add click event to show details
        eventCard.addEventListener('click', () => this.showEventDetails(event));
        
        // Add to container
        eventsContainer.prepend(eventCard);
    }
    
    // Show detailed information about a trap event
    showEventDetails(event) {
        const detailsPanel = document.getElementById('detailsPanel');
        const detailsContent = document.getElementById('detailsContent');
        
        // Get wallets involved
        const webNode = this.wallets.find(w => w.id === event.webNode);
        const sourceWallet = this.wallets.find(w => w.id === event.triggeredBy);
        const targetWallet = this.wallets.find(w => w.id === event.targetWallet);
        
        // Format time as MM:SS
        const minutes = Math.floor(event.timestamp / 60);
        const seconds = event.timestamp % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Create content
        detailsContent.innerHTML = `
            <div class="detail-section">
                <h4>Trap Event Information</h4>
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
                    <span class="detail-value">${(event.riskScore * 100).toFixed(0)}%</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Amount:</span>
                    <span class="detail-value">$${event.amount.toLocaleString()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Reaction:</span>
                    <span class="detail-value">${event.reaction.toUpperCase()}</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Web Node</h4>
                <div class="detail-row">
                    <span class="detail-label">Web Node ID:</span>
                    <span class="detail-value">${webNode.id}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Monitoring:</span>
                    <span class="detail-value">${webNode.monitoringWalletId}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Sensitivity:</span>
                    <span class="detail-value">${(webNode.sensitivity * 10).toFixed(0)}/10</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Transaction</h4>
                <div class="detail-row">
                    <span class="detail-label">From:</span>
                    <span class="detail-value">${sourceWallet.name} (${sourceWallet.id})</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">To:</span>
                    <span class="detail-value">${targetWallet.name} (${targetWallet.id})</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Source Type:</span>
                    <span class="detail-value">${sourceWallet.type.toUpperCase()}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Target Type:</span>
                    <span class="detail-value">${targetWallet.type.toUpperCase()}</span>
                </div>
            </div>
        `;
        
        // Show panel
        detailsPanel.classList.add('active');
    }
    
    // Manually trigger a fraud transaction
    triggerFraud() {
        // Find a fraud or suspicious wallet
        const fraudWallets = this.wallets.filter(w => 
            (w.type === 'fraud' || w.type === 'suspicious') && 
            w.balance > 5000 && 
            !w.trapped
        );
        
        if (fraudWallets.length === 0) {
            alert('No fraud wallets available with sufficient balance!');
            return;
        }
        
        const fraudWallet = fraudWallets[Math.floor(Math.random() * fraudWallets.length)];
        
        // Find a normal wallet to target
        const normalWallets = this.wallets.filter(w => w.type === 'normal');
        
        if (normalWallets.length === 0) {
            alert('No normal wallets available to target!');
            return;
        }
        
        const targetWallet = normalWallets[Math.floor(Math.random() * normalWallets.length)];
        
        // Create a large transaction
        const amount = Math.min(fraudWallet.balance * 0.8, 10000);
        
        // Execute the transaction
        this.executeTransaction(fraudWallet.id, targetWallet.id, amount, true);
    }
    
    // Update statistics in the UI
    updateStats() {
        document.getElementById('totalWallets').textContent = this.wallets.filter(w => w.type !== 'web').length;
        document.getElementById('webNodes').textContent = this.wallets.filter(w => w.type === 'web').length;
        document.getElementById('totalTransactions').textContent = this.transactions.length;
        document.getElementById('trappedWallets').textContent = this.wallets.filter(w => w.trapped).length;
    }
    
    // Update simulation parameters from UI inputs
    updateParametersFromUI() {
        const sensitivitySlider = document.getElementById('webSensitivity');
        const thresholdSlider = document.getElementById('trapThreshold');
        
        this.webSensitivity = parseInt(sensitivitySlider.value) || 5;
        this.trapThreshold = parseInt(thresholdSlider.value) || 1000;
        
        // Update web node sensitivity
        this.wallets.forEach(wallet => {
            if (wallet.type === 'web') {
                wallet.sensitivity = this.webSensitivity / 10;
            }
        });
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
        
        // Trigger fraud button
        document.getElementById('triggerFraud').addEventListener('click', () => {
            this.triggerFraud();
        });
        
        // Close details panel button
        document.getElementById('closeDetails').addEventListener('click', () => {
            document.getElementById('detailsPanel').classList.remove('active');
        });
        
        // Sensitivity slider
        const sensitivitySlider = document.getElementById('webSensitivity');
        const sensitivityValue = document.getElementById('sensitivityValue');
        
        sensitivitySlider.addEventListener('input', () => {
            sensitivityValue.textContent = sensitivitySlider.value;
        });
        
        // Threshold slider
        const thresholdSlider = document.getElementById('trapThreshold');
        const thresholdValue = document.getElementById('thresholdValue');
        
        thresholdSlider.addEventListener('input', () => {
            thresholdValue.textContent = thresholdSlider.value;
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
    // Show a summary of how the simulation works after it completes
    showSimulationSummary() {
        // Create a detailed explanation panel
        const detailsPanel = document.getElementById('detailsPanel');
        const detailsContent = document.getElementById('detailsContent');
        
        detailsContent.innerHTML = `
            <div class="detail-section">
                <h4>Spider Silk Trap Simulation Complete</h4>
                <p>The simulation has detected ${this.detectionCount} suspicious activities and has stopped.</p>
            </div>
            
            <div class="detail-section">
                <h4>How Spider Silk Trap Works</h4>
                <p>The Spider Silk Trap is a fraud detection system inspired by how spiders use their webs to detect prey.</p>
                <div class="detail-row">
                    <span class="detail-label">1. Web Placement:</span>
                    <span class="detail-value">Web nodes are strategically placed around known fraud zones to monitor transactions.</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">2. Vibration Detection:</span>
                    <span class="detail-value">When transactions occur near web nodes, they create "vibrations" based on transaction amount and risk factors.</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">3. Sensitivity:</span>
                    <span class="detail-value">Web nodes have adjustable sensitivity (${this.webSensitivity}/10) that determines how strongly they react to nearby transactions.</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">4. Threshold:</span>
                    <span class="detail-value">When vibrations exceed the threshold (${this.trapThreshold}), the trap is triggered.</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Reaction Types</h4>
                <div class="detail-row">
                    <span class="detail-label">Flag:</span>
                    <span class="detail-value">For low-risk transactions (risk < 50%), the system simply flags the transaction for review.</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Throttle:</span>
                    <span class="detail-value">For medium-risk transactions (risk 50-80%), the system reduces future transaction amounts from the suspicious wallet to 30% of their original value.</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Block:</span>
                    <span class="detail-value">For high-risk transactions (risk > 80%), the system completely blocks the wallet from making future transactions.</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h4>Statistics</h4>
                <div class="detail-row">
                    <span class="detail-label">Total Wallets:</span>
                    <span class="detail-value">${this.wallets.filter(w => w.type !== 'web').length}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Web Nodes:</span>
                    <span class="detail-value">${this.wallets.filter(w => w.type === 'web').length}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Transactions:</span>
                    <span class="detail-value">${this.transactions.length}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Trapped Wallets:</span>
                    <span class="detail-value">${this.wallets.filter(w => w.trapped).length}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Simulation Time:</span>
                    <span class="detail-value">${Math.floor(this.simulationTime / 60)}:${(this.simulationTime % 60).toString().padStart(2, '0')}</span>
                </div>
            </div>
        `;
        
        // Show panel
        detailsPanel.classList.add('active');
    }
}

// Initialize the simulation when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const simulation = new SpiderSilkTrapSimulation();
    
    // Make simulation accessible globally for debugging
    window.spiderSimulation = simulation;
});
