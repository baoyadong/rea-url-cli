// 新增网站
const fs = require('fs').promises
const path = require('path')
const { getRcPath } = require('./utils')

const rcPath = getRcPath('1.json')

module.exports = async (url) => {
  let dataArr = []
  try {
    const data = await fs.readFile(rcPath)
    dataArr = data ? JSON.parse(data.toString()) : []
  } catch (err) {
    dataArr = []
  }
  const index = dataArr.findIndex(item => [item.url, item.tag].includes(url))
  if (index === -1) { return false }
  dataArr.splice(index, 1)
  const str = JSON.stringify(dataArr);
  fs.writeFile(rcPath, str, function(err){
    if(err){
      console.error(err);
    }
    console.log('删除成功')
  })
}