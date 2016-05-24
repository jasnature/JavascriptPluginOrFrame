/**
 * @Description jQuery无缝滚动内容插件，样式自由定制
 * ref:jquery.1.7.x.js以上
 * version: 1.0.2 (2016-05-24)
 * author:jasnature
 * qq:276227015
 * blog:http://www.cnblogs.com/NatureSex/
 * Copyright 2016
 * @DOM
 *  	<div id="scroll">
 *  		<ul id="scrollCon">
 *   			<li></li>
 *   			<li></li> 
 *  		</ul>
 *  	</div>
 *		<span class="arraw" id="prevBtn">
 *			<i class="icon-caret-down" ></i>
 *		</span>
 *		<span class="arraw" id="nextBtn">
 *			<i class="icon-caret-down" ></i>
 *		</span>		
 * @CSS
 *  	#scroll {overflow:hidden;width:200px;height:50px;}
 * 		#scrollCon{position:relative;left:0;top:0;}
 * @Usage
 *  	$('#scroll').scrollPanel({
 *	    	prevBtn : $('#prevBtn'),
 *	    	nextBtn : $('#nextBtn')
 * 			event : 'click'
 *	    });
 */

;
(function($, window, document, undefined) {

	var jscrollPanel = function($ele, options) {
		$this = $ele;
		var defualts = {
			speed: 'fast', //滚动速度fast slow 毫秒数
			delayTime: 3000, //滚动间隔时间 默认3000ms
			event: 'click', //手动触发事件
			auto: true, //是否自动开始滚动 默认true
			direction: 'left', //滚动方向left左右滚动,top上下滚动 默认left
			manual: true, //是否需要手动滚动，默认true
			content: '#scrollCon', //滚动容器
			prev: '.prev', //上一项按钮
			next: '.next' //下一项按钮
		};

		var opts = $.extend({}, defualts, options),
			$ul = $this.children(opts.content).css({
				position: 'relative',
				left: 0,
				top: 0,
				height: '100%'
			}),
			$li = $ul.children(),
			$prev = $this.find(opts.prev),
			$next = $this.find(opts.next),
			listNum = $li.size(), //总个数
			distance,
			t1, //自动滚动使用的定时器
			t2, //手动选择后使用的定时器
			delayTime = opts.delayTime, //间隔时间
			speed = opts.speed,
			direction = opts.direction;

		if (listNum < 2) return; //一张图片不滚动
		var mode = direction === 'left' ? 1 : 0;

		if (mode) {
			distance = $li.outerWidth(); //内容必须有宽度
			$ul.width(distance * (listNum + 2));
			var nextMode = {
					left: '-' + distance + 'px'
				},
				prevMode = {
					left: 0
				};
		} else {
			distance = $li.outerHeight();
			$ul.height(distance * (listNum + 2));
			var nextMode = {
					top: '-' + distance + 'px'
				},
				prevMode = {
					top: 0
				};
		}

		var fun = {

			init: function() {
				if (opts.auto) {
					setTimeout(function() {
						fun.autoScroll();
					}, delayTime);
				}
				if (!opts.manual) return;
				fun.manual();
			},
			autoScroll: function() {
				fun.clear();
				$ul.animate(nextMode, speed, function() {
					$ul.children(':first').remove().clone().appendTo($ul);
					$ul.css(direction, 0);
				});
				t1 = setTimeout(arguments.callee, delayTime);
			},

			manual: function() {
				$prev.off().on(opts.event, function() {
					fun.clear();
					if ($ul.children().length <= listNum) {
						$ul.stop(true, true);
						var eles = $ul.children(':last');
						eles.clone().prependTo($ul);
						$ul.css(direction, -distance).animate(prevMode, speed, function() {
							eles.remove();
						});
						t2 = setTimeout(arguments.callee, delayTime);
					}

				});

				$next.off().on(opts.event, function() {
					fun.autoScroll();
				});
			},

			clear: function() {
				if (t1) {
					clearTimeout(t1)
				}
				if (t2) {
					clearTimeout(t2)
				}
			}
		}

		fun.init();

	};

	$.fn.scrollPanel = function(setting) {
		var sp, $this = this;
		sp = new jscrollPanel($this, setting);
		return sp;
	};

})(jQuery, window, document);