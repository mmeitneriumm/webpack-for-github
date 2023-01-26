import Post from './Post'
import './styles/styles.css'
import json from './assets/test.json'

const post = new Post('title')

console.log('json: ', json)
console.log(post.toString())