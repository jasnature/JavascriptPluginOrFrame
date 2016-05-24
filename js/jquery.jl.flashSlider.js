/**
 * @Description jQuery 幻灯片插件
 * ref:jquery.1.7.x.js以上
 * version: 1.0.3 (2016-05-23)
 * author:jasnature
 * qq:276227015
 * blog:http://www.cnblogs.com/NatureSex/
 * Copyright 2016
 **/
;
(function($, window, document, undefined) {
	$.fn.flashSlider = function(options) {
		
		var settings = {
			affect: 'scrollx', //效果  有scrollx|scrolly|fade|none
			speed: 1000, //动画速度
			interval: 3000, //时间间隔
			auto: true, //自动滚动
			trigger: 'mouseover', //触发事件 注意用mouseover代替hover
			ctag: 'a', //内容标签 默认为<a>
			switcher: '#slider-nav', //切换触发器id或class
			stag: 'span', //切换器标签 默认为span
			current: 'on', //当前切换器样式名称
			rand: false, //是否随机指定默认幻灯图片
			manualStop: false, //是否鼠标经过停止,
			infinite: true, //是否循环滚动
			change: null, //每次切换回调
			infiniteEnd: null, //一次滚动结束后回掉，infinite为false时
			replay: null //重播
		};
		settings = $.extend({}, settings, options);
		var index = 1,
			last_index = 0,
			$conbox = $(this).css('position', 'relative'),
			$contents = $conbox.find(settings.ctag), //滚动内容列表
			$switcher = $(settings.switcher), //切换按钮
			$stag = null,
			len = $contents.length;
		if (len < 2) return; //一张图片的情况

		//生成切换按钮
		if ($stag == null || $stag.length != $contents.length) {
			$switcher.children().remove();
			for (var i = 0; i < $contents.length; i++) {
				$switcher.append($("<" + settings.stag + " ></" + settings.stag + ">"));
			}

			$stag = $switcher.find(settings.stag);
			$stag.first().addClass("on");
		}

		if (settings.rand) {
			index = Math.floor(Math.random() * $contents.length);
			slide();
		}
		if (settings.affect === 'scrollx') {
			$conbox.width($contents.length * $contents.outerWidth());
		}
		if (settings.affect === 'fade') {
			$.each($contents, function(k, v) {
				(k === 0) ? $(this).css({
					'position': 'absolute',
					'z-index': 9
				}): $(this).css({
					'position': 'absolute',
					'z-index': 1,
					'opacity': 0
				});
			});
		}

		function slide() {
			if (index === len) {
				index = 0;
			}

			$stag.removeClass(settings.current).eq(index).addClass(settings.current);
			if (settings.change) settings.change(index);
			switch (settings.affect) {
				case 'scrollx':
					$conbox.stop().animate({
						left: -$contents.outerWidth() * index
					}, settings.speed, scrollEnd);
					break;
				case 'scrolly':
					$contents.css({
						display: 'block'
					});
					$conbox.stop().animate({
						top: -$contents.height() * index + 'px'
					}, settings.speed, scrollEnd);
					break;
				case 'fade':
					$contents.eq(last_index).stop().animate({
							'opacity': 0
						}, settings.speed / 1).css('z-index', 1)
						.end()
						.eq(index).css('z-index', 9).stop().animate({
							'opacity': 1
						}, settings.speed / 1.2);
					last_index = index;
					index++;
					break;
				case 'none':
					$contents.hide().eq(index).show();
					scrollEnd();
			}

		};

		function scrollEnd() {
			last_index = index;
			index++;
			if (!settings.infinite && index === len) {
				settings.infiniteEnd && settings.infiniteEnd();
				_pause();
			}
		}

		if (settings.auto) var Timer = setInterval(slide, settings.interval);

		$stag.on(settings.trigger, function() {
			_pause();
			index = $(this).index();
			_continue()
		});

		if (settings.manualStop) {
			$conbox.hover(_pause, _continue);
		}

		function _pause() {
			clearInterval(Timer);
			settings.pause && settings.pause();
		}

		function _continue() {
			slide();
			if (settings.auto) Timer = setInterval(slide, settings.interval);
		}

		function _prev() {
			_pause();
			index = index - 2 > 0 ? index - 2 : 0;
			_continue();
		}

		function _next() {
			_pause();
			if (index === len) return;
			_continue();
		}

		function _replay() {
			_pause();
			index = 0;
			$contents = $conbox.find(settings.ctag);
			len = $contents.length;
			settings.replay && settings.replay();
			Timer = setInterval(slide, settings.interval);
		}

		function _stop() {
			_pause();
			$contents = $conbox.find(settings.ctag);
			len = $contents.length;
			settings.stop && settings.stop();
		}

		return {
			replay: _replay,
			stop: _stop,
			prev: _prev,
			next: _next
		}

	}
})(jQuery, window, document);