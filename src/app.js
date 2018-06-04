// Assets
import './assets/styles/style.scss'
import './assets/js/main.js'

let template = require('./templates/index.twig')
let html = template({
  title: 'hello world'
})

document.write(html)

console.log(html)
