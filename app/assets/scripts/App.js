import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickHeader from './modules/StickyHeader';
import ClientArea from './modules/ClientArea';
import 'lazysizes'

if(module.hot) {
  module.hot.accept()
}

if(navigator.userAgent.match(/chrome|opera/i))
{
  document.body.style.textShadow='rgba(0,0,0,0.31) 0px 0px 1px';
}

new RevealOnScroll(document.querySelectorAll('.featured-item'), 75)
new RevealOnScroll(document.querySelectorAll('.testimonial'), 60)
new StickHeader()
new MobileMenu()
new ClientArea()

let modal
document.querySelectorAll('.open-modal').forEach( el => {
  el.addEventListener('click', event => {
    event.preventDefault()
    if (typeof modal === 'undefined') {
      import(/* webpackChunkName: "modal" */'./modules/Modal').then(x => {
        modal = new x.default()
        setTimeout(() => modal.openTheModal(), 20)
      }).catch(() => console.log('There was a problem.'))
    } else {
      modal.openTheModal()
    }
  })
})