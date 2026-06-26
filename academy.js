document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // Smooth scroll for "Watch Academy Experience" link
    // ==========================================
    const scrollLinks = document.querySelectorAll('.ac-scroll-link');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ==========================================
    // Scroll-Triggered Reveal Animations
    // ==========================================
    const revealElements = document.querySelectorAll('.academy-page [data-reveal]');
    const revealDelays = [0, 120, 240, 400, 560, 720, 880, 1040, 1200, 1360, 1520, 1680];

    revealElements.forEach((el, index) => {
        if (!el) return;
        const delay = revealDelays[index] || 0;
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'none';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.style.transition = `opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`;
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(el);
    });

    // ==========================================
    // Academy Video — Lazy Load & Autoplay
    // ==========================================
    const academyVideo = document.querySelector('.ac-video-element');

    if (academyVideo) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    academyVideo.preload = 'auto';
                    academyVideo.load();
                    academyVideo.play().catch(() => {});
                    videoObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px' });

        videoObserver.observe(academyVideo);
    }

    // ==========================================
    // FAQ — Accordion behavior
    // ==========================================
    const faqItems = document.querySelectorAll('.ac-faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Close other open items
            if (!item.open) {
                faqItems.forEach(other => {
                    if (other !== item && other.open) {
                        other.open = false;
                    }
                });
            }
        });
    });
});
