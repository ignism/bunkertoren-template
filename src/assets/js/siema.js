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
        if (navbar.classList.contains('is-double')) {
          let navbarTop = child.querySelector('.slider-navbar.top')
          let navbarBottom = child.querySelector('.slider-navbar.bottom')
          let navBarItemsTop = navbarTop.querySelectorAll('.slider-nav-item')
          let navBarItemsBottom = navbarBottom.querySelectorAll('.slider-nav-item')

          // IE fix
          navBarItemsTop = Array.prototype.slice.call(navBarItemsTop)
          navBarItemsTop.forEach(item => {
            navItems.push(item)
          })

          navBarItemsBottom = Array.prototype.slice.call(navBarItemsBottom)
          navBarItemsBottom.forEach(item => {
            navItems.push(item)
          })
        } else {
          let navBarItems = navbar.querySelectorAll('.slider-nav-item')
          // IE fix
          navBarItems = Array.prototype.slice.call(navBarItems)
          navBarItems.forEach(item => {
            navItems.push(item)
          })
        }
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

  if (wrapper.classList.contains('is-automatic')) {
    let intervalDelay = wrapper.dataset.sliderDelay
    window.setInterval(() => {
      siema.next()
      console.log('tick')
    }, intervalDelay)
  }

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
