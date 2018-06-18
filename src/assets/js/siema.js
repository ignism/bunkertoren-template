import Siema from 'siema'

let wrappers = document.querySelectorAll('.slider-wrapper')
let ticker = 0

wrappers.forEach(wrapper => {
  let slider
  let navItems = []

  for (let i = 0; i < wrapper.childElementCount; i++) {
    let child = wrapper.children[i]

    if (child.querySelector('.slider') !== null) {
      slider = child.querySelector('.slider')
    } else {
      let navbar = child.querySelector('.slider-navbar')

      if (navbar) {
        let navBarItems = navbar.querySelectorAll('.slider-nav-item')
        navBarItems.forEach(item => {
          navItems.push(item)
        })
      }
    }
  }

  const siema = new Siema({
    selector: slider,
    duration: 400,
    easing: 'ease-in-out',
    perPage: 1,
    startIndex: 0,
    draggable: true,
    multipleDrag: true,
    threshold: 20,
    loop: true,
    onChange: setActive
  })

  navItems.forEach(nav => {
    nav.addEventListener('click', event => {
      let index = nav.dataset.sliderIndex
      siema.goTo(index)
    })
  })

  function setActive () {
    let index = siema.currentSlide

    navItems.forEach(nav => {
      if (parseInt(nav.dataset.sliderIndex) === index) {
        nav.classList.add('is-active')
      } else {
        nav.classList.remove('is-active')
      }
    })
  }

  ticker++
})
