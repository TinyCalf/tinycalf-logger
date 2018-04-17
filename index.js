const chalk = require('chalk');
var callstack = require('callstack');
var db = require('./db')


var _config = {
  // mongodb:"mongodb://localhost:27017/tinylogger"
}

Date.prototype.Format = function (fmt) {
  var o = {
      "M+": this.getMonth() + 1,
      "d+": this.getDate(),
      "h+": this.getHours(),
      "m+": this.getMinutes(),
      "s+": this.getSeconds(),
      "q+": Math.floor((this.getMonth() + 3) / 3),
      "S": this.getMilliseconds()
  };
  if (/(y+)/.test(fmt)) fmt = fmt
    .replace(RegExp.$1, (this.getFullYear() + "")
    .substr(4 - RegExp.$1.length));
  for (var k in o)
  if (new RegExp("(" + k + ")").test(fmt))
    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

const _getFullTime = () => {
  return new Date().Format("yyyy-MM-dd|hh:mm:ss");
}

var _console = (date ,type , msg) => {
  var colortype = ""
  var date = chalk.blue("[" + date + "]")
  // var tag = chalk.magenta.bold(tag)
  switch(type) {
    case 'INFO':  colortype =chalk.blueBright(type); break;
    case 'ERROR':   colortype =chalk.redBright(type); break;
    case 'WARN' : colortype = chalk.yellow(type); break;
    case 'SUCCESS': colortype =chalk.greenBright(type); break;
    default:      return;
  }
  if(type == "ERROR") {
    if(msg instanceof Error) {
      console.log(date, colortype, msg.message)
      console.log(msg.stack)
    }else{
      console.log(date, colortype, msg)
    }
  }else{
    // console.log(callstack()[3])
    console.log(date, colortype, msg)
  }
}


var _dbInsert = (date, location, type, msg) => {
  if(msg instanceof Error) {
    db.append(location, type, msg.message + '\n' + msg.stack, date).then().catch()
  } else if(type=="SUCCESS") {
    db.append(location, type, msg, date).then().catch()
  }
}

var _print = (type, msg) => {
  var date = _getFullTime()
  _console(date ,type , msg)
  if(_config.mongodb)
    _dbInsert(new Date(), callstack()[2] ,type , msg)
}

  /*
  config:

  {
    mongodb:"mongodb://localhost:27017/tinylogger" || null,
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
      receivers:[]
    } || null,
}

  }
  */



exports.init = (config) =>{
  _config = config
  if(_config.mongodb) {
    db.connect(_config.mongodb)
  }
}


console.info = (function(msg){
  return (msg)=>_print('INFO', msg)
})();

console.warn = (function(msg){
  return (msg)=>_print('WARN', msg)
})();

console.error = (function(msg){
  return (msg)=>_print('ERROR', msg)
})();

console.success = (function(msg){
  return (msg)=>_print('SUCCESS', msg)
})();
