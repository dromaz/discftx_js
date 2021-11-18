export const regex = {
	Entry: /(?<=entry[\s:\-\.(\bnow\b)(\blower\b)\s$1]+)\d+(\.\d{1,3})?/g,
	StopLoss: /(?<=stop[\s:\-\.(\bnow\b)(\blower\b)\s$1]+)\d+(\.\d{1,3})?/g,
	TakeProfit: /(?<=(target|tp)[\s:\-\.(\bnow\b)(\blower\b)\s$1]+)\d+(\.\d{1,3})?/g,
	Pair: /(?<=(trade idea[ ]*[ :\-]|long|buy|relonging|longing)[ ]+)(?!(long|buy|.?scalp|\brelonging\b))[a-z]+(\/[a-z]+)?/gm,
	Side: /\blong\b|\brelong\b|\brelonging\b|\bbuy\b|buy|\blonging\b/gm,
	Type: /\b(lower)b\|\blimit\b/gm
}

/*
 V0 : /(?<=((entry|now|1|\(lower\))[ ]*[:]?[ ]+))(?!1[:]?[ ]+)(([0-9]+\.)?[0-9]+)/gm
 V1 : /(?<=((entry|now|1|\.|\(lower\))[ ]*[:]?[ ]+))(?!1[:]?[ ]+)(([0-9]+\.)?[0-9]+)/gm

	Entry: /(?<=((entry|now|1|\.|\(lower\))[ ]*[:]?[ ]+))(?!1[:]?[ ]+)(([0-9]+\.)?[0-9-k]+)/gm,
	StopLoss: /(?<=stop[\s:\-\.(\bnow\b)(\blower\b)\s$1]+)\d+(\.\d{1,3})?/g,,
	TakeProfit: /(?<=(target|tp)[\s:\-\.(\bnow\b)(\blower\b)\s$1]+)\d+(\.\d{1,3})?/g,

*/
