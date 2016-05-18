/*
 * name:sliderBar 滑块条jquery插件
 * ref:jquery.1.7.x.js以上
 * version: 1.0.0 (2016-05-17)
 * author:jasnature
 * qq:276227015
 * blog:http://www.cnblogs.com/NatureSex/
 * Copyright 2016
 * 
 * 使用例子:
 *     var slider = $.fn.sliderBar({...});
 *     slider.setDefValue(value,callback);
 */
;
(function($, window, document, undefined) {

	var jsliderBar = function($ele, setting) {
		//当前插件对象
		var $this_jsliderBar = this;
		this.options = $.extend({
			//容器dom(Object || css Selector)
			renderTo: $ele,
			//是否启动
			enable: true,
			//初始化位置
			initPosition: 'max',
			//初始化值父容器属性名称
			initValueAttrName: 'data-jl-value',
			//大小设置
			size: {
				barWidth: 200,
				sliderWidth: 5
			},
			enableKeyControl: false, //启用键盘控制
			//最外层样式名称
			barCssName: 'defaultbar',
			//完成范围进度条样式
			completedCssName: 'j-completed',
			//滑动条样式
			sliderCssName: 'j-sliderbar',
			//滑动条按下去样式
			sliderDown: 'j-sliderbar-down',
			//滚动位置改变触发事件
			onChanging: function() {},
			//滚动结束后触发事件
			onChanged: function() {}
		}, setting);

		this.options.renderTo = (typeof this.options.renderTo == 'string' ? $(this.options.renderTo) : this.options.renderTo);

		//外层容器
		this.sliderbar = $('<div id="'+ this.options.renderTo.prop("id") +'-jsliderBar"><div></div><div tabindex="0"></div></div>')
			.attr('class', this.options.barCssName)
			.css('width', this.options.size.barWidth)
			.appendTo(this.options.renderTo);
		//进度
		this.completedbar = this.sliderbar.find('div:eq(0)')
			.attr('class', this.options.completedCssName);
		//滑动条
		this.slider = this.sliderbar.find('div:eq(1)')
			.attr('class', this.options.sliderCssName)
			.css('width', this.options.size.sliderWidth);

		var bw = this.sliderbar.width(),
			sw = this.slider.width();
		//初始化一个left提交范围
		this.options.limited = {
			min: 0,
			max: bw - sw
		};

		//私有函数
		var sliderBarPrivateFunc = {
			drag: function(e) {
				e.pageX = e.pageX === undefined ? e.data.pageX : e.pageX;
				var d = e.data,
					ret, l = Math.min(Math.max(e.pageX - d.pageX + d.left, $this_jsliderBar.options.limited.min), $this_jsliderBar.options.limited.max);
				sliderBarPrivateFunc.changeBarValue(l);
				ret = l / $this_jsliderBar.options.limited.max;
				$this_jsliderBar.options.onChanging(ret, e);
			},
			drop: function(e) {
				$this_jsliderBar.slider.removeClass($this_jsliderBar.options.sliderDown);
				$this_jsliderBar.options.onChanged(parseInt($this_jsliderBar.slider.css('left')) / $this_jsliderBar.options.limited.max, e);
				$(document).off('mousemove', sliderBarPrivateFunc.drag).off('mouseup', sliderBarPrivateFunc.drop);
			},
			changeBarValue: function(vleft) {
				$this_jsliderBar.slider.css("left", vleft);
				$this_jsliderBar.completedbar.css("width", vleft);
			}
		};

		if ($ele.attr(this.options.initValueAttrName) != undefined) {
			sliderBarPrivateFunc.changeBarValue(+$ele.attr(this.options.initValueAttrName) * this.options.limited.max);
		} else {
			sliderBarPrivateFunc.changeBarValue(this.options.limited.max);
		}
		if (this.options.enable) {

			this.slider.on('mousedown', function(e) {
				$this_slider = $(this);
				var d = {
					left: parseInt($this_slider.css('left')),
					pageX: e.pageX
				};
				$this_slider.addClass($this_jsliderBar.options.sliderDown);
				$(document).on('mousemove', d, sliderBarPrivateFunc.drag).on('mouseup', d, sliderBarPrivateFunc.drop);

				if ($this_jsliderBar.options.enableKeyControl) {
					var keyd = $._data($this_jsliderBar.slider[0], "events")["keydown"];
					$this_jsliderBar.slider.focus();

					if (!keyd) {

						$this_jsliderBar.slider.on('keydown', function(e) {
							var diffv = 0;
							//left
							if (e.keyCode == 37) {
								diffv = -10
							}
							//left
							if (e.keyCode == 39) {
								diffv = +10
							}

							var d = {
								left: +$this_jsliderBar.slider.css("left").slice(0, -2) + diffv,
								pageX: +$this_jsliderBar.slider.css("left").slice(0, -2)
							};

							e.data = d;
							sliderBarPrivateFunc.drag(e);

						});
					}
				}

			});

			this.sliderbar.on('click', function(e) {

				if (!$(e.target).hasClass($this_jsliderBar.options.sliderCssName)) {
					var d = {
						left: e.pageX - $this_jsliderBar.slider.innerHeight(),
						pageX: e.pageX
					};

					e.data = d;
					sliderBarPrivateFunc.drag(e);
				}

			});
		};

		///<summary>
		/// 设置value值
		///</summary>
		///<param name="v">0-1之间</param>
		///<param name="v">设置完成回调</param>
		this.setDefValue = function(v, callback) {
			try {
				if (typeof v == 'undefined' || v < 0 || v > 1) {
					throw new Error('\'v\' must be a Float variable between 0 and 1.');
				}
				var s = this;
				if (typeof s == 'undefined' ||
					typeof s.sliderbar == 'undefined' ||
					typeof s.completedbar == 'undefined') {
					throw new Error('当前实例不是jsliderBar对象');
				}
				sliderBarPrivateFunc.changeBarValue(v * s.options.limited.max);
				if (typeof callback != 'undefined') {
					callback(v);
				}
			} catch (e) {
				alert(e.message);
			}
		}

	}

	//定义插件
	$.fn.sliderBar = function(setting) {
		var sbar, $this = this;
		sbar = new jsliderBar($this, setting);
		return sbar;
	};

})(jQuery, window, document);