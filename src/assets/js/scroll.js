import ScrollMagic from 'scrollmagic'

let controller = new ScrollMagic.Controller()

// Navbar

let navbar = document.querySelector('.navbar')
let i1 = 0
let i2 = 0

let navbarScene = new ScrollMagic.Scene()

navbarScene.on('update', function () {
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

// Reset if mouse is near
document.onmousemove = checkIfMouseIsNear

function checkIfMouseIsNear (event) {
  if (event.clientY < 200) {
    navbar.classList.remove('is-pushed-up')
    i2 = 0
    i1 = 0
  }
}

navbarScene.addTo(controller)

// Footer

let footerScene = new ScrollMagic.Scene({
  triggerElement: '.footer-placeholder',
  triggerHook: 'onEnter',
  offset: '250px'
})
footerScene.setClassToggle('#footer', 'is-active')

footerScene.addTo(controller)
