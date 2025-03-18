// deploy-fundme.js 和 interact-fundme.js 中定义的内容导出，以便其他文件可以通过 require 引入并使用这些任务。
exports.deployConract1 = require("./deploy-fundme")
exports.interactContract2 = require("./interact-fundme")