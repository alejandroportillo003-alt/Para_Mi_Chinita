// --- 1. CONFIGURACIÓN DE CONFETI Y CORAZONES ---

window.triggerSurpriseConfetti = function(originElement) {
    if (typeof confetti === 'function') {
        try {
            let confettiOptions = {
                particleCount: 75,
                spread: 80,
                origin: { y: 0.6 },
                colors: ['#38bdf8', '#818cf8', '#a855f7', '#c084fc', '#22d3ee']
            };

            if (originElement && originElement instanceof HTMLElement && typeof originElement.getBoundingClientRect === 'function') {
                const rect = originElement.getBoundingClientRect();
                confettiOptions.origin = {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: (rect.top + rect.height / 2) / window.innerHeight
                };
            }

            confetti(confettiOptions);
        } catch(err) {
            console.warn('Confetti handled safely:', err);
        }
    }
};

// Genera una explosión de CORAZONES AZULES Y MORADOS
function triggerHeartBurst(clickEvent) {
    const clientX = clickEvent ? clickEvent.clientX : window.innerWidth / 2;
    const clientY = clickEvent ? clickEvent.clientY : window.innerHeight / 2;

    // Símbolos de corazones azules y morados
    const heartIcons = ['💙', '💜', '💙', '💜', '💙', '💜'];
    const heartCount = 20; // Cantidad de corazones por clic

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        
        // Elegir aleatoriamente un corazón azul o morado
        heart.innerText = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        
        // Posicionar en el punto exacto del clic
        heart.style.left = `${clientX}px`;
        heart.style.top = `${clientY}px`;
        
        // Direcciones y ángulos aleatorios para el estallido
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 120; // Qué tan lejos vuelan
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        const rot = (Math.random() - 0.5) * 60; // Rotación
        
        // Asignar variables CSS
        heart.style.setProperty('--tx', `${tx}px`);
        heart.style.setProperty('--ty', `${ty}px`);
        heart.style.setProperty('--rot', `${rot}deg`);
        
        // Tamaño variado
        const size = 18 + Math.random() * 22;
        heart.style.fontSize = `${size}px`;

        document.body.appendChild(heart);

        // Limpiar el elemento después de la animación
        setTimeout(() => {
            heart.remove();
        }, 1800);
    }
}


// --- 2. MODAL DE FOTOS Y ZOOM ---

window.openModal = function(imgSrc, caption) {
    const modal = document.getElementById('photoModal');
    const modalImg = document.getElementById('modalImage');
    const modalCap = document.getElementById('modalCaption');
    
    if (modal && modalImg && modalCap) {
        modalImg.src = imgSrc;
        modalCap.innerText = caption || 'Momento especial con mi chinita 💘';
        modal.classList.remove('hidden');
    }
};

window.closePhotoModal = function() {
    const modal = document.getElementById('photoModal');
    if (modal) {
        modal.classList.add('hidden');
    }
};


// --- 3. CARTA Y OTROS MODALES ---

window.openLetterModal = function() {
    const modal = document.getElementById('letterModal');
    if (modal) {
        modal.classList.remove('hidden');
        window.triggerSurpriseConfetti();
    }
};

window.closeLetterModal = function() {
    const modal = document.getElementById('letterModal');
    if (modal) {
        modal.classList.add('hidden');
    }
};

window.toggleFlip = function(cardElement) {
    if (cardElement) {
        cardElement.classList.toggle('is-flipped');
    }
};

window.triggerDisappointedSnoopy = function() {
    const rejectionView = document.getElementById('rejectionView');
    const letterContent = document.getElementById('letterTextContent');
    const discardBtn = document.getElementById('discardBtn');
    const saveBtn = document.getElementById('saveBtn');

    if (rejectionView) {
        rejectionView.classList.remove('hidden');
        rejectionView.classList.add('flex');
    }
    if (letterContent) letterContent.classList.add('hidden');
    if (discardBtn) discardBtn.classList.add('hidden');
    if (saveBtn) saveBtn.classList.add('hidden');
};

