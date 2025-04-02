/**
 * Hero Background Animation
 * Creates an interactive particle field with mouse interaction
 */
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.createElement('canvas');
  const heroBackground = document.getElementById('hero-background');
  
  if (!heroBackground) return;
  
  heroBackground.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  
  let animationFrameId;
  let mouseX = 0;
  let mouseY = 0;
  let lastMouseX = mouseX;
  let lastMouseY = mouseY;
  let mouseSpeed = 0;
  let isMouseMoving = false;
  const mouseRadius = 150;
  
  // Resize canvas to fill container
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Reset mouse position on resize to avoid particles jumping
    mouseX = canvas.width / 2;
    mouseY = canvas.height / 2;
    
    // Recreate particles on resize
    if (particles) {
      particles = createParticles();
    }
  }
  
  // Track mouse position with improved handling
  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
    
    // Calculate mouse speed for dynamic effects
    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    mouseSpeed = Math.sqrt(dx * dx + dy * dy);
    
    lastMouseX = mouseX;
    lastMouseY = mouseY;
    isMouseMoving = true;
    
    // Reset the "not moving" timer
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
      isMouseMoving = false;
    }, 100);
    
    // Create mouse trail effect
    if (isMouseMoving && mouseSpeed > 5) {
      createMouseTrail(e);
    }
  }
  
  let mouseTimer;
  
  // Create mouse trail effect
  function createMouseTrail(e) {
    const trail = document.createElement('div');
    trail.className = 'mouse-trail';
    trail.style.position = 'absolute';
    trail.style.left = `${e.clientX}px`;
    trail.style.top = `${e.clientY}px`;
    trail.style.width = `${mouseSpeed * 2}px`;
    trail.style.height = `${mouseSpeed * 2}px`;
    trail.style.borderRadius = '50%';
    trail.style.background = 'radial-gradient(circle, rgba(180, 150, 255, 0.4) 0%, rgba(180, 150, 255, 0) 70%)';
    trail.style.pointerEvents = 'none';
    trail.style.zIndex = '1';
    trail.style.transform = 'translate(-50%, -50%)';
    
    document.body.appendChild(trail);
    
    // Animate and remove
    setTimeout(() => {
      trail.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
      trail.style.opacity = '0';
      trail.style.transform = 'translate(-50%, -50%) scale(2)';
      
      setTimeout(() => {
        document.body.removeChild(trail);
      }, 500);
    }, 10);
  }
  
  // Particle class with enhanced mouse interaction
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.originalX = this.x;
      this.originalY = this.y;
      this.baseSize = Math.random() * 3 + 1;
      this.size = this.baseSize;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.angle = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.01 - 0.005;
      this.distanceFromMouse = 0;
      this.hue = Math.floor(Math.random() * 60) + 240; // Blue to purple range
      this.maxOpacity = Math.random() * 0.4 + 0.4;
      this.minOpacity = Math.random() * 0.1 + 0.1;
      this.opacity = this.minOpacity;
      this.glowIntensity = Math.random() * 5 + 3;
      this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.forceFactor = Math.random() * 0.5 + 0.5; // Randomize how much each particle responds to mouse
    }
    
    update() {
      // Calculate distance from mouse
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      this.distanceFromMouse = Math.sqrt(dx * dx + dy * dy);
      
      // Dynamic mouse radius based on mouse speed
      const dynamicMouseRadius = mouseRadius + mouseSpeed * 2;
      
      // Interactive behavior with improved physics
      if (this.distanceFromMouse < dynamicMouseRadius) {
        // Calculate angle from particle to mouse
        const angle = Math.atan2(dy, dx);
        
        // Particles are pushed away from mouse with a force inversely proportional to distance
        const force = ((dynamicMouseRadius - this.distanceFromMouse) / dynamicMouseRadius) * this.forceFactor;
        
        // Apply force with easing for smoother movement
        this.speedX += Math.cos(angle) * force * 0.2;
        this.speedY += Math.sin(angle) * force * 0.2;
        
        // Increase size and opacity when affected by mouse
        this.size = this.baseSize + force * 3;
        this.opacity = Math.min(this.maxOpacity, this.opacity + 0.03);
        
        // Change color slightly when affected by mouse
        this.hue = (this.hue + 1) % 360;
      } else {
        // Return to original position with gentle force when far from mouse
        const dx = this.originalX - this.x;
        const dy = this.originalY - this.y;
        this.speedX += dx * 0.001;
        this.speedY += dy * 0.001;
        
        // Return to base size and opacity
        this.size = Math.max(this.baseSize, this.size - 0.1);
        this.opacity = Math.max(this.minOpacity, this.opacity - 0.01);
      }
      
      // Apply friction for more natural movement
      this.speedX *= 0.95;
      this.speedY *= 0.95;
      
      // Update position
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Rotate
      this.angle += this.rotationSpeed;
      
      // Subtle pulsing effect
      this.size += this.pulseDirection * this.pulseSpeed;
      if (this.size > this.baseSize * 1.5 || this.size < this.baseSize * 0.7) {
        this.pulseDirection *= -1;
      }
      
      // Boundary check with bounce effect
      if (this.x < 0) {
        this.x = 0;
        this.speedX *= -0.5;
      }
      if (this.x > canvas.width) {
        this.x = canvas.width;
        this.speedX *= -0.5;
      }
      if (this.y < 0) {
        this.y = 0;
        this.speedY *= -0.5;
      }
      if (this.y > canvas.height) {
        this.y = canvas.height;
        this.speedY *= -0.5;
      }
    }
    
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);
      
      // Dynamic color based on distance from mouse
      const colorIntensity = Math.min(1, (mouseRadius - this.distanceFromMouse) / mouseRadius);
      const hueShift = isMouseMoving ? (this.distanceFromMouse < mouseRadius ? 30 : 0) : 0;
      
      // Base color with HSL for better control
      const baseColor = `hsla(${this.hue + hueShift}, 80%, 60%, ${this.opacity})`;
      const glowColor = `hsla(${this.hue + hueShift}, 80%, 60%, 0)`;
      
      // Draw glow effect
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 3);
      glow.addColorStop(0, baseColor);
      glow.addColorStop(1, glowColor);
      
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 3, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      
      // Draw particle core
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fillStyle = baseColor;
      ctx.fill();
      
      // Draw energy trails for particles affected by mouse
      if (this.distanceFromMouse < mouseRadius && isMouseMoving) {
        const trailLength = Math.min(30, mouseSpeed / 2);
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-this.speedX * trailLength, -this.speedY * trailLength);
        
        const gradient = ctx.createLinearGradient(0, 0, -this.speedX * trailLength, -this.speedY * trailLength);
        gradient.addColorStop(0, baseColor);
        gradient.addColorStop(1, glowColor);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = this.size / 2;
        ctx.stroke();
      }
      
      ctx.restore();
    }
  }
  
  // Grid class for background effect
  class Grid {
    constructor() {
      this.lines = [];
      
      // Create horizontal lines
      for (let i = 0; i < canvas.height; i += 40) {
        this.lines.push({
          x1: 0,
          y1: i,
          x2: canvas.width,
          y2: i,
          opacity: Math.random() * 0.05 + 0.02,
          speed: 0,
        });
      }
      
      // Create vertical lines
      for (let i = 0; i < canvas.width; i += 40) {
        this.lines.push({
          x1: i,
          y1: 0,
          x2: i,
          y2: canvas.height,
          opacity: Math.random() * 0.05 + 0.02,
          speed: 0,
        });
      }
    }
    
    update() {
      // Update grid based on mouse position
      this.lines.forEach((line) => {
        // Determine if this is a vertical or horizontal line
        const isVertical = line.x1 === line.x2;
        
        if (isVertical) {
          // For vertical lines, check distance from mouse X
          const distX = Math.abs(line.x1 - mouseX);
          if (distX < mouseRadius) {
            // Increase opacity based on proximity to mouse
            line.opacity = Math.min(0.2, line.opacity + 0.01);
          } else {
            // Decrease opacity when far from mouse
            line.opacity = Math.max(0.02, line.opacity - 0.005);
          }
        } else {
          // For horizontal lines, check distance from mouse Y
          const distY = Math.abs(line.y1 - mouseY);
          if (distY < mouseRadius) {
            // Increase opacity based on proximity to mouse
            line.opacity = Math.min(0.2, line.opacity + 0.01);
          } else {
            // Decrease opacity when far from mouse
            line.opacity = Math.max(0.02, line.opacity - 0.005);
          }
        }
      });
    }
    
    draw() {
      this.lines.forEach((line) => {
        ctx.beginPath();
        ctx.moveTo(line.x1, line.y1);
        ctx.lineTo(line.x2, line.y2);
        ctx.strokeStyle = `rgba(100, 120, 255, ${line.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });
    }
  }
  
  // Create particles
  function createParticles() {
    const particles = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    return particles;
  }
  
  // Initialize
  let particles = [];
  let grid;
  
  function init() {
    resizeCanvas();
    particles = createParticles();
    grid = new Grid();
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animate();
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw dark background with subtle gradient
    const gradient = ctx.createRadialGradient(
      canvas.width / 2,
      canvas.height / 2,
      0,
      canvas.width / 2,
      canvas.height / 2,
      canvas.width
    );
    gradient.addColorStop(0, "rgba(10, 10, 20, 1)");
    gradient.addColorStop(1, "rgba(5, 5, 15, 1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw grid
    grid.update();
    grid.draw();
    
    // Draw connection lines between close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 80) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          
          // Line opacity based on distance
          const opacity = (80 - distance) / 400;
          
          // Line color based on mouse proximity
          const mouseProximity = Math.min(particles[i].distanceFromMouse, particles[j].distanceFromMouse);
          
          let lineColor;
          if (mouseProximity < mouseRadius) {
            // Brighter color when near mouse
            lineColor = `rgba(150, 170, 255, ${opacity * 1.5})`;
          } else {
            // Default color
            lineColor = `rgba(80, 100, 255, ${opacity})`;
          }
          
          ctx.strokeStyle = lineColor;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    
    // Update and draw particles
    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });
    
    // Draw mouse force field effect
    if (isMouseMoving && mouseX > 0 && mouseY > 0) {
      const forceFieldRadius = mouseRadius + mouseSpeed * 2;
      const forceField = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, forceFieldRadius);
      forceField.addColorStop(0, "rgba(150, 100, 255, 0.1)");
      forceField.addColorStop(0.5, "rgba(150, 100, 255, 0.05)");
      forceField.addColorStop(1, "rgba(150, 100, 255, 0)");
      
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, forceFieldRadius, 0, Math.PI * 2);
      ctx.fillStyle = forceField;
      ctx.fill();
      
      // Add ripple effect on mouse movement
      if (mouseSpeed > 5) {
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, mouseSpeed * 2, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(180, 150, 255, 0.2)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
    
    animationFrameId = requestAnimationFrame(animate);
  }
  
  // Start the animation
  init();
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    window.removeEventListener('resize', resizeCanvas);
    window.removeEventListener('mousemove', handleMouseMove);
    cancelAnimationFrame(animationFrameId);
  });
});