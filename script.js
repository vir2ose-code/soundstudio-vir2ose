document.addEventListener('DOMContentLoaded', () => {
    const visualizer = document.getElementById('visualizer');

    if (visualizer) {
        // Calculate how many bars fit roughly
        // The image shows lots of thin bars, so we pack them tightly
        const numBars = Math.floor(window.innerWidth / 16);

        for (let i = 0; i < numBars; i++) {
            const bar = document.createElement('div');
            bar.className = 'bar';

            // Generate a natural-looking wave using sin function and randomness
            const position = i / numBars;
            const wave1 = Math.sin(position * Math.PI * 2) * 20;
            const wave2 = Math.sin(position * Math.PI * 4) * 10;

            // Randomize height between 20% and 100%
            let baseHeight = Math.random() * 60 + 20;
            baseHeight += wave1 + wave2;

            // Keep bounds
            if (baseHeight > 100) baseHeight = 100;
            if (baseHeight < 10) baseHeight = 10;

            bar.style.height = `${baseHeight}%`;

            // Random animation delay and duration for organic movement
            bar.style.animationDelay = `${Math.random() * -3}s`; // Negative delay means it starts mid-animation
            bar.style.animationDuration = `${1.2 + Math.random()}s`;

            // Randomize the gradient slightly for variety
            const opacityTop = 0;
            const opacityMid = 0.5 + Math.random() * 0.4;
            const opacityBot = 0.8 + Math.random() * 0.2;

            bar.style.background = `linear-gradient(180deg, 
                rgba(82, 103, 222, ${opacityTop}) 0%, 
                rgba(100, 185, 230, ${opacityMid}) 50%, 
                rgba(135, 90, 210, ${opacityBot}) 100%)`;

            visualizer.appendChild(bar);
        }
    }
});

// Parallax effect for orb and hero content
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;

    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.transform = `translate(${x * 12}px, ${y * 8}px)`;
        heroContent.style.transition = 'transform 0.2s ease-out';
    }

    // Move the glowing background orb slightly
    const body = document.body;
    body.style.setProperty('--orb-x', `${-10 - x * 5}%`);
    body.style.setProperty('--orb-y', `${-10 - y * 5}%`);
});
