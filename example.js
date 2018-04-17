var logger = require("./index.js")

logger.init({
  mongodb:"mongodb://localhost:27017/myproject",
  email:{
    smtp:{
      host: 'smtp.exmail.qq.com',
      port: 465,
      secure: true,
      auth: {
        user: '123456789@qq.com',
        pass: 'password'
      }
    },
    from: "My project",
    receivers:["9876543214@qq.com"]
  },
})


console.log("normal console")
console.info("something happening")
console.warn("you can do better here")
console.error("something bad happened")
console.error(new Error("something bad happened"))
console.success("something has been done successfully")
