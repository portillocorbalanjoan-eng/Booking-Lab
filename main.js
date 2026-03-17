document.addEventListener('DOMContentLoaded', () => {
    // Header Scroll Effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // Smooth Scroll for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Qualifier Toggle
    const toggleBtn = document.getElementById('toggle-qualifier');
    const qualifierSection = document.getElementById('qualifier-section');
    if (toggleBtn && qualifierSection) {
        toggleBtn.addEventListener('click', () => {
            const isExpanded = qualifierSection.classList.toggle('expanded');
            toggleBtn.classList.toggle('active');

            const lang = document.documentElement.lang;
            const btnText = toggleBtn.querySelector('.btn-text');
            
            if (lang === 'es') {
                btnText.innerText = isExpanded ? '🚀 Ocultar personalización' : '🚀 Personalizar mi auditoría';
            } else if (lang === 'ca') {
                btnText.innerText = isExpanded ? '🚀 Ocultar personalització' : '🚀 Personalitzar la meva auditoria';
            } else {
                btnText.innerText = isExpanded ? '🚀 Hide customization' : '🚀 Personalize my Audit';
            }
        });
    }

    // Contact Form Handling (Simulation)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Collect form data
            const formData = new FormData(contactForm);
            const data = {};

            // Special handling for multiple checkboxes (for our internal data object)
            formData.forEach((value, key) => {
                if (key === 'pains') {
                    if (!data[key]) data[key] = [];
                    data[key].push(value);
                } else {
                    data[key] = value;
                }
            });

            console.log('Sending to Formspree:', data);

            // Detect language
            const lang = document.documentElement.lang;

            // Define translations
            const t = {
                es: {
                    sending: 'Enviando...',
                    errorBtn: 'Error. Intenta de nuevo',
                    errorAlert: 'Hubo un problema al enviar el formulario. Por favor, revisa tu conexión.',
                    companyFallback: 'tu Agencia',
                    successTitle: '¡Solicitud Recibida!',
                    successMsg: (company) => `Gracias. Analizaremos tu caso y te contactaremos en 24h con una propuesta de Micro-Auditoría específica para <strong>${company}</strong>.`,
                    backBtn: 'Volver al inicio'
                },
                ca: {
                    sending: 'Enviant...',
                    errorBtn: 'Error. Torna-ho a intentar',
                    errorAlert: 'Hi ha hagut un problema en enviar el formulari. Si us plau, revisa la teva connexió.',
                    companyFallback: 'la teva Agència',
                    successTitle: 'Sol·licitud Rebuda!',
                    successMsg: (company) => `Gràcies. Analitzarem el teu cas i et contactarem en 24h amb una proposta de Micro-Auditoria específica per a <strong>${company}</strong>.`,
                    backBtn: 'Tornar a l\'inici'
                },
                en: {
                    sending: 'Sending...',
                    errorBtn: 'Error. Try again',
                    errorAlert: 'There was an error submitting the form. Please check your connection.',
                    companyFallback: 'your Agency',
                    successTitle: 'Request Received!',
                    successMsg: (company) => `Thank you. We will analyze your case and contact you within 24h with a specific Micro-Audit proposal for <strong>${company}</strong>.`,
                    backBtn: 'Back to home'
                }
            };
            
            // Get translations for current language, fallback to English
            const tr = t[lang] || t['en'];

            // Show Success Message
            const submitBtn = contactForm.querySelector('button');
            const originalButtonText = submitBtn.innerText;
            submitBtn.innerText = tr.sending;
            submitBtn.disabled = true;

            // FORMSPREE: Reemplaza esta URL con la que te dé Formspree
            const FORMSPREE_URL = 'https://formspree.io/f/mnjgojpr';

            fetch(FORMSPREE_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(() => {
                const companyName = data.company || tr.companyFallback;
                
                contactForm.innerHTML = `
                    <div style="grid-column: span 2; text-align: center; padding: 3rem 2rem;">
                        <div style="font-size: 4rem; margin-bottom: 1.5rem;">🚀</div>
                        <h3 style="font-size: 2rem; margin-bottom: 1rem;">${tr.successTitle}</h3>
                        <p style="font-size: 1.2rem; color: var(--text-muted); line-height: 1.6; max-width: 500px; margin: 0 auto;">${tr.successMsg(companyName)}</p>
                        <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 2rem;">${tr.backBtn}</button>
                    </div>
                `;
            })
            .catch((error) => {
                console.error('Submission error:', error);
                submitBtn.innerText = tr.errorBtn;
                submitBtn.disabled = false;
                alert(tr.errorAlert);
            });
        });
    }

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Apply animation classes
    document.querySelectorAll('.problem-card, .service-card, .result-item, .about-content, .hero-content').forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Legal & Privacy Modals Logic
    const legalModal = document.getElementById('legal-modal');
    const btnCloseModal = document.querySelector('.modal-close');
    const linkAviso = document.getElementById('link-aviso');
    const linkPrivacidad = document.getElementById('link-privacidad');
    const bodyAviso = document.getElementById('modal-body-aviso');
    const bodyPrivacidad = document.getElementById('modal-body-privacidad');

    function openModal(type) {
        if (!legalModal) return;
        legalModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling

        if (type === 'aviso') {
            bodyAviso.style.display = 'block';
            bodyPrivacidad.style.display = 'none';
        } else {
            bodyAviso.style.display = 'none';
            bodyPrivacidad.style.display = 'block';
        }
    }

    function closeModal() {
        if (!legalModal) return;
        legalModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (linkAviso) linkAviso.addEventListener('click', (e) => { e.preventDefault(); openModal('aviso'); });
    if (linkPrivacidad) linkPrivacidad.addEventListener('click', (e) => { e.preventDefault(); openModal('privacidad'); });
    if (btnCloseModal) btnCloseModal.addEventListener('click', closeModal);

    // Close on outside click or ESC key
    if (legalModal) {
        legalModal.addEventListener('click', (e) => {
            if (e.target === legalModal) closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && legalModal.classList.contains('active')) closeModal();
        });
    }

});

// Add extra styles for animations dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in-up {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;
    }
    
    .fade-in-up.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-links li:nth-child(1) { transition-delay: 0.1s; }
    .nav-links li:nth-child(2) { transition-delay: 0.2s; }
    .nav-links li:nth-child(3) { transition-delay: 0.3s; }
    .nav-links li:nth-child(4) { transition-delay: 0.4s; }
`;
document.head.appendChild(style);
