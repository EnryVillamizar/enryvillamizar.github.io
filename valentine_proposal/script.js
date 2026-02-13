const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const container = document.getElementById('main-container');

let yesScale = 1;
let noScale = 1;
let noClickCount = 0;

const noMessages = [
    "Are you sure?",
    "Really sure??",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of mind?",
    "Is that your final answer?",
    "You're breaking my heart ;("
];

noBtn.addEventListener('click', () => {
    noScale *= 0.8;
    yesScale += 0.5;
    noClickCount++;

    // Update buttons
    noBtn.style.transform = `scale(${noScale})`;
    yesBtn.style.transform = `scale(${yesScale})`;

    // Change text of no button for extra "motivation"
    if (noClickCount < noMessages.length) {
        noBtn.textContent = noMessages[noClickCount];
    }

    // Move No button to random position
    moveNoButton();
});

function moveNoButton() {
    // Current scale of the button
    const currentScale = noScale;
    const padding = 20;

    // Use current dimensions which may change as button shrinks
    const buttonWidth = noBtn.offsetWidth * currentScale;
    const buttonHeight = noBtn.offsetHeight * currentScale;

    // Keep it within visual viewport
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    // Ensure we don't get negative ranges if screen is very small or button grows too big
    const randomX = Math.max(padding, Math.min(maxX, Math.floor(Math.random() * maxX)));
    const randomY = Math.max(padding, Math.min(maxY, Math.floor(Math.random() * maxY)));

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.margin = '0'; // Kill any container margins
    noBtn.style.zIndex = '1000';
}

yesBtn.addEventListener('click', () => {
    // Elegant transition to success
    container.style.opacity = '0';

    setTimeout(() => {
        container.innerHTML = `
            <div class="success-content">
                <h1 class="title">I Knew You'd Say Yes! ❤️</h1>
                <p class="success-message">You have excellent taste, clearly. 😉</p>
                <p class="success-sub">See you tonight! 🌹✨</p>
                <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExM3ZtZ3RjZXFnbzN5NmJ0MGF4dmR5NmZpY3RqcXh5bmpiaHk4bmR0ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif" alt="Cute Happy Cat" class="success-img">
            </div>
        `;
        container.style.opacity = '1';
        container.style.width = '500px';
        container.style.maxWidth = '95%';

        startConfetti();
    }, 500);
});

function startConfetti() {
    const heartCount = 50;
    for (let i = 0; i < heartCount; i++) {
        setTimeout(createHeart, i * 100);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = '❤️';

    // Randomize appearance
    const size = Math.random() * 20 + 20;
    const left = Math.random() * 100;
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;

    heart.style.fontSize = `${size}px`;
    heart.style.left = `${left}vw`;
    heart.style.animationDuration = `${duration}s`;
    heart.style.animationDelay = `${delay}s`;

    document.body.appendChild(heart);

    // Remove element after animation finishes
    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000);
}
