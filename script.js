// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 248, 245, 0.95) 100%)';
        navbar.style.boxShadow = '0 4px 30px rgba(139, 69, 19, 0.12)';
    } else {
        navbar.style.background = 'linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 248, 245, 0.95) 100%)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact form submission - AUTOMATIC EMAIL NOTIFICATION
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    // Initialize EmailJS - REPLACE WITH YOUR PUBLIC KEY
    emailjs.init("xvJjsDXOi903dYWqV"); // Get this from https://www.emailjs.com
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const phone = this.querySelector('input[type="tel"]').value;
        const service = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Clean phone number for WhatsApp (remove all non-numeric characters)
        let phoneClean = phone && phone.trim() ? phone.replace(/\D/g, '') : '';
        
        if (phoneClean) {
            // Remove leading zeros first (e.g., 00201234 -> 201234, 01234 -> 1234)
            phoneClean = phoneClean.replace(/^0+/, '');
            
            // If it doesn't start with country code AND is 10 digits (Egyptian mobile without country code)
            // Egyptian mobiles: 10, 11, 12, 15 (10 digits after the 0)
            if (!phoneClean.startsWith('20') && phoneClean.length === 10) {
                phoneClean = '20' + phoneClean; // Add Egypt country code
            }
            // If someone entered 00 before country code (00201234)
            else if (phoneClean.startsWith('20') && phoneClean.length === 12) {
                // Already correct format
            }
            // If it's still not in correct format, assume it's Egyptian and add 20
            else if (!phoneClean.startsWith('20') && phoneClean.length >= 9) {
                phoneClean = '20' + phoneClean;
            }
        }
        
        // Simple validation
        if (!name || !email || !service) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // ==========================================
        // YOUR WHATSAPP NUMBER - Add your number here
        // ==========================================
        const YOUR_WHATSAPP_NUMBER = '201280441044'; // Replace with your WhatsApp number (country code + number, no +)
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Prepare email data
            const emailData = {
                to_name: 'Elegant Eats Team',
                from_name: name,
                from_email: email,
                phone: phone || 'Not provided',
                service: service,
                message: message || 'No additional message',
                customer_email: email,
            };
            
            // Only add phone fields if phone number exists
            if (phoneClean) {
                emailData.customer_phone = phoneClean; // This is the clean number for WhatsApp link
                emailData.customer_phone_display = phone; // This is for display in email
                
                // DEBUG: Log to console to verify
                console.log('Original phone:', phone);
                console.log('Cleaned phone for WhatsApp:', phoneClean);
                console.log('WhatsApp URL will be: https://wa.me/' + phoneClean);
            }
            
            emailData.your_whatsapp = YOUR_WHATSAPP_NUMBER;
            
            // Send email notification using EmailJS
            await emailjs.send(
                'service_rx7qxkl', // Replace with your EmailJS service ID
                'template_c9dt6ds', // Replace with your EmailJS template ID
                emailData
            );
            
            // Show success message
            showNotification('✅ Thank you! Your message has been sent successfully. We will contact you soon.', 'success');
            this.reset();
            
        } catch (error) {
            console.error('Error sending notification:', error);
            showNotification('There was an error sending your message. Please try calling us directly.', 'error');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Fade in section headers when they come into view
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.section-header').forEach(header => {
    headerObserver.observe(header);
    
    // Check if header is already in view on page load
    const rect = header.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
    if (isVisible) {
        setTimeout(() => {
            header.classList.add('visible');
        }, 300);
    }
});

// Observe service cards for animation with upward movement
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(-10px)'; // Move cards upward
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
});

