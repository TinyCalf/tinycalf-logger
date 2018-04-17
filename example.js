var logger = require("./index.js")

logger.init({
  mongodb:"mongodb://localhost:27017/tinylogger"
})


console.log("normal console")
console.info("something happening")
console.warn("you can do better here")
console.error("something bad happened")
console.error(new Error("something bad happened"))
console.success("something has been done successfully")
