let template = require('./templates/index.twig')
let html = template({
  title: 'hello world'
})

document.write(html)
