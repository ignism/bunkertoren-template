let template = require('./templates/pages/page-front.twig')
let html = template({
  title: 'Front Page'
})

document.write(html)
