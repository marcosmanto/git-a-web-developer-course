const {throttle} = require('lodash')
import debounce from 'lodash/debounce'
class RevealOnScroll {
  constructor() {
    this.itensToReveal = document.querySelectorAll('.featured-item')
    this.browserHeight = window.innerHeight
    this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
    this.hideInitially()
    this.events()
  }

  events() {
    window.addEventListener('scroll', this.scrollThrottle)
    window.addEventListener('resize', debounce(() => {
      this.browserHeight = window.innerHeight
    },333))
  }

  calcCaller() {
    this.itensToReveal.forEach( el => {
      if (!el.isRevealed) {
        this.calculateIfScrolledTo(el)
      }
    })
  }

  calculateIfScrolledTo(el) {
    if (window.scrollY + this.browserHeight > el.offsetTop) {
      const scrollPercent = (el.getBoundingClientRect().top / this.browserHeight) * 100
      if (scrollPercent < 75) {
        el.classList.add('reveal-item--is-visible')
        el.isRevealed = true
        if(el.isLastItem) {
          window.removeEventListener('scroll', this.scrollThrottle)
        }
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