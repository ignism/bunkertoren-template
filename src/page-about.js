let template = require('./templates/pages/page-about.twig')
let html = template({
  title: 'About Page'
})

document.write(html)
