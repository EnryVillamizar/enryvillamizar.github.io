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
    const padding = 20;
    const maxX = window.innerWidth - noBtn.offsetWidth - padding;
    const maxY = window.innerHeight - noBtn.offsetHeight - padding;

    const randomX = Math.max(padding, Math.floor(Math.random() * maxX));
    const randomY = Math.max(padding, Math.floor(Math.random() * maxY));

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
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
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Basic CSS hearts falling as confetti substitute since I can't easily import canvas-confetti
    for (let i = 0; i < 50; i++) {
        setTimeout(createHeart, i * 100);
    }
}

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.style.position = 'fixed';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '-5vh';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    heart.style.zIndex = '999';
    heart.style.userSelect = 'none';
    heart.style.pointerEvents = 'none';

    const fallDuration = Math.random() * 3 + 2;
    heart.style.transition = `transform ${fallDuration}s linear, opacity ${fallDuration}s linear`;

    document.body.appendChild(heart);

    // Animate falling
    requestAnimationFrame(() => {
        heart.style.transform = `translateY(110vh) translateX(${Math.random() * 20 - 10}vw) rotate(${Math.random() * 360}deg)`;
        heart.style.opacity = '0';
    });

    setTimeout(() => {
        heart.remove();
    }, fallDuration * 1000);
}
