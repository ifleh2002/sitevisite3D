// Smooth scroll functionality
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('.nav__menu a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });

  // Smooth scrolling for footer links
  const footerLinks = document.querySelectorAll('.footer__column a[href^="#"]');
  footerLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      scrollToSection(targetId);
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Animate service cards on scroll
  const serviceCards = document.querySelectorAll('.service__card');
  serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(card);
  });

  // Animate hotel cards on scroll
  const hotelCards = document.querySelectorAll('.hotel__card');
  hotelCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.15}s`;
    observer.observe(card);
  });

  // Animate testimonial cards on scroll
  const testimonialCards = document.querySelectorAll('.testimonial__card');
  testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s`;
    observer.observe(card);
  });

  // Animate feature cards on scroll
  const featureCards = document.querySelectorAll('.feature__card');
  featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(card);
  });

  // Animate step cards on scroll
  const stepCards = document.querySelectorAll('.step__card');
  stepCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.2}s`;
    observer.observe(card);
  });

  // Animate ROI stats on scroll
  const roiItems = document.querySelectorAll('.roi__item');
  roiItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
    observer.observe(item);
  });

  // Animate hotel stats on scroll
  const hotelStats = document.querySelectorAll('.hotel__stat');
  hotelStats.forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.transform = 'scale(0.9)';
    stat.style.transition = `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`;
    observer.observe(stat);
  });

  // Counter animation for statistics
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
      start += increment;
      if (start < target) {
        element.textContent = Math.floor(start);
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    }
    
    updateCounter();
  }

  // Observe stats for counter animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const number = entry.target.querySelector('.stat__number, .hotel__stat-number');
        if (number) {
          const text = number.textContent;
          
          // Extract numeric value for animation
          const match = text.match(/(\d+)/);
          if (match) {
            const targetValue = parseInt(match[1]);
            number.textContent = '0' + text.replace(/\d+/, '');
            
            setTimeout(() => {
              const currentText = number.textContent;
              animateCounter({
                textContent: (value) => {
                  number.textContent = currentText.replace('0', value);
                }
              }, targetValue);
            }, 500);
          }
        }
        
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  // Observe hero stats
  const heroStats = document.querySelectorAll('.stat');
  heroStats.forEach(stat => {
    statsObserver.observe(stat);
  });

  // Observe hotel stats
  const hotelStatsContainer = document.querySelectorAll('.hotel__stat');
  hotelStatsContainer.forEach(stat => {
    statsObserver.observe(stat);
  });

  // Add click handlers for CTA buttons
  const ctaButtons = document.querySelectorAll('.btn--primary');
  ctaButtons.forEach(button => {
    if (button.textContent.includes('Découvrir')) {
      button.addEventListener('click', () => scrollToSection('services'));
    } else if (button.textContent.includes('démo')) {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        // Simulate demo request
        showNotification('Demande de démo envoyée ! Nous vous contacterons sous peu.', 'success');
      });
    }
  });

  // Hotels section image hover effects
  const hotelImages = document.querySelectorAll('.hotel__image img, .hotel__riad-detail img');
  hotelImages.forEach(img => {
    img.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.05)';
      this.style.transition = 'transform 0.3s ease';
    });
    
    img.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Hero image parallax effect for hotels section
  const hotelsHeroImage = document.querySelector('.hotels-hero-image img');
  if (hotelsHeroImage) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const hotelsSection = document.querySelector('.hotels-riads');
      
      if (hotelsSection) {
        const sectionTop = hotelsSection.offsetTop;
        const sectionHeight = hotelsSection.offsetHeight;
        
        if (scrolled >= sectionTop - window.innerHeight && scrolled <= sectionTop + sectionHeight) {
          const rate = (scrolled - sectionTop) * -0.2;
          hotelsHeroImage.style.transform = `translateY(${rate}px)`;
        }
      }
    });
  }

  // Notification system
  function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <div class="notification__content">
        <span class="notification__message">${message}</span>
        <button class="notification__close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    // Add styles for notification
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-base);
      padding: var(--space-16);
      box-shadow: var(--shadow-lg);
      z-index: 1000;
      max-width: 400px;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    `;

    const content = notification.querySelector('.notification__content');
    content.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-16);
    `;

    const message_el = notification.querySelector('.notification__message');
    message_el.style.cssText = `
      color: var(--color-text);
      font-size: var(--font-size-sm);
      line-height: var(--line-height-normal);
    `;

    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.style.cssText = `
      background: none;
      border: none;
      font-size: var(--font-size-lg);
      color: var(--color-text-secondary);
      cursor: pointer;
      padding: 0;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    // Add type-specific styling
    if (type === 'success') {
      notification.style.borderLeftColor = 'var(--color-success)';
      notification.style.borderLeftWidth = '4px';
    }

    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.opacity = '1';
      notification.style.transform = 'translateX(0)';
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  }

  // Add hover effects to service cards
  serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (this.style.opacity === '1') {
        this.style.transform = 'translateY(0)';
      } else {
        this.style.transform = 'translateY(30px)';
      }
    });
  });

  // Add hover effects to hotel cards
  hotelCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (this.style.opacity === '1') {
        this.style.transform = 'translateY(0) scale(1)';
      } else {
        this.style.transform = 'translateY(30px) scale(1)';
      }
    });
  });

  // Add interactive effects to testimonial cards
  testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = 'var(--shadow-lg)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (this.style.opacity === '1') {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-sm)';
      } else {
        this.style.transform = 'translateY(30px)';
      }
    });
  });

  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  const heroImage = document.querySelector('.hero__image');
  
  if (hero && heroImage) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.3;
      
      if (scrolled < hero.offsetTop + hero.offsetHeight) {
        heroImage.style.transform = `translateY(${rate}px)`;
      }
    });
  }

  // Add loading effect for images
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    img.addEventListener('load', function() {
      this.style.opacity = '1';
    });
    
    // Set initial opacity
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
    
    // If already loaded
    if (img.complete) {
      img.style.opacity = '1';
    }
  });

  // Add table responsiveness enhancement
  const table = document.querySelector('.table');
  if (table) {
    const tableWrapper = table.parentNode;
    
    // Add scroll indicators
    function updateScrollIndicators() {
      const isScrolledLeft = tableWrapper.scrollLeft > 0;
      const isScrolledRight = tableWrapper.scrollLeft < (tableWrapper.scrollWidth - tableWrapper.clientWidth - 1);
      
      tableWrapper.classList.toggle('scrolled-left', isScrolledLeft);
      tableWrapper.classList.toggle('scrolled-right', isScrolledRight);
    }
    
    tableWrapper.addEventListener('scroll', updateScrollIndicators);
    window.addEventListener('resize', updateScrollIndicators);
    updateScrollIndicators();
  }

  // Highlight hotel pricing plans on hover
  const hotelPlanRows = document.querySelectorAll('.hotel-plan');
  hotelPlanRows.forEach(row => {
    row.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
      this.style.transition = 'transform 0.2s ease';
    });
    
    row.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
    });
  });

  // Enhanced mobile menu functionality (for future use)
  function createMobileMenu() {
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav__menu');
    
    if (window.innerWidth <= 768 && navMenu) {
      // Hide menu items on mobile but keep structure for larger screens
      navMenu.style.display = 'none';
    } else if (navMenu) {
      navMenu.style.display = 'flex';
    }
  }
  
  window.addEventListener('resize', createMobileMenu);
  createMobileMenu();

  // Add smooth reveal animation for hotels hero image
  const hotelsHeader = document.querySelector('.hotels-header');
  if (hotelsHeader) {
    const hotelsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const heroImg = entry.target.querySelector('.hotels-hero-image img');
          if (heroImg) {
            heroImg.style.transform = 'scale(1)';
            heroImg.style.opacity = '1';
          }
          hotelsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    // Set initial state
    const heroImg = hotelsHeader.querySelector('.hotels-hero-image img');
    if (heroImg) {
      heroImg.style.transform = 'scale(0.9)';
      heroImg.style.opacity = '0';
      heroImg.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
    }

    hotelsObserver.observe(hotelsHeader);
  }

  // Add interactive partner items
  const partnerItems = document.querySelectorAll('.partner__item');
  partnerItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.boxShadow = 'var(--shadow-md)';
      this.style.transition = 'all 0.2s ease';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'var(--shadow-sm)';
    });
  });

  console.log('visite3D application with Hotels & Riads section initialized successfully!');
});

// Global function to make notification system available
window.showNotification = function(message, type = 'info') {
  // This function is duplicated here to make it globally accessible
  // Remove existing notifications
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification--${type}`;
  notification.innerHTML = `
    <div class="notification__content">
      <span class="notification__message">${message}</span>
      <button class="notification__close" onclick="this.parentElement.parentElement.remove()">×</button>
    </div>
  `;

  // Add styles for notification
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    padding: var(--space-16);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    max-width: 400px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  `;

  const content = notification.querySelector('.notification__content');
  content.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-16);
  `;

  const message_el = notification.querySelector('.notification__message');
  message_el.style.cssText = `
    color: var(--color-text);
    font-size: var(--font-size-sm);
    line-height: var(--line-height-normal);
  `;

  const closeBtn = notification.querySelector('.notification__close');
  closeBtn.style.cssText = `
    background: none;
    border: none;
    font-size: var(--font-size-lg);
    color: var(--color-text-secondary);
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  // Add type-specific styling
  if (type === 'success') {
    notification.style.borderLeftColor = 'var(--color-success)';
    notification.style.borderLeftWidth = '4px';
  }

  document.body.appendChild(notification);

  // Animate in
  requestAnimationFrame(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);
};