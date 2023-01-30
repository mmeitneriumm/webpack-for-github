import * as $ from 'jquery'
import Post from '@models/Post'
import '@styles/styles.css'
import json from '@assets/test.json'
import uplabLogo from '@assets/uplab-logo.jpg'
import xml from '@assets/plant_catalog.xml'
import csv from '@assets/example.csv'

const post = new Post('title', uplabLogo)

$('pre').html(post.toString())

console.log('XML: ', xml)
console.log('CSV: ', csv)
console.log(post.toString())