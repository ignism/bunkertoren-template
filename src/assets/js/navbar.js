let burger = document.querySelector('.navbar-burger')
let menu = document.querySelector('.navbar-menu')
let navbar = document.querySelector('.navbar')
let navLinks = document.querySelectorAll('.nav-link')

burger.addEventListener('click', (event) => {
  if (burger.classList.contains('is-active')) {
    burger.classList.remove('is-active')
    menu.classList.remove('is-active')
    navbar.classList.remove('is-active')
  } else {
    burger.classList.add('is-active')
    menu.classList.add('is-active')
    navbar.classList.add('is-active')
  }
})

navLinks = Array.prototype.slice.call(navLinks)

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    burger.classList.remove('is-active')
    menu.classList.remove('is-active')
    navbar.classList.remove('is-active')
  })
})

let contact = document.querySelector('.navbar-contact')

contact.addEventListener('click', (event) => {
  event.preventDefault()

  document.body.classList.toggle('has-footer-open')
})

window.onscroll = closeFooter

function closeFooter () {
  document.body.classList.remove('has-footer-open')
}
