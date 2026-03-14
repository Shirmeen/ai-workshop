// ===== Background Particles =====
function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = ['#B794F4', '#90CDF4', '#81E6D9', '#FBB6CE'];
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 4 + 2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 20;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.background = color;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;

        container.appendChild(particle);
    }
}

// ===== Navbar Scroll Effect =====
function initNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ===== Card Mouse Glow Effect =====
function initCardGlow() {
    const cards = document.querySelectorAll('.tool-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            const glow = card.querySelector('.tool-card-glow');
            if (glow) {
                glow.style.setProperty('--mouse-x', `${x}%`);
                glow.style.setProperty('--mouse-y', `${y}%`);
            }
        });
    });
}

// ===== Scroll Reveal Animation =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.tool-card, .about-content, .section-header');

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ===== Smooth Scroll for Anchor Links =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== Update Tool Count =====
function updateToolCount() {
    const count = document.querySelectorAll('.tool-card').length;
    const counter = document.getElementById('toolCount');
    if (counter) {
        counter.textContent = count;
    }
}

// ===== Initialize Everything =====
document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    initNavbar();
    initCardGlow();
    initScrollReveal();
    initSmoothScroll();
    updateToolCount();
    initActivityModal();
});

// ===== Modal Logic =====
function initActivityModal() {
    const modal = document.getElementById('activityModal');
    if (!modal) return;

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
    });
}

function openActivityModal(event, templateId) {
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    const modal = document.getElementById('activityModal');
    const modalBody = document.getElementById('modalBody');
    const template = document.getElementById(templateId);

    if (!modal || !modalBody || !template) return;

    // Inject template content
    modalBody.innerHTML = '';
    const content = template.content.cloneNode(true);
    modalBody.appendChild(content);

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeModal() {
    const modal = document.getElementById('activityModal');
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scroll
}

// ===== Copy Logo to Clipboard =====
async function copyLogoToClipboard(event, imageUrl) {
    event.preventDefault();
    event.stopPropagation();

    const btn = event.currentTarget;
    const btnText = btn.querySelector('#copyLogoText');
    const originalText = btnText.textContent;

    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        await navigator.clipboard.write([
            new ClipboardItem({
                [blob.type]: blob
            })
        ]);

        btn.classList.add('copied');
        btnText.textContent = '✓ Copied!';

        setTimeout(() => {
            btn.classList.remove('copied');
            btnText.textContent = originalText;
        }, 2500);
    } catch (err) {
        console.error('Failed to copy image: ', err);
        btnText.textContent = 'Failed linking';
        setTimeout(() => {
            btnText.textContent = originalText;
        }, 2500);
    }
}
