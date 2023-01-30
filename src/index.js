import Post from './Post'
import './styles/styles.css'
import json from './assets/test.json'
import uplabLogo from './assets/uplab-logo.jpg'

const post = new Post('title', uplabLogo)

console.log('json: ', json)
console.log(post.toString())