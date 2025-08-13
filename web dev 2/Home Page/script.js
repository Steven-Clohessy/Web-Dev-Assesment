// Accessibility functionality
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    
    // Store preference
    const isHighContrast = document.body.classList.contains('high-contrast');
    localStorage.setItem('highContrast', isHighContrast);
    
    // Announce change to screen readers
    announceToScreenReader(isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled');
}

function toggleLargeText() {
    document.body.classList.toggle('large-text');
    
    // Store preference
    const isLargeText = document.body.classList.contains('large-text');
    localStorage.setItem('largeText', isLargeText);
    
    // Announce change to screen readers
    announceToScreenReader(isLargeText ? 'Large text mode enabled' : 'Large text mode disabled');
}

function resetAccessibility() {
    document.body.classList.remove('high-contrast', 'large-text');
    localStorage.removeItem('highContrast');
    localStorage.removeItem('largeText');
    announceToScreenReader('Accessibility settings reset to default');
}

// Function to announce changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove the announcement after a short delay
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, 1000);
}

// Load saved accessibility preferences
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('highContrast') === 'true') {
        document.body.classList.add('high-contrast');
    }
    if (localStorage.getItem('largeText') === 'true') {
        document.body.classList.add('large-text');
    }
});

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press Alt + H to go to main heading
    if ((e.key === 'h' || e.key === 'H') && e.altKey) {
        e.preventDefault();
        const mainHeading = document.querySelector('h1');
        if (mainHeading) {
            mainHeading.focus();
            mainHeading.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Press Alt + M to go to main content
    if ((e.key === 'm' || e.key === 'M') && e.altKey) {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Smooth scrolling for all internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Set focus to target for screen readers
            target.focus();
        }
    });
});

// Add loading animation and error handling for future media
function handleMediaError(media) {
    console.log('Media failed to load:', media.src);
    // Could implement fallback content here
}

// Announce page changes for screen readers
function announcePageChange(pageName) {
    announceToScreenReader(`Navigated to ${pageName} page`);
}