let template = require('./templates/about.twig')
let html = template({
  title: 'Over Bunkertoren'
})

document.write(html)
