// 搜索网站
const fs = require('fs').promises
const ora = require('ora')
const Inquirer = require('Inquirer')
const open = require('open');
const { prefixAddHttps, getRcPath } = require('./utils')

const rcPath = getRcPath('1.json')

module.exports = async (url, tag='') => {
	const spinner = ora('fetching ...')
	let dataArr = []
	try {
		const data = await fs.readFile(rcPath)
		spinner.succeed()
		dataArr = data ? JSON.parse(data.toString()) : []
	} catch (err) {
		dataArr = []
	}

	const searchedArr = dataArr.filter(item =>
		item.url.includes(url) ||
		(item.tag && item.tag.includes(url)) ||
		(item.tag && tag && item.tag.includes(tag))
	)
	searchedMapArr = searchedArr.map(sItem => `[${sItem.tag}]${sItem.url}`)
	if (searchedMapArr && searchedMapArr.length > 1) {
		let { repo } = await Inquirer.prompt({
			name: 'repo', // 获取选择
			type: 'list',
			message: '请选择需要打开的url',
			choices: searchedMapArr,
		})
		const index = repo.indexOf(']')
		const searchedUrl = repo.substring(index + 1)
		await open(prefixAddHttps(searchedUrl))
	} else if (searchedMapArr && searchedMapArr.length  === 1) {
		const index = searchedMapArr[0].indexOf(']')
		const singleUrl = searchedMapArr[0].substring(index + 1)
		await open(prefixAddHttps(singleUrl))
	} else {
		console.log('没有找到相关的网址')
	}
}