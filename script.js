/**
 * Portfolio Personal - Script interactivo principal (Vanilla JS)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar Iconos de Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // --- 1. MODO OSCURO / CLARO ---
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  const htmlElement = document.documentElement;

  // Cargar preferencia guardada o del sistema
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    htmlElement.classList.add('dark');
  } else {
    htmlElement.classList.remove('dark');
  }

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      htmlElement.classList.toggle('dark');
      const isDark = htmlElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  });

  // --- 2. MENÚ NAVEGACIÓN MÓVIL ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    mobileMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // --- 3. EFECTO MECANOGRÁFICO (TYPEWRITER) EN HERO ---
  const typfullElement = document.getElementById('typing-text');
  if (typfullElement) {
    const roles = [
      'Desarrolladora Full Stack',
      'Especialista Frontend & React',
      'Diseñadora UI/UX & Web'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typfullElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typfullElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2000; // Pausa al completar la palabra
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500; // Pausa antes de la siguiente palabra
      }

      setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
  }

  // --- 4. FILTRADO DE PROYECTOS ---
  const filterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remover clase activa de todos los botones
      filterBtns.forEach(b => {
        b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
        b.classList.add('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      });

      // Añadir activa al botón presionado
      btn.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      btn.classList.remove('bg-slate-200', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // --- 5. MODAL DE DETALLES DE PROYECTOS ---
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalOverlay = document.getElementById('modal-overlay');
  const viewDetailBtns = document.querySelectorAll('.view-project-detail');

  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalTags = document.getElementById('modal-tags');
  const modalDemoLink = document.getElementById('modal-demo-link');
  const modalGithubLink = document.getElementById('modal-github-link');

  // Datos detallados de los proyectos
  const projectData = {
    '1': {
      title: 'Plataforma Analytics & Dashboard Web',
      category: 'Full Stack',
      image: './assets/images/project1.jpg',
      description: 'Plataforma empresarial de métricas en tiempo real. Incluye autenticación con JWT, integración de bases de datos PostgreSQL, renderizado dinámico de gráficas interactivas mediante Chart.js/D3 y un panel de administración configurable con múltiples dashboards visuales.',
      tags: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Node.js', 'PostgreSQL', 'REST API'],
      demoUrl: 'https://example.com/demo1',
      githubUrl: 'https://github.com/example/analytics-dashboard'
    },
    '2': {
      title: 'E-Commerce Móvil & Web App',
      category: 'Frontend & UX',
      image: './assets/images/project2.jpg',
      description: 'Tienda en línea completa con diseño móvil optimizado, carrito de compras persistente con localStorage, pasarela de pago integrada mediante Stripe SDK, filtros de productos multimodales y buscador con autocompletado en tiempo real.',
      tags: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Stripe API', 'Responsive UX'],
      demoUrl: 'https://example.com/demo2',
      githubUrl: 'https://github.com/example/ecommerce-app'
    },
    '3': {
      title: 'Workspace de Tareas & Productividad IA',
      category: 'UI/UX & Frontend',
      image: './assets/images/project3.jpg',
      description: 'Gestor de proyectos estilo Kanban interactivo con soporte de drag-and-drop, organización por listas, prioridades, recordatorios inteligentes y categorización automática asistida por Inteligencia Artificial.',
      tags: ['HTML5', 'Tailwind CSS', 'JavaScript', 'OpenAI API', 'LocalStorage'],
      demoUrl: 'https://example.com/demo3',
      githubUrl: 'https://github.com/example/ai-task-manager'
    }
  };

  function openModal(id) {
    const data = projectData[id];
    if (!data || !projectModal) return;

    modalTitle.textContent = data.title;
    modalImage.src = data.image;
    modalImage.alt = data.title;
    modalDescription.textContent = data.description;
    
    if (modalDemoLink) modalDemoLink.href = data.demoUrl;
    if (modalGithubLink) modalGithubLink.href = data.githubUrl;

    // Renderizar badges de tecnologías
    modalTags.innerHTML = '';
    data.tags.forEach(tag => {
      const badge = document.createElement('span');
      badge.className = 'px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800';
      badge.textContent = tag;
      modalTags.appendChild(badge);
    });

    projectModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!projectModal) return;
    projectModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      openModal(projectId);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && !projectModal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // --- 6. FORMULARIO DE CONTACTO INTERACTIVO ---
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const messageInput = document.getElementById('contact-message');
      const submitBtn = contactForm.querySelector('button[type="submit"]');

      if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
        showFormMessage('Por favor, completa todos los campos requeridos.', 'error');
        return;
      }

      // Animación de envío
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Enviando mensaje...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        contactForm.reset();
        showFormMessage('¡Mensaje enviado con éxito! Me pondré en contacto contigo muy pronto.', 'success');
        if (window.lucide) window.lucide.createIcons();
      }, 1500);
    });
  }

  function showFormMessage(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `p-4 rounded-xl text-sm font-medium transition-all duration-300 ${
      type === 'success' 
        ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800' 
        : 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-800'
    }`;
    formStatus.classList.remove('hidden');

    setTimeout(() => {
      formStatus.classList.add('hidden');
    }, 6000);
  }

  // --- 7. BOTÓN VOLVER ARRIBA & ACTIVE SCROLL SPY ---
  const backToTopBtn = document.getElementById('back-to-top');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Visibilidad del botón de volver arriba
    if (window.scrollY > 400) {
      backToTopBtn?.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn?.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      backToTopBtn?.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn?.classList.remove('opacity-100', 'pointer-events-auto');
    }

    // ScrollSpy para resaltar menú activo
    let currentSectionId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-blue-600', 'dark:text-blue-400', 'font-bold');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('text-blue-600', 'dark:text-blue-400', 'font-bold');
      }
    });
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
