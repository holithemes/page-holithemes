/**
 * Hero Background Animation
 * Interactive particle system with mouse interaction
 */
document.addEventListener('DOMContentLoaded', function () {
  const canvas = document.getElementById('hero-background');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Variables
  let animationFrameId;
  let mouseX = canvas.width / 2;
  let mouseY = canvas.height / 2;
  const mouseRadius = 150;
  let isMouseMoving = false;
  let lastMouseX = mouseX;
  let lastMouseY = mouseY;
  let mouseSpeed = 0;
  let particles = [];
  let grid;
  let mouseTimer;

  // Initialize canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reset mouse position to avoid particle jumping
    mouseX = canvas.width / 2;
    mouseY = canvas.height / 2;

    // Recreate particles and grid
    createParticles();
    grid = new Grid();
  }

  // Handle mouse movement
  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;

    // Calculate mouse speed
    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;
    mouseSpeed = Math.sqrt(dx * dx + dy * dy);

    lastMouseX = mouseX;
    lastMouseY = mouseY;
    isMouseMoving = true;

    // Reset "not moving" timer
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
      isMouseMoving = false;
    }, 100);
  }

  // Create particles
  function createParticles() {
    particles = [];
    const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  // Particle class
  class Particle {
    constructor() {
      this.originalX = Math.random() * canvas.width;
      this.originalY = Math.random() * canvas.height;
      this.x = this.originalX;
      this.y = this.originalY;
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
      this.pulseDirection = Math.random() > 0.5 ? 1 : -1;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
    }

    update() {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      this.distanceFromMouse = Math.sqrt(dx * dx + dy * dy);

      const dynamicMouseRadius = mouseRadius + mouseSpeed * 2;

      if (this.distanceFromMouse < dynamicMouseRadius) {
        const angle = Math.atan2(dy, dx);
        const force = ((dynamicMouseRadius - this.distanceFromMouse) / dynamicMouseRadius) * 0.2;

        this.speedX += Math.cos(angle) * force;
        this.speedY += Math.sin(angle) * force;

        this.size = this.baseSize + force * 3;
        this.opacity = Math.min(this.maxOpacity, this.opacity + 0.03);
        this.hue = (this.hue + 1) % 360;
      } else {
        const dx = this.originalX - this.x;
        const dy = this.originalY - this.y;
        this.speedX += dx * 0.001;
        this.speedY += dy * 0.001;

        this.size = Math.max(this.baseSize, this.size - 0.1);
        this.opacity = Math.max(this.minOpacity, this.opacity - 0.01);
      }

      this.speedX *= 0.95;
      this.speedY *= 0.95;

      this.x += this.speedX;
      this.y += this.speedY;

      this.angle += this.rotationSpeed;

      this.size += this.pulseDirection * this.pulseSpeed;
      if (this.size > this.baseSize * 1.5 || this.size < this.baseSize * 0.7) {
        this.pulseDirection *= -1;
      }
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      const baseColor = `hsla(${this.hue}, 80%, 60%, ${this.opacity})`;

      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fillStyle = baseColor;
      ctx.fill();

      ctx.restore();
    }
  }

  // Grid class
  class Grid {
    constructor() {
      this.lines = [];

      for (let i = 0; i < canvas.height; i += 40) {
        this.lines.push({ x1: 0, y1: i, x2: canvas.width, y2: i, opacity: 0.05 });
      }

      for (let i = 0; i < canvas.width; i += 40) {
        this.lines.push({ x1: i, y1: 0, x2: i, y2: canvas.height, opacity: 0.05 });
      }
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

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

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

    grid.draw();

    particles.forEach((particle) => {
      particle.update();
      particle.draw();
    });

    animationFrameId = requestAnimationFrame(animate);
  }

  // Event listeners
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', handleMouseMove);

  // Initialize and start animation
  resizeCanvas();
  animate();

  // Cleanup on page unload
  window.addEventListener('unload', () => {
    window.removeEventListener('resize', resizeCanvas);
    window.removeEventListener('mousemove', handleMouseMove);
    cancelAnimationFrame(animationFrameId);
  });
});