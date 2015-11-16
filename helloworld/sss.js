// 形如 querystring("text=asds||a=b||d=r").text  实现方


var ss = "text=sgdfsfgs||abc=123456||d=haha";

function querystring(aaa){
//	console.log(aaa);
	var _ary = aaa.split("||"),
		_temp = [],
		_json = {};
	while(_ary.length>0){
		_temp = _ary[0].split("=");
		_json[_temp[0]]=_temp[1];
		_ary.shift();
	}
	return _json;
}

//var A = new String();
//String.prototype.abc = "asd";



//console.log(A.abc);
console.log(querystring(ss).text);
console.log(querystring(ss).abc);
console.log(querystring(ss).d);



