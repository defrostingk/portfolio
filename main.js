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
  const distance = window.pageYOffset + targetY - navbarHeight;
  window.scroll({
    top: distance,
    left: 0,
    behavior: 'smooth',
  });
}

// Handle scrolling when clicking the 'contact me' button
const homeContactBtn = document.querySelector('.home__contact');
const CONTACT_ID = 'contact';

homeContactBtn.addEventListener('click', () => scrollToElementById(CONTACT_ID));
