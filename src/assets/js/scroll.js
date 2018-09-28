import ScrollMagic from 'scrollmagic'
import 'animation.gsap'
import DocumentOffset from 'document-offset'
import { TweenMax, ScrollToPlugin } from 'gsap/all' // eslint-disable-line

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

let f = document.getElementById('footer')
let fPlaceholder = document.querySelector('.footer-placeholder')

console.log(f.height)

fPlaceholder.style.height = f.clientHeight + 'px'
let offsetPlaceholder = (f.clientHeight / 2) + 'px'

let footerScene = new ScrollMagic.Scene({
  triggerElement: '.footer-placeholder',
  triggerHook: 'onEnter',
  offset: offsetPlaceholder
})
footerScene.setClassToggle('#footer', 'is-active')

let footerBodyScene = new ScrollMagic.Scene({
  triggerElement: '.footer',
  triggerHook: 'onEnter'
})
footerBodyScene.setClassToggle('body', 'scrolled-footer-open')

footerScene.addTo(controller)
footerBodyScene.addTo(controller)

// FOOTER END ------------------------------------------------------------

// FLOATER START ---------------------------------------------------------

if (document.body.classList.contains('has-floating-message')) {
  let floatWrappers = document.querySelectorAll('.float-wrapper')
  floatWrappers = Array.prototype.slice.call(floatWrappers)

  floatWrappers.forEach(wrapper => {
    let floatingMessage
    let triggerFrom
    let triggerTo

    floatingMessage = wrapper.querySelector('.floating-message')
    triggerFrom = wrapper.querySelector('.float-trigger[data-trigger-from]')
    triggerTo = wrapper.querySelector('.float-trigger[data-trigger-to]')

    let tween = TweenMax.fromTo(floatingMessage, 1,
      { marginTop: '-50px' },
      { marginTop: '50px', ease: Circ.easeOut } // eslint-disable-line
    )

    let floatingScene1 = new ScrollMagic.Scene({
      triggerElement: triggerFrom,
      duration: getUnpinPos(triggerFrom, triggerTo, floatingMessage)
    })
    floatingScene1.setPin(floatingMessage)
    floatingScene1.on('progress', function (event) {
      onProgress(event, triggerFrom, triggerTo, floatingMessage)
    })
    floatingScene1.setTween(tween)

    let floatingScene2 = new ScrollMagic.Scene({
      duration: 0,
      triggerElement: triggerFrom
    })

    floatingScene2.setClassToggle(floatingMessage, 'is-active') // add class toggle

    controller.addScene(floatingScene1)
    controller.addScene(floatingScene2)
  })
}

function getUnpinPos (from, to, self) {
  let pos = Math.floor(DocumentOffset(to).top) - Math.floor(DocumentOffset(from).top) - Math.floor(self.offsetHeight)
  return pos
}

function onProgress (event, from, to, message) {
  event.currentTarget.duration(getUnpinPos(from, to, message))
}

// FLOATER END -----------------------------------------------------------

// SCROLL-DOWN START -----------------------------------------------------

if (document.querySelector('.button-scroll-down')) {
  let leesMeer = document.querySelector('.button-scroll-down')

  leesMeer.addEventListener('click', event => {
    let afterSplash = document.querySelector('.after-splash')
    let top = DocumentOffset(afterSplash).top
    TweenMax.to(window, 1, { scrollTo: top, ease: Cubic.easeInOut })     // eslint-disable-line
  })
}

let urlVariables = getUrlVariables()

if (Object.keys(urlVariables).length) {
  if (urlVariables.jump) {
    let jump = '.' + urlVariables.jump
    let target = document.querySelector(jump)
    let top = DocumentOffset(target).top
    TweenMax.to(window, 1, { scrollTo: top, ease: Cubic.easeInOut })
  }
}

function getUrlVariables () {
  var variables = {}
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    variables[key] = value
  })
  return variables
}

// SCROLL-DOWN END -------------------------------------------------------

// APPEAR START ----------------------------------------------------------

let appearElements = document.querySelectorAll('[data-appear]')
// IE fix
appearElements = Array.prototype.slice.call(appearElements)

if (appearElements.length > 0) {
  // create containers
  appearElements.forEach(element => {
    let parent = element.parentElement

    let clone = element.cloneNode(true)
    clone.className = ''

    let delay = element.dataset.appearDelay

    let spacer = document.createElement('div')
    spacer.classList.add('appear-spacer')
    spacer.appendChild(clone)

    let animator = document.createElement('div')
    animator.classList.add('appear-animator')
    animator.appendChild(element)
    animator.style.transitionDelay = delay

    let container = document.createElement('div')
    container.className = element.className

    container.classList.add('appear-container')
    element.className = ''

    container.appendChild(spacer)
    container.appendChild(animator)

    parent.appendChild(container)
  })

  let animators = document.querySelectorAll('.appear-animator')
  // IE fix
  animators = Array.prototype.slice.call(animators)
  // attach scroll effects

  animators.forEach(element => {
    let appearScene = new ScrollMagic.Scene({
      duration: 0,
      triggerElement: element,
      offset: getOffset()
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

// NAVBAR / FOOTER COLORING START ----------------------------------------

let sections = document.querySelectorAll('.section')
sections = Array.prototype.slice.call(sections)

let header = document.querySelector('header.header')

if (header) {
  sections.unshift(header)
}

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

let footerBackgroundClass = sections[sections.length - 1].dataset.backgroundColor
if (!footerBackgroundClass) footerBackgroundClass = 'white'

let footerPlaceholder = document.querySelector('.footer-placeholder')

if (footerPlaceholder) {
  footerPlaceholder.classList.add(footerBackgroundClass)
}

// NAVBAR / FOOTER COLORING END ------------------------------------------
