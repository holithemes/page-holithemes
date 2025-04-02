/**
 * Floating Shapes Animation
 * Creates tech-inspired floating shapes with interactive hover effects
 * Enhanced to match the original React/Framer Motion version
 */
document.addEventListener('DOMContentLoaded', function() {
  const floatingShapesContainer = document.getElementById('floating-shapes');
  if (!floatingShapesContainer) return;

  // Tech-inspired shapes with futuristic styling
  const shapes = [
    {
      type: "hexagon",
      size: { width: 140, height: 140 },
      position: { top: "10%", left: "5%" },
      color: "linear-gradient(to bottom right, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2))",
      borderColor: "rgba(236, 72, 153, 0.4)",
      animation: {
        y: [-20, 0, -20],
        rotate: [0, 10, 0],
        scale: [1, 1.05, 1],
      },
      duration: 8,
      delay: 0.2,
      glowColor: "#ec4899"
    },
    {
      type: "circuit",
      size: { width: 160, height: 160 },
      position: { top: "20%", right: "10%" },
      color: "linear-gradient(to bottom right, rgba(99, 102, 241, 0.2), rgba(59, 130, 246, 0.2))",
      borderColor: "rgba(99, 102, 241, 0.4)",
      animation: {
        y: [0, 20, 0],
        rotate: [0, -15, 0],
        scale: [1, 1.1, 1],
      },
      duration: 10,
      delay: 0.5,
      glowColor: "#6366f1"
    },
    {
      type: "diamond",
      size: { width: 120, height: 120 },
      position: { bottom: "15%", left: "15%" },
      color: "linear-gradient(to bottom right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))",
      borderColor: "rgba(6, 182, 212, 0.4)",
      animation: {
        y: [0, 15, 0],
        rotate: [0, 20, 0],
        scale: [1, 1.08, 1],
      },
      duration: 9,
      delay: 0.8,
      glowColor: "#06b6d4"
    },
    {
      type: "cube",
      size: { width: 140, height: 140 },
      position: { bottom: "10%", right: "5%" },
      color: "linear-gradient(to bottom right, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2))",
      borderColor: "rgba(16, 185, 129, 0.4)",
      animation: {
        y: [0, -15, 0],
        rotate: [0, -10, 0],
        scale: [1, 1.05, 1],
      },
      duration: 7,
      delay: 1.1,
      glowColor: "#10b981"
    },
  ];

  // Create particles
  function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles-container';
    particlesContainer.style.position = 'absolute';
    particlesContainer.style.inset = '0';
    particlesContainer.style.overflow = 'hidden';
    particlesContainer.style.pointerEvents = 'none';
    
    const particles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 2,
      color: [
        "rgba(236, 72, 153, 0.8)", 
        "rgba(168, 85, 247, 0.8)", 
        "rgba(99, 102, 241, 0.8)", 
        "rgba(59, 130, 246, 0.8)", 
        "rgba(6, 182, 212, 0.8)"
      ][Math.floor(Math.random() * 5)],
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      speedFactor: Math.random() * 0.04 + 0.01, // Random speed factor for varied movement
    }));
    
    particles.forEach(particle => {
      const particleEl = document.createElement('div');
      particleEl.className = 'particle';
      particleEl.style.position = 'absolute';
      particleEl.style.width = `${particle.size}px`;
      particleEl.style.height = `${particle.size}px`;
      particleEl.style.borderRadius = '50%';
      particleEl.style.backgroundColor = particle.color;
      particleEl.style.filter = 'blur(4px)';
      particleEl.style.left = `${particle.initialX}%`;
      particleEl.style.top = `${particle.initialY}%`;
      particleEl.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)';
      particleEl.style.opacity = '0';
      particleEl.style.transform = 'scale(0)';
      
      // Animate in
      setTimeout(() => {
        particleEl.style.opacity = '1';
        particleEl.style.transform = 'scale(1)';
      }, particle.id * 100);
      
      particlesContainer.appendChild(particleEl);
    });
    
    // Handle mouse movement
    let mouseX = -1000;
    let mouseY = -1000;
    let targetX = mouseX;
    let targetY = mouseY;
    let isMouseInside = false;
    
    function handleMouseMove(e) {
      const rect = particlesContainer.getBoundingClientRect();
      
      // Check if mouse is inside the container
      if (
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom
      ) {
        isMouseInside = true;
        targetX = ((e.clientX - rect.left) / rect.width) * 100;
        targetY = ((e.clientY - rect.top) / rect.height) * 100;
      } else {
        isMouseInside = false;
      }
    }
    
    function handleMouseLeave() {
      isMouseInside = false;
    }
    
    // Smooth animation loop for particle movement
    function animateParticles() {
      // Smooth mouse position with easing
      mouseX += (targetX - mouseX) * 0.1;
      mouseY += (targetY - mouseY) * 0.1;
      
      const particleElements = particlesContainer.querySelectorAll('.particle');
      
      particleElements.forEach((particleEl, index) => {
        const particle = particles[index];
        const speedFactor = particle.speedFactor;
        
        // Calculate position with smooth easing and distance-based influence
        const distanceInfluence = 1 - (index / particleElements.length) * 0.8;
        
        if (!isMouseInside) {
          // Return to original position when mouse leaves
          particleEl.style.transform = `translate(0, 0)`;
          return;
        }
        
        const newX = ((mouseX - 50) * speedFactor * distanceInfluence);
        const newY = ((mouseY - 50) * speedFactor * distanceInfluence);
        
        // Apply transform with smooth transition
        particleEl.style.transform = `translate(${newX}px, ${newY}px)`;
      });
      
      requestAnimationFrame(animateParticles);
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    particlesContainer.addEventListener('mouseleave', handleMouseLeave);
    
    animateParticles();
    
    return particlesContainer;
  }

  // Create circuit lines
  function createCircuitLines() {
    const circuitContainer = document.createElement('div');
    circuitContainer.className = 'circuit-container';
    circuitContainer.style.position = 'absolute';
    circuitContainer.style.inset = '0';
    circuitContainer.style.overflow = 'hidden';
    circuitContainer.style.pointerEvents = 'none';
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.inset = '0';
    
    // Create gradients
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    const gradients = [
      { id: 'circuitGradient1', color1: 'rgba(236, 72, 153, 0.6)', color2: 'rgba(99, 102, 241, 0.6)' },
      { id: 'circuitGradient2', color1: 'rgba(99, 102, 241, 0.6)', color2: 'rgba(16, 185, 129, 0.6)' },
      { id: 'circuitGradient3', color1: 'rgba(16, 185, 129, 0.6)', color2: 'rgba(236, 72, 153, 0.6)' },
      { id: 'circuitGradient4', color1: 'rgba(168, 85, 247, 0.6)', color2: 'rgba(59, 130, 246, 0.6)' },
    ];
    
    gradients.forEach(gradient => {
      const linearGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      linearGradient.setAttribute('id', gradient.id);
      linearGradient.setAttribute('x1', '0%');
      linearGradient.setAttribute('y1', '0%');
      linearGradient.setAttribute('x2', '100%');
      linearGradient.setAttribute('y2', '0%');
      
      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', gradient.color1);
      
      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', gradient.color2);
      
      linearGradient.appendChild(stop1);
      linearGradient.appendChild(stop2);
      defs.appendChild(linearGradient);
    });
    
    svg.appendChild(defs);
    
    // Create circuit paths
    const paths = [
      { d: 'M0,30 C20,40 40,20 60,30 S80,50 100,30', gradient: 'url(#circuitGradient1)', top: '15%', delay: 0 },
      { d: 'M0,50 C30,30 50,70 70,50 S90,30 100,50', gradient: 'url(#circuitGradient2)', top: '35%', delay: 1 },
      { d: 'M0,70 C10,50 30,90 50,70 S80,50 100,70', gradient: 'url(#circuitGradient3)', top: '55%', delay: 2 },
      { d: 'M0,90 C20,70 40,110 60,90 S80,70 100,90', gradient: 'url(#circuitGradient4)', top: '75%', delay: 3 },
    ];
    
    paths.forEach(pathData => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', pathData.d);
      path.setAttribute('stroke', pathData.gradient);
      path.setAttribute('stroke-width', '1');
      path.setAttribute('fill', 'transparent');
      path.style.position = 'absolute';
      path.style.top = pathData.top;
      path.style.opacity = '0.2';
      path.style.strokeDasharray = '1000';
      path.style.strokeDashoffset = '1000';
      
      // Animate the path
      setTimeout(() => {
        path.style.transition = 'stroke-dashoffset 4s ease-in-out, opacity 4s ease-in-out';
        path.style.strokeDashoffset = '0';
        path.style.opacity = '0.6';
        
        // Loop the animation
        setInterval(() => {
          path.style.opacity = '0.2';
          path.style.strokeDashoffset = '1000';
          
          setTimeout(() => {
            path.style.opacity = '0.6';
            path.style.strokeDashoffset = '0';
          }, 500);
        }, 4500);
      }, pathData.delay * 1000);
      
      svg.appendChild(path);
    });
    
    // Create circuit nodes
    const nodePositions = [
      { x: 20, y: 15 }, { x: 50, y: 15 }, { x: 80, y: 15 },
      { x: 20, y: 45 }, { x: 50, y: 45 }, { x: 80, y: 45 },
      { x: 20, y: 75 }, { x: 50, y: 75 }, { x: 80, y: 75 },
    ];
    
    nodePositions.forEach((pos, index) => {
      const i = Math.floor(index / 3);
      const j = index % 3;
      
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', `${pos.x}%`);
      circle.setAttribute('cy', `${pos.y}%`);
      circle.setAttribute('r', '3');
      
      const colors = ['rgba(236, 72, 153, 0.6)', 'rgba(99, 102, 241, 0.6)', 'rgba(16, 185, 129, 0.6)'];
      circle.setAttribute('fill', colors[j]);
      
      circle.style.opacity = '0';
      circle.style.transform = 'scale(0)';
      circle.style.transformOrigin = 'center';
      circle.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
      
      // Animate the node
      setTimeout(() => {
        circle.style.opacity = '1';
        circle.style.transform = 'scale(1)';
        
        // Pulse animation
        setInterval(() => {
          circle.style.opacity = '0.8';
          circle.style.transform = 'scale(0.8)';
          
          setTimeout(() => {
            circle.style.opacity = '1';
            circle.style.transform = 'scale(1)';
          }, 500);
        }, 2000);
      }, (i * 0.5 + j * 0.3) * 1000);
      
      svg.appendChild(circle);
    });
    
    circuitContainer.appendChild(svg);
    return circuitContainer;
  }

  // Create shapes
  function createShapes() {
    const shapesContainer = document.createElement('div');
    shapesContainer.className = 'shapes-container';
    shapesContainer.style.position = 'absolute';
    shapesContainer.style.inset = '0';
    shapesContainer.style.overflow = 'hidden';
    shapesContainer.style.pointerEvents = 'none';
    
    shapes.forEach((shape, index) => {
      const shapeEl = document.createElement('div');
      shapeEl.className = `shape shape-${shape.type}`;
      shapeEl.style.position = 'absolute';
      
      // Set position
      if (shape.position.top) shapeEl.style.top = shape.position.top;
      if (shape.position.bottom) shapeEl.style.bottom = shape.position.bottom;
      if (shape.position.left) shapeEl.style.left = shape.position.left;
      if (shape.position.right) shapeEl.style.right = shape.position.right;
      
      // Set size
      shapeEl.style.width = `${shape.size.width}px`;
      shapeEl.style.height = `${shape.size.height}px`;
      
      // Set appearance
      shapeEl.style.backdropFilter = 'blur(8px)';
      shapeEl.style.border = `1px solid ${shape.borderColor}`;
      shapeEl.style.overflow = 'hidden';
      shapeEl.style.cursor = 'pointer';
      shapeEl.style.pointerEvents = 'auto';
      
      // Set clip path based on shape type
      if (shape.type === 'hexagon') {
        shapeEl.style.clipPath = 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)';
      } else if (shape.type === 'diamond') {
        shapeEl.style.clipPath = 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)';
      } else if (shape.type === 'circuit') {
        shapeEl.style.clipPath = 'polygon(0% 25%, 25% 0%, 75% 0%, 100% 25%, 100% 75%, 75% 100%, 25% 100%, 0% 75%)';
      } else if (shape.type === 'cube') {
        shapeEl.style.clipPath = 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)';
      }
      
      // Set initial state for animation
      shapeEl.style.opacity = '0';
      shapeEl.style.transform = 'scale(0.8)';
      shapeEl.style.transition = `opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease`;
      
      // Create inner content
      const innerEl = document.createElement('div');
      innerEl.className = 'shape-inner';
      innerEl.style.width = '100%';
      innerEl.style.height = '100%';
      innerEl.style.background = shape.color;
      innerEl.style.position = 'relative';
      
      // Add circuit pattern overlay
      const patternEl = document.createElement('div');
      patternEl.className = 'shape-pattern';
      patternEl.style.position = 'absolute';
      patternEl.style.inset = '0';
      patternEl.style.opacity = '0.3';
      
      // Add SVG pattern based on shape type
      patternEl.innerHTML = getShapePattern(shape.type);
      
      // Add glowing dot in center
      const dotContainer = document.createElement('div');
      dotContainer.className = 'dot-container';
      dotContainer.style.position = 'absolute';
      dotContainer.style.inset = '0';
      dotContainer.style.display = 'flex';
      dotContainer.style.alignItems = 'center';
      dotContainer.style.justifyContent = 'center';
      
      const dot = document.createElement('div');
      dot.className = 'glowing-dot';
      dot.style.width = '6px';
      dot.style.height = '6px';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = 'white';
      
      // Add pulsing animation to dot
      dot.style.animation = 'pulse-glow 2s infinite ease-in-out';
      dot.style.boxShadow = `0 0 5px 2px ${shape.glowColor}`;
      
      dotContainer.appendChild(dot);
      innerEl.appendChild(patternEl);
      innerEl.appendChild(dotContainer);
      shapeEl.appendChild(innerEl);
      
      // Start animation with delay
      setTimeout(() => {
        shapeEl.style.opacity = '1';
        shapeEl.style.transform = 'scale(1)';
        
        // Start floating animation
        animateShape(shapeEl, shape.animation, shape.duration);
      }, shape.delay * 1000);
      
      // Add hover effect
      shapeEl.addEventListener('mouseenter', () => {
        shapeEl.style.boxShadow = `0 0 10px 2px ${shape.glowColor}, 0 0 20px 5px ${shape.glowColor}`;
      });
      
      shapeEl.addEventListener('mouseleave', () => {
        shapeEl.style.boxShadow = 'none';
      });
      
      shapesContainer.appendChild(shapeEl);
    });
    
    return shapesContainer;
  }

  // Helper function to get SVG pattern based on shape type
  function getShapePattern(type) {
    if (type === 'circuit') {
      return `
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M10,30 L90,30" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M10,50 L90,50" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M10,70 L90,70" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M30,10 L30,90" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M50,10 L50,90" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M70,10 L70,90" stroke="currentColor" stroke-width="0.5" fill="none" />
          <circle cx="30" cy="30" r="3" fill="currentColor" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
          <circle cx="70" cy="70" r="3" fill="currentColor" />
          <circle cx="30" cy="70" r="3" fill="currentColor" />
          <circle cx="70" cy="30" r="3" fill="currentColor" />
        </svg>
      `;
    } else if (type === 'cube') {
      return `
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M20,20 L80,20 L80,80 L20,80 Z" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M35,35 L65,35 L65,65 L35,65 Z" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M20,20 L35,35" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M80,20 L65,35" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M20,80 L35,65" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M80,80 L65,65" stroke="currentColor" stroke-width="0.5" fill="none" />
        </svg>
      `;
    } else if (type === 'hexagon') {
      return `
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,20 L80,35 L80,65 L50,80 L20,65 L20,35 Z" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M50,35 L65,42.5 L65,57.5 L50,65 L35,57.5 L35,42.5 Z" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M50,20 L50,35" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M80,35 L65,42.5" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M80,65 L65,57.5" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M50,80 L50,65" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M20,65 L35,57.5" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M20,35 L35,42.5" stroke="currentColor" stroke-width="0.5" fill="none" />
        </svg>
      `;
    } else if (type === 'diamond') {
      return `
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,20 L80,50 L50,80 L20,50 Z" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M50,35 L65,50 L50,65 L35,50 Z" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M50,20 L50,35" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M80,50 L65,50" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M50,80 L50,65" stroke="currentColor" stroke-width="0.5" fill="none" />
          <path d="M20,50 L35,50" stroke="currentColor" stroke-width="0.5" fill="none" />
        </svg>
      `;
    }
    
    return '';
  }

  // Helper function to animate shapes
  function animateShape(element, animation, duration) {
    let startTime = null;
    const totalDuration = duration * 1000; // Convert to milliseconds
    
    function animate(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) % totalDuration;
      const progress = elapsed / totalDuration;
      
      // Calculate current values based on animation parameters
      let translateY = 0;
      if (animation.y) {
        const [start, middle, end] = animation.y;
        if (progress < 0.5) {
          // First half of animation (start to middle)
          translateY = start + (middle - start) * (progress * 2);
        } else {
          // Second half of animation (middle to end)
          translateY = middle + (end - middle) * ((progress - 0.5) * 2);
        }
      }
      
      let rotate = 0;
      if (animation.rotate) {
        const [start, middle, end] = animation.rotate;
        if (progress < 0.5) {
          rotate = start + (middle - start) * (progress * 2);
        } else {
          rotate = middle + (end - middle) * ((progress - 0.5) * 2);
        }
      }
      
      let scale = 1;
      if (animation.scale) {
        const [start, middle, end] = animation.scale;
        if (progress < 0.5) {
          scale = start + (middle - start) * (progress * 2);
        } else {
          scale = middle + (end - middle) * ((progress - 0.5) * 2);
        }
      }
      
      // Apply transforms
      element.style.transform = `translateY(${translateY}px) rotate(${rotate}deg) scale(${scale})`;
      
      requestAnimationFrame(animate);
    }
    
    requestAnimationFrame(animate);
  }

  // Initialize all components
  function init() {
    // Clear container first
    floatingShapesContainer.innerHTML = '';
    
    // Add particles
    const particlesContainer = createParticles();
    floatingShapesContainer.appendChild(particlesContainer);
    
    // Add circuit lines
    const circuitContainer = createCircuitLines();
    floatingShapesContainer.appendChild(circuitContainer);
    
    // Add shapes
    const shapesContainer = createShapes();
    floatingShapesContainer.appendChild(shapesContainer);
  }
  
  // Initialize
  init();
});