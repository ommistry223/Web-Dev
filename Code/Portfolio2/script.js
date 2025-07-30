document.addEventListener('DOMContentLoaded', ()=> {

    // --- Theme Toggle Logic ---
    const themeToggle=document.getElementById('theme-toggle');
    const htmlEl=document.documentElement;

    // Function to set theme
    const setTheme=(theme)=> {
      htmlEl.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }

    ;

    // Check for saved theme in localStorage
    const savedTheme=localStorage.getItem('theme') || 'dark'; // Default to dark
    setTheme(savedTheme);

    // Event listener for the toggle button
    themeToggle.addEventListener('click', ()=> {
        const currentTheme=htmlEl.getAttribute('data-theme');
        const newTheme=currentTheme==='dark' ? 'light' : 'dark';
        setTheme(newTheme);
      });

    // --- Custom Cursor Logic ---
    const cursor=document.querySelector('.cursor');

    document.addEventListener('mousemove', e=> {
        cursor.setAttribute('style', `top: $ {
            e.clientY
          }

          px; left: $ {
            e.clientX
          }

          px; `);
      });

    document.querySelectorAll('a, button, .magnetic-link').forEach(el=> {
        el.addEventListener('mouseenter', ()=> cursor.classList.add('hover'));
        el.addEventListener('mouseleave', ()=> cursor.classList.remove('hover'));
      });

    document.querySelectorAll('.btn-view-case').forEach(el=> {
        el.addEventListener('mouseenter', ()=> cursor.classList.add('pointer'));
        el.addEventListener('mouseleave', ()=> cursor.classList.remove('pointer'));
      });

    // --- GSAP Hero Animation ---
    const tl=gsap.timeline();

    tl.to('.hero-title span', {
      y: 0, duration: 1, stagger: 0.2, ease: 'power3.out'

    }) .to('.hero-subtitle', {
    opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'
  }

  , "-=0.5") .to('.btn', {
  opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'
}

, "-=0.6");

// --- Parallax Scroll ---
window.addEventListener('scroll', ()=> {
    const scrolled=window.scrollY;

    document.querySelectorAll('[data-speed]').forEach(el=> {
        const speed=el.dataset.speed;

        el.style.transform=`translateY($ {
            scrolled * speed
          }

          px)`;
      });
  });

// --- Magnetic Elements ---
document.querySelectorAll('.magnetic-link').forEach(el=> {
    el.addEventListener('mousemove', e=> {
        const {
          left, top, width, height
        }

        =el.getBoundingClientRect();
        const x=e.clientX - (left + width / 2);
        const y=e.clientY - (top + height / 2);

        gsap.to(el, {
          x: x * 0.4, y: y * 0.4, duration: 0.8, ease: 'elastic.out(1, 0.3)'
        });
    });

  el.addEventListener('mouseleave', ()=> {
      gsap.to(el, {
        x: 0, y: 0, duration: 0.5, ease: 'power2.out'
      });
  });
});

// --- 3D Tilt Effect ---
VanillaTilt.init(document.querySelectorAll(".project-card"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.5
});

// --- Project Modal Logic ---
const projectData= {
  one: {
    img: 'e-commerce-img.avif',
    title: 'E-commerce App',
    desc: 'A comprehensive e-commerce solution with features like product management, user authentication, a shopping cart, and a secure payment gateway. Built for performance and scalability with a focus on money management.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: '#'
  }

  ,
  two: {
    img: 'Rewear.jpg',
    title: 'ReWear Project',
    desc: 'A sustainability-focused application that allows users to list, discover, and purchase pre-owned clothing, promoting a circular fashion economy.',
    tech: ['Flutter', 'Firebase', 'Odoo'],
    link: 'https://github.com/Aryan-B-Parikh/Bash-Scripters_ODOO25'
  }

  ,
  three: {
    img: 'taffic_project.jpg',
    title: 'Smart Traffic Management System',
    desc: 'An IoT-based system designed to optimize traffic flow in urban areas using real-time data analysis and adaptive signal control, reducing congestion and improving road safety.',
    tech: ['Python', 'OpenCV', 'IoT', 'Flask'],
    link: 'https://github.com/urvalkheni/Tic_Tech_Toe/tree/main/code'
  }
}

;

const modal=document.getElementById('project-modal');
const modalClose=document.querySelector('.modal-close');

document.querySelectorAll('.btn-view-case').forEach(btn=> {
    btn.addEventListener('click', ()=> {
        const projectId=btn.dataset.project;
        const data=projectData[projectId];

        document.getElementById('modal-img').src=data.img;
        document.getElementById('modal-title').innerText=data.title;
        document.getElementById('modal-desc').innerText=data.desc;
        document.getElementById('modal-link').href=data.link;

        const techContainer=document.getElementById('modal-tech');
        techContainer.innerHTML='';

        data.tech.forEach(t=> {
            const techSpan=document.createElement('span');
            techSpan.innerText=t;
            techContainer.appendChild(techSpan);
          });

        modal.classList.add('active');
      });
  });

const closeModal=()=> modal.classList.remove('active');
modalClose.addEventListener('click', closeModal);

modal.addEventListener('click', e=> {
    if (e.target===modal) closeModal();
  });

// --- Set current year in footer ---
document.getElementById('year').textContent=new Date().getFullYear();
});
