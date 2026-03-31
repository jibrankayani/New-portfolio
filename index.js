// Navigation Scroll Effect
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
    // Navbar scroll effect
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Active section highlighting
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth Scrolling for Navigation Links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========== SKILL PROGRESS BARS ANIMATION ==========
const skillProgressBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';   // Set width from data-progress
            skillObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

skillProgressBars.forEach(bar => {
    bar.style.width = '0%'; // start at 0
    skillObserver.observe(bar);
});

// ========== EMAILJS CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const sendBtn = document.getElementById('sendMessageBtn');
        const originalText = sendBtn.innerHTML;
        sendBtn.disabled = true;
        sendBtn.innerHTML = '<span>Sending...</span>';

        // Send form data via EmailJS
        emailjs.sendForm('service_plure39', 'template_iz1coco', this)
            .then(function() {
                sendBtn.innerHTML = '<span>✓ Message Sent!</span>';
                sendBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                contactForm.reset();

                setTimeout(() => {
                    sendBtn.innerHTML = originalText;
                    sendBtn.style.background = '';
                    sendBtn.disabled = false;
                }, 3000);
            }, function(error) {
                sendBtn.innerHTML = '<span>✗ Failed. Try again.</span>';
                sendBtn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
                console.error('EmailJS error:', error);

                setTimeout(() => {
                    sendBtn.innerHTML = originalText;
                    sendBtn.style.background = '';
                    sendBtn.disabled = false;
                }, 3000);
            });
    });
}

// ========== PROJECT MODAL ==========
const projectData = {
    1: {
        title: "Mixed-Signal Central Controller Board",
        icon: '🔌',
        gradient: 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
        description: "A sophisticated mixed-signal central controller board designed to manage multiple communication protocols and control systems.",
        features: [
            "Multi-protocol communication support including Ethernet, USB 2.0, CAN bus, and UART",
            "Advanced analog sensing circuits with high-precision ADC integration",
            "Motor control capabilities with PWM signal generation and feedback control",
            "Multilayer PCB design optimized for signal integrity and EMI reduction"
        ],
        technologies: ["STM32F407", "Altium Designer", "Ethernet PHY", "USB 2.0", "CAN Transceiver"],
        gallery: ["3dbmsb.png", "2dMSB.png", "3dmsb.png"]
    },
    2: {
        title: "Medical Monitoring System",
        icon: '❤️',
        gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        description: "A comprehensive medical-grade monitoring system capable of real-time acquisition and processing of vital signs.",
        features: [
            "Real-time ECG signal acquisition with 12-bit resolution",
            "Continuous heart rate monitoring using photoplethysmography (PPG)",
            "Blood oxygen saturation (SpO2) measurement with ±2% accuracy",
            "Low-power design for extended battery operation"
        ],
        technologies: ["STM32L496ZET6", "ECG Frontend", "MAX30102", "SHT45", "KiCad"],
        gallery: ["3dMed.png", "2dMED.png"]
    },
    3: {
        title: "Environmental Sensor Board",
        icon: '🌱',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        description: "A comprehensive environmental monitoring solution integrating multiple gas sensors and camera module.",
        features: [
            "Multi-gas detection including CO2, CO, and LPG concentrations",
            "ESP32-CAM integration for visual monitoring and image capture",
            "Real-time air quality index calculation and reporting",
            "Low-power sleep modes for battery-operated deployment"
        ],
        technologies: ["ESP32", "ESP-CAM", "MQ-135", "MH-Z19", "EasyEDA"]
    },
    4: {
        title: "Smart Home Monitoring System",
        icon: '🏠',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        description: "An intelligent home automation system providing comprehensive environmental monitoring and control.",
        features: [
            "Real-time air quality monitoring with particulate matter detection",
            "Temperature and humidity sensing with ±0.5°C accuracy",
            "IoT cloud integration for remote monitoring and control",
            "Voice assistant integration (Alexa/Google Home compatible)"
        ],
        technologies: ["ESP32", "DHT22", "BME680", "Cloud IoT", "Altium Designer"],
        gallery: ["1.4.png", "2dhms.png"]
    },
    5: {
        title: "Multi-Peripheral Control Board",
        icon: '⚡',
        gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        description: "A robust power management and control solution designed to drive multiple peripherals.",
        features: [
            "Multiple independent voltage rails (3.3V, 5V, 12V, 24V)",
            "High-efficiency buck/boost converters with >90% efficiency",
            "Individual overcurrent and short-circuit protection per channel",
            "Real-time current and voltage monitoring for each output"
        ],
        technologies: ["Buck Converters", "LDO Regulators", "Current Sensing", "Protection Circuits", "KiCad"],
        gallery: ["24pd.png", "24pd3d.png"]
    },
    6: {
        title: "Soil Moisture Monitoring System (FYP)",
        icon: '🌿',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        description: "Final Year Project: An innovative agriculture IoT solution combining solar power, wireless communication, and cloud computing.",
        features: [
            "Solar-powered autonomous operation with battery backup",
            "Multiple soil moisture sensors for zone-based monitoring",
            "LoRa wireless communication for long-range data transmission",
            "Cloud-based data storage and analytics platform"
        ],
        technologies: ["ESP32", "LoRa", "Solar Power", "Cloud Platform", "Altium Designer"]
    }
};

