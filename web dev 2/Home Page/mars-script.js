// Weather simulator data
const weatherData = {
    summer: {
        icon: '☀️',
        title: 'Martian Summer',
        temperature: '-20°F to 70°F (-29°C to 20°C)',
        conditions: 'Clear skies with occasional dust devils',
        daylight: 'Up to 12 hours of sunlight',
        pressure: 'Slightly higher due to CO₂ sublimation',
        className: ''
    },
    winter: {
        icon: '❄️',
        title: 'Martian Winter',
        temperature: '-195°F to -80°F (-125°C to -62°C)',
        conditions: 'Frozen CO₂ snow at polar regions',
        daylight: 'As little as 4 hours of sunlight',
        pressure: 'Lower as CO₂ freezes at polar caps',
        className: ''
    },
    'dust-storm': {
        icon: '🌪️',
        title: 'Global Dust Storm',
        temperature: 'Extreme temperature variations',
        conditions: 'Planet-wide dust clouds, visibility near zero',
        daylight: 'Sunlight blocked for weeks or months',
        pressure: 'Dramatic pressure changes',
        className: 'storm-animation'
    }
};

// Show weather function
function showWeather(weatherType) {
    const display = document.getElementById('weather-display');
    const buttons = document.querySelectorAll('.weather-btn');
    const data = weatherData[weatherType];
    
    // Update button states
    buttons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
    });
    
    event.target.classList.add('active');
    event.target.setAttribute('aria-pressed', 'true');
    
    // Update display
    display.className = 'weather-display ' + data.className;
    display.innerHTML = `
        <div class="weather-icon">${data.icon}</div>
        <div class="weather-info">
            <h3>${data.title}</h3>
            <p><strong>Temperature:</strong> ${data.temperature}</p>
            <p><strong>Conditions:</strong> ${data.conditions}</p>
            <p><strong>Daylight:</strong> ${data.daylight}</p>
            <p><strong>Atmospheric Pressure:</strong> ${data.pressure}</p>
        </div>
    `;
    
    // Announce change to screen readers
    announceToScreenReader(`Weather changed to ${data.title}`);
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

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Set initial button states
    const buttons = document.querySelectorAll('.weather-btn');
    buttons.forEach((btn, index) => {
        btn.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
    });
    
    announceToScreenReader('Mars page loaded. Explore the Red Planet.');
});

// Smooth scrolling for timeline items on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items for animation
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-content');
    timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
});