'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });
}



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// Check if testimonials elements exist
if (modalContainer && overlay) {
  // modal toggle function
  const testimonialsModalFunc = function () {
    modalContainer.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  // add click event to all modal items
  if (testimonialsItem.length > 0 && modalImg && modalTitle && modalText) {
    for (let i = 0; i < testimonialsItem.length; i++) {
      testimonialsItem[i].addEventListener("click", function () {
        const avatar = this.querySelector("[data-testimonials-avatar]");
        const title = this.querySelector("[data-testimonials-title]");
        const text = this.querySelector("[data-testimonials-text]");

        if (avatar && title && text) {
          modalImg.src = avatar.src;
          modalImg.alt = avatar.alt;
          modalTitle.innerHTML = title.innerHTML;
          modalText.innerHTML = text.innerHTML;
          testimonialsModalFunc();
        }
      });
    }
  }

  // add click event to modal close button
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", testimonialsModalFunc);
  }

  overlay.addEventListener("click", testimonialsModalFunc);
}



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

// Only add event listeners if elements exist
if (select) {
  select.addEventListener("click", function () { elementToggleFunc(this); });

  // add event in all select items
  for (let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener("click", function () {
      let selectedValue = this.innerText.toLowerCase();
      if (selectValue) selectValue.innerText = this.innerText;
      elementToggleFunc(select);
      filterFunc(selectedValue);
    });
  }
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

// Only define filter function if filter items exist
if (filterItems.length > 0) {
  const filterFunc = function (selectedValue) {
    for (let i = 0; i < filterItems.length; i++) {
      if (selectedValue === "all") {
        filterItems[i].classList.add("active");
      } else if (selectedValue === filterItems[i].dataset.category) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }

  // add event in all filter button items for large screen
  if (filterBtn.length > 0) {
    let lastClickedBtn = filterBtn[0];

    for (let i = 0; i < filterBtn.length; i++) {
      filterBtn[i].addEventListener("click", function () {
        let selectedValue = this.innerText.toLowerCase();

        // Only update selectValue if it exists
        if (selectValue) {
          selectValue.innerText = this.innerText;
        }

        filterFunc(selectedValue);

        if (lastClickedBtn) {
          lastClickedBtn.classList.remove("active");
        }

        this.classList.add("active");
        lastClickedBtn = this;
      });
    }
  }
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// Handle form submission without page redirect
if (form) {
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Show sending state
    const originalBtnText = formBtn.innerHTML;
    formBtn.innerHTML = '<ion-icon name="sync-outline"></ion-icon><span>Sending...</span>';
    formBtn.classList.add('sending');

    // Get form data
    const formData = new FormData(form);

    // Send data using fetch API
    fetch(form.action, {
      method: form.method,
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then(data => {
      // Success state
      form.reset();
      formBtn.setAttribute('disabled', '');
      formBtn.innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon><span>Message Sent!</span>';
      formBtn.classList.remove('sending');
      formBtn.classList.add('success');

      // Reset button after 3 seconds
      setTimeout(() => {
        formBtn.innerHTML = originalBtnText;
        formBtn.classList.remove('success');
      }, 3000);
    })
    .catch(error => {
      // Error state
      console.error('Error:', error);
      formBtn.innerHTML = '<ion-icon name="alert-circle-outline"></ion-icon><span>Failed to Send</span>';
      formBtn.classList.remove('sending');
      formBtn.classList.add('error');

      // Reset button after 3 seconds
      setTimeout(() => {
        formBtn.innerHTML = originalBtnText;
        formBtn.classList.remove('error');
      }, 3000);
    });
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Debugging info
console.log('Navigation links found:', navigationLinks.length);
console.log('Page sections found:', pages.length);

// Function to log all pages and their data-page attributes
function logPageInfo() {
  console.log('Pages and their data-page attributes:');
  pages.forEach((page, index) => {
    console.log(`Page ${index}: data-page="${page.dataset.page}", classList=${page.classList}`);
  });
}

// Function to log all navigation links and their text
function logNavInfo() {
  console.log('Navigation links and their text:');
  navigationLinks.forEach((link, index) => {
    console.log(`Link ${index}: text="${link.textContent.trim()}", classList=${link.classList}`);
  });
}

// Log initial state
logPageInfo();
logNavInfo();

// Function to activate a page by name
function activatePage(pageName) {
  console.log(`Attempting to activate page: ${pageName}`);

  // First, remove active class from all pages and navigation links
  pages.forEach(page => page.classList.remove('active'));
  navigationLinks.forEach(link => link.classList.remove('active'));

  // Then activate the matching page and link
  let pageFound = false;
  let linkFound = false;

  // Find and activate the page
  pages.forEach(page => {
    if (page.dataset.page === pageName) {
      page.classList.add('active');
      pageFound = true;
      console.log(`Activated page: ${pageName}`);
    }
  });

  // Find and activate the link
  navigationLinks.forEach(link => {
    if (link.textContent.trim().toLowerCase() === pageName) {
      link.classList.add('active');
      linkFound = true;
      console.log(`Activated link for: ${pageName}`);
    }
  });

  // Scroll to top
  window.scrollTo(0, 0);

  // Log results
  if (!pageFound) console.warn(`No page found with data-page="${pageName}"`);
  if (!linkFound) console.warn(`No link found with text="${pageName}"`);

  return { pageFound, linkFound };
}

// Add click event to all navigation links
navigationLinks.forEach(link => {
  link.addEventListener('click', function() {
    const pageName = this.textContent.trim().toLowerCase();
    console.log(`Navigation link clicked: ${pageName}`);
    activatePage(pageName);
  });
});

// Initialize - ensure one page is active
window.addEventListener('DOMContentLoaded', () => {
  // Check if any page is already active
  const hasActivePage = Array.from(pages).some(page => page.classList.contains('active'));

  if (!hasActivePage && pages.length > 0) {
    // If no page is active, activate the first one
    const firstPage = pages[0];
    const pageName = firstPage.dataset.page;
    console.log(`No active page found. Activating first page: ${pageName}`);
    activatePage(pageName);
  } else {
    console.log('A page is already active on load');
  }
});


// Pixie Dust Animation for Navbar
const navbar = document.querySelector('.navbar');

// Create hover effect that follows cursor
navbar.addEventListener('mousemove', (e) => {
  const rect = navbar.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / navbar.offsetWidth) * 100;
  const y = ((e.clientY - rect.top) / navbar.offsetHeight) * 100;

  navbar.style.setProperty('--x', `${x}%`);
  navbar.style.setProperty('--y', `${y}%`);

  // Create pixie dust particles on mouse move
  createPixieDust(e.clientX - rect.left, e.clientY - rect.top);
});

// Function to create pixie dust particles
function createPixieDust(x, y) {
  // Only create particles occasionally for performance
  if (Math.random() > 0.3) return;

  const particle = document.createElement('div');
  particle.className = 'pixie-dust';

  // Random size
  const size = Math.random() * 4 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  // Position at mouse
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  // Random animation duration
  const duration = Math.random() * 2 + 1;
  particle.style.animationDuration = `${duration}s`;

  // Random delay
  const delay = Math.random() * 0.5;
  particle.style.animationDelay = `${delay}s`;

  // Random direction
  const angle = Math.random() * 360;
  const distance = Math.random() * 50 + 10;
  particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;

  // Random color from Catppuccin palette
  const colors = [
    'var(--ctp-mauve)',
    'var(--ctp-pink)',
    'var(--ctp-lavender)',
    'var(--ctp-blue)',
    'var(--ctp-sapphire)'
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  particle.style.backgroundColor = color;

  // Add to navbar
  navbar.appendChild(particle);

  // Remove after animation completes
  setTimeout(() => {
    particle.remove();
  }, (duration + delay) * 1000);
}