// DOM Elements
const header = document.querySelector('header');
const hamburger = document.querySelector('.hamburger');
const themeToggle = document.querySelector('.theme-toggle');
const scrollToTopBtn = document.querySelector('#scrollToTop');
const navLinks = document.querySelectorAll('nav ul li a');
const contactForm = document.querySelector('#contactForm');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Mobile Menu Setup
function setupMobileMenu() {
    // Create mobile menu elements
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    const mobileNavTop = document.createElement('div');
    mobileNavTop.className = 'mobile-nav-top';
    
    const mobileLogo = document.createElement('div');
    mobileLogo.className = 'logo';
    mobileLogo.innerHTML = '<h3>Rahul<span> Chauhan</span></h3>';
    
    const mobileClose = document.createElement('div');
    mobileClose.className = 'mobile-nav-close';
    mobileClose.innerHTML = '<i class="fas fa-times"></i>';
    
    mobileNavTop.appendChild(mobileLogo);
    mobileNavTop.appendChild(mobileClose);
    
    const mobileMenu = document.createElement('ul');
    mobileMenu.className = 'mobile-menu';
    
    // Clone nav links for mobile menu
    document.querySelectorAll('nav ul li').forEach(item => {
        const li = document.createElement('li');
        const a = item.querySelector('a').cloneNode(true);
        li.appendChild(a);
        mobileMenu.appendChild(li);
    });
    
    mobileNav.appendChild(mobileNavTop);
    mobileNav.appendChild(mobileMenu);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    
    // Append to body
    document.body.appendChild(mobileNav);
    document.body.appendChild(overlay);
    
    // Event listeners for mobile menu
    hamburger.addEventListener('click', () => {
        mobileNav.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    mobileClose.addEventListener('click', closeMobileMenu);
    overlay.addEventListener('click', closeMobileMenu);
    
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });
    
    function closeMobileMenu() {
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Theme Toggle Functionality
function setupThemeToggle() {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.removeItem('theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// Navigation Active State
function setupNavigationActive() {
    // Function to set active link based on scroll position
    function updateActiveLink() {
        const scrollPosition = window.scrollY;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Set initial active state
    updateActiveLink();
    
    // Update active state on scroll
    window.addEventListener('scroll', updateActiveLink);
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
}

// Project Filtering Functionality
function filterProjects(filter) {
    projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(" ");
        const isFeatured = card.getAttribute('data-featured') === "true";

        if (
            filter === 'all' ||
            (filter === 'featured' && isFeatured) ||
            categories.includes(filter)
        ) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}    
    // Default show only featured
    filterProjects('featured');

    // Setup filter button click
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');
            filterProjects(filterValue);
        });
    });

function setupProjectFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category').split(" ");
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Scroll to Top Button
function setupScrollToTop() {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });
    
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Form Validation
function setupFormValidation() {
    const nameInput = document.querySelector('#name');
    const emailInput = document.querySelector('#email');
    const subjectInput = document.querySelector('#subject');
    const messageInput = document.querySelector('#message');
    
    const nameError = document.querySelector('#nameError');
    const emailError = document.querySelector('#emailError');
    const subjectError = document.querySelector('#subjectError');
    const messageError = document.querySelector('#messageError');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let valid = true;
        
        // Reset error messages
        nameError.textContent = '';
        emailError.textContent = '';
        subjectError.textContent = '';
        messageError.textContent = '';
        
        // Validate name
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required';
            valid = false;
        } else if (nameInput.value.trim().length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            valid = false;
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required';
            valid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Please enter a valid email address';
            valid = false;
        }
        
        // Validate subject
        if (subjectInput.value.trim() === '') {
            subjectError.textContent = 'Subject is required';
            valid = false;
        } else if (subjectInput.value.trim().length < 5) {
            subjectError.textContent = 'Subject must be at least 5 characters';
            valid = false;
        }
        
        // Validate message
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required';
            valid = false;
        } else if (messageInput.value.trim().length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            valid = false;
        }
        
        // If valid, simulate form submission
        if (valid) {
            // Here you would normally send the form data to a server
            alert('Message sent successfully! I will get back to you soon.');
            contactForm.reset();
        }
    });
}

// Header Scroll Effect
function setupHeaderScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
            header.style.height = '70px';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            header.style.height = '80px';
        }
    });
}

// Animation on Scroll
function setupScrollAnimation() {
    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('scroll-animation');
        observer.observe(section);
    });
}

// Initialize all functionality
function init() {
    setupMobileMenu();
    setupThemeToggle();
    setupNavigationActive();
    setupProjectFilters();
    setupScrollToTop();
    setupFormValidation();
    setupHeaderScroll();
    setupScrollAnimation();
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);


// Create the preloader elements
function createPreloader() {
    const preloaderWrapper = document.createElement('div');
    preloaderWrapper.className = 'preloader-wrapper';
    
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    
    const logo = document.createElement('div');
    logo.className = 'preloader-logo';
    logo.innerHTML = 'RC';
    
    const loadingBar = document.createElement('div');
    loadingBar.className = 'loading-bar';
    
    const progress = document.createElement('div');
    progress.className = 'progress-bar-fill';
    
    const loadingText = document.createElement('div');
    loadingText.className = 'loading-text';
    loadingText.innerHTML = 'Loading...';
    
    loadingBar.appendChild(progress);
    preloader.appendChild(logo);
    preloader.appendChild(loadingBar);
    preloader.appendChild(loadingText);
    preloaderWrapper.appendChild(preloader);
    
    document.body.appendChild(preloaderWrapper);
    
    // Add preloader styles
    const style = document.createElement('style');
    style.textContent = `
        .preloader-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: var(--background-light);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        .preloader {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        
        .preloader-logo {
            font-size: 3rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 2rem;
            position: relative;
            animation: pulse 1.5s ease infinite;
        }
        
        .loading-bar {
            width: 200px;
            height: 6px;
            background: var(--border-color);
            border-radius: 3px;
            overflow: hidden;
            margin-bottom: 1rem;
        }
        
        .progress-bar-fill {
            height: 100%;
            width: 0;
            background: var(--primary-color);
            animation: progress 2s ease forwards;
        }
        
        .loading-text {
            font-size: 1rem;
            color: var(--text-light);
        }
        
        @keyframes progress {
            0% { width: 0; }
            100% { width: 100%; }
        }
    `;
    
    document.head.appendChild(style);
}

// Hide preloader after page loads
function hidePreloader() {
    const preloader = document.querySelector('.preloader-wrapper');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            
            // Remove preloader after fade out
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 2500); // Add delay to show animation
    }
}

// Initialize preloader
document.addEventListener('DOMContentLoaded', () => {
    createPreloader();
    
    // Hide preloader when window is fully loaded
    window.addEventListener('load', hidePreloader);
});