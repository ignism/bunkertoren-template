
// fix twig import, wait for load
if (window.attachEvent) {
  window.attachEvent('onload', windowLoaded)
} else {
  window.addEventListener('load', windowLoaded)
}

function windowLoaded () {
  require('./navbar.js')
  require('./footer.js')
}
