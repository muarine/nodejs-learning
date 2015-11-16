# nodejs-learning

## nodejs study
命令行加载启动的文件几乎都为文件模块
文件模块加载方式：1.js 2.node 3.json  注：以文件名后缀区分

祥见：[InfoQ](http://www.infoq.com/cn/articles/nodejs-module-mechanism)

## 模块化加载

helloworld.js
function sayhello(){console.log('hello');}
exports.helloworld = sayhello;

app.js
var helloworld = reuired('helloworld');
consolo.log(helloworld.sayhello());

## 加载策略
原生模块module实现加载文件模块的工作，并且在启动时已经被加载，进程直接调用到runMain静态方法。
// bootstrap main module.
Module.runMain = function () {
    // Load the main module--the command line argument.
    Module._load(process.argv[1], null, true);
};

_load分析文件名之后执行

var module = new Module(id, parent);

缓存策略：文件路径+模块对象，但模块实例化对象根据文件名加载。

module.load(filename);

另：node执行形如app.js文件时，会对其头尾包装：
(function(exports,required,module,__filename,__dirname){
	var helloworld = reuired('helloworld');
	consolo.log(helloworld.sayhello());
});
