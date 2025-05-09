// Sample data for the simulation with meaningful names
const initialNodes = [
    { id: "User_A", name: "Primary User", risk_score: 0.1, status: "clean", connected_wallets: ["Bank_1", "Client_1"] },
    { id: "Bank_1", name: "Main Bank", risk_score: 0.2, status: "clean", connected_wallets: ["User_A", "Vendor_X"] },
    { id: "Client_1", name: "Client Corp", risk_score: 0.8, status: "infected", connected_wallets: ["User_A", "Vendor_X", "Partner_Y"] },
    { id: "Vendor_X", name: "Vendor X Corp", risk_score: 0.95, status: "toxic", connected_wallets: ["Bank_1", "Client_1", "Partner_Y"] },
    { id: "Partner_Y", name: "Partner Y Ltd", risk_score: 0.3, status: "clean", connected_wallets: ["Client_1", "Broker_Z"] },
    { id: "Broker_Z", name: "Broker Z Inc", risk_score: 0.4, status: "clean", connected_wallets: ["Vendor_X", "Partner_Y"] }
];

let nodes = [];
let links = [];
let activeLinks = new Set(); // Track which links are currently active/growing
let simulationRunning = false;
let currentDepth = 0;
let selectedNode = null;
let animationQueue = []; // Queue for animations
let smokeEffects = []; // Array to track smoke effects

// Initialize nodes with unvisited status
function initializeNodes() {
    nodes = JSON.parse(JSON.stringify(initialNodes));
    nodes.forEach(node => {
        node.status = node.original_status || node.status;
        node.visited = false;
        node.deleted = false;
        node.isSeed = false;
        node.growing = false;
        node.depth = -1;
    });
}

initializeNodes();

// Initialize D3 force simulation
const width = 800;
const height = 600;

const svg = d3.select("#networkGraph")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// Create a stronger force simulation to keep nodes centered and prevent jitter
const simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(d => d.id).distance(80).strength(0.8))
    .force("charge", d3.forceManyBody().strength(-300))
    .force("center", d3.forceCenter(width / 2, height / 2).strength(0.5))
    .force("x", d3.forceX(width / 2).strength(0.1))
    .force("y", d3.forceY(height / 2).strength(0.1))
    .alphaDecay(0.02); // Slower decay for smoother transitions

// Update links array
function updateLinks() {
    links = [];
    nodes.forEach(node => {
        if (node.deleted) return; // Skip deleted nodes
        
        node.connected_wallets.forEach(connectedId => {
            const targetNode = nodes.find(n => n.id === connectedId);
            if (targetNode && !targetNode.deleted) {
                // Create link with additional properties for animation
                links.push({ 
                    source: node, 
                    target: targetNode,
                    active: activeLinks.has(`${node.id}-${targetNode.id}`) || activeLinks.has(`${targetNode.id}-${node.id}`),
                    growing: false,
                    id: `${node.id}-${targetNode.id}`
                });
            }
        });
    });
}

