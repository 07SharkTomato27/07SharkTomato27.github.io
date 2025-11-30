document.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
          document.querySelector('.card').classList.add('is-animated');
        }, 300);
      });
      AOS.init();
