let hs = document.querySelectorAll('h1')
// IE fix
hs = Array.prototype.slice.call(hs)

hs.forEach(h => {
  let innerHTML = h.innerHTML.substr(1)
  let constructed = h.innerHTML.charAt(0)

  h.innerHTML = '<span class="constructed">' + constructed + '</span>' + innerHTML
})
