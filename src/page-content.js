let template = require('./templates/pages/page-content.twig')
let html = template({
  title: 'Content Page'
})

document.write(html)
