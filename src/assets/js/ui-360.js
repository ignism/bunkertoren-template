let fullscreenButtons = document.querySelectorAll('.button-fullscreen')
let overlay = document.querySelector('.fullscreen-360')
let content = overlay.querySelector('.content')

if (fullscreenButtons.length) {
  fullscreenButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault()

      let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null)

      if (!isInFullScreen) {
        let target = document.getElementById(button.dataset.target)
        let currentScript = target.innerHTML

        content.innerHTML = currentScript

        addFullScreen()
      }
    })
  })

  let exitButton = document.querySelector('.button-exit-fullscreen')

  exitButton.addEventListener('click', (event) => {
    event.preventDefault()

    let isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
      (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
      (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
      (document.msFullscreenElement && document.msFullscreenElement !== null)

    if (isInFullScreen) {
      content.innerHTML = ''
      removeFullScreen()
    }
  })
}

function removeFullScreen () {
  overlay.classList.remove('is-active')
  overlay.classList.remove('is-visible')

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
