class RevealOnScroll {
  constructor() {
    this.itensToReveal = document.querySelectorAll('.featured-item')
    this.hideInitially()
    this.events()
  }

  events() {
    window.addEventListener('scroll', () => {
      this.itensToReveal.forEach( el => {
        this.calculateIfScrolledTo(el)
      })
    })
  }

  calculateIfScrolledTo(el) {
    const scrollPercent = (el.getBoundingClientRect().top / window.innerHeight) * 100
    if (scrollPercent < 75) {
      el.classList.add('reveal-item--is-visible')
    }
  }

  hideInitially() {
    this.itensToReveal.forEach( el => el.classList.add('reveal-item'))
  }
}

export default RevealOnScroll