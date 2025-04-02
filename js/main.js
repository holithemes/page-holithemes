/**
 * Main JavaScript file
 * Handles general functionality and initializations
 */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize navbar
  initNavbar();
  
  // Initialize mobile menu
  initMobileMenu();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize text input for chat
  initChatInput();
});

/**
 * Initialize navbar functionality
 */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  
  // Handle navbar background on scroll
  function handleScroll() {
    if (window.scrollY > 10) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  // Initial check
  handleScroll();
  
  // Add scroll event listener
  window.addEventListener('scroll', handleScroll);
}

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const menuIcon = document.querySelector('.menu-icon');
  
  if (!mobileMenuBtn || !mobileMenu) return;
  
  let isOpen = false;
  
  mobileMenuBtn.addEventListener('click', function() {
    isOpen = !isOpen;
    
    if (isOpen) {
      // Open menu
      mobileMenu.style.display = 'block';
      
      // Animate menu icon to X
      menuIcon.style.background = 'transparent';
      menuIcon.style.transform = 'translate(-50%, -50%) rotate(180deg)';
      menuIcon.style.transition = 'all 0.3s ease-in-out';
      
      menuIcon.style.background = 'transparent';
      menuIcon.style.transform = 'translate(-50%, -50%) rotate(180deg)';
      
      // Animate before and after pseudo-elements
      document.documentElement.style.setProperty('--menu-before-transform', 'translateY(0) rotate(45deg)');
      document.documentElement.style.setProperty('--menu-after-transform', 'translateY(0) rotate(-45deg)');
      
      // Add animation to menu items
      const menuItems = mobileMenu.querySelectorAll('li');
      menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, 100 + (index * 50));
      });
      
      // Animate button
      const menuButton = mobileMenu.querySelector('.btn');
      if (menuButton) {
        menuButton.style.opacity = '0';
        menuButton.style.transform = 'translateY(10px)';
        menuButton.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
          menuButton.style.opacity = '1';
          menuButton.style.transform = 'translateY(0)';
        }, 100 + (menuItems.length * 50));
      }
    } else {
      // Reset menu icon
      menuIcon.style.background = 'white';
      menuIcon.style.transform = 'translate(-50%, -50%) rotate(0)';
      
      // Reset before and after pseudo-elements
      document.documentElement.style.setProperty('--menu-before-transform', 'translateY(-8px) rotate(0)');
      document.documentElement.style.setProperty('--menu-after-transform', 'translateY(8px) rotate(0)');
      
      // Hide menu after animation
      setTimeout(() => {
        mobileMenu.style.display = 'none';
      }, 300);
    }
  });
  
  // Close mobile menu on window resize if it becomes desktop view
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && isOpen) {
      mobileMenu.style.display = 'none';
      menuIcon.style.background = 'white';
      menuIcon.style.transform = 'translate(-50%, -50%) rotate(0)';
      document.documentElement.style.setProperty('--menu-before-transform', 'translateY(-8px) rotate(0)');
      document.documentElement.style.setProperty('--menu-after-transform', 'translateY(8px) rotate(0)');
      isOpen = false;
    }
  });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);
  
  // Observe section headers and footers
  const sections = document.querySelectorAll('.section-header, .section-footer');
  sections.forEach(section => {
    observer.observe(section);
  });
  
  // Observe product and service sections
  const productSection = document.querySelector('.products-section');
  const serviceSection = document.querySelector('.services-section');
  
  if (productSection) observer.observe(productSection);
  if (serviceSection) observer.observe(serviceSection);
  
  // Observe individual cards with delay
  document.querySelectorAll('.product-card, .service-card').forEach((card, index) => {
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    card.dataset.delay = index * 0.1;
    
    // Create a separate observer for cards to add delay
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, parseFloat(entry.target.dataset.delay) * 1000);
        }
      });
    }, observerOptions);
    
    cardObserver.observe(card);
  });
}

/**
 * Initialize chat input functionality
 */
function initChatInput() {
  const chatInput = document.querySelector('.chat-input');
  const chatSendBtn = document.querySelector('.chat-send-btn');
  
  if (!chatInput || !chatSendBtn) return;
  
  // Enable/disable send button based on input
  chatInput.addEventListener('input', function() {
    if (chatInput.value.trim() !== '') {
      chatSendBtn.disabled = false;
    } else {
      chatSendBtn.disabled = true;
    }
  });
  
  // Handle form submission
  const chatForm = document.querySelector('.chat-form');
  if (chatForm) {
    chatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const message = chatInput.value.trim();
      if (!message) return;
      
      // Add user message to chat
      addChatMessage(message, 'user');
      
      // Clear input
      chatInput.value = '';
      chatSendBtn.disabled = true;
      
      // Simulate response (in a real app, this would be an API call)
      setTimeout(() => {
        addChatMessage('Thank you for your message! Our team will get back to you soon.', 'bot');
      }, 1000);
    });
  }
}

/**
 * Add a message to the chat window
 */
function addChatMessage(text, sender) {
  const chatMessages = document.querySelector('.chat-messages');
  if (!chatMessages) return;
  
  const messageEl = document.createElement('div');
  messageEl.className = 'chat-message';
  
  if (sender === 'user') {
    messageEl.style.marginLeft = 'auto';
    messageEl.style.borderTopLeftRadius = '0.75rem';
    messageEl.style.borderTopRightRadius = '0';
    messageEl.style.backgroundColor = 'rgba(236, 72, 153, 0.2)';
  }
  
  const messageText = document.createElement('p');
  messageText.textContent = text;
  messageEl.appendChild(messageText);
  
  const messageMeta = document.createElement('span');
  messageMeta.className = 'message-meta';
  messageMeta.textContent = sender === 'user' ? 'You • Just now' : 'HoliThemes Team • Just now';
  messageEl.appendChild(messageMeta);
  
  // Add with animation
  messageEl.style.opacity = '0';
  messageEl.style.transform = 'translateY(10px)';
  chatMessages.appendChild(messageEl);
  
  // Force reflow
  void messageEl.offsetWidth;
  
  messageEl.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
  messageEl.style.opacity = '1';
  messageEl.style.transform = 'translateY(0)';
  
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}