let burger = document.querySelector('.navbar-burger')
let menu = document.querySelector('.navbar-menu')
let navbar = document.querySelector('.navbar')

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
