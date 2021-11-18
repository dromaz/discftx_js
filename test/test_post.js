import fs from 'fs'
import { postProcess } from '../src/interpret.js'


let parsedScalpPost = JSON.parse(fs.readFileSync('../json/scalpChannelPost.json', 'utf-8'));
let parsedSwingPost = JSON.parse(fs.readFileSync('../json/swingChannelPost.json', 'utf-8'));

const POST = fs.readFileSync('../json/post.txt', 'utf-8')

let myRegex = {
	Entry: /(?<=entry[\s:\-\.(\bnow\b)(\blower\b)\s$]+)\d+(\.\d{1,3})?/g
}

parsedSwingPost.forEach(post => {
	console.log(post)
	let value = post
		.toLowerCase()
		.match(myRegex.Entry)
	if(value) {
		console.log("Find : ", value)
	}
	console.log("********************")
})



