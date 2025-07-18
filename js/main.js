
/**
 * SuperClaude v3 Website - Main JavaScript
 * Core functionality and event handlers
 */

// DOM Content Loaded Handler
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    setupNavigation();
    setupSmoothScrolling();
    setupCopyButtons();
    fetchContributorCount();
    setupAccessibility();
    setupPerformanceOptimizations();
}

/**
 * Navigation functionality
 */
function setupNavigation() {
    const mobileMenuButton = document.querySelector('[onclick="toggleMobileMenu()"]');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuButton && mobileMenu) {
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
    
    // Add active states to navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
}

/**
 * Mobile menu toggle function
 */
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

/**
 * Smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80; // Account for sticky header
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

/**
 * Copy to clipboard functionality
 */
function copyToClipboard(text) {
    // Clean up the text (handle escaped characters)
    const cleanText = text.replace(/\\n/g, '\n').replace(/\\'/g, "'");
    
    if (navigator.clipboard && window.isSecureContext) {
        // Use the modern clipboard API
        navigator.clipboard.writeText(cleanText).then(function() {
            showCopyFeedback('Copied to clipboard!');
        }).catch(function(err) {
            console.error('Failed to copy text: ', err);
            fallbackCopyTextToClipboard(cleanText);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(cleanText);
    }
}

/**
 * Fallback copy method for older browsers
 */
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyFeedback('Copied to clipboard!');
        } else {
            showCopyFeedback('Copy failed. Please copy manually.');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
        showCopyFeedback('Copy failed. Please copy manually.');
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show copy feedback to user
 */
function showCopyFeedback(message) {
    // Create or update feedback element
    let feedback = document.getElementById('copy-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'copy-feedback';
        feedback.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #10b981;
            color: white;
            padding: 12px 24px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            z-index: 1000;
            transform: translateY(-100px);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        `;
        document.body.appendChild(feedback);
    }
    
    feedback.textContent = message;
    feedback.style.transform = 'translateY(0)';
    
    // Hide after 3 seconds
    setTimeout(() => {
        feedback.style.transform = 'translateY(-100px)';
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 3000);
}

/**
 * Setup copy buttons functionality
 */
function setupCopyButtons() {
    const codeBlocks = document.querySelectorAll('.group');
    
    codeBlocks.forEach(block => {
        const copyButton = block.querySelector('[onclick^="copyToClipboard"]');
        if (copyButton) {
            // Add keyboard support
            copyButton.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    copyButton.click();
                }
            });
            
            // Make button focusable
            copyButton.setAttribute('tabindex', '0');
        }
    });
}

/**
 * Fetch contributor count from GitHub API
 */
async function fetchContributorCount() {
    const contributorCountElement = document.getElementById('contributor-count');
    if (!contributorCountElement) return;
    
    try {
        const response = await fetch('https://api.github.com/repos/NomenAK/SuperClaude/contributors?per_page=100');
        if (response.ok) {
            const contributors = await response.json();
            const count = contributors.length;
            contributorCountElement.textContent = `${count}+`;
        } else {
            contributorCountElement.textContent = 'Many';
        }
    } catch (error) {
        console.log('Could not fetch contributor count:', error);
        contributorCountElement.textContent = 'Many';
    }
}

/**
 * Accessibility enhancements
 */
function setupAccessibility() {
    // Add skip link for keyboard navigation
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white p-2 rounded';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #2563eb;
        color: white;
        padding: 8px;
        border-radius: 4px;
        text-decoration: none;
        transition: top 0.3s;
        z-index: 1000;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const mainContent = document.querySelector('section');
    if (mainContent) {
        mainContent.id = 'main-content';
        mainContent.setAttribute('role', 'main');
    }
    
    // Enhance form accessibility
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
            const icon = button.querySelector('i');
            if (icon && icon.className.includes('fa-copy')) {
                button.setAttribute('aria-label', 'Copy to clipboard');
            }
        }
    });
}

/**
 * Performance optimizations
 */
function setupPerformanceOptimizations() {
    // Lazy load images
    if ('IntersectionObserver' in window) {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Debounce scroll events
    let ticking = false;
    function updateScrollEffects() {
        // Add scroll-based effects here
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

/**
 * Utility functions
 */

// Debounce function
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Make functions globally available
window.toggleMobileMenu = toggleMobileMenu;
window.copyToClipboard = copyToClipboard;

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        toggleMobileMenu,
        copyToClipboard,
        debounce,
        throttle
    };
}
