
var fs = require("fs") , sys = require("sys");

fs.readFile('treasure-chamber-report.txt',function(report){

	sys.puts("oh,look ay all my money!"+report);
});

fs.writeFile('letter-to-princess.txt','...',function(){
	sys.puts("can't wait hear back from her!");

});

