var  mongoose = require("mongoose");
var Log = require("./model")
// mongoose.connect("mongodb://localhost:27017/coolpay", {useMongoClient:true});
exports.connect = (host) => {
  mongoose.connect(host, {useMongoClient:true});
}

exports.append = (location, type, msg, date) => {
  return new Promise ( (resolve, reject) => {
    var newlog = new Log()
    newlog.location = location
    newlog.type = type
    newlog.msg = msg
    newlog.date = date
    newlog.save( (err, ret) => {
      if(err) return reject(err)
      resolve()
    })
  })
}
