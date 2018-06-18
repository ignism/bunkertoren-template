let template = require('./templates/appartments.twig')
let html = template({
  title: 'hello world'
})

document.write(html)
