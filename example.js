var logger = require("./index.js")

logger.init({
  mongodb:"mongodb://localhost:27017/tinylogger",
  email:{
    smtp:{
      host: 'smtp.exmail.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: 'zhujiasheng@h5edu.cn',
        pass: 'Zjs1993'
      }
    },
    from: "My project", //'"Bitgogogo by TinyCalf" <zhujiasheng@h5edu.cn>'
    receivers:["839560084@qq.com"]
  },
})


console.log("normal console")
console.info("something happening")
console.warn("you can do better here")
console.error("something bad happened")
console.error(new Error("something bad happened"))
console.success("something has been done successfully")
