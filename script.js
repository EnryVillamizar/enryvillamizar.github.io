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

    // Custom Cursor Logic
    const cursorDot = document.querySelector('[data-cursor-dot]');
    const cursorOutline = document.querySelector('[data-cursor-outline]');

    window.addEventListener('mousemove', function (e) {
        const posX = e.clientX;
        const posY = e.clientY;

        // Dot follows cursor exactly
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline follows with a slight lag (animation)
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Add locking/hover effect for links and buttons
    const interactables = document.querySelectorAll('a, button, .card');

    interactables.forEach(interactive => {
        interactive.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('cursor-hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(2)';
        });

        interactive.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('cursor-hover');
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
});
