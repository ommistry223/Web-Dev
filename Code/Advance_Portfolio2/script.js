document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.querySelector('.preloader');
  const progressBar = document.querySelector('.progress-bar .progress');

  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
    }
    progressBar.style.width = `${progress}%`;
  }, 200);

  window.addEventListener('load', function() {
    setTimeout(function() {
      preloader.style.opacity = '0';
      preloader.style.visibility = 'hidden';

      // Initialize animations after preloader hides
      initAnimations();
      initParticles();
      initThreeJS();
      initCustomCursor();
      initThemeToggle();
      initFloatingNav();
      initBackToTop();
      initMagneticButtons();
      initTooltips();
      initAOS();
      initSwiper();
      initCharts();
      initFormValidation();
      initProjectFilter();
      initProjectModal();
      initHamburgerMenu();
    }, 1000);
  });

  // Initialize Animations
  function initAnimations() {
    // Animate hero title
    const nameWrapper = document.querySelector('.name-wrapper');
    const names = document.querySelectorAll('.name');

    // GSAP animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.from('.hero .subtitle', {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out'
    });

    names.forEach((name, index) => {
      setTimeout(() => {
        gsap.to(name, {
          duration: 0.8,
          y: 0,
          opacity: 1,
          ease: 'back.out(1.7)',
          delay: index * 0.1
        });
      }, index * 200);
    });

    // Section headers
    gsap.utils.toArray('.section-header').forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    // Service cards
    gsap.utils.toArray('.service-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.1
      });
    });

    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: i * 0.1
      });
    });

    // Typing animation
    const typingElement = document.querySelector('.typing-text');
    const professions = ['Web Developer', 'UI/UX Designer', 'Mobile Developer', 'Freelancer'];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentProfession = professions[professionIndex];

      if (isDeleting) {
        typingElement.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        typingSpeed = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        typingSpeed = 500;
      }

      setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);

    // Animate progress bars
    const progressBars = document.querySelectorAll('.skill-progress');

    function animateProgressBars() {
      progressBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        gsap.to(bar, {
          width: `${width}%`,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bar,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        });
      });
    }

    animateProgressBars();
  }

  // Initialize Three.js Background
  function initThreeJS() {
    const container = document.getElementById('threejs-container');
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    // Geometry
    const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);

    // Material
    const material = new THREE.MeshBasicMaterial({
      color: 0x6c63ff,
      wireframe: true,
      transparent: true,
      opacity: 0.2
    });

    // Mesh
    const torus = new THREE.Mesh(geometry, material);
    scene.add(torus);

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      torus.rotation.x += 0.001;
      torus.rotation.y += 0.002;
      renderer.render(scene, camera);
    }

    // Handle resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
  }

  // Initialize Particles.js
  function initParticles() {
    if (document.getElementById('particles-js')) {
      particlesJS('particles-js', {
        "particles": {
          "number": {
            "value": 80,
            "density": {
              "enable": true,
              "value_area": 800
            }
          },
          "color": {
            "value": "#6c63ff"
          },
          "shape": {
            "type": "circle",
            "stroke": {
              "width": 0,
              "color": "#000000"
            },
            "polygon": {
              "nb_sides": 5
            }
          },
          "opacity": {
            "value": 0.5,
            "random": false,
            "anim": {
              "enable": false,
              "speed": 1,
              "opacity_min": 0.1,
              "sync": false
            }
          },
          "size": {
            "value": 3,
            "random": true,
            "anim": {
              "enable": false,
              "speed": 40,
              "size_min": 0.1,
              "sync": false
            }
          },
          "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#6c63ff",
            "opacity": 0.4,
            "width": 1
          },
          "move": {
            "enable": true,
            "speed": 2,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
              "enable": false,
              "rotateX": 600,
              "rotateY": 1200
            }
          }
        },
        "interactivity": {
          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "grab"
            },
            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },
          "modes": {
            "grab": {
              "distance": 140,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },
        "retina_detect": true
      });
    }
  }

  // Initialize Custom Cursor
  function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor--canvas');

    if (cursor && cursorFollower) {
      // Set up paper.js canvas
      paper.setup(cursorFollower);

      const path = new paper.Path.Circle({
        center: paper.view.center,
        radius: 20,
        fillColor: 'rgba(108, 99, 255, 0.2)',
        blendMode: 'difference'
      });

      let mousePos = paper.view.center;
      let followerPos = paper.view.center;

      // Track mouse movement
      document.addEventListener('mousemove', function(e) {
        mousePos = new paper.Point(e.clientX, e.clientY);
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });

      // Animate follower
      paper.view.onFrame = function(event) {
        const distance = followerPos.subtract(mousePos).length;
        const speed = Math.min(distance * 0.1, 20);
        followerPos = followerPos.add(mousePos.subtract(followerPos).normalize(speed));
        path.position = followerPos;

        // Scale effect on hover
        const hoverElements = document.querySelectorAll('a, button, .project-card, .service-card');
        let isHovering = false;

        hoverElements.forEach(el => {
          if (el.matches(':hover')) {
            isHovering = true;
          }
        });

        if (isHovering) {
          path.scale(1.5);
          cursor.style.transform = 'scale(2)';
        } else {
          path.scale(1);
          cursor.style.transform = 'scale(1)';
        }
      };
    }
  }

  // Initialize Theme Toggle
  function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
      themeToggle.checked = true;
    }

    // Toggle theme
    themeToggle.addEventListener('change', function() {
      if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      }
    });
  }

  // Initialize Floating Navigation
  function initFloatingNav() {
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('section');

    // Highlight active section
    function highlightActiveSection() {
      let currentSection = '';

      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (pageYOffset >= sectionTop - 300 && pageYOffset < sectionTop + sectionHeight - 300) {
          currentSection = section.getAttribute('id');
        }
      });

      navDots.forEach(dot => {
        dot.classList.remove('active');
        if (dot.getAttribute('href') === `#${currentSection}`) {
          dot.classList.add('active');
        }
      });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection();
  }

  // Initialize Back to Top Button
  function initBackToTop() {
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 500) {
        backToTop.classList.add('active');
      } else {
        backToTop.classList.remove('active');
      }
    });

    backToTop.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Initialize Magnetic Buttons
  function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.btn-magnetic');

    magneticButtons.forEach(button => {
      button.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const btnCircle = this.querySelector('.btn-circle');
        if (btnCircle) {
          btnCircle.style.left = x + 'px';
          btnCircle.style.top = y + 'px';
        }

        // Magnetic effect
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const distanceX = x - centerX;
        const distanceY = y - centerY;
        const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
        const strength = 15;

        if (distance < maxDistance) {
          const translateX = (distanceX / maxDistance) * strength;
          const translateY = (distanceY / maxDistance) * strength;
          this.style.transform = `translate(${translateX}px, ${translateY}px)`;
        }
      });

      button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
      });
    });
  }

  // Initialize Tooltips
  function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');

    tooltipElements.forEach(el => {
      el.addEventListener('mouseenter', function() {
        const tooltip = this.querySelector('[data-tooltip]') || this;
        const tooltipText = tooltip.getAttribute('data-tooltip');

        if (!tooltipText) return;

        const tooltipElement = document.createElement('div');
        tooltipElement.className = 'custom-tooltip';
        tooltipElement.textContent = tooltipText;
        document.body.appendChild(tooltipElement);

        const rect = this.getBoundingClientRect();
        const tooltipRect = tooltipElement.getBoundingClientRect();

        let top, left;

        if (this.classList.contains('nav-dot')) {
          top = rect.top + window.scrollY - tooltipRect.height - 10;
          left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;
        } else {
          top = rect.top + window.scrollY - tooltipRect.height - 10;
          left = rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;
        }

        tooltipElement.style.top = top + 'px';
        tooltipElement.style.left = left + 'px';
        tooltipElement.style.opacity = '1';

        this.addEventListener('mouseleave', function() {
          tooltipElement.remove();
        });
      });
    });
  }

  // Initialize AOS (Animate On Scroll)
  function initAOS() {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }

  // Initialize Swiper (Testimonials Slider)
  function initSwiper() {
    const testimonialSwiper = new Swiper('.testimonials-slider', {
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      }
    });
  }

  // Initialize Charts
  function initCharts() {
    const skillsChart = document.getElementById('skillsRadarChart');

    if (skillsChart) {
      const ctx = skillsChart.getContext('2d');
      const chart = new Chart(ctx, {
        type: 'radar',
        data: {
          labels: ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'UI/UX', 'Mobile'],
          datasets: [{
            label: 'Skills Level',
            data: [95, 90, 85, 80, 90, 75],
            backgroundColor: 'rgba(108, 99, 255, 0.2)',
            borderColor: 'rgba(108, 99, 255, 1)',
            borderWidth: 2,
            pointBackgroundColor: 'rgba(108, 99, 255, 1)',
            pointBorderColor: '#fff',
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(108, 99, 255, 1)',
            pointHoverBorderColor: '#fff',
            pointHitRadius: 10,
            pointBorderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.1)'
              },
              suggestedMin: 0,
              suggestedMax: 100,
              ticks: {
                backdropColor: 'transparent',
                color: 'rgba(255, 255, 255, 0.5)',
                font: {
                  size: 12
                }
              },
              pointLabels: {
                color: 'var(--text-color)',
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            }
          },
          elements: {
            line: {
              tension: 0.1
            }
          }
        }
      });
    }
  }

  // Initialize Form Validation
  function initFormValidation() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (this.checkValidity()) {
          // Form is valid, submit it (replace with actual form submission)
          const formData = new FormData(this);

          // Simulate form submission
          setTimeout(() => {
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent';
            submitBtn.disabled = true;

            // Reset form after 3 seconds
            setTimeout(() => {
              this.reset();
              submitBtn.innerHTML = 'Send Message';
              submitBtn.disabled = false;
            }, 3000);
          }, 1000);
        }

        this.classList.add('was-validated');
      }, false);
    }
  }

  // Initialize Project Filter
  function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        // Filter projects
        const filter = this.getAttribute('data-filter');

        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 100);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(2rem)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // Initialize Project Modal
  function initProjectModal() {
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.querySelector('.project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalContent = document.querySelector('.modal-content');

    if (projectCards.length && modal && modalClose && modalContent) {
      projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
          if (!e.target.closest('.project-links')) {
            const projectImage = this.querySelector('.project-image img').src;
            const projectTitle = this.querySelector('.project-info h3').textContent;
            const projectCategory = this.getAttribute('data-category');

            // Set modal content
            modalContent.innerHTML = `
              <div class="project-image">
                <img src="${projectImage}" alt="${projectTitle}">
              </div>
              <h3>${projectTitle}</h3>
              <span class="project-category">${projectCategory}</span>
              <p class="project-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
              <div class="project-details">
                <div class="detail-item">
                  <h4>Client</h4>
                  <p>ABC Company</p>
                </div>
                <div class="detail-item">
                  <h4>Date</h4>
                  <p>January 2023</p>
                </div>
                <div class="detail-item">
                  <h4>Category</h4>
                  <p>${projectCategory}</p>
                </div>
                <div class="detail-item">
                  <h4>Technologies</h4>
                  <p>React, Node.js, MongoDB</p>
                </div>
              </div>
              <div class="project-links">
                <a href="#" class="btn btn-primary">Live Demo</a>
                <a href="#" class="btn btn-secondary">View Code</a>
              </div>
            `;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
          }
        });
      });

      // Close modal
      modalClose.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });

      modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target === this.querySelector('.modal-overlay')) {
          modal.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }
  }

  // Initialize Hamburger Menu
  function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navbar) {
      hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navbar.classList.toggle('active');

        if (navbar.classList.contains('active')) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
        }
      });

      // Close menu when clicking on a link
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.addEventListener('click', function() {
          hamburger.classList.remove('active');
          navbar.classList.remove('active');
          document.body.style.overflow = '';
        });
      });
    }
  }

  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
});
