document.addEventListener('DOMContentLoaded', () => {
    const isSlowConnection = navigator.connection && (navigator.connection.effectiveType === 'slow-2g' || navigator.connection.effectiveType === '2g');

    if (isSlowConnection) {
        document.querySelectorAll('video').forEach(v => {
            v.querySelectorAll('source').forEach(s => s.remove());
            v.load();
        });
    }

    const header = document.getElementById('site-header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    const desktopNavItems = document.querySelectorAll('.nav-item');

    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    const toggleMobileMenu = () => {
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        
        mobileToggle.classList.toggle('active');
        mobileMenuOverlay.classList.toggle('active');
        
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        
        if (!isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    mobileToggle.addEventListener('click', toggleMobileMenu);

    mobileNavItems.forEach(item => {
        item.addEventListener('click', () => {
            if (mobileMenuOverlay.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    const sections = document.querySelectorAll('section[id]');
    
    const highlightActiveNav = () => {
        let scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                desktopNavItems.forEach(navItem => {
                    navItem.classList.remove('active');
                    if (navItem.getAttribute('href') === `#${sectionId}`) {
                        navItem.classList.add('active');
                    }
                });
                
                mobileNavItems.forEach(navItem => {
                    navItem.classList.remove('active');
                    if (navItem.getAttribute('href') === `#${sectionId}`) {
                        navItem.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNav);

    // ==========================================
    // Hero Video — smooth looping playback
    // ==========================================
    const heroVideo = document.querySelector('.hero-video');

    if (heroVideo) {
        heroVideo.addEventListener('loadedmetadata', () => {
            heroVideo.playbackRate = 0.7;
        });
        heroVideo.addEventListener('canplay', () => {
            heroVideo.play();
        }, { once: true });
        heroVideo.preload = 'auto';
        heroVideo.load();
    }

    // ==========================================
    // Featured Section — Scroll-Triggered Animations
    // ==========================================
    const featuredHeader = document.querySelector('.featured-section .section-header');
    const featuredCards = document.querySelectorAll('.featured-section .creation-card');

    if (featuredHeader) {
        featuredHeader.style.opacity = '0';
        featuredHeader.style.transform = 'translateY(30px)';

        const headerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    featuredHeader.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    featuredHeader.style.opacity = '1';
                    featuredHeader.style.transform = 'translateY(0)';
                    headerObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        headerObserver.observe(featuredHeader);
    }

    featuredCards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(40px)';
        card.style.transition = 'none';

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    card.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        cardObserver.observe(card);
    });

    // ==========================================
    // About Section — Scroll-Triggered Animations
    // ==========================================
    const aboutElements = [
        { el: document.querySelector('.about-image-wrapper'), delay: 0 },
        { el: document.querySelector('.about-section .about-eyebrow'), delay: 0 },
        { el: document.querySelector('.about-section .about-heading'), delay: 0 },
        { el: document.querySelector('.about-section .about-text'), delay: 0 },
        { el: document.querySelector('.about-section .about-quote'), delay: 0 },
        { el: document.querySelector('.about-section .about-cta'), delay: 0 },
    ];

    aboutElements.forEach(({ el }) => {
        if (!el) return;
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'none';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    el.style.transition = 'opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)';
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(el);
    });

    // ==========================================
    // Why Choose Section — Scroll-Triggered Animations
    // ==========================================
    const whyElements = [
        { el: document.querySelector('.why-section .why-eyebrow'), delay: 0 },
        { el: document.querySelector('.why-section .why-heading'), delay: 120 },
        { el: document.querySelector('.why-section .why-subtitle'), delay: 240 },
        { el: document.querySelectorAll('.why-section .why-card')[0], delay: 450 },
        { el: document.querySelectorAll('.why-section .why-card')[1], delay: 600 },
        { el: document.querySelectorAll('.why-section .why-card')[2], delay: 750 },
        { el: document.querySelectorAll('.why-section .why-card')[3], delay: 900 },
        { el: document.querySelector('.why-section .btn-why'), delay: 1050 },
    ];

    whyElements.forEach(({ el, delay }) => {
        if (!el) return;
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
    // Academy Section — Scroll-Triggered Animations
    // ==========================================
    const academyRevealElements = document.querySelectorAll('.academy-section [data-reveal]');
    const academyDelays = [0, 120, 240, 400, 560, 680, 800, 920, 1080, 1240];

    academyRevealElements.forEach((el, index) => {
        if (!el) return;
        const delay = academyDelays[index] || 0;
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
    const academyVideo = document.querySelector('.academy-video');

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
    // Clients Section — Scroll-Triggered Animations
    // ==========================================
    const clientsRevealElements = document.querySelectorAll('.clients-section [data-reveal]');
    const clientsDelays = [0, 120, 240, 400, 560, 720, 880, 1040];

    clientsRevealElements.forEach((el, index) => {
        if (!el) return;
        const delay = clientsDelays[index] || 0;
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
    // Clients Video — Lazy Load & Autoplay
    // ==========================================
    const clientsVideo = document.querySelector('.clients-video');

    if (clientsVideo) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    clientsVideo.preload = 'auto';
                    clientsVideo.load();
                    clientsVideo.play().catch(() => {});
                    videoObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px' });

        videoObserver.observe(clientsVideo);
    }

    // ==========================================
    // Final CTA Section — Scroll-Triggered Animations
    // ==========================================
    const finalCtaRevealElements = document.querySelectorAll('.final-cta-section [data-reveal]');
    const finalCtaDelays = [0, 120, 240, 400, 560, 720];

    finalCtaRevealElements.forEach((el, index) => {
        if (!el) return;
        const delay = finalCtaDelays[index] || 0;
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
        }, { threshold: 0.2 });

        observer.observe(el);
    });

    // ==========================================
    // Final CTA Video — Lazy Load & Autoplay
    // ==========================================
    const finalCtaVideo = document.querySelector('.final-cta-video');

    if (finalCtaVideo) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    finalCtaVideo.preload = 'auto';
                    finalCtaVideo.load();
                    finalCtaVideo.play().catch(() => {});
                    videoObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '200px' });

        videoObserver.observe(finalCtaVideo);
    }

    // ==========================================
    // Footer — Scroll-Triggered Animations
    // ==========================================
    const footerRevealElements = document.querySelectorAll('.site-footer [data-reveal]');
    const footerDelays = [0, 150, 300, 450, 580, 710, 840];

    footerRevealElements.forEach((el, index) => {
        if (!el) return;
        const delay = footerDelays[index] || 0;
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
});
