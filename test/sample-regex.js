import { postProcess } from '../src/interpret.js';  
import fs from 'fs';
import { createOrder, addSize } from '../src/ftx/formatFTX.js'; 
import { calculateSize, getUSDBalance } from "../src/ftx/FtxRequest.js";
import hash from "object-hash";
let parsedScalpPost = JSON.parse(fs.readFileSync('../json/scalpChannelPost.json', 'utf-8'));
let parsedSwingPost = JSON.parse(fs.readFileSync('../json/swingChannelPost.json', 'utf-8'));

//getUSDBalance().then(console.log).catch(console.log)


let counter = 0;
parsedScalpPost.forEach(async post => {
	counter++
	let scrappValue = postProcess(post)
	if(scrappValue) {
	let order = createOrder(scrappValue)
	order = await addSize(order)
	console.log(hash(order))
	} else {
		console.log(counter)
	}
})


