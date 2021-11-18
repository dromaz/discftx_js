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
	let data = await fetchMessage(channel);
	data.forEach(post => {
		console.log(post.content)
	})
}