const projectModal = document.getElementById('projectModal');
const modalOverlay = document.querySelector('.modal-overlay');
const modalClose = document.querySelector('.modal-close');

function openProjectModal(projectId) {
    const project = projectData[projectId];
    if (!project) return;
    
    document.querySelector('.modal-icon').innerHTML = project.icon;
    document.querySelector('.modal-icon').style.background = project.gradient;
    document.querySelector('.modal-title').textContent = project.title;
    document.querySelector('.modal-description').textContent = project.description;
    
    const featureList = document.querySelector('.feature-list');
    featureList.innerHTML = project.features.map(feature => `<li>${feature}</li>`).join('');
    
    const techStack = document.querySelector('.tech-stack');
    techStack.innerHTML = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
    
    // Handle Gallery Images
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryPlaceholder = document.querySelector('.gallery-placeholder');
    
    if (project.gallery && project.gallery.length > 0) {
        galleryGrid.innerHTML = project.gallery.map((img, index) => `
            <div class="gallery-item" onclick="openLightbox('${img}', '${project.title}')">
                <img src="${img}" alt="${project.title}" loading="lazy">
                <div class="gallery-overlay">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        <line x1="11" y1="8" x2="11" y2="14"></line>
                        <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                </div>
            </div>
        `).join('');
        galleryGrid.style.display = 'grid';
        galleryPlaceholder.style.display = 'none';
    } else {
        galleryGrid.style.display = 'none';
        galleryPlaceholder.style.display = 'block';
    }
    
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Add click listeners to project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const projectId = card.getAttribute('data-project');
        openProjectModal(projectId);
    });
});

modalOverlay.addEventListener('click', closeProjectModal);
modalClose.addEventListener('click', closeProjectModal);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
    }
});

// ========== SCROLL ANIMATIONS ==========
const observerOptions = { threshold: 0.1 };
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => animateOnScroll.observe(el));

// ========== PROFILE IMAGE ERROR HANDLER ==========
const profileImage = document.getElementById('profileImage');
if (profileImage) {
    profileImage.addEventListener('error', function() {
        console.warn('Profile image failed to load, using placeholder.');
    });
}

// ========== CONSOLE EASTER EGG ==========
console.log('%c👋 Hello, Developer!', 'font-size: 24px; color: #00ff88; font-weight: bold;');
console.log('%cEmail: jibrankayani776@gmail.com', 'font-size: 14px; color: #00d4ff;');

// ========== REMOVED HEAVY ANIMATIONS (particle, cursor trail) ==========
// You can re-enable them later if you want – they were causing performance issues.

// ========== LIGHTBOX FUNCTIONALITY ==========
let currentLightboxImages = [];
let currentLightboxIndex = 0;

function openLightbox(imgSrc, caption) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    // Get current project's gallery images
    const projectModal = document.getElementById('projectModal');
    const projectId = projectModal.querySelector('.modal-title').textContent;
    
    // Find the current project data
    for (const [id, project] of Object.entries(projectData)) {
        if (project.title === projectId && project.gallery) {
            currentLightboxImages = project.gallery;
            currentLightboxIndex = currentLightboxImages.indexOf(imgSrc);
            break;
        }
    }
    
    lightboxImg.src = imgSrc;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    updateLightboxNav();
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    currentLightboxImages = [];
    currentLightboxIndex = 0;
}

function navigateLightbox(direction) {
    if (currentLightboxImages.length <= 1) return;
    
    currentLightboxIndex += direction;
    
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = currentLightboxImages.length - 1;
    } else if (currentLightboxIndex >= currentLightboxImages.length) {
        currentLightboxIndex = 0;
    }
    
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    
    lightboxImg.src = currentLightboxImages[currentLightboxIndex];
    
    // Update caption based on current project
    const projectModal = document.getElementById('projectModal');
    const projectId = projectModal.querySelector('.modal-title').textContent;
    lightboxCaption.textContent = projectId;
    
    updateLightboxNav();
}

function updateLightboxNav() {
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');
    
    if (currentLightboxImages.length <= 1) {
        prevBtn.style.display = 'none';
        nextBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'flex';
        nextBtn.style.display = 'flex';
    }
}

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lightbox = document.getElementById('lightbox');
        if (lightbox.classList.contains('active')) {
            closeLightbox();
        }
    }
    
    // Navigate with arrow keys
    if (currentLightboxImages.length > 1) {
        if (e.key === 'ArrowLeft') {
            navigateLightbox(-1);
        } else if (e.key === 'ArrowRight') {
            navigateLightbox(1);
        }
    }
});

// ===== HERO PCB SLIDESHOW =====
(function() {
    const layers = Array.from(document.querySelectorAll('.pcb-card .pcb-layer'));
    if (!layers.length) return;
    let current = 0;

    function showSlide(idx) {
        layers.forEach((l, i) => {
            l.classList.toggle('slide-active', i === idx);
        });
    }

    showSlide(0);
    setInterval(() => {
        current = (current + 1) % layers.length;
        showSlide(current);
    }, 2000);
})();
