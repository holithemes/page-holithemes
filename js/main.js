/**
 * Main JavaScript file
 * Handles general site functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    function handleScroll() {
      if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('menu-open');
        mobileMenu.classList.toggle('open');
        document.body.classList.toggle('menu-active');
      });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#') {
          e.preventDefault();
          
          const target = document.querySelector(href);
          if (target) {
            // Close mobile menu if open
            if (mobileMenu && mobileMenu.classList.contains('open')) {
              menuToggle.classList.remove('menu-open');
              mobileMenu.classList.remove('open');
              document.body.classList.remove('menu-active');
            }
            
            // Scroll to target
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        }
      });
    });
    
    // Product card hover effect
    document.querySelectorAll('.product-card').forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.card-icon');
        if (icon) {
          icon.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.card-icon');
        if (icon) {
          icon.style.boxShadow = 'none';
        }
      });
    });
    
    // Initialize animations for elements that should animate on scroll
    const animateOnScroll = document.querySelectorAll('.animate-on-scroll');
    
    if (animateOnScroll.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      animateOnScroll.forEach(element => {
        observer.observe(element);
      });
    }
  });