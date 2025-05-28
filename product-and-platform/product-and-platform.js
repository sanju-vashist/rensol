 // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header background on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.9)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        });

        // Enhanced CTA button interactions
        document.querySelectorAll('.primary-cta, .secondary-cta').forEach(button => {
            button.addEventListener('mouseenter', () => {
                if (button.classList.contains('primary-cta')) {
                    button.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                    button.style.color = 'white';
                } else {
                    button.style.background = 'white';
                    button.style.color = '#667eea';
                    button.style.borderColor = 'white';
                }
            });
            
            button.addEventListener('mouseleave', () => {
                if (button.classList.contains('primary-cta')) {
                    button.style.background = 'white';
                    button.style.color = '#667eea';
                } else {
                    button.style.background = 'rgba(255, 255, 255, 0.15)';
                    button.style.color = 'white';
                    button.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                }
            });
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        // Observe all animated elements
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right').forEach(el => {
            observer.observe(el);
        });

        // Product stats animation on scroll
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stats = entry.target.querySelectorAll('.stat');
                    stats.forEach((stat, index) => {
                        setTimeout(() => {
                            stat.style.animation = 'fadeIn 0.5s ease forwards';
                            stat.style.transform = 'scale(1.1)';
                            setTimeout(() => {
                                stat.style.transform = 'scale(1)';
                            }, 200);
                        }, index * 100);
                    });
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.product-stats').forEach(el => {
            statsObserver.observe(el);
        });

        // Tech card interactions
        document.querySelectorAll('.tech-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.animationPlayState = 'paused';
                card.style.transform = 'translateY(-15px) scale(1.05)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.animationPlayState = 'running';
                card.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Product hover effects
        document.querySelectorAll('.product').forEach(product => {
            const image = product.querySelector('.product-image');
            
            product.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.05)';
                image.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            });
            
            product.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
                image.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            });
        });

        // CTA button interaction
        const ctaButton = document.querySelector('.cta-button');
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            ctaButton.style.color = 'white';
        });

        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.style.background = 'white';
            ctaButton.style.color = '#667eea';
        });

        // Social links hover effect
        document.querySelectorAll('.social-link').forEach(link => {
            link.addEventListener('mouseenter', () => {
                link.style.background = 'linear-gradient(135deg, #764ba2, #667eea)';
            });
            
            link.addEventListener('mouseleave', () => {
                link.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
            });
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (hero && scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });

        // Initialize animations on page load
        window.addEventListener('load', () => {
            // Trigger fade-in animations
            setTimeout(() => {
                document.querySelectorAll('.fade-in').forEach((el, index) => {
                    setTimeout(() => {
                        el.style.animation = 'fadeIn 0.8s ease forwards';
                    }, index * 200);
                });
            }, 500);
        });