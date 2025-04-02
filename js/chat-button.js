/**
 * Chat Button Animation
 * Creates an interactive chat button with slide-in chat window
 */
document.addEventListener('DOMContentLoaded', function() {
  const chatButton = document.querySelector('.chat-button');
  const chatWindow = document.querySelector('.chat-window');
  
  if (!chatButton || !chatWindow) return;
  
  // Initial state
  chatWindow.style.opacity = '0';
  chatWindow.style.transform = 'translateY(20px) scale(0.9)';
  chatWindow.style.display = 'none';
  
  let isOpen = false;
  
  chatButton.addEventListener('click', () => {
    isOpen = !isOpen;
    
    if (isOpen) {
      // Open chat window with spring effect
      chatButton.classList.add('active');
      chatWindow.style.display = 'block';
      
      // Force reflow
      void chatWindow.offsetWidth;
      
      chatWindow.style.transition = 'opacity 0.3s ease, transform 0.5s cubic-bezier(0.17, 0.67, 0.21, 1.69)';
      chatWindow.style.opacity = '1';
      chatWindow.style.transform = 'translateY(0) scale(1)';
    } else {
      // Close chat window
      chatButton.classList.remove('active');
      chatWindow.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      chatWindow.style.opacity = '0';
      chatWindow.style.transform = 'translateY(20px) scale(0.9)';
      
      // Hide after animation
      setTimeout(() => {
        chatWindow.style.display = 'none';
      }, 300);
    }
  });
});