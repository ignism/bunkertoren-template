import ScrollMagic from 'scrollmagic'

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

let controller = new ScrollMagic.Controller()

let i1 = 0
let i2 = 0

let scene = new ScrollMagic.Scene()

scene.on('update', function () {
  let x1 = controller.info('scrollDirection')
  let x2 = window.scrollY
  let x3 = 400
  if (x1 === 'REVERSE' && x2 >= x3 && i1 === 0) {
    i1++
    i2 = 0
    navbar.classList.remove('is-pushed-up')
  }
  if (x1 === 'FORWARD' && x2 > x3 && i2 === 0) {
    i1 = 0
    i2++
    navbar.classList.add('is-pushed-up')
  }
})

scene.addTo(controller)

document.onmousemove = checkIfMouseIsNear

function checkIfMouseIsNear (event) {
  if (event.clientY < 200) {
    navbar.classList.remove('is-pushed-up')
    i2 = 0
    i1 = 0
  }
}
