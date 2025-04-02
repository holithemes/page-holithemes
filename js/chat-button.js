/**
 * Chat Button and Panel Functionality
 */
document.addEventListener('DOMContentLoaded', function() {
    const chatToggle = document.querySelector('.chat-toggle');
    const chatPanel = document.querySelector('.chat-panel');
    const chatForm = document.querySelector('.chat-form');
    const chatInput = document.querySelector('.chat-input');
    const chatSend = document.querySelector('.chat-send');
    const chatMessages = document.querySelector('.chat-messages');
    
    if (!chatToggle || !chatPanel) return;
    
    // Toggle chat panel
    chatToggle.addEventListener('click', function() {
      document.body.classList.toggle('chat-open');
      
      // Focus input when opening
      if (document.body.classList.contains('chat-open')) {
        setTimeout(() => {
          chatInput.focus();
        }, 300);
      }
    });
    
    // Enable/disable send button based on input
    if (chatInput && chatSend) {
      chatInput.addEventListener('input', function() {
        chatSend.disabled = !this.value.trim();
      });
    }
    
    // Handle form submission
    if (chatForm && chatMessages) {
      chatForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        const userMessageEl = document.createElement('div');
        userMessageEl.className = 'chat-message user-message';
        userMessageEl.style.marginLeft = 'auto';
        userMessageEl.style.backgroundColor = 'rgba(236, 72, 153, 0.2)';
        userMessageEl.style.borderRadius = '0.5rem 0.5rem 0 0.5rem';
        
        userMessageEl.innerHTML = `
          <p>${message}</p>
          <span class="message-meta">You • Just now</span>
        `;
        
        chatMessages.appendChild(userMessageEl);
        
        // Clear input
        chatInput.value = '';
        chatSend.disabled = true;
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate response (in a real app, this would be an API call)
        setTimeout(() => {
          const responseEl = document.createElement('div');
          responseEl.className = 'chat-message';
          responseEl.innerHTML = `
            <p>Thanks for your message! Our team will get back to you soon.</p>
            <span class="message-meta">HoliThemes Team • Just now</span>
          `;
          
          chatMessages.appendChild(responseEl);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1000);
      });
    }
  });