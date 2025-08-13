// Initialize event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Moon system interaction
    const moonButtons = document.querySelectorAll('.moon-btn');
    const moonInfos = document.querySelectorAll('.moon-info');

    moonButtons.forEach(button => {
        button.addEventListener('click', () => showMoonInfo(button));
        button.addEventListener('keydown', (e) => handleMoonKeydown(e, button));
    });

    // Storm animation controls
    const pauseBtn = document.getElementById('pause-storm');
    const speedBtn = document.getElementById('speed-storm');
    const stormViz = document.querySelector('.storm-visualization');
        
    let isPaused = false;
    let isFast = false;

    if (pauseBtn) {
        pauseBtn.addEventListener('click', () => {
            isPaused = !isPaused;
            if (isPaused) {
                stormViz.classList.add('paused');
                pauseBtn.textContent = 'Resume Animation';
                announceToScreenReader('Storm animation paused');
            } else {
                stormViz.classList.remove('paused');
                pauseBtn.textContent = 'Pause Animation';
                announceToScreenReader('Storm animation resumed');
            }
        });
    }

    if (speedBtn) {
        speedBtn.addEventListener('click', () => {
            isFast = !isFast;
            if (isFast) {
                stormViz.classList.add('fast');
                speedBtn.textContent = 'Normal Speed';
                announceToScreenReader('Storm animation speed increased');
            } else {
                stormViz.classList.remove('fast');
                speedBtn.textContent = 'Speed Up';
                announceToScreenReader('Storm animation speed returned to normal');
            }
        });
    }

    // Accessibility controls
    const accessibilityBtns = document.querySelectorAll('.accessibility-controls button');
    if (accessibilityBtns.length >= 3) {
        accessibilityBtns[0].addEventListener('click', toggleHighContrast);
        accessibilityBtns[1].addEventListener('click', toggleLargeText);
        accessibilityBtns[2].addEventListener('click', resetAccessibility);
    }
});

// Moon system functions
function showMoonInfo(clickedButton) {
    // Remove active class from all buttons and info panels
    const moonButtons = document.querySelectorAll('.moon-btn');
    const moonInfos = document.querySelectorAll('.moon-info');
    
    moonButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    
    moonInfos.forEach(info => {
        info.classList.remove('active');
    });
    
    // Add active class to clicked button
    clickedButton.classList.add('active');
    clickedButton.setAttribute('aria-selected', 'true');
    
    // Show corresponding moon info
    const targetId = clickedButton.getAttribute('aria-controls');
    const targetInfo = document.getElementById(targetId);
    if (targetInfo) {
        targetInfo.classList.add('active');
        // Announce the change to screen readers
        const moonName = clickedButton.textContent;
        announceToScreenReader(`Now showing information about ${moonName}`);
    }
}

// Handle keyboard navigation for moon tabs
function handleMoonKeydown(event, button) {
    const moonButtons = Array.from(document.querySelectorAll('.moon-btn'));
    const currentIndex = moonButtons.indexOf(button);
    let targetIndex = currentIndex;
    
    switch(event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
            event.preventDefault();
            targetIndex = currentIndex > 0 ? currentIndex - 1 : moonButtons.length - 1;
            break;
        case 'ArrowRight':
        case 'ArrowDown':
            event.preventDefault();
            targetIndex = currentIndex < moonButtons.length - 1 ? currentIndex + 1 : 0;
            break;
        case 'Home':
            event.preventDefault();
            targetIndex = 0;
            break;
        case 'End':
            event.preventDefault();
            targetIndex = moonButtons.length - 1;
            break;
        case 'Enter':
        case ' ':
            event.preventDefault();
            showMoonInfo(button);
            return;
        default:
            return;
    }
    
    // Focus and activate the target button
    moonButtons[targetIndex].focus();
    showMoonInfo(moonButtons[targetIndex]);
}

// Accessibility functions
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const isEnabled = document.body.classList.contains('high-contrast');
    
    // Store preference
    localStorage.setItem('high-contrast', isEnabled);
    
    announceToScreenReader(
        isEnabled ? 'High contrast mode enabled' : 'High contrast mode disabled'
    );
}

function toggleLargeText() {
    document.body.classList.toggle('large-text');
    const isEnabled = document.body.classList.contains('large-text');
    
    // Store preference
    localStorage.setItem('large-text', isEnabled);
    
    announceToScreenReader(
        isEnabled ? 'Large text mode enabled' : 'Large text mode disabled'
    );
}

function resetAccessibility() {
    document.body.classList.remove('high-contrast', 'large-text');
    
    // Clear stored preferences
    localStorage.removeItem('high-contrast');
    localStorage.removeItem('large-text');
    
    announceToScreenReader('All accessibility options reset to default');
}

// Load saved accessibility preferences
function loadAccessibilityPreferences() {
    if (localStorage.getItem('high-contrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    
    if (localStorage.getItem('large-text') === 'true') {
        document.body.classList.add('large-text');
    }
}

// Utility function to announce changes to screen readers
function announceToScreenReader(message) {
    // Create a temporary element to announce changes
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove the announcement after a short delay
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Add smooth scrolling for skip links
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('skip-link')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            targetElement.focus();
        }
    }
});

// Load accessibility preferences when page loads
document.addEventListener('DOMContentLoaded', loadAccessibilityPreferences);

// Add enhanced keyboard support for storm controls
document.addEventListener('keydown', function(e) {
    // Allow space bar to activate buttons (in addition to Enter)
    if (e.key === ' ' && (e.target.classList.contains('storm-btn') || e.target.classList.contains('moon-btn'))) {
        e.preventDefault();
        e.target.click();
    }
});

// Add visual feedback for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects for touch devices
    const interactiveElements = document.querySelectorAll('.moon-btn, .storm-btn, .accessibility-controls button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
    });
});

// Enhanced error handling and logging
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    announceToScreenReader('An error occurred. Some interactive features may not work properly.');
});

// Provide fallback for older browsers
if (!document.querySelector || !document.addEventListener) {
    console.warn('This browser may not support all interactive features.');
}