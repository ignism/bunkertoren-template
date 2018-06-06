// import 'imports-loader?define=>false!animation.gsap';
import ScrollMagic from 'scrollmagic'
// import 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators';
// import {TweenMax} from 'gsap/TweenMax';
// import {TweenLite} from 'gsap/TweenLite';
// import {ScrollToPlugin} from "gsap/ScrollToPlugin";
import 'animation.gsap'
import DocumentOffset from 'document-offset'
import { TweenMax } from 'gsap'

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

let floatingMessage;
let triggerFrom;
let triggerTo;

if (document.body.classList.contains('is-frontpage')) {
  floatingMessage = document.querySelector('.floating-message')
  triggerFrom = document.querySelector('.float-trigger[data-trigger-from]')
  triggerTo = document.querySelector('.float-trigger[data-trigger-to]')

  let tween = TweenMax.fromTo(floatingMessage, 1,
    {marginTop: '-50px'},
    {marginTop: '50px', ease: Circ.easeOut}
  )

  let floatingScene1 = new ScrollMagic.Scene({
    triggerElement: triggerFrom,
    duration: getUnpinPos(triggerFrom, triggerTo, floatingMessage)
  })
  floatingScene1.setPin(floatingMessage)
  floatingScene1.on('progress', onProgress)
  floatingScene1.setTween(tween)

  let floatingScene2 = new ScrollMagic.Scene({
    duration: 0,
    triggerElement: triggerFrom
  })

  floatingScene2.setClassToggle(floatingMessage, 'is-active') // add class toggle

  controller.addScene(floatingScene1)
  controller.addScene(floatingScene2)
}

function getUnpinPos (from, to, self) {
  let pos = Math.floor(DocumentOffset(to).top) - Math.floor(DocumentOffset(from).top) - Math.floor(self.offsetHeight)
  return pos
}

function onProgress (event) {
  event.currentTarget.duration(getUnpinPos(triggerFrom, triggerTo, floatingMessage))
}