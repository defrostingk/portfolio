'use strict';

// Navbar
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

// Make navbar transparent when it is on the top
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when clicking the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (event) => {
  const id = event.target.dataset.section;
  if (!id) return;
  scrollToElementById(id);
});

function scrollToElementById(id) {
  const target = document.getElementById(id);
  const targetY = target.getBoundingClientRect().y;
  const distance = window.scrollY + targetY - navbarHeight;
  window.scroll({
    top: distance,
    left: window.scrollX,
    behavior: 'smooth',
  });
}

// Handle scrolling when clicking the 'contact me' button
const homeContactBtn = document.querySelector('.home__contact');
const CONTACT_ID = 'contact';

homeContactBtn.addEventListener('click', () => scrollToElementById(CONTACT_ID));

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('#home');
const homeHeight = home.getBoundingClientRect().height;
const homeSectionContainer = home.querySelector('.section__container');

document.addEventListener(
  'scroll',
  () =>
    (homeSectionContainer.style.opacity =
      (homeHeight - window.scrollY) / homeHeight)
);

// Show 'arrow up' button when scrolling down
const arrowUpBtn = document.querySelector('.navbar__arrow-up-btn');
const HOME_ID = 'home';

document.addEventListener('scroll', () => {
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
