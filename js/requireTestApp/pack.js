//每个模块的名称最好不要自己命名，后面可以使用打包工具自动生成对应的xx.js的xx名称

// a.js
define("jqload",['../jquery-1.8.0.min'], function() {

	console.log($);

	return $;
});


define("a",function() {

	return {

		color: "black",

		size: "unisize",
		
		a:123,
		
		b:456

	}

});

define("ugg",['unslider'],function() {

	
});


// b.js

define("b",function(require, exports, module) {

	var a = require(['jquery']);
	console.log(module.config().size);
	var add = function(x, y) {

		return x + y;

	};

	//$('output').html("add dist");

	return {

		add: add

	}

});

//c.js

define("c",function (require, exports, module) {
	
	var a = require('a');
	var $ = require(['jquery']);
	
	console.log(a);
	
	exports.show=function () {
		
		console.log("show me the c export function");
		
	};
	
});

//d.js

define("d",{
	name:'jingliu',
	age:27,
	sex:1,
	addr:'深圳市'
});