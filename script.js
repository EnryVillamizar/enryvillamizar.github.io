// Main script
document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfolio loaded.");

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    // Select elements to animate
    document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
});
