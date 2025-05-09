// Visualizer JavaScript for Bio-Inspired Blockchain Fraud Detection Suite
// This file handles the Cytoscape.js network graph visualization

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the network graph if the element exists
    const networkGraphElement = document.getElementById('network-graph');
    if (networkGraphElement) {
        initNetworkGraph(networkGraphElement);
    }
});

// Initialize the network graph with Cytoscape.js
function initNetworkGraph(container) {
    // Create the Cytoscape instance
    const cy = cytoscape({
        container: container,
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#4caf50', // Default healthy color
                    'label': 'data(id)',
                    'color': '#fff',
                    'text-outline-color': '#121212',
                    'text-outline-width': 2,
                    'font-size': 12,
                    'width': 40,
                    'height': 40
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'line-color': '#ffffff',
                    'target-arrow-color': '#ffffff',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            },
            {
                selector: '.infected',
                style: {
                    'background-color': '#f44336',
                    'border-width': 3,
                    'border-color': '#ff9800',
                    'border-style': 'solid'
                }
            },
            {
                selector: '.suspicious',
                style: {
                    'line-color': '#f44336',
                    'target-arrow-color': '#f44336',
                    'line-style': 'dashed'
                }
            },
            {
                selector: '.exposed',
                style: {
                    'background-color': '#ff9800'
                }
            },
            {
                selector: '.recovered',
                style: {
                    'background-color': '#2196f3',
                    'border-width': 2,
                    'border-color': '#4caf50',
                    'border-style': 'solid'
                }
            },
            {
                selector: '.blink',
                style: {
                    'border-width': 3,
                    'border-color': '#f44336'
                }
            }
        ],
        layout: {
            name: 'cose',
            idealEdgeLength: 100,
            nodeOverlap: 20,
            refresh: 20,
            fit: true,
            padding: 30,
            randomize: false,
            componentSpacing: 100,
            nodeRepulsion: 400000,
            edgeElasticity: 100,
            nestingFactor: 5,
            gravity: 80,
            numIter: 1000,
            initialTemp: 200,
            coolingFactor: 0.95,
            minTemp: 1.0
        },
        // Initial empty elements
        elements: []
    });

    // Generate initial network
    generateNetwork(cy, 30, 45);

    // Add event listeners for the control buttons
    const simulateButton = document.getElementById('simulate-fraud');
    const toggleInfectedButton = document.getElementById('toggle-infected');
    const removeInfectedButton = document.getElementById('remove-infected');

    if (simulateButton) {
        simulateButton.addEventListener('click', function() {
            simulateFraud(cy);
        });
    }

    if (toggleInfectedButton) {
        toggleInfectedButton.addEventListener('click', function() {
            toggleInfectedNodes(cy);
        });
    }

    if (removeInfectedButton) {
        removeInfectedButton.addEventListener('click', function() {
            removeInfectedNodes(cy);
        });
    }

    // Add zoom controls
    cy.on('mouseover', 'node', function(e) {
        e.target.animate({
            style: { 'width': 50, 'height': 50 }
        }, {
            duration: 300
        });
    });

    cy.on('mouseout', 'node', function(e) {
        e.target.animate({
            style: { 'width': 40, 'height': 40 }
        }, {
            duration: 300
        });
    });

    // Enable panning and zooming
    cy.userPanningEnabled(true);
    cy.userZoomingEnabled(true);
}

// Generate a random network with nodes and edges
function generateNetwork(cy, nodeCount, edgeCount) {
    // Clear existing elements
    cy.elements().remove();
    
    // Add nodes
    for (let i = 1; i <= nodeCount; i++) {
        cy.add({
            group: 'nodes',
            data: { id: 'n' + i }
        });
    }
    
    // Add edges (random connections)
    for (let i = 0; i < edgeCount; i++) {
        const source = 'n' + Math.ceil(Math.random() * nodeCount);
        let target = 'n' + Math.ceil(Math.random() * nodeCount);
        
        // Ensure source and target are different
        while (source === target) {
            target = 'n' + Math.ceil(Math.random() * nodeCount);
        }
        
        // Check if edge already exists
        if (cy.getElementById(source + '-' + target).empty()) {
            cy.add({
                group: 'edges',
                data: {
                    id: source + '-' + target,
                    source: source,
                    target: target
                }
            });
        }
    }
    
    // Apply layout
    cy.layout({
        name: 'cose',
        animate: true,
        animationDuration: 1000
    }).run();
}