// Observe about section for animation
const aboutSection = document.querySelector('.about-content');
if (aboutSection) {
    aboutSection.style.opacity = '0';
    aboutSection.style.transform = 'translateY(30px)';
    aboutSection.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(aboutSection);
}

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Fade out hero content and fade in section headers on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const windowHeight = window.innerHeight;
    
    // Fade out hero content when scrolling past 200px
    if (heroContent) {
        if (scrolled > 200) {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(-30px)';
        } else {
            const opacity = 1 - (scrolled / 200);
            const transform = -(scrolled / 10);
            heroContent.style.opacity = Math.max(opacity, 0).toString();
            heroContent.style.transform = `translateY(${transform}px)`;
        }
    }
    
    // Check if services section is in view to fade in header
    const servicesSection = document.querySelector('.services');
    const sectionHeader = document.querySelector('.section-header');
    
    if (servicesSection && sectionHeader) {
        const servicesTop = servicesSection.getBoundingClientRect().top;
        const servicesBottom = servicesSection.getBoundingClientRect().bottom;
        
        if (servicesTop < windowHeight * 0.7 && servicesBottom > 0) {
            sectionHeader.classList.add('visible');
        }
    }
}, { passive: true });

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Button click animations
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    /* Beautiful Notification Modal */
    .notification-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
        backdrop-filter: blur(5px);
    }

    .notification-modal {
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        text-align: center;
        max-width: 400px;
        width: 90%;
        animation: slideUp 0.4s ease;
        position: relative;
    }

    .notification-icon {
        font-size: 60px;
        margin-bottom: 20px;
        animation: scaleIn 0.5s ease;
    }

    .notification-modal h3 {
        font-size: 24px;
        margin: 0 0 15px 0;
        color: #2c3e50;
        font-family: 'Playfair Display', serif;
    }

    .notification-modal p {
        font-size: 16px;
        line-height: 1.6;
        color: #666;
        margin: 0 0 25px 0;
    }

    .notification-modal.success h3 {
        color: #8B4513;
    }

    .notification-modal.error h3 {
        color: #e74c3c;
    }

    .notification-close-btn {
        background: #8B4513;
        color: white;
        border: none;
        padding: 12px 35px;
        border-radius: 25px;
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .notification-close-btn:hover {
        background: #A0522D;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(139, 69, 19, 0.3);
    }

    .notification-modal.error .notification-close-btn {
        background: #e74c3c;
    }

    .notification-modal.error .notification-close-btn:hover {
        background: #c0392b;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

    @keyframes slideUp {
        from {
            transform: translateY(50px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    @keyframes scaleIn {
        0% {
            transform: scale(0);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }

    @media (max-width: 480px) {
        .notification-modal {
            padding: 30px 20px;
        }
        .notification-icon {
            font-size: 50px;
        }
        .notification-modal h3 {
            font-size: 20px;
        }
        .notification-modal p {
            font-size: 14px;
        }
    }
`;
document.head.appendChild(style);

// Beautiful Notification Function
function showNotification(message, type = 'success') {
    // Remove any existing notification
    const existingOverlay = document.querySelector('.notification-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }

    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'notification-overlay';

    // Create modal
    const modal = document.createElement('div');
    modal.className = `notification-modal ${type}`;

    // Icon based on type
    const icon = type === 'success' ? '✅' : '⚠️';
    const title = type === 'success' ? 'Success!' : 'Oops!';

    modal.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <h3>${title}</h3>
        <p>${message}</p>
        <button class="notification-close-btn">Got it!</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Close button functionality
    const closeBtn = modal.querySelector('.notification-close-btn');
    closeBtn.addEventListener('click', () => {
        overlay.style.animation = 'fadeIn 0.3s ease reverse';
        setTimeout(() => {
            overlay.remove();
        }, 300);
    });

    // Close on overlay click
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            overlay.style.animation = 'fadeIn 0.3s ease reverse';
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
    });

}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = (window.scrollY / scrollableHeight) * 100;
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollProgress + '%';
    }
}, { passive: true });

// Sticky CTA Button
window.addEventListener('scroll', () => {
    const stickyCTA = document.querySelector('.sticky-cta');
    if (stickyCTA && window.scrollY > 500) {
        stickyCTA.classList.add('visible');
    } else if (stickyCTA) {
        stickyCTA.classList.remove('visible');
    }
}, { passive: true });

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }, { passive: true });
}

// Lightbox Gallery
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

let currentImageIndex = 0;

if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxClose) {
    const images = Array.from(galleryItems).map(item => item.querySelector('img').src);

    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentImageIndex = index;
            lightboxImg.src = images[currentImageIndex];
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    if (lightboxNext) {
        lightboxNext.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % images.length;
            lightboxImg.src = images[currentImageIndex];
            lightboxImg.style.animation = 'none';
            setTimeout(() => {
                lightboxImg.style.animation = 'zoomIn 0.3s ease';
            }, 10);
        });
    }

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
            lightboxImg.src = images[currentImageIndex];
            lightboxImg.style.animation = 'none';
            setTimeout(() => {
                lightboxImg.style.animation = 'zoomIn 0.3s ease';
            }, 10);
        });
    }

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            } else if (e.key === 'ArrowRight' && lightboxNext) {
                lightboxNext.click();
            } else if (e.key === 'ArrowLeft' && lightboxPrev) {
                lightboxPrev.click();
            }
        }
    });
}

// Animate testimonials on scroll
const testimonialObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.2, rootMargin: '0px 0px -100px 0px' });

document.querySelectorAll('.testimonial-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    testimonialObserver.observe(card);
});

// Animate gallery items on scroll
const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }, index * 100);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.gallery-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'scale(0.9)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    galleryObserver.observe(item);
});