// Update visualization
function updateVisualization() {
    // Clear previous elements
    svg.selectAll("*").remove();
    
    // Create depth rings if simulation is running
    if (simulationRunning && currentDepth > 0) {
        for (let i = 0; i <= currentDepth; i++) {
            svg.append("circle")
                .attr("cx", width / 2)
                .attr("cy", height / 2)
                .attr("r", 100 + i * 80)
                .attr("fill", "none")
                .attr("stroke", `rgba(52, 152, 219, ${0.1 - i * 0.02})`)
                .attr("stroke-width", 1)
                .attr("stroke-dasharray", "5,5")
                .attr("class", "depth-ring");
        }
    }
    
    // Add smoke effects
    smokeEffects.forEach(effect => {
        svg.append("div")
            .attr("class", "smoke")
            .style("left", `${effect.x}px`)
            .style("top", `${effect.y}px`);
    });
    
    // Update links with different styles based on state
    const link = svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", d => {
            let classes = "link";
            if (d.active) classes += " active";
            if (d.growing) classes += " growing";
            return classes;
        })
        .attr("id", d => d.id);

    // Update nodes with different visual states
    const node = svg.selectAll(".node")
        .data(nodes)
        .enter()
        .append("g")
        .attr("class", d => {
            let classes = "node";
            if (d.isSeed) classes += " seed";
            return classes;
        })
        .call(d3.drag()
            .on("start", dragStarted)
            .on("drag", dragged)
            .on("end", dragEnded))
        .on("click", (event, d) => {
            // Skip if simulation is running
            if (simulationRunning) return;
            
            if (event.ctrlKey || event.metaKey) {
                // Delete node on Ctrl+Click or Cmd+Click
                deleteNode(d);
            } else {
                // Toggle selection on normal click
                if (selectedNode === d) {
                    selectedNode = null;
                    d3.select(event.currentTarget).select("circle").classed("selected", false);
                } else {
                    // Deselect previous node if any
                    if (selectedNode) {
                        svg.selectAll(".node circle").classed("selected", false);
                    }
                    selectedNode = d;
                    d3.select(event.currentTarget).select("circle").classed("selected", true);
                }
            }
        })
        .on("dblclick", (event, d) => {
            // Delete node on double click
            if (!simulationRunning) {
                deleteNode(d);
            }
        });

    // Add circles for nodes with appropriate styling
    node.append("circle")
        .attr("r", d => d.isSeed ? 22 : (d.visited ? 20 : 18))
        .attr("class", d => {
            if (d.deleted) return "deleted";
            if (!d.visited && !d.isSeed) return "unvisited";
            
            let classes = d.status;
            if (d.growing) classes += " growing";
            if (d === selectedNode) classes += " selected";
            if (d.toxic_flash) classes += " toxic-flash";
            return classes;
        })
        .attr("id", d => d.id);

    // Add labels with better positioning
    node.append("text")
        .attr("dx", d => d.isSeed ? 14 : 12)
        .attr("dy", 4)
        .attr("opacity", d => d.visited || d.isSeed ? 1 : 0.7)
        .text(d => d.name || d.id);
        
    // Add a glow effect for seed nodes
    node.filter(d => d.isSeed)
        .append("circle")
        .attr("r", 28)
        .attr("fill", "none")
        .attr("stroke", "rgba(46, 204, 113, 0.3)")
        .attr("stroke-width", 2)
        .attr("class", "seed-glow");

    // Update simulation
    simulation
        .nodes(nodes)
        .on("tick", () => {
            // Constrain nodes to stay within the visualization area with padding
            nodes.forEach(d => {
                d.x = Math.max(30, Math.min(width - 30, d.x));
                d.y = Math.max(30, Math.min(height - 30, d.y));
            });
            
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("transform", d => `translate(${d.x},${d.y})`);
        });

    // Update statistics
    document.getElementById("totalNodes").textContent = nodes.length;
    document.getElementById("cleanNodes").textContent = nodes.filter(n => n.status === "clean").length;
    document.getElementById("toxicNodes").textContent = nodes.filter(n => n.status === "toxic").length;
}

// Helper function to create a smoke effect at a node position
function createSmokeEffect(node) {
    if (!node.x || !node.y) return;
    
    smokeEffects.push({
        x: node.x,
        y: node.y,
        time: Date.now()
    });
    
    // Remove smoke effect after animation completes
    setTimeout(() => {
        smokeEffects = smokeEffects.filter(effect => effect.time !== node.time);
    }, 2000);
}

// Helper function to animate a link growing from source to target
function animateLinkGrowth(sourceNode, targetNode) {
    return new Promise(resolve => {
        // Mark the link as active and growing
        const linkId = `${sourceNode.id}-${targetNode.id}`;
        activeLinks.add(linkId);
        
        // Find the link in the links array
        const link = links.find(l => l.id === linkId);
        if (link) link.growing = true;
        
        // Update visualization to show the growing link
        updateVisualization();
        
        // After animation completes, mark as active but not growing
        setTimeout(() => {
            if (link) link.growing = false;
            resolve();
        }, 400); // Faster animation speed
    });
}

