window.addEventListener('load', () => {
  const preloader = document.querySelector('#preloader');
  preloader.classList.remove('active');

  const heroLeft = document.querySelector('.hero-left');
  const heroRight = document.querySelector('.hero-right');
  heroLeft.classList.add('animate');
  heroRight.classList.add('animate');
});

document.addEventListener('DOMContentLoaded', () => {
  // Mobile navigation
  const openMenu = document.querySelector('#menu-btn');
  const closeMenu = document.querySelector('#close-btn');
  const menu = document.querySelector('#nav-list');

  // Open the mobile naviation when the user clicks the burget icon
  openMenu.addEventListener('click', () => {
    menu.classList.add('open-nav');
  });

  // Close the mobile navigation when the user clicks the X icon
  closeMenu.addEventListener('click', () => {
    menu.classList.remove('open-nav');
  });

  // Close the mobile navigation when the user clicks a link inisde the mobile naivation
  menu.addEventListener('click', (event) => {
    if (event.target.tagName === 'A' || event.target.tagName === 'SPAN') {
      menu.classList.remove('open-nav');
    }
  });

  // Disable smooth scrolling on firefox for android (there is a bug)
  const isFirefox = /Android.+Firefox\//.test(navigator.userAgent);
  if (isFirefox) {
    document.documentElement.style.scrollBehavior = 'auto';
  }

  // Active section indicator based on the url hash
  const VALID_SECTION_NAMES = ['about', 'news', 'study-programs', 'contact'];
  window.addEventListener('hashchange', () => {
    let urlHash = window.location.hash.toLowerCase();
    if (!urlHash) {
      urlHash = '#about';
    }

    if (!VALID_SECTION_NAMES.includes(urlHash.slice(1))) {
      return;
    }

    const activeLink = document.querySelector('#nav-list .active');
    if (activeLink) {
      activeLink.classList.remove('active');
    }

    const newActiveLink = document.querySelector(
      `#nav-list a[href$='${urlHash}']`
    );
    if (newActiveLink) {
      newActiveLink.parentNode.classList.add('active');
    }
  });

  // Active section indicator based on the section visibility
  const sections = document.querySelectorAll(
    '#about, #news, #study-programs, #contact'
  );

  const width = window.innerWidth;
  let intersectionRatio = 0.5;
  if (width <= 500) {
    intersectionRatio = 0.1;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.map((entry) => {
        const link = document.querySelector(
          `#nav-list a[href$='${'#' + entry.target.id}']`
        );
        if (
          entry.isIntersecting &&
          entry.intersectionRatio > intersectionRatio
        ) {
          document
            .querySelector('#nav-list .active')
            .classList.remove('active');
          link.parentElement.classList.add('active');
        }
      });
    },
    { threshold: intersectionRatio }
  );
  sections.forEach((section) => {
    observer.observe(section);
  });
});
