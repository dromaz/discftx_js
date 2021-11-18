import { calculateSize } from "./FtxRequest.js";

function formatAllOrder(market, price, type, slPrice, tpPrice) {
	return {
		Order: {
			market: market,
			side: 'buy',
			price: price,
			type: type,
			size: null,
		},
	StopLoss: {
		market: market,
		side: 'sell',
		size: null,
		type: 'stop',
		reduceOnly: true,
		triggerPrice: slPrice,
		},
	TakeProfit: {
		market: market,
		side: 'sell',
		size: null,
		type: 'takeProfit',
		reduceOnly: true,
		triggerPrice: tpPrice,
		orderPrice: tpPrice,
		}
	}
}

function getMarket(value) {
	let pair = value[0]
	let market = pair.includes('usd') ? pair.replace(/\/?usd/g, "-PERP") : `${pair}-PERP`;
	return market.toUpperCase().trim();
}

/*
export function hashOrder(order) {
}
*/

function getStopLossPrice(value) {
	if(value[0] === "1" && value.length > 1) {
		return +value[1]
	}
	return +value[0]
}

function getTakeProfitPrice(value) {
	// if((/k/gm).test(value[0])) {
	// 	value[0] = value[0].replace("k", "000")
	// }
	if(value[0] === "1" && value.length > 1) {
		return +value[1]
	}
	return +value[0]
}

function getPrice(value) {
	if(value[0] === '1' && value.length > 1) {
		return +value[1]
	}
	return +value[0]
}

function getType(value) {
	if(!value) return 'market'
	return 'limit'
}

export function createOrder(value) {
	let market = getMarket(value[3]);
	let StopLoss = getStopLossPrice(value[1]);
	let TakeProfit = getTakeProfitPrice(value[2]);
	let price = getPrice(value[0]);
	let type = getType(value[5]);
	return formatAllOrder(market, price, type, StopLoss, TakeProfit)
}

export async function addSize(orderWithoutSize) {
	let order = orderWithoutSize;
	let size = await calculateSize(+order.Order.price, +order.StopLoss.triggerPrice); 
	order.Order.size = size;
	order.StopLoss.size = size;
	order.TakeProfit.size = size;
	return order;
}


/*
 INDEX ASSOCIATED VALUE FROM postProcess function :

 [0]: EntryPrice,
 [1]: StopLoss,
 [2]: TakeProfitPrice,
 [3]: Pair,
 [4]: Side
 [5]: Type
*/
