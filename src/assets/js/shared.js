
// fix twig import, wait for load shit
if (window.attachEvent) {
  window.attachEvent('onload', windowLoaded)
} else {
  window.addEventListener('load', windowLoaded)
}

function windowLoaded () {
  require('./navbar.js')
  require('./scroll.js')
  require('./siema.js')
}
