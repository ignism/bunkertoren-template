import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import DocumentOffset from 'document-offset'
import { TweenMax, ScrollToPlugin } from 'gsap/all'

let controller = new ScrollMagic.Controller()

// NAVBAR START ----------------------------------------------------------

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

// NAVBAR END ------------------------------------------------------------

// FOOTER START ----------------------------------------------------------

let footerScene = new ScrollMagic.Scene({
  triggerElement: '.footer-placeholder',
  triggerHook: 'onEnter',
  offset: '250px'
})
footerScene.setClassToggle('#footer', 'is-active')

footerScene.addTo(controller)

// FOOTER END ------------------------------------------------------------

// FLOATER START ---------------------------------------------------------

let floatingMessage
let triggerFrom
let triggerTo

if (document.body.classList.contains('has-floating-message')) {
  floatingMessage = document.querySelector('.floating-message')
  triggerFrom = document.querySelector('.float-trigger[data-trigger-from]')
  triggerTo = document.querySelector('.float-trigger[data-trigger-to]')

  let tween = TweenMax.fromTo(floatingMessage, 1,
    { marginTop: '-50px' },
    { marginTop: '50px', ease: Circ.easeOut }
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

// FLOATER END -----------------------------------------------------------

// LEES-MEER START -------------------------------------------------------

if (document.querySelectorAll('#lees-meer').length > 0) {
  let leesMeer = document.getElementById('lees-meer')

  leesMeer.addEventListener('click', event => {
    let belowLanding = document.querySelector('.below-landing')
    let top = DocumentOffset(belowLanding).top
    TweenMax.to(window, 1, { scrollTo: top, ease: Cubic.easeInOut })
  })
}

// LEES-MEER END ---------------------------------------------------------

// APPEAR START ----------------------------------------------------------

let appearElements = document.querySelectorAll('[data-appear]')

if (appearElements.length > 0) {
  // create containers
  appearElements.forEach(element => {
    let parent = element.parentElement

    let clone = element.cloneNode(true)
    
    let delay = element.dataset.appearDelay

    let spacer = document.createElement('div')
    spacer.classList.add('appear-spacer')
    spacer.appendChild(clone)

    let animator = document.createElement('div')
    animator.classList.add('appear-animator')
    animator.appendChild(element)
    animator.style.transitionDelay = delay

    let container = document.createElement('div')
    container.classList = element.classList
    
    container.classList.add('appear-container')
    element.classList = ''

    container.appendChild(spacer)
    container.appendChild(animator)

    parent.appendChild(container)
  })

  let animators = document.querySelectorAll('.appear-animator')
  // attach scroll effects
  animators.forEach(element => {
    let appearScene = new ScrollMagic.Scene({
      duration: 0,
      triggerElement: element,
      offset: getOffset(),
      // reverse: false
    })

    appearScene.setClassToggle(element, 'is-active') // add class toggle

    controller.addScene(appearScene)
  })
}

function getOffset () {
  return window.innerHeight / -4
}

// APPEAR END ------------------------------------------------------------

// NAVBAR START ----------------------------------------------------------

let sections = document.querySelectorAll('.section')

sections.forEach(section => {
  let backgroundScene = new ScrollMagic.Scene({
    duration: section.clientHeight,
    triggerElement: section,
    triggerHook: 'onLeave'
  })

  let backgroundClass = section.dataset.backgroundColor
  if (!backgroundClass) backgroundClass = 'white'
  backgroundScene.setClassToggle(navbar, backgroundClass)

  controller.addScene(backgroundScene)
})

// NAVBAR END ------------------------------------------------------------