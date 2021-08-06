import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';



if(module.hot) {
  module.hot.accept()
}

if(navigator.userAgent.match(/chrome|opera/i))
{
  document.body.style.textShadow='rgba(0,0,0,0.31) 0px 0px 1px';
}

new RevealOnScroll(document.querySelectorAll('.featured-item'), 75)
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60)
const mobileMenu = new MobileMenu()