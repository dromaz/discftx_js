import { WebsocketClient, RestClient } from "ftx-api";
import { FTX_API, FTX_SECRET, SUBACCOUNT, RISK } from "../config.js";

// initialisation des clients
export const clientWS = new WebsocketClient({
	key: FTX_API,
	secret: FTX_SECRET,
	subAccountName: SUBACCOUNT,
});

const client = new RestClient(FTX_API, FTX_SECRET, {subAccountName: 'MAINBOT'})

export async function getUSDBalance() {
	let response = await client.getBalances();
	for(const unit of response.result) {
		if(unit.coin == "USD") {
			return unit.free;
		}
	}
}

export async function calculateSize(price, stoploss) {
	let risk = price - stoploss;
	let balanceUSD = await getUSDBalance();
	return +balanceUSD * RISK / risk;
}

export function sendOrder(order) {
	return client.placeOrder(order); 
}

export function sendTriggerOrder(order) {
	return client.placeTriggerOrder(order);
}
