// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations and interactions
    initHearts();
    initBalloons();
    initGiftButton();
    initConfetti();
    initMemoryCards();
});

// Create floating hearts animation
function initHearts() {
    const heartsContainer = document.querySelector('.hearts');
    const heartSymbols = ['❤️', '💕', '💖', '💘', '💗', '💓', '💝'];

    // Create initial hearts
    for (let i = 0; i < 20; i++) {
        createHeart();
    }

    // Create hearts periodically
    setInterval(createHeart, 1000);

    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];

        // Random position from bottom
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight + Math.random() * 100;

        // Set initial position
        heart.style.left = startX + 'px';
        heart.style.bottom = '0px';

        // Random animation duration
        const duration = 5 + Math.random() * 10;
        heart.style.animation = `heart-float ${duration}s ease-in infinite`;

        // Random size
        const size = 0.5 + Math.random() * 1.5;
        heart.style.fontSize = `${size}rem`;

        // Random start time
        heart.style.animationDelay = `-${Math.random() * duration}s`;

        // Append to container
        heartsContainer.appendChild(heart);

        // Remove after animation
        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
}

// Initialize balloons
function initBalloons() {
    const balloons = document.querySelectorAll('.balloon');

    balloons.forEach(balloon => {
        balloon.addEventListener('click', () => {
            popBalloon(balloon);
        });
    });
}

// Track balloon pops
let balloonPopsCount = 0;

// Alternate between two pop sounds
let lastPopSoundIndex = 0;

function popBalloon(balloon) {
    // Already popped
    if (balloon.classList.contains('popped')) return;

    // Alternate between pop sounds
    const popSounds = [
        'assets/audio/pop1.mp3',
        'assets/audio/pop2.mp3'
    ];

    const popSound = new Audio(popSounds[lastPopSoundIndex]);
    lastPopSoundIndex = (lastPopSoundIndex + 1) % 2; // Toggle between 0 and 1
    popSound.play();

    // Mark as popped
    balloon.classList.add('popped');

    // Create confetti at balloon position
    createConfettiFromElement(balloon, 30);

    // Get balloon color for confetti
    const balloonColor = balloon.dataset.color || '#ff4081';

    // Add points or special message (optional)
    updateBalloonPops();
}

function updateBalloonPops() {
    balloonPopsCount++;

    // When all balloons are popped, show special animation
    const totalBalloons = document.querySelectorAll('.balloon').length;
    if (balloonPopsCount === totalBalloons) {
        // All balloons popped - special celebration
        showCelebration();
    }
}

// Initialize gift button
function initGiftButton() {
    const giftButton = document.querySelector('.gift-button');
    const giftPage = document.querySelector('.gift-page');
    const giftBox = document.querySelector('.gift-box');
    const giftMessage = document.querySelector('.gift-message');
    const returnButton = document.querySelector('.return-button');

    // Open gift page
    giftButton && giftButton.addEventListener('click', () => {
        // Show gift page with animation
        giftPage.classList.add('active');

        // Create confetti for button press
        createConfettiFromElement(giftButton, 50);

        // Play sound
        const openSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAEQAACsQAMzMzMzNVVVVVVXh4eHh4mpqampqcvLy8vLze3t7e3t7/////');
        openSound.play();
    });

    // Gift box click animation
    giftBox && giftBox.addEventListener('click', () => {
        // Play box open sound
        const boxOpenSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAAEAAACPUAMzMzMzNGRkZGRllZWVlZbGxsbGyAgICAgJOTk5OTpqampsLCwsLC1dXV1dXo6Ojo');
        boxOpenSound.play();

        // Add class to animate
        giftBox.classList.add('opened');

        // Show message after box animation
        setTimeout(() => {
            giftMessage.classList.add('visible');
            createConfettiFromElement(giftBox, 100);
        }, 1000);
    });

    // Return button
    returnButton && returnButton.addEventListener('click', () => {
        // Hide gift page
        giftPage.classList.remove('active');

        // Reset gift box for next opening
        setTimeout(() => {
            giftBox.classList.remove('opened');
            giftMessage.classList.remove('visible');
        }, 500);
    });
}