window.resetDecision = function() {
    const rejectionView = document.getElementById('rejectionView');
    const letterContent = document.getElementById('letterTextContent');
    const discardBtn = document.getElementById('discardBtn');
    const saveBtn = document.getElementById('saveBtn');

    if (rejectionView) {
        rejectionView.classList.add('hidden');
        rejectionView.classList.remove('flex');
    }
    if (letterContent) letterContent.classList.remove('hidden');
    if (discardBtn) discardBtn.classList.remove('hidden');
    if (saveBtn) saveBtn.classList.remove('hidden');
};

window.saveLetterInHeart = function() {
    window.resetDecision();
    window.closeLetterModal();
    window.triggerSurpriseConfetti();
};


// --- 4. PARTÍCULAS, MÚSICA Y CONTADOR ---

function createParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;
    container.innerHTML = '';
    
    const particleSymbols = ['🦆', '💘', '💙', '✨', '🐾', '⭐', '🎈'];
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.innerText = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
        particle.style.left = `${Math.random() * 95}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.fontSize = `${Math.random() * 16 + 18}px`;
        container.appendChild(particle);
    }
}

let audioCtx = null;
let melodyInterval = null;
let isPlaying = true;

window.toggleAudio = function() {
    isPlaying = !isPlaying;
    const musicText = document.getElementById('musicText');
    const musicIcon = document.getElementById('musicIcon');
    const pingDot = document.getElementById('pingDot');

    if (isPlaying) {
        if (musicText) musicText.innerText = 'Música: On';
        if (musicIcon) musicIcon.className = 'fas fa-music text-sky-300 text-lg';
        if (pingDot) pingDot.classList.remove('hidden');
        startSoftMelody();
    } else {
        if (musicText) musicText.innerText = 'Música: Off';
        if (musicIcon) musicIcon.className = 'fas fa-volume-mute text-slate-400 text-lg';
        if (pingDot) pingDot.classList.add('hidden');
        stopSoftMelody();
    }
};

function startSoftMelody() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23, 392.00];
    let step = 0;

    melodyInterval = setInterval(() => {
        if (!isPlaying) return;
        playNote(notes[step % notes.length], 0.6);
        step++;
    }, 550);
}

function playNote(freq, duration) {
    if (!audioCtx) return;
    try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch(e) {
        console.log(e);
    }
}

function stopSoftMelody() {
    if (melodyInterval) {
        clearInterval(melodyInterval);
    }
}

const startDate = new Date('2026-02-20T00:00:00');

function updateCounter() {
    const now = new Date();
    const diffMs = Math.max(0, now - startDate);

    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMs / 1000) % 60);

    const elDays = document.getElementById('counterDays');
    const elHours = document.getElementById('counterHours');
    const elMinutes = document.getElementById('counterMinutes');
    const elSeconds = document.getElementById('counterSeconds');

    if (elDays) elDays.innerText = days;
    if (elHours) elHours.innerText = hours;
    if (elMinutes) elMinutes.innerText = minutes;
    if (elSeconds) elSeconds.innerText = seconds;
}

// --- 5. AUTOMATIZACIÓN DE CLICS ---
window.addEventListener('DOMContentLoaded', () => {
    createParticles();
    setInterval(updateCounter, 1000);
    updateCounter();
    
    setTimeout(() => {
        window.triggerSurpriseConfetti();
    }, 800);

    // Asignar el evento a las fotos del collage
    const photoSlots = document.querySelectorAll('.photo-slot');
    photoSlots.forEach(slot => {
        slot.addEventListener('click', (e) => {
            const img = slot.querySelector('img');
            if (img) {
                window.openModal(img.src, img.alt || 'Momento especial con mi chinita 💘');
                
                // Dispara el estallido de corazones azules y morados
                triggerHeartBurst(e);
            }
        });
    });
});