// Simulate fraud in the network
function simulateFraud(cy) {
    // Reset all nodes to healthy state
    cy.nodes().removeClass('infected exposed recovered');
    cy.edges().removeClass('suspicious');
    
    // Select a random node to be the initial infected node
    const initialInfected = cy.nodes()[Math.floor(Math.random() * cy.nodes().length)];
    initialInfected.addClass('infected');
    
    // Start the infection animation
    animateInfection(cy, [initialInfected]);
    
    // Make the infected node blink
    startBlinking([initialInfected]);
}

// Animate the infection spreading through the network
function animateInfection(cy, infectedNodes, iteration = 0) {
    if (iteration > 5 || infectedNodes.length === 0) return;
    
    const newInfected = [];
    
    // For each infected node, spread to neighbors with some probability
    infectedNodes.forEach(node => {
        const neighbors = node.neighborhood('node');
        
        neighbors.forEach(neighbor => {
            // Skip already infected or recovered nodes
            if (neighbor.hasClass('infected') || neighbor.hasClass('recovered')) {
                return;
            }
            
            // 60% chance of infection for direct neighbors
            if (Math.random() < 0.6) {
                // First mark as exposed
                if (!neighbor.hasClass('exposed')) {
                    neighbor.addClass('exposed');
                    
                    // After a delay, mark as infected
                    setTimeout(() => {
                        neighbor.removeClass('exposed');
                        neighbor.addClass('infected');
                        
                        // Mark the connecting edge as suspicious
                        cy.edges(`[source = "${node.id()}"][target = "${neighbor.id()}"], 
                                 [source = "${neighbor.id()}"][target = "${node.id()}"]`)
                          .addClass('suspicious');
                        
                        newInfected.push(neighbor);
                        
                        // Make the newly infected node blink
                        startBlinking([neighbor]);
                    }, 1000);
                }
            } else {
                // 20% chance of becoming recovered (immune) without infection
                if (Math.random() < 0.2) {
                    setTimeout(() => {
                        neighbor.addClass('recovered');
                    }, 1500);
                }
            }
        });
        
        // 30% chance that the infected node recovers
        if (Math.random() < 0.3 && iteration > 1) {
            setTimeout(() => {
                node.removeClass('infected');
                node.addClass('recovered');
                stopBlinking([node]);
            }, 2000);
        }
    });
    
    // Continue the infection in the next iteration
    if (newInfected.length > 0) {
        setTimeout(() => {
            animateInfection(cy, newInfected, iteration + 1);
        }, 2000);
    }
}

// Toggle visibility of infected nodes
function toggleInfectedNodes(cy) {
    const infectedNodes = cy.nodes('.infected');
    
    if (infectedNodes.length > 0) {
        if (infectedNodes.style('opacity') === '1') {
            infectedNodes.style('opacity', '0.2');
        } else {
            infectedNodes.style('opacity', '1');
        }
    }
}

// Remove infected nodes from the network
function removeInfectedNodes(cy) {
    cy.nodes('.infected').remove();
}

// Make nodes blink
function startBlinking(nodes) {
    nodes.forEach(node => {
        node.addClass('blink');
        
        // Create blinking effect
        let visible = true;
        const blinkInterval = setInterval(() => {
            if (visible) {
                node.style('border-width', 0);
            } else {
                node.style('border-width', 3);
            }
            visible = !visible;
            
            // Stop blinking if node is no longer infected
            if (!node.hasClass('infected')) {
                clearInterval(blinkInterval);
                node.style('border-width', node.hasClass('recovered') ? 2 : 0);
                node.removeClass('blink');
            }
        }, 500);
        
        // Store the interval ID on the node
        node.data('blinkInterval', blinkInterval);
    });
}

// Stop nodes from blinking
function stopBlinking(nodes) {
    nodes.forEach(node => {
        const blinkInterval = node.data('blinkInterval');
        if (blinkInterval) {
            clearInterval(blinkInterval);
            node.removeData('blinkInterval');
        }
        node.removeClass('blink');
    });
}
