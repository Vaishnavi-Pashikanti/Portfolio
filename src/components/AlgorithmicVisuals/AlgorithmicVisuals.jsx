import React, { useEffect, useRef } from 'react';
import './AlgorithmicVisuals.css';

const AlgorithmicVisuals = ({ darkMode }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mousePosition = { x: null, y: null };

    // Define Particle class
    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.baseX = x;
        this.baseY = y;
        this.density = Math.random() * 30 + 1;
        this.color = darkMode
          ? `rgba(${Math.floor(Math.random() * 100) + 150}, ${Math.floor(Math.random() * 100) + 150}, 255, 0.8)`
          : `rgba(0, ${Math.floor(Math.random() * 100) + 100}, ${Math.floor(Math.random() * 155) + 100}, 0.8)`;
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        if (mousePosition.x !== null && mousePosition.y !== null) {
          const dx = mousePosition.x - this.x;
          const dy = mousePosition.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;

          const maxDistance = 100;
          const force = (maxDistance - distance) / maxDistance;

          if (distance < maxDistance) {
            this.x -= forceDirectionX * force * this.density;
            this.y -= forceDirectionY * force * this.density;
          } else {
            this.x -= (this.x - this.baseX) / 10;
            this.y -= (this.y - this.baseY) / 10;
          }
        } else {
          this.x -= (this.x - this.baseX) / 10;
          this.y -= (this.y - this.baseY) / 10;
        }
      }
    }

    // Function to initialize particles
    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.min(Math.floor(canvas.width * canvas.height / 9000), 300);

      for (let i = 0; i < numberOfParticles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    // Resize canvas to fit container
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(); // Now it correctly initializes particles after resizing
    };

    // Set initial canvas size
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse position
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.x = e.clientX - rect.left;
      mousePosition.y = e.clientY - rect.top;
    });

    canvas.addEventListener('mouseleave', () => {
      mousePosition.x = null;
      mousePosition.y = null;
    });

    // Function to connect particles with lines if they're close enough
    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = darkMode
              ? `rgba(150, 150, 255, ${1 - distance / 100})`
              : `rgba(0, 100, 150, ${1 - distance / 100})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].draw();
        particles[i].update();
      }

      connectParticles();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationRef.current);
    };
  }, [darkMode]);

  return <canvas ref={canvasRef} className="algorithmic-canvas" />;
};

export default AlgorithmicVisuals;
