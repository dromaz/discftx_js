import fs from 'fs'
import { postProcess } from '../src/interpret.js'
import { createOrder } from "../src/ftx/formatFTX.js"


let parsedScalpPost = JSON.parse(fs.readFileSync('../json/scalpChannelPost.json', 'utf-8'));
let parsedSwingPost = JSON.parse(fs.readFileSync('../json/swingChannelPost.json', 'utf-8'));

const POST = fs.readFileSync('../json/post2.txt', 'utf-8')

let myRegex = {
	Entry: /(?<=entry[\s:\-\.(\bnow\b)(\blower\b)\s$1]+)\d+(\.\d{1,3})?/g,
	StopLoss: /(?<=stop[\s:\-\.(\bnow\b)(\blower\b)\s$1]+)\d+(\.\d{1,3})?/g,
	TakeProfit: /(?<=(target|tp)[\s:\-\.(\bnow\b)(\blower\b)\s$1]+)\d+(\.\d{1,3})?/gm
}


	let scrappValie = postProcess(POST)
	if(scrappValie) {
		let order = createOrder(scrappValie)
		console.log(order)
}




