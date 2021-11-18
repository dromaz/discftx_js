import { regex } from './regex.js'

function testRgx(content, rgx) {
	return rgx.test(content)
}

function checkValidPost(content, rgx) {
	for(const key of Object.keys(rgx)) {
		if(!testRgx(content, rgx[key]) && key !== 'Type') {
			console.log(key) // DEBUG
			console.log(content) // DEBUG
			return false
		}
	}
	return true
}

function matchRgx(content, rgx) {
	return content.match(rgx)
}

function matchAllRgx(content, rgx) {
	let result = []
	for(const key of Object.keys(rgx)) {
		let value = matchRgx(content, rgx[key])
		if(value || key === 'Type') {
			result.push(value)
		}
	}
	return result
}


export function postProcess(content) {
	let lowerCaseContent = content.toLowerCase();
	if(checkValidPost(lowerCaseContent, regex)) {
		let result = matchAllRgx(lowerCaseContent, regex)
		return result	
	} else {
		return false
	}
}
