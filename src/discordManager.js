import discord from "discord.js";
import fs from 'fs';
import axios from 'axios';
import { TOKEN } from "./config.js";
import { postProcess } from "./interpret.js"; 
import hash from "object-hash";
import { createOrder, addSize } from "./ftx/formatFTX.js";
import { clientWS, sendTriggerOrder, sendOrder } from "./ftx/FtxRequest.js";

const dClient = new discord.Client();
const channels = ['671977297829429255', '502725058511372288'];
const AvoidDuplicate = new Map();
const ManageOrder = new Map();

function listen() {
	dClient.login(TOKEN);
	
	dClient.on('message', msg => {

		callbackProcessMessage(msg, channels)
	});

	dClient.on('messageUpdate', msg => {

	callbackProcessMessage(msg, channels)
	});

	clientWS.subscribe('fills')

	clientWS.on('update', data => {
		if(data.data && ManageOrder.has(data.data.orderId)) {
			let order = ManageOrder.get(data.data.orderId)
			sendTriggerOrder(order.StopLoss);
			sendTriggerOrder(order.TakeProfit);
			ManageOrder.delete(data.data.orderId)
		}
	})

	clientWS.on('open', () => {
		console.log('connection opened')
	})
	
	clientWS.on('error', err => {
		console.error('ERROR:', err)
	})
}

// curring
async function callbackProcessMessage(msg, channels) {
	if(channels.includes(msg.channel.id)) { // check if the msg is in the channels we scope
		let scrappValue = postProcess(msg.content); // then we scrap the value
		if(scrappValue) { // check if the value we scrapp is valid && check if this is a new order for avoiding duplicate
			console.log(msg.content)
			let order = createOrder(scrappValue)
			let hashOrder = hash(order)
			if(!AvoidDuplicate.has(hashOrder)) {
				let orderWithSize = await addSize(order)
				AvoidDuplicate.set(hashOrder, order)
				if(orderWithSize.Order.type === 'market') {
					orderWithSize.Order.price = null
				}
				console.log(orderWithSize)
				let response = await sendOrder(orderWithSize.Order)
				console.log(response)
				ManageOrder.set(response.result.id, orderWithSize)	
			}
		}
	}
}


listen()
