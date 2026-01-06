document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const heroImg = document.getElementById('hero-img');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Intersection Observer for reveal animations & skill bars
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skill-progress')) {
                    const width = entry.target.getAttribute('style').match(/width:\s*(\d+)%/)[1];
                    entry.target.style.width = width + '%';
                } else {
                    entry.target.classList.add('revealed');
                }
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to reveal
    const reveals = document.querySelectorAll('.project-card, .service-card, .section-header, .quote-container, .hero-content, .contact-card');
    reveals.forEach(el => {
        el.classList.add('reveal-init');
        observer.observe(el);
    });

    // Special handling for skill bars to start at 0
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        // We store the target width and set actual width to 0 initially
        const targetWidth = bar.style.width;
        bar.style.width = '0';
        bar.dataset.targetWidth = targetWidth;

        // Custom observer for skills to animate width
        const skillObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                bar.style.width = bar.dataset.targetWidth;
                skillObserver.unobserve(bar);
            }
        }, { threshold: 0.5 });
        skillObserver.observe(bar);
    });

    // Simple parallax on hero image
    document.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth / 2 - e.pageX) / 60;
        const y = (window.innerHeight / 2 - e.pageY) / 60;

        if (heroImg) {
            heroImg.style.transform = `translate(${x}px, ${y}px)`;
        }
    });
});

// Add CSS for reveal animations dynamically
const style = document.createElement('style');
style.textContent = `
    .reveal-init {
        opacity: 0;
        transform: translateY(40px);
        transition: opacity 0.8s cubic-bezier(0.23, 1, 0.32, 1), transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .revealed {
        opacity: 1;
        transform: translateY(0);
    }
    .service-card:nth-child(2) { transition-delay: 0.1s; }
    .service-card:nth-child(3) { transition-delay: 0.2s; }
    .service-card:nth-child(4) { transition-delay: 0.3s; }
    
    .project-card:nth-child(even) { transition-delay: 0.15s; }
`;
document.head.appendChild(style);
