let template = require('./templates/pages/page-appartments.twig')
let html = template({
  title: 'Appartments Page'
})

document.write(html)
