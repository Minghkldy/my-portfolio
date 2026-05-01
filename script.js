// Initialize Lucide Icons
lucide.createIcons();

// 1. Sticky Navigation
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.style.height = '70px';
        nav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        nav.style.background = 'rgba(15, 23, 42, 0.95)';
    } else {
        nav.style.height = '80px';
        nav.style.boxShadow = 'none';
        nav.style.background = 'rgba(15, 23, 42, 0.8)';
    }
});

// 2. Mobile Menu Toggle
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.getElementById('nav-links');
mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileToggle.querySelector('i');
    const isOpened = navLinks.classList.contains('active');
    icon.setAttribute('data-lucide', isOpened ? 'x' : 'menu');
    lucide.createIcons();
});

// 3. Dynamic Typing Effect
const roles = ["Developer", "Accountant (LCCI)", "Video Editor", "Content Creator"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingText = document.getElementById('typing-text');

function type() {
    const currentRole = roles[roleIndex];
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 150;

    if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 500;
    }
    setTimeout(type, typeSpeed);
}

// 4. Portfolio Filter Logic
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => item.style.display = 'none', 300);
            }
        });
    });
});

// Start animations
window.onload = () => {
    type();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const target = entry.target.getAttribute('data-skill');
                const fill = entry.target.querySelector('.progress-fill');
                if(fill) fill.style.width = target + '%';
            }
        });
    }, { threshold: 0.2 });
    document.querySelectorAll('.skill-card').forEach(card => observer.observe(card));
};

// Scroll to Top
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Current Year
document.getElementById('year').textContent = new Date().getFullYear();
