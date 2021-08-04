const {throttle} = require('lodash')
//import throttle from 'lodash/throttle'
class RevealOnScroll {
  constructor() {
    this.itensToReveal = document.querySelectorAll('.featured-item')
    this.hideInitially()
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
    this.events()
  }

  events() {
    window.addEventListener('scroll', this.scrollThrottle)
  }

  calcCaller() {
    this.itensToReveal.forEach( el => {
      if (!el.isRevealed) {
        this.calculateIfScrolledTo(el)
      }
    })
  }

  calculateIfScrolledTo(el) {
    const scrollPercent = (el.getBoundingClientRect().top / window.innerHeight) * 100
    if (scrollPercent < 75) {
      el.classList.add('reveal-item--is-visible')
      el.isRevealed = true
      if(el.isLastItem) {
        window.removeEventListener('scroll', this.scrollThrottle)
      }
    }
  }

  hideInitially() {
    this.itensToReveal.forEach( el => {
      // mark all elements as not revealead at startup
      el.isRevealed = false
      el.classList.add('reveal-item')
    })
    // mark last reveal item that appears in the DOM
    this.itensToReveal[this.itensToReveal.length - 1].isLastItem = true
  }
}

export default RevealOnScroll