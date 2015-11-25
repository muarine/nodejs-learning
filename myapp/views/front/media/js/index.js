// 设置Cookie
function setCookie(name,value,time) 
{ 
	var str1=time.substring(1,time.length)*1; 
	var str2=time.substring(0,1); 
	var timestamp;	// 毫秒级别
	timestamp += str2 == "s" ? str1*1000 : (str2 == "h" ? str1*60*60*1000 : (str2 == "d" ? str1*24*60*60*1000 : 7200000));
	var exp = new Date(); 
	exp.setTime(exp.getTime() + timestamp); 
	document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
} 
// 获取Cookie
function getCookie(name) 
{ 
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg))
		return unescape(arr[2]); 
	else 
		return null; 
}

// 闭包管理公共函数
(function(win){
	// 检测access_token是否生效
	win.checkToken=function(callback){
		var access_token = getCookie("access_token");
		console.log("access_token:" + access_token);
		if(access_token){
			return true;
		}else{
			alert("access_token失效，请重新登录！");
			window.location.href="login.html";
			return false;
		}
	}
	// 获取子模版
	win.getTemplate=function(url, container){
		$.get(url, function(data){
			$(container).html(data);
		})
	};
	// post请求公共函数
	win.getJson = function(url, callback){
		if(!checkToken())return;
		$.ajax({
			url:url,
			type:"post",
			dataType:"jsonp",
			error:function(data){
				alert("ajax出现错误!");
			},
			success:function(data){
				callback(data);
			}
		})
	}
})(window);

$(document).ready(function(){
	// 初始化一级菜单
	function initMainMenu(){
		// getJson("http://dev.rtmap.com/menu/list"，function(data){
		// 	mainMenu.$data.menus = data.obj.menus;
		// });
		var mainMenu = new Vue({
			el:".main-menu",
			data:{
				menus:[
						{"menu_id":1,"title":"首页"},
						{"menu_id":2,"title":"账户管理"},
						{"menu_id":3,"title":"会员系统"},
						{"menu_id":4,"title":"定位地图"},
						{"menu_id":5,"title":"微信支付"},
						{"menu_id":6,"title":"停车找车"},
						{"menu_id":7,"title":"数据中心"},

					]
			}
		});
	}
	initMainMenu();

	$(".sub-menu dd").click(function(e){
		alert("alert");
		// $(".main-menu li").removeClass("active");
		// $(this).addClass("active");
		// getTemplate("template/",$(this).attr("data-href"));
	});
	// 主菜单点击切换高亮，加载子菜单
	$(".main-menu li").click(function(e){
		$(".main-menu li").removeClass("active");
		$(this).addClass("active");

		// 点击一级菜单 加载 二级菜单
		getJson("http://www.rtmap.com/getSub/"+$(this).find("a").attr("data-href"), function(data){
			// 先清除所有的二级菜单列表
			sub.$data.name = data.obj.name;
			sub.$data.sub = data.obj.sub;
		});
	});

	// 首次加载菜单
	window.sub = new Vue({
		el:".sub-menu",
		data:{
			name:"账户菜单",
			sub:[
				{"title":"账户管理","template":"admin/index"},
				{"title":"新建账户","template":"admin/addview"},
			]
		}
	})

});