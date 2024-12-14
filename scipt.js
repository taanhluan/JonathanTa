document.addEventListener('DOMContentLoaded', () => {
    // Log a message confirming page load
    console.log('Portfolio page loaded successfully.');

    // Example functionality: Check if a specific element exists and interact with it
    const contactSection = document.querySelector('.profile-section h2');
    if (contactSection) {
        console.log('Contact section is present.');
    } else {
        console.log('Contact section not found.');
    }

    // Example of adding an event listener to an element
    const contactLink = document.querySelector('a[href^="mailto:"]');
    if (contactLink) {
        contactLink.addEventListener('click', () => {
            console.log('Email link clicked.');
        });
    }

    // Future placeholder: Add functionality to dynamically load data or enhance interactivity
    // For example, fetching user data or handling form submissions
});
