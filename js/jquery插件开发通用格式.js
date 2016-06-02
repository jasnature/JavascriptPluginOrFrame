//1、第一个分号是为了防止在与其他代码压缩到一起的时候合在一行中，这样会出现语法错误。例如var i=0(function(factory){......}(..);
//
//2、'use strict'是开启严格模式，使Javascript解释器可以用"严格"的语法来解析代码，以帮助开发人员发现错误
//
//3、如果使用了requirejs模块载入框架，define(['jquery'], factory)这句就是让插件支持AMD规范，当然['jquery']这个命名可以使用paths重命名覆盖
//
//4、function ($, undefined) 这里面的undefined是为了防止在引入其他js文件的时候，使用被重写了的undefined
//
//5、_init是插件定义的，用于初始化插件。

;
(function(factory) {
	'use strict';
	if (typeof module === 'object' && typeof module.exports === 'object') {
		//使用function(require, exports, module)这样方式的时候进入
		factory(require('jquery'));
	} else if (typeof define === 'function' && define.amd) {
		// Register as an AMD module, compatible with script loaders like RequireJS.
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function($, undefined) {
	'use strict';

	　　 //中间插件代码

	$.fn.jslide = function(method) {
		return _init.apply(this, arguments);
	};
}));