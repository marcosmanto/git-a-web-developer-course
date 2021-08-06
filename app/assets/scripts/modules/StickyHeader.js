// import { throttle } from "lodash"
import { debounce } from 'lodash'
import throttle from 'lodash/throttle'

export default class StickHeader {
  constructor() {
    this.siteHeader = document.querySelector('.site-header')
    this.pageSections = document.querySelectorAll('.page-section')
    this.browserHeight = window.innerHeight
    this.previousScrollY = window.scrollY
    this.events()
  }

  events() {
    window.addEventListener('scroll', throttle(() => this.runOnScroll(), 200))
    window.addEventListener('resize', debounce(()=> this.browserHeight = window.innerHeight, 333))
  }

  runOnScroll() {
    this.determineScrollDirection()
    if (window.scrollY > 60) {
      this.siteHeader.classList.add('site-header--dark')
    } else {
      this.siteHeader.classList.remove('site-header--dark')
    }

    this.pageSections.forEach(el => this.calcSection(el))

  }

  determineScrollDirection() {
    if(window.scrollY > this.previousScrollY) {
      this.scrollDirection = 'down'
    } else {
      this.scrollDirection = 'up'
    }

    this.previousScrollY = window.scrollY
  }

  calcSection(el) {
    // filter calc action only if element is visible in viewport
    if (window.scrollY + this.browserHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight) {
      let scrollPercent = el.getBoundingClientRect().top / this.browserHeight * 100
      // console.log(scrollPercent)
      if (scrollPercent < 18 && scrollPercent > 0.1 && this.scrollDirection === 'down' ||
          scrollPercent < 33 && this.scrollDirection === 'up'
         ) {
        // console.log(this.scrollDirection)
        let matchingLink = el.getAttribute('data-matching-link')
        // console.log(matchingLink)
        document.querySelectorAll(`.primary-nav a:not(${matchingLink})`).forEach(linkEl => linkEl.classList.remove('is-current-link'))
        document.querySelector(matchingLink).classList.add('is-current-link')
      }
    }

  }

}