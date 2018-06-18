let template = require('./templates/single-appartments.twig')
let html = template({
  title: 'hello world'
})

document.write(html)
