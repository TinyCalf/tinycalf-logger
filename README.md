> Tinylogger overwrites console to provide a better output. At the same time, it insert your logs in mongodb for a easy management of logs. It also can keep you informed if an error happens in your project.

** This is a beta version and be careful when using it **

Your console would be like this :
```bash
normal console
[2018-04-17|17:33:25] INFO something happening
[2018-04-17|17:33:25] WARN you can do better here
[2018-04-17|17:33:25] ERROR something bad happened
[2018-04-17|17:33:25] ERROR something bad happened
Error: something bad happened
    at Object.<anonymous> (/home/tinycalf/Desktop/tinylogger/example.js:25:15)
    at Module._compile (module.js:643:30)
    at Object.Module._extensions..js (module.js:654:10)
    at Module.load (module.js:556:32)
    at tryModuleLoad (module.js:499:12)
    at Function.Module._load (module.js:491:3)
    at Function.Module.runMain (module.js:684:10)
    at startup (bootstrap_node.js:187:16)
    at bootstrap_node.js:608:3
[2018-04-17|17:33:25] SUCCESS something has been done successfully
```
in your mongodb you will geth log like these:

```javascript
{
    "_id" : ObjectId("5ad5b1546122fa70fa219ca1"),
    "location" : "    at Module._compile (module.js:643:30)",
    "type" : "ERROR",
    "msg" : "something bad happened\nError: something bad happened\n    at Object.<anonymous> (/home/tinycalf/Desktop/tinylogger/example.js:12:15)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)\n    at Function.Module.runMain (module.js:684:10)\n    at startup (bootstrap_node.js:187:16)\n    at bootstrap_node.js:608:3",
    "date" : ISODate("2018-04-17T08:33:24.068+0000"),
    "__v" : NumberInt(0)
}
{
    "_id" : ObjectId("5ad5b1546122fa70fa219ca2"),
    "location" : "    at Module._compile (module.js:643:30)",
    "type" : "SUCCESS",
    "msg" : "something has been done successfully",
    "date" : ISODate("2018-04-17T08:33:24.071+0000"),
    "__v" : NumberInt(0)
}
{
    "_id" : ObjectId("5ad5b19ccab981714a27b881"),
    "location" : "    at Module._compile (module.js:643:30)",
    "type" : "ERROR",
    "msg" : "something bad happened\nError: something bad happened\n    at Object.<anonymous> (/home/tinycalf/Desktop/tinylogger/example.js:12:15)\n    at Module._compile (module.js:643:30)\n    at Object.Module._extensions..js (module.js:654:10)\n    at Module.load (module.js:556:32)\n    at tryModuleLoad (module.js:499:12)\n    at Function.Module._load (module.js:491:3)\n    at Function.Module.runMain (module.js:684:10)\n    at startup (bootstrap_node.js:187:16)\n    at bootstrap_node.js:608:3",
    "date" : ISODate("2018-04-17T08:34:36.396+0000"),
    "__v" : NumberInt(0)
}
```

# Install
```bash
npm install tinylogger --save
```
if you use mongodb to log, you need to install it
```bash
sudo apt install mongodb
```
# Usage
You can write a seperated file like this:
```javascript
var logger = require("tinylogger")

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
```
in a whole project, you only need to init it once. But if you want test your file seperatedly, you need to require this file everywhere. If you don't need mongodb or email function, just don't write them in initial params:
```javascript
logger.init({mongodb:"mongodb://localhost:27017/myproject"})
```
if you dont need both of mongodb and email, you don't even need to initial it.
Then, you just need to console as normal like:
```
console.log("normal console")
console.info("something happening")
console.warn("you can do better here")
console.error("something bad happened")
console.error(new Error("something bad happened"))
console.success("something has been done successfully")
```
and you will get console like the above.
