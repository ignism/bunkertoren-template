let hs = document.querySelectorAll('h1')

hs.forEach(h => {
  let innerHTML = h.innerHTML.substr(1)
  let constructed = h.innerHTML.charAt(0)

  h.innerHTML = '<span class="constructed">' + constructed + '</span>' + innerHTML
})
