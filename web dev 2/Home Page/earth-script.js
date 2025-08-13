// Layer interaction functionality
function showLayerInfo(layerId) {
    // Hide all layer info sections
    const allLayerInfo = document.querySelectorAll('.layer-info');
    allLayerInfo.forEach(info => {
        info.classList.remove('active');
    });
    
    // Show selected layer info
    const selectedInfo = document.getElementById(layerId + '-info');
    if (selectedInfo) {
        selectedInfo.classList.add('active');
        selectedInfo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Announce to screen readers
        const layerTitle = selectedInfo.querySelector('h4').textContent;
        announceToScreenReader(`Showing information about ${layerTitle}`);
    }
}

// Handle keyboard interaction for layers
function handleKeyPress(event, layerId) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        showLayerInfo(layerId);
    }
}

// Quiz functionality
let quizAnswered = false;

function selectAnswer(element, isCorrect) {
    if (quizAnswered) return;
    
    quizAnswered = true;
    const allOptions = document.querySelectorAll('.quiz-option');
    const feedback = document.getElementById('quiz-feedback');
    const feedbackText = document.getElementById('feedback-text');
    
    // Update aria-checked for all options
    allOptions.forEach(option => {
        option.setAttribute('aria-checked', 'false');
        option.tabIndex = -1;
    });
    
    // Set selected option
    element.setAttribute('aria-checked', 'true');
    
    if (isCorrect) {
        element.classList.add('correct');
        feedback.className = 'quiz-feedback show correct';
        feedbackText.textContent = 'Correct! Earth\'s surface is approximately 71% water, which is why it\'s often called the "Blue Planet."';
        announceToScreenReader('Correct answer! Earth\'s surface is 71% water.');
    } else {
        element.classList.add('incorrect');
        // Highlight correct answer
        allOptions.forEach(option => {
            if (option.onclick.toString().includes('true')) {
                option.classList.add('correct');
            }
        });
        feedback.className = 'quiz-feedback show incorrect';
        feedbackText.textContent = 'Not quite right. The correct answer is 71%. Earth\'s vast oceans cover most of our planet\'s surface!';
        announceToScreenReader('Incorrect. The correct answer is 71%.');
    }
}

// Handle keyboard interaction for quiz
function handleQuizKeyPress(event, element, isCorrect) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectAnswer(element, isCorrect);
    }
}

// Accessibility functionality
function toggleHighContrast() {
    document.body.classList.toggle('high-contrast');
    const isHighContrast = document.body.classList.contains('high-contrast');
    announceToScreenReader(isHighContrast ? 'High contrast mode enabled' : 'High contrast mode disabled');
}

function toggleLargeText() {
    document.body.classList.toggle('large-text');
    const isLargeText = document.body.classList.contains('large-text');
    announceToScreenReader(isLargeText ? 'Large text mode enabled' : 'Large text mode disabled');
}

function resetAccessibility() {
    document.body.classList.remove('high-contrast', 'large-text');
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
    
    setTimeout(() => {
        if (document.body.contains(announcement)) {
            document.body.removeChild(announcement);
        }
    }, 1000);
}

// Enhanced keyboard navigation
document.addEventListener('keydown', function(e) {
    // Alt + H to go to main heading
    if ((e.key === 'h' || e.key === 'H') && e.altKey) {
        e.preventDefault();
        const mainHeading = document.querySelector('h1');
        if (mainHeading) {
            mainHeading.focus();
            mainHeading.scrollIntoView({ behavior: 'smooth' });
        }
    }
    
    // Alt + M to go to main content
    if ((e.key === 'm' || e.key === 'M') && e.altKey) {
        e.preventDefault();
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.focus();
            mainContent.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Initialize event listeners when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for layer interactions
    const layers = document.querySelectorAll('.layer');
    layers.forEach(layer => {
        const layerId = layer.classList[1]; // Get the layer type (crust, mantle, etc.)
        
        layer.addEventListener('click', () => showLayerInfo(layerId));
        layer.addEventListener('keypress', (e) => handleKeyPress(e, layerId));
    });

    // Add event listeners for quiz options
    const quizOptions = document.querySelectorAll('.quiz-option');
    quizOptions.forEach((option, index) => {
        // The correct answer is option B (index 1)
        const isCorrect = index === 1;
        
        option.addEventListener('click', () => selectAnswer(option, isCorrect));
        option.addEventListener('keypress', (e) => handleQuizKeyPress(e, option, isCorrect));
    });

    // Add event listeners for accessibility controls
    const highContrastBtn = document.querySelector('.accessibility-controls button:nth-child(2)');
    const largeTextBtn = document.querySelector('.accessibility-controls button:nth-child(3)');
    const resetBtn = document.querySelector('.accessibility-controls button:nth-child(4)');

    if (highContrastBtn) highContrastBtn.addEventListener('click', toggleHighContrast);
    if (largeTextBtn) largeTextBtn.addEventListener('click', toggleLargeText);
    if (resetBtn) resetBtn.addEventListener('click', resetAccessibility);

    announceToScreenReader('Earth page loaded. Learn about our home planet.');
});