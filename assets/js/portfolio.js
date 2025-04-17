/**
 * Portfolio section functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Portfolio category filtering
  const categoryTabs = document.querySelectorAll('.category-tab');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  // Initialize portfolio items with animation attributes
  portfolioItems.forEach(item => {
    item.setAttribute('data-visible', 'true');
    item.setAttribute('data-animated', 'true');
  });

  // Add click event to category tabs
  categoryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      categoryTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.getAttribute('data-category');

      // Filter portfolio items
      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');

        if (category === 'all' || category === itemCategory) {
          item.setAttribute('data-visible', 'true');
          setTimeout(() => {
            item.setAttribute('data-animated', 'true');
          }, 50);
        } else {
          item.setAttribute('data-animated', 'false');
          setTimeout(() => {
            item.setAttribute('data-visible', 'false');
          }, 300);
        }
      });
    });
  });

  // Portfolio modal functionality
  const detailButtons = document.querySelectorAll('.details-btn');
  const modalContainer = document.querySelector('.portfolio-modal-container');
  const modals = document.querySelectorAll('.portfolio-modal');
  const closeButtons = document.querySelectorAll('.modal-close');

  // Open modal when details button is clicked
  detailButtons.forEach(button => {
    button.addEventListener('click', () => {
      const projectId = button.getAttribute('data-project');
      const targetModal = document.getElementById(`${projectId}-modal`);

      if (targetModal) {
        modalContainer.classList.add('active');
        modals.forEach(modal => modal.classList.remove('active'));
        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      }
    });
  });

  // Close modal when close button or outside is clicked
  function closeModal() {
    modalContainer.classList.remove('active');
    modals.forEach(modal => modal.classList.remove('active'));
    document.body.style.overflow = ''; // Restore scrolling
  }

  closeButtons.forEach(button => {
    button.addEventListener('click', closeModal);
  });

  modalContainer.addEventListener('click', (e) => {
    if (e.target === modalContainer) {
      closeModal();
    }
  });

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
      closeModal();
    }
  });
});
