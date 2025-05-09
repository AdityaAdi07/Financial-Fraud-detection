// Main JavaScript for Bio-Inspired Blockchain Fraud Detection Suite

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Initialize smooth scrolling for navigation links
    initSmoothScroll();
    
    // Initialize navbar scroll behavior
    initNavbarScroll();
    
    // Initialize model cards hover effect
    initModelCards();
});

// Initialize animations for elements as they come into view
function initAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                
                // Add animation to section headers
                const header = entry.target.querySelector('.section-header');
                if (header) {
                    header.classList.add('slide-up');
                }
                
                // Add animation to content elements
                const contentElements = entry.target.querySelectorAll('.model-card, .tech-item, .screenshot-item');
                contentElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('scale-in');
                    }, 100 * index);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize smooth scrolling for navigation links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Handle "Explore Models" button click
    const exploreButton = document.querySelector('.hero-content .btn-primary');
    if (exploreButton) {
        exploreButton.addEventListener('click', function() {
            const modelsSection = document.querySelector('#models');
            if (modelsSection) {
                window.scrollTo({
                    top: modelsSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Initialize navbar scroll behavior
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.98)';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.backgroundColor = 'rgba(18, 18, 18, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// Initialize model cards hover effect
function initModelCards() {
    const modelCards = document.querySelectorAll('.model-card');
    
    modelCards.forEach(card => {
        // Add touch support for mobile devices
        card.addEventListener('touchstart', function() {
            this.querySelector('.model-card-inner').style.transform = 'rotateY(180deg)';
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.querySelector('.model-card-inner').style.transform = 'rotateY(0deg)';
            }, 1500);
        });
    });
}

// Handle horizontal scroll for model cards and screenshots with mouse wheel
document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.models-slider, .screenshots-slider');
    
    sliders.forEach(slider => {
        slider.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                this.scrollLeft += e.deltaY;
            }
        });
    });
});
