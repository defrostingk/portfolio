'use strict';

// Navbar
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// Make navbar transparent when it is on the top
window.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when clicking the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const id = target.dataset.section;
  if (!id) return;
  navbarMenu.classList.remove('open');
  scrollToElementById(id);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');

navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// Handle scrolling when clicking the 'contact me' button
const homeContactBtn = document.querySelector('.home__contact');
const CONTACT_ID = 'contact';

homeContactBtn.addEventListener('click', () => scrollToElementById(CONTACT_ID));

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
const homeSectionContainer = home.querySelector('.section__container');

window.addEventListener(
  'scroll',
  () =>
    (homeSectionContainer.style.opacity =
      (homeHeight - window.scrollY) / homeHeight)
);

// Show 'arrow up' button when scrolling down
const arrowUpBtn = document.querySelector('.navbar__arrow-up-btn');
const HOME_ID = 'home';

window.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    arrowUpBtn.classList.add('visible');
  } else {
    arrowUpBtn.classList.remove('visible');
  }
});

// Handle click on the 'arrow up' button
arrowUpBtn.addEventListener('click', () => scrollToElementById(HOME_ID));

// Handle click categories
const categories = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

categories.addEventListener('click', (event) => {
  const category =
    event.target.dataset.category || event.target.parentNode.dataset.category;
  if (!category) return;

  // Remove selection from the previous item and select the new one
  const selected = document.querySelector('.category__btn.selected');
  selected.classList.remove('selected');
  const target =
    event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
  target.classList.add('selected');

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      const { type } = project.dataset;
      if (category === 'all' || category === type) {
        project.classList.remove('invisible');
      } else {
        project.classList.add('invisible');
      }
    });

    projectContainer.classList.remove('anim-out');
  }, 300);
});

// Scroll and make navbar menu active
const sectionIds = [
  'home',
  'about',
  'skills',
  'work',
  'testimonials',
  'contact',
];
const sections = sectionIds.map((id) => document.getElementById(id));
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-section="${id}"]`)
);
const MARGIN_VALUE = 20;
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function scrollToElementById(id) {
  const target = document.getElementById(id);
  const targetY = target.getBoundingClientRect().y;
  const navbarHeight = navbar.getBoundingClientRect().height;
  const distance = window.scrollY + targetY - navbarHeight;
  window.scroll({
    top: distance,
    left: window.scrollX,
    behavior: 'smooth',
  });
  selectNavItems(navItems[sectionIds.indexOf(id)]);
}

function selectNavItems(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};
const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(entry.target.id);
      // scroll down
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => observer.observe(section));

window.addEventListener('wheel', () => {
  if (window.scrollY < homeHeight * 0.3) {
    selectedNavIndex = 0;
  } else if (
    window.scrollY + MARGIN_VALUE >=
    document.body.clientHeight - window.innerHeight
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItems(navItems[selectedNavIndex]);
});
