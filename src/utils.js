// runtime configuration 配置文件路径
const os = require('os')
const path = require('path')

module.exports = {
  prefixAddHttps (url) {
    if (url.includes('https') || url.includes('http')) {
      return url
    } else {
      return `https://${url}`
    }
  },
  getRcPath(file) {
    return process.env.PUBLISH_CONFIG_PATH || path.join(os.homedir(), file);
  }
}