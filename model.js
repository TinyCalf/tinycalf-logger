/*
打印错误
*/
const mongoose = require("mongoose");

var LogSchema = new mongoose.Schema({
  location:      {type:String},
  type:          {type:String},
  msg:           {type:String},
  date:          {type:Date}
});

module.exports = mongoose.model("Log", LogSchema);