// Initialize confetti generator
function initConfetti() {
    // Pre-create some confetti elements for performance
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.overflow = 'hidden';
    confettiContainer.style.zIndex = '100';
    document.body.appendChild(confettiContainer);
}

// Create confetti at specific element
function createConfettiFromElement(element, amount = 50) {
    if (!element) return;

    // Get element position
    const rect = element.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Create confetti
    createConfetti(x, y, amount);
}

// Create confetti effect
function createConfetti(x, y, amount = 50) {
    const confettiContainer = document.querySelector('.confetti-container') || document.body;
    const colors = ['#ff4081', '#9c27b0', '#3f51b5', '#03a9f4', '#4caf50', '#ffeb3b', '#ff9800', '#f44336'];

    for (let i = 0; i < amount; i++) {
        const confetti = document.createElement('div');
        const size = Math.random() * 10 + 5;

        // Styles
        confetti.style.position = 'absolute';
        confetti.style.left = `${x}px`;
        confetti.style.top = `${y}px`;
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.pointerEvents = 'none';

        // Add to container
        confettiContainer.appendChild(confetti);

        // Random animation
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 10 + 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        let rot = 0;
        const rotSpeed = Math.random() * 360;
        const gravity = 0.5;
        let opacity = 1;

        // Animate
        let posX = 0;
        let posY = 0;
        let velocityY = vy;

        const animate = () => {
            velocityY += gravity;
            posX += vx;
            posY += velocityY;
            rot += rotSpeed;
            opacity -= 0.01;

            if (opacity <= 0) {
                confetti.remove();
                return;
            }

            confetti.style.transform = `translate(${posX}px, ${posY}px) rotate(${rot}deg)`;
            confetti.style.opacity = opacity;

            requestAnimationFrame(animate);
        };

        // Start animation with small delay
        setTimeout(animate, Math.random() * 100);
    }
}

// Show celebration animation
function showCelebration() {
    // Add extra hearts and confetti
    createConfetti(window.innerWidth / 2, window.innerHeight / 2, 200);

    // Play celebration sound
    const celebrationSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAADQAACjEAEhISEhIjIyMjIzMzMzMzRERERERVVVVVVWZmZmZmd3d3d3eIiIiIiJmZmZmZqqqqqqqrvLy8vLzNzc3Nzd7e3t7e7+/v7+///');
    celebrationSound.volume = 0.7;
    celebrationSound.play();

    // Maybe show a special message
    const messageElement = document.createElement('div');
    messageElement.innerHTML = '<h2>Congratulations!</h2><p>You\'ve popped all the balloons! 🎉</p>';
    messageElement.style.position = 'fixed';
    messageElement.style.top = '50%';
    messageElement.style.left = '50%';
    messageElement.style.transform = 'translate(-50%, -50%)';
    messageElement.style.background = 'rgba(255, 255, 255, 0.9)';
    messageElement.style.padding = '20px 40px';
    messageElement.style.borderRadius = '10px';
    messageElement.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    messageElement.style.zIndex = '1000';
    messageElement.style.opacity = '0';
    messageElement.style.transition = 'opacity 0.5s';

    document.body.appendChild(messageElement);

    // Animate in
    setTimeout(() => {
        messageElement.style.opacity = '1';
    }, 100);

    // Auto remove after a few seconds
    setTimeout(() => {
        messageElement.style.opacity = '0';
        setTimeout(() => messageElement.remove(), 500);
    }, 5000);
}

// Initialize memory card effects
function initMemoryCards() {
    const cards = document.querySelectorAll('.memory-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            // Play subtle sound
            const hoverSound = new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA/+M4wAAAAAAAAAAAAEluZm8AAAAPAAAABAAAAdMAFxcXFxdDQ0NDQ29vb29vm5ubm5vHx8fHx/Pz8/Pz');
            hoverSound.volume = 0.2;
            hoverSound.play();
        });
    });
}