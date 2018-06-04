let template = require('./templates/front.twig')
let html = template({
  title: 'Front Page'
})

document.write(html)
