
const program = require('commander')
const path = require('path')
const { version } = require('./constants');


// 定义当前版本
// 定义使用方法
// 定义四个指令
program
  .version(version)
  .usage('<command> [options]')
	.command('add <url>', '新增网站')
  .command('search <url | m>', '搜索网站')
  .command('', '搜索网站')


const mapActions = {
	// create: {
	// 	alias: 'c',
	// 	description: 'create a project',
	// 	option: '-m, --tag <tag>',
	// 	example:[]
	// },
	"search <url>": {
		alias: 's',
		description: '搜索网站',
		option: '-m, --tag <tag>',
		example: []
	},
	"add <url>": {
		alias: 'a',
		description: '新增网站, -m可以为url添加tag标记',
		option: '-m, --tag <tag>',
		example: []
	},
	"del <url>": {
		alias: 'd',
		description: '删除网站, 包括url和标记都可以删除',
		option: '-m, --tag <tag>',
		example: []
	},
	'list': {
		alias: 'ls',
		description: '列表展示所有',
		option: '-m, --tag <tag>',
	},
	'*': {
		alias: '',
		option: '-m, --tag <tag>',
		description: '可以搜索url，可以搜索标记tag',
	}
}

Reflect.ownKeys(mapActions).forEach(action => {
	program
	  .command(action)
		.alias(mapActions[action].alias)
		.option(mapActions[action].option)
		.description(mapActions[action].description)
	  .action((cmd, options) => {
			const tag = options && options.tag
			if (action === '*') {
				const searchParams = process.argv.slice(2, 3)
			    require(path.resolve(__dirname, 'search'))(...searchParams, tag)
			} else if (action === 'list') {
				require(path.resolve(__dirname, 'list'))()
			} else {
				// 获取方法 [node, reach, create, ***]
				const Action = options._name
				require(path.resolve(__dirname, Action))(...process.argv.slice(3, 4), tag)
			}
	  })
})


	
// 解析命令行参数
program.version(version).parse(process.argv);
