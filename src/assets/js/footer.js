import ScrollMagic from 'scrollmagic'

let controller = new ScrollMagic.Controller()

let scene = new ScrollMagic.Scene({
  triggerElement: '.footer-placeholder',
  triggerHook: 'onEnter',
  offset: '250px'
})
scene.setClassToggle('#footer', 'is-active')

scene.addTo(controller)
