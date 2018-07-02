import Siema from 'siema'

let wrappers = document.querySelectorAll('.slider-wrapper')
// IE fix
wrappers = Array.prototype.slice.call(wrappers)

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
        // IE fix
        navBarItems = Array.prototype.slice.call(navBarItems)
        navBarItems.forEach(item => {
          navItems.push(item)
        })

        console.log(navBarItems)
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

        if (nav.classList.contains('nav-item-360')) {
          let subtitle = document.querySelector('.subtitle-360-' + nav.dataset.sliderIndex)
          let subtitleMobile = document.querySelector('.subtitle-360-' + nav.dataset.sliderIndex + '-mobile')
          subtitle.classList.add('is-active')
          subtitleMobile.classList.add('is-active')
        } else {
          let id = nav.dataset.sliderId
          let subtitle = document.querySelector('.slide-subtitle-' + id + '-' + nav.dataset.sliderIndex)
          let subtitleMobile = document.querySelector('.slide-subtitle-' + id + '-' + nav.dataset.sliderIndex + '-mobile')

          if (subtitle != null) {
            subtitle.classList.add('is-active')
          }
          if (subtitleMobile != null) {
            subtitleMobile.classList.add('is-active')
          }
        }
      } else {
        nav.classList.remove('is-active')

        if (nav.classList.contains('nav-item-360')) {
          let subtitle = document.querySelector('.subtitle-360-' + nav.dataset.sliderIndex)
          let subtitleMobile = document.querySelector('.subtitle-360-' + nav.dataset.sliderIndex + '-mobile')
          subtitle.classList.remove('is-active')
          subtitleMobile.classList.remove('is-active')
        } else {
          let id = nav.dataset.sliderId
          let subtitle = document.querySelector('.slide-subtitle-' + id + '-' + nav.dataset.sliderIndex)
          let subtitleMobile = document.querySelector('.slide-subtitle-' + id + '-' + nav.dataset.sliderIndex + '-mobile')

          console.log(subtitle)

          if (subtitle != null) {
            subtitle.classList.remove('is-active')
          }
          if (subtitleMobile != null) {
            subtitleMobile.classList.remove('is-active')
          }
        }
      }
    })
  }
})
