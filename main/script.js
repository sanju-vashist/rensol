 // // AI Assistant functionality placeholder
        // document.getElementById('micButton').addEventListener('click', function() {
        //     this.classList.toggle('listening');
        //     // Add your speech recognition logic here
        // });

        // document.getElementById('stopButton').addEventListener('click', function() {
        //     document.getElementById('micButton').classList.remove('listening');
        //     // Add your stop logic here
        // });

        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
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

        // GSAP animations (if needed)
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Hero section animation
            gsap.from(".hero-text h1", {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: "power2.out",
                delay: 0.2
            });
            
            gsap.from(".hero-text h2", {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: "power2.out",
                delay: 0.4
            });
            
            gsap.from(".hero-text p", {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: "power2.out",
                delay: 0.6
            });
            
            gsap.from(".hero-text .cta", {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: "power2.out",
                delay: 0.8
            });
            
            gsap.from(".hero img", {
                duration: 1.2,
                x: 100,
                opacity: 0,
                ease: "power2.out",
                delay: 0.3
            });
            
            // Cards animation on scroll
            gsap.from(".card", {
                scrollTrigger: {
                    trigger: ".spotlight-cards",
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                },
                duration: 0.8,
                y: 100,
                opacity: 0,
                stagger: 0.2,
                ease: "power2.out"
            });
            
            // Content blocks animation
            gsap.from(".content-block", {
                scrollTrigger: {
                    trigger: ".content-block",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                duration: 1,
                y: 50,
                opacity: 0,
                stagger: 0.3,
                ease: "power2.out"
            });
            
            // Product boxes animation
            gsap.from(".product-box", {
                scrollTrigger: {
                    trigger: ".products",
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                },
                duration: 0.8,
                y: 50,
                opacity: 0,
                stagger: 0.1,
                ease: "power2.out"
            });
        }
        
        // Mobile menu toggle (if needed for smaller screens)
        function toggleMobileMenu() {
            const nav = document.querySelector('nav');
            nav.classList.toggle('mobile-open');
        }
        
        // Intersection Observer for fade-in animations (alternative to GSAP)
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.card, .product-box, .content-block').forEach(el => {
            observer.observe(el);
        });
        
        // Add fade-in class styles
        const style = document.createElement('style');
        style.textContent = `
            .fade-in {
                animation: fadeInUp 0.8s ease-out forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        // Parallax effect for hero background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });
        
        // Loading screen (optional)
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });