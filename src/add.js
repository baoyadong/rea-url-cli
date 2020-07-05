// 新增网站
const fs = require('fs').promises
const path = require('path')
const { getRcPath } = require('./utils')

const rcPath = getRcPath('1.json')

module.exports = async (url, tag = '') => {
  let dataArr = []
  try {
    const data = await fs.readFile(rcPath)
    dataArr = data ? JSON.parse(data.toString()) : []
  } catch (err) {
    dataArr = []
  }
  dataArr.push({url, tag})
  const str = JSON.stringify(dataArr);
  fs.writeFile(rcPath, str, function(err){
    if(err){
      console.error(err);
    }
    console.log('新增成功')
  })
}