// Simulation logic
async function runSimulation() {
    if (simulationRunning) return;
    
    simulationRunning = true;
    currentDepth = 0;
    activeLinks.clear();
    smokeEffects = [];
    
    // Reset node positions to prevent corner bug
    resetNodePositions();
    
    document.getElementById("simulationStatus").textContent = "Running";
    document.getElementById("startSimulation").disabled = true;
    document.getElementById("resetSimulation").disabled = true;
    document.getElementById("deleteNode").disabled = true;
    document.getElementById("simulationDetails").innerHTML = '';

    // Start from clean nodes (seed nodes)
    const seedNodes = nodes.filter(n => n.status === "clean" && n.risk_score < 0.3).slice(0, 2);
    if (seedNodes.length === 0) {
        // If no clean nodes with low risk, use any clean node
        seedNodes.push(...nodes.filter(n => n.status === "clean").slice(0, 1));
    }
    
    // Mark seed nodes
    seedNodes.forEach(node => {
        node.isSeed = true;
        node.visited = true;
        node.depth = 0;
    });
    
    // Update visualization to show seed nodes
    updateVisualization();
    
    // Wait for initial visualization - faster speed
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Process growth in stages
    async function processGrowthStage() {
        currentDepth++;
        
        // Find nodes to grow to in this stage
        const nodesToProcess = [];
        const processedNodeIds = new Set();
        
        // Find all nodes that are connected to visited nodes but not yet visited themselves
        nodes.filter(n => n.visited && !n.deleted && n.depth === currentDepth - 1).forEach(visitedNode => {
            // Check each connection of the visited node
            visitedNode.connected_wallets.forEach(connectedId => {
                const targetNode = nodes.find(n => n.id === connectedId);
                if (targetNode && !targetNode.visited && !targetNode.deleted && !processedNodeIds.has(targetNode.id)) {
                    nodesToProcess.push({ sourceNode: visitedNode, targetNode });
                    processedNodeIds.add(targetNode.id);
                }
            });
        });
        
        // If no more nodes to process, end simulation
        if (nodesToProcess.length === 0 || currentDepth > 3) {
            simulationRunning = false;
            document.getElementById("simulationStatus").textContent = "Completed";
            document.getElementById("startSimulation").disabled = false;
            document.getElementById("resetSimulation").disabled = false;
            document.getElementById("deleteNode").disabled = false;
            return;
        }
        
        // Process each node connection sequentially with animations
        for (const { sourceNode, targetNode } of nodesToProcess) {
            // Animate the link growth
            await animateLinkGrowth(sourceNode, targetNode);
            
            // Mark the target node as growing
            targetNode.growing = true;
            targetNode.depth = currentDepth;
            updateVisualization();
            
            // Wait for growth animation - faster speed
            await new Promise(resolve => setTimeout(resolve, 400));
            
            // Evaluate risk and update status
            targetNode.visited = true;
            targetNode.growing = false;
            
            if (targetNode.risk_score > 0.9) {
                // High risk - toxic node
                targetNode.status = "toxic";
                targetNode.toxic_flash = true;
                updateVisualization();
                
                // Wait for toxic flash animation - faster speed
                await new Promise(resolve => setTimeout(resolve, 300));
                
                // Create smoke effect
                createSmokeEffect(targetNode);
                
                // Mark as deleted and handle reconnection
                targetNode.deleted = true;
                targetNode.toxic_flash = false;
                reconnectNodes(targetNode);
            } else if (targetNode.risk_score > 0.7) {
                // Medium risk - infected node
                targetNode.status = "infected";
            } else {
                // Low risk - clean node
                targetNode.status = "clean";
            }
            
            // Update visualization after status change
            updateVisualization();
            
            // Small delay between processing nodes - faster speed
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        // Update statistics
        document.getElementById("totalNodes").textContent = nodes.filter(n => !n.deleted).length;
        document.getElementById("cleanNodes").textContent = nodes.filter(n => n.status === "clean").length;
        document.getElementById("toxicNodes").textContent = nodes.filter(n => n.status === "toxic").length;
        
        // Process next growth stage - faster speed
        setTimeout(processGrowthStage, 500);
    }

    // Start the growth process
    processGrowthStage();
}

// Reconnect nodes after deletion
async function reconnectNodes(deletedNode) {
    const reconnections = [];
    const affectedNodes = [];
    
    // Find nodes that were connected to the deleted node
    deletedNode.connected_wallets.forEach(connectedId => {
        const connectedNode = nodes.find(n => n.id === connectedId);
        if (connectedNode && !connectedNode.deleted) {
            affectedNodes.push(connectedNode);
            
            // Try to find alternative paths
            const alternativeConnections = nodes
                .filter(n => !n.deleted && n !== connectedNode && n !== deletedNode)
                .sort((a, b) => a.risk_score - b.risk_score) // Prefer safer nodes
                .map(n => n.id);

            if (alternativeConnections.length > 0) {
                const alternativeId = alternativeConnections[0];
                const alternativeNode = nodes.find(n => n.id === alternativeId);
                
                reconnections.push({
                    from: deletedNode.id,
                    to: connectedId,
                    alternative: alternativeId
                });
                
                // Create the new connection with animation
                if (alternativeNode && !alternativeNode.connected_wallets.includes(connectedId)) {
                    alternativeNode.connected_wallets.push(connectedId);
                }
                if (connectedNode && !connectedNode.connected_wallets.includes(alternativeId)) {
                    connectedNode.connected_wallets.push(alternativeId);
                }
                
                // Add to active links for animation
                activeLinks.add(`${alternativeId}-${connectedId}`);
            }
        }
    });

    // Update the links after reconnection
    updateLinks();
    updateVisualization();
    
    // Animate the reconnection with a delay
    if (reconnections.length > 0) {
        // Add reconnection event to details panel with animation
        const reconnectionDiv = document.createElement('div');
        reconnectionDiv.className = 'reconnection';
        reconnectionDiv.innerHTML = `
            <h3>Reconnection Event</h3>
            <p>Deleted Node: ${deletedNode.id}</p>
            <p>Reconnections:</p>
            <ul>
                ${reconnections.map(r => `<li>From ${r.from} to ${r.to} via ${r.alternative}</li>`).join('')}
            </ul>
        `;
        document.getElementById("simulationDetails").appendChild(reconnectionDiv);
        
        // Highlight the new connections
        reconnections.forEach(r => {
            const link = links.find(l => 
                (l.source.id === r.alternative && l.target.id === r.to) || 
                (l.source.id === r.to && l.target.id === r.alternative)
            );
            
            if (link) {
                link.growing = true;
            }
        });
        
        // Update visualization to show growing links
        updateVisualization();
        
        // After animation, stop growing - faster speed
        await new Promise(resolve => setTimeout(resolve, 500));
        links.forEach(link => link.growing = false);
        updateVisualization();
    }
    
    return reconnections;
}

// Event handlers
document.getElementById("startSimulation").addEventListener("click", () => {
    runSimulation();
});

document.getElementById("resetSimulation").addEventListener("click", () => {
    // Reset simulation state
    simulationRunning = false;
    currentDepth = 0;
    activeLinks.clear();
    smokeEffects = [];
    selectedNode = null;
    
    // Initialize nodes from scratch
    initializeNodes();
    updateLinks();
    updateVisualization();
    
    // Reset UI
    document.getElementById("simulationStatus").textContent = "Not Running";
    document.getElementById("startSimulation").disabled = false;
    document.getElementById("resetSimulation").disabled = false;
    document.getElementById("deleteNode").disabled = false;
    document.getElementById("simulationDetails").innerHTML = '';
    
    // Update statistics
    document.getElementById("totalNodes").textContent = nodes.length;
    document.getElementById("cleanNodes").textContent = nodes.filter(n => n.status === "clean").length;
    document.getElementById("toxicNodes").textContent = nodes.filter(n => n.status === "toxic").length;
});

// Add delete node functionality directly on node click
function deleteNode(node) {
    if (simulationRunning) return;
    if (node.deleted) return; // Prevent deleting already deleted nodes
    
    // Create smoke effect
    createSmokeEffect(node);
    
    // Mark the node as deleted with animation
    node.toxic_flash = true;
    updateVisualization();
    
    // Wait for flash animation - faster speed
    setTimeout(async () => {
        // Mark as deleted
        node.deleted = true;
        node.status = "deleted";
        node.toxic_flash = false;
        
        // Handle reconnection for the deleted node
        await reconnectNodes(node);
        
        // Update visualization
        updateVisualization();
        
        // Clear selection
        if (selectedNode === node) {
            selectedNode = null;
        }
        
        // Update statistics
        document.getElementById("totalNodes").textContent = nodes.filter(n => !n.deleted).length;
        document.getElementById("cleanNodes").textContent = nodes.filter(n => n.status === "clean").length;
        document.getElementById("toxicNodes").textContent = nodes.filter(n => n.status === "toxic").length;
    }, 300);
}

// Keep the delete button for accessibility
document.getElementById("deleteNode").addEventListener("click", () => {
    if (simulationRunning) return;
    if (selectedNode) deleteNode(selectedNode);
});

// Drag handlers
function dragStarted(event, d) {
    if (simulationRunning) return; // Prevent dragging during simulation
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    if (simulationRunning) return; // Prevent dragging during simulation
    d.fx = event.x;
    d.fy = event.y;
}

function dragEnded(event, d) {
    if (simulationRunning) return; // Prevent dragging during simulation
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

// Initialize visualization
updateLinks();
updateVisualization();

// Initial positioning to ensure nodes start in the center
function initialPositioning() {
    // Position nodes in a circle around the center
    const angleStep = (2 * Math.PI) / nodes.length;
    const radius = Math.min(width, height) / 3.5;
    
    nodes.forEach((node, i) => {
        const angle = i * angleStep;
        node.x = width / 2 + radius * Math.cos(angle);
        node.y = height / 2 + radius * Math.sin(angle);
        // Fix positions to prevent drift
        node.fx = node.x;
        node.fy = node.y;
    });
    
    // Run simulation for a bit to settle nodes
    simulation.alpha(1).restart();
    for (let i = 0; i < 300; ++i) simulation.tick();
    
    // Update visualization with new positions
    updateVisualization();
}

initialPositioning();

// Function to reset node positions when needed
function resetNodePositions() {
    // Release fixed positions
    nodes.forEach(node => {
        node.fx = null;
        node.fy = null;
    });
    
    // Position nodes in a circle around the center
    const angleStep = (2 * Math.PI) / nodes.filter(n => !n.deleted).length;
    const radius = Math.min(width, height) / 3.5;
    
    let i = 0;
    nodes.forEach(node => {
        if (!node.deleted) {
            const angle = i * angleStep;
            node.x = width / 2 + radius * Math.cos(angle);
            node.y = height / 2 + radius * Math.sin(angle);
            i++;
        }
    });
    
    // Restart the simulation with a strong alpha to move nodes to new positions
    simulation.alpha(1).restart();
}
