import { TOKEN } from "../src/config.js"
import  axios from "axios";
import fs from "fs";


async function fetchMessage(channel) {
	const options = {
		headers: {
			'authorization': TOKEN
		},
		params: {
			limit: 15
		}
	};
	let response = await axios.get(`https://discord.com/api/v9/channels/${channel}/messages`, options)
	return response.data;
}

export async function writeToJsonFile(filename, channel) {
	let result = []
	let data = await fetchMessage(channel);
	data.forEach(post => {
		console.log(post.content)
		result.push(post.content)
	})
	fs.writeFileSync(filename, JSON.stringify(result, null, 4))
}

const channels = ['671977297829429255', '502725058511372288']

writeToJsonFile("../json/scalpChannelPost.json", channels[0])
writeToJsonFile("../json/swingChannelPost.json", channels[1])
