let template = require('./templates/content.twig')
let html = template({
  title: 'titel'
})

document.write(html)
