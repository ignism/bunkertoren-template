function removeFullScreen () {
  let overlay = document.querySelector('.fullscreen-360')
  overlay.classList.remove('is-active')
  overlay.classList.remove('is-visible')

  let content = overlay.querySelector('.content')
  content.innerHTML = ''

  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  }
}

function addFullScreen () {
  let overlay = document.querySelector('.fullscreen-360')
  overlay.classList.add('is-active')
  overlay.classList.add('is-visible')

  if (overlay.requestFullscreen) {
    overlay.requestFullscreen()
  } else if (overlay.webkitRequestFullScreen) {
    overlay.webkitRequestFullScreen()
  } else if (overlay.mozRequestFullScreen) {
    overlay.mozRequestFullScreen()
  } else if (overlay.msRequestFullscreen) {
    overlay.msRequestFullscreen()
  }
}

if (document.body.classList.contains('has-360-views')) {
  let fullscreenButtons = document.querySelectorAll('.button-fullscreen')
  let overlay = document.querySelector('.fullscreen-360')
  let content = overlay.querySelector('.content')

  if (fullscreenButtons.length) {
    // IE fix
    fullscreenButtons = Array.prototype.slice.call(fullscreenButtons)
    fullscreenButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        event.preventDefault()

        let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
          (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
          (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
          (document.msFullscreenElement && document.msFullscreenElement !== null)

        if (!isInFullScreen) {
          let kuula = button.dataset.kuula

          let frame = '<iframe width="100%" height="100%" style="width: 100%; height: 100%; border: none;" frameborder="0" allow="vr,gyroscope,accelerometer,fullscreen" scrolling="no" allowfullscreen="true" style="max-width: 100%;" src="' + button.dataset.kuula + '?fs=0&vr=0&gyro=0&thumbs=1&hideinst=1&chromeless=1&logo=-1"></iframe>'

          content.innerHTML = frame

          addFullScreen()
        }
      })
    })

    let exitButton = document.querySelector('.button-exit-fullscreen')

    exitButton.addEventListener('click', (event) => {
      event.preventDefault()
      removeFullScreen()
    })
  }

  if (overlay.requestFullscreen) {
    document.onfullscreenchange = function (event) {
      let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null)

      if (!isInFullScreen) {
        removeFullScreen()
      }
    }
  } else if (overlay.webkitRequestFullScreen) {
    document.onwebkitfullscreenchange = function (event) {
      let isInFullScreen = (document.webkitFullscreenElement && document.webkitFullscreenElement !== null)

      if (!isInFullScreen) {
        removeFullScreen()
      }
    }
  } else if (overlay.mozRequestFullScreen) {
    document.onmozfullscreenchange = function (event) {
      let isInFullScreen = (document.mozFullScreenElement && document.mozFullScreenElement !== null)

      if (!isInFullScreen) {
        removeFullScreen()
      }
    }
  } else if (overlay.msRequestFullscreen) {
    document.MSFullscreenChange = function (event) {
      let isInFullScreen = (document.msFullscreenElement && document.msFullscreenElement !== null)

      if (!isInFullScreen) {
        removeFullScreen()
      }
    }
  }
}
