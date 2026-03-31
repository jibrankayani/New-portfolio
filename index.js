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
        emailjs.sendForm('service_vnxispf', 'template_14lzpki', this)
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
        description: "A multi-sensor medical monitoring PCB designed in Altium Designer, integrating vital sign acquisition modules with real-time data display using STM32L496ZET6.",
        features: [
            "ECG 4 Click module for real-time electrocardiogram signal acquisition",
            "MAX30102 module for heart rate and blood oxygen saturation (SpO2) monitoring",
            "GY-906 infrared module for non-contact body temperature measurement",
            "LCD display for on-board real-time data visualization",
            "Camera module for patient visual monitoring",
            "WiFi/BLE module for wireless data transmission"
        ],
        technologies: ["STM32L496ZET6", "ECG 4 Click", "MAX30102", "GY-906", "LCD", "WiFi/BLE", "Altium Designer"],
        gallery: ["3dMed.png", "2dMED.png"]
    },
    3: {
        title: "Environmental Sensor Board",
        icon: '🌱',
        gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        description: "A dedicated sensor board designed in Altium Designer, consolidating multiple gas and environmental sensors for comprehensive air quality monitoring.",
        features: [
            "MQ-6 sensor for LPG and combustible gas detection",
            "MQ-7 sensor for carbon monoxide (CO) concentration monitoring",
            "SCD40 module for accurate CO2 measurement",
            "NTC thermistor for ambient temperature monitoring",
            "ESP-CAM module for visual monitoring and image capture"
        ],
        technologies: ["MQ-6", "MQ-7", "SCD40", "NTC Thermistor", "ESP-CAM", "Altium Designer"]
    },
    4: {
        title: "Smart Home Monitoring System",
        icon: '🏠',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        description: "An ESP32-based home monitoring system designed in EasyEDA, integrating environmental sensors for real-time temperature, humidity, and air quality tracking.",
        features: [
            "Real-time air quality monitoring using dedicated gas sensors",
            "Temperature and humidity sensing for indoor climate tracking",
            "ESP32 microcontroller for sensor data acquisition and processing",
            "Compact PCB layout designed and routed in EasyEDA"
        ],
        technologies: ["ESP32", "EasyEDA"],
        gallery: ["1_4.png", "2dhms.png"]
    },
    5: {
        title: "Multi-Peripheral Control Board",
        icon: '⚡',
        gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
        description: "A robust power management and control PCB designed in Altium Designer, providing dual voltage rails to drive multiple peripherals simultaneously.",
        features: [
            "Dual output voltage rails: 24V and 5V for peripheral power distribution",
            "High-efficiency buck converters with overcurrent protection",
            "Individual short-circuit protection per output channel",
            "Real-time current and voltage monitoring for each rail"
        ],
        technologies: ["24V Rail", "5V Rail", "Buck Converters", "Current Sensing", "Altium Designer"],
        gallery: ["24pd3d.png", "24pd.png"]
    },
    6: {
        title: "Soil Moisture Monitoring System (FYP)",
        icon: '🌿',
        gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        description: "Final Year Project: A solar-powered soil moisture monitoring system built using breadboards and veroboards, featuring wireless communication and a mobile app for remote data visualization.",
        features: [
            "Solar-powered operation with battery backup for autonomous deployment",
            "Multiple soil moisture sensors for zone-based field monitoring",
            "Wireless communication for real-time data transmission",
            "Mobile application for remote data visualization and alerts",
            "Prototype built on breadboard and veroboard — no custom PCB"
        ],
        technologies: ["ESP32", "Solar Power", "Soil Sensors", "Wireless Comms", "Mobile App"]
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
console.log('%c👋 Hello, Developer!', 'font-size: 24px; color: #4a9eff; font-weight: bold;');
console.log('%cEmail: jibrankayani776@gmail.com', 'font-size: 14px; color: #7ec8e3;');

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

// ========== PROJECT CARD CAROUSEL (AUTO SLIDESHOW) ==========
function initCarousels() {
    document.querySelectorAll('.project-carousel').forEach(carousel => {
        const imgs = carousel.querySelectorAll('.carousel-img');
        const dots = carousel.querySelectorAll('.cdot');
        if (imgs.length <= 1) return;

        let idx = 0;

        function goTo(i) {
            imgs[idx].classList.remove('active');
            dots[idx].classList.remove('active');
            idx = (i + imgs.length) % imgs.length;
            imgs[idx].classList.add('active');
            dots[idx].classList.add('active');
        }

        // Auto-advance every 3 seconds
        setInterval(() => goTo(idx + 1), 3000);

        // Dot click
        dots.forEach((dot, i) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                goTo(i);
            });
        });
    });
}

initCarousels();

// ========== HERO TYPING ANIMATION ==========
(function() {
    const phrases = [
        'Multi-layer PCB Design',
        'Mixed-Signal Board Design',
        'Schematic Capture',
        'Power Electronics PCB',
        'Hardware Validation',
        'PCB Stack-up & DFM'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const el = document.getElementById('heroTyping');
    if (!el) return;

    function type() {
        const current = phrases[phraseIndex];
        if (isDeleting) {
            el.textContent = current.substring(0, charIndex--);
        } else {
            el.textContent = current.substring(0, charIndex++);
        }

        let delay = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === current.length + 1) {
            delay = 1800;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            delay = 400;
        }
        setTimeout(type, delay);
    }
    setTimeout(type, 1000);
})();

// ========== SUBTLE PARTICLE BACKGROUND ==========
(function() {
    const canvas = document.getElementById('circuit-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, pts = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        init();
    }

    function init() {
        pts = [];
        const count = Math.floor((W * H) / 18000);
        for (let i = 0; i < count; i++) {
            pts.push({
                x: Math.random() * W,
                y: Math.random() * H,
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: 1 + Math.random() * 1.2
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        // Move
        pts.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = W;
            if (p.x > W) p.x = 0;
            if (p.y < 0) p.y = H;
            if (p.y > H) p.y = 0;
        });
        // Connect nearby
        for (let i = 0; i < pts.length; i++) {
            for (let j = i + 1; j < pts.length; j++) {
                const dx = pts[i].x - pts[j].x;
                const dy = pts[i].y - pts[j].y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(pts[i].x, pts[i].y);
                    ctx.lineTo(pts[j].x, pts[j].y);
                    ctx.strokeStyle = `rgba(74,158,255,${0.12 * (1 - dist/120)})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        // Draw dots
        pts.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(74,158,255,0.25)';
            ctx.fill();
        });
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();
})();

// ========== PCB CARD HERO SLIDESHOW ==========
(function() {
    const layers = document.querySelectorAll('.pcb-card .pcb-layer');
    if (!layers.length) return;
    let current = 0;

    function showSlide(idx) {
        layers.forEach((l, i) => {
            l.classList.remove('slide-active', 'slide-prev');
            if (i === idx) l.classList.add('slide-active');
            else if (i === (idx - 1 + layers.length) % layers.length) l.classList.add('slide-prev');
        });
    }

    showSlide(0);
    setInterval(() => {
        current = (current + 1) % layers.length;
        showSlide(current);
    }, 2800);
})();
