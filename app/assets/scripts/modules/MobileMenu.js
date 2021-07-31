class MobileMenu {
  constructor() {
    this.menuIcon = document.querySelector('.site-header__menu-icon')
    this.menuContent = document.querySelectorAll('.site-header__menu-content')
    this.siteHeader = document.querySelector('.site-header')
    this.events()
  }

  events() {
    this.menuIcon.addEventListener('click', this.toggleTheMenu.bind(this))
    //this.menuIcon.onclick = this.toggleTheMenu.bind(this)
    //this.menuIcon.addEventListener('click', () => this.toggleTheMenu())
  }

  toggleTheMenu() {
    this.siteHeader.classList.toggle('site-header--is-expanded')
    this.menuContent.forEach(el => el.classList.toggle('site-header__menu-content--is-visible'))
    this.menuIcon.classList.toggle('site-header__menu-icon--close-x')
  }
}

export default MobileMenu