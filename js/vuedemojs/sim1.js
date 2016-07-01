//使用组件

//这个组件只注册到sim1里面
var mystarchild = Vue.extend({
	template: '<div><slot></slot>。**我是模版原始的内容，哈哈，你替换不掉我**。<slot name="one"></slot></div>',
	//	props:['item','index']
})

var mystar = Vue.extend({
	//2个特殊选项-1
	data: function() {
		return {
			a: 1
		};
	}, //2个特殊选项-2
	el: function() {
		return "";
	},
	//添加属性进行数据传递,使用 camelCase方式命名myStart，使用时需要变成my-Start
	props: ['msg', 'myStart'],
	template: '<span>我是mystar{{myStart}}，我还有-> {{msg}}</span>',

});

//自定义全局指令注册
Vue.directive('my-tive', {
	bind: function() {
		// 准备工作
		// 例如，添加事件处理器或只需要运行一次的高耗任务
	},
	update: function(newValue, oldValue) {
		// 值更新时的工作
		// 也会以初始值为参数调用一次
		console.log("自定义指令绑定更新：newValue:" + newValue + " oldValue:" + oldValue);
	},
	unbind: function() {
		// 清理工作
		// 例如，删除 bind() 添加的事件监听器
	}
})

//全局注册
Vue.component("my-star", mystar);
//直接注册方式，内部调用extend
Vue.component("my-star1", {
	template: '<option>my-star1 component! 我是属性propC（我有默认值）：{{propC}}</option>',
	//属性值验证
	props: {
		// 基础类型检测 （`null` 意思是任何类型都可以）
		propA: Number,
		// 多种类型 (1.0.21+)
		propM: [String, Number],
		// 必需且是字符串
		propB: {
			type: String,
			//required: true
		},
		// 数字，有默认值
		propC: {
			type: Number,
			default: 100
		},
		// 对象/数组的默认值应当由一个函数返回
		propD: {
			type: Object,
			default: function() {
				return {
					msg: 'hello'
				}
			}
		},
		// 指定这个 prop 为双向绑定
		// 如果绑定类型不对将抛出一条警告
		propE: {
			twoWay: true
		},
		// 自定义验证函数
		propF: {
			validator: function(value) {
				return value > 10
			}
		},
		// 转换函数（1.0.12 新增）
		// 在设置值之前转换值
		propG: {
			coerce: function(val) {
				return val + '' // 将值转换为字符串
			}
		},
		//		propH: {
		//			coerce: function(val) {
		//				return JSON.parse(val) // 将 JSON 字符串转换为对象
		//			}
		//		}
	}
});

var sim1 = new Vue({

	//下级局部注册(只能在sim1组件内使用)
	components: {
		"my-starchild": mystarchild
	},
	el: "#sim1", //作用区域ID
	//数据操作对象
	data: {
		messages: [],
		parentMsg: "sim1顶部消息",
		a: "a",
		b: "b",
		msg: "hello vue!",
		num: 1,
		money:99,
		domake: false,
		showtran: false,
		checkedNames: [],
		selected: [],
		newtodo: {
			name: '',
			age: 0
		},
		errormsg: "",
		todos: [{
			name: '<b>123<b/>',
			age: 23,
			sex: true,
			cs: {
				tb: true,
				lb: false,
				rb: "rb"
			},
			ts: {
				classA: 'class-a',
				classB: 'class-b'
			}
		}, {
			name: '456',
			age: 15,
			ts: {
				classA: 'class-c',
				classB: 'class-d'
			}
		}]
	},
	//公共方法
	methods: {
		saveName: function(mo) {
			console.log(mo.name + "->保存成功!");
		},
		addTodo: function() {
			if (this.newtodo.name.trim()) {
				this.todos.push({
					name: this.newtodo.name,
					age: this.newtodo.age
				});
				this.newtodo = {
					name: '',
					age: 0
				};
			} else {
				this.errormsg = "请填写名称";
			}
		},
		removeTodo: function(index) {
			this.todos.splice(index, 1);
		},
		sayhi: function() {
			alert("sayhi!");
		}
	},
	//简单使用过滤器
	filters: {
		conlog: function(ag1) {
			console.log(ag1);
			return ag1;
		},
		dis: {
			// model -> view 第一次更新
			// 在更新 `<input>` 元素之前格式化值
			read: function(val) {
				return '$' + val.toFixed(2)
			},
			// view -> model 后续更新
			// 在写回数据之前格式化值
			write: function(val, oldVal) {
				var number = +val.replace(/[^\d.]/g, '')
				return isNaN(number) ? 0 : parseFloat(number.toFixed(2))
			}
		}
	},
	//计算属性
	computed: {
		xage: function(mo) {
			return "无";
		},
		fullname: {
			get: function() {
				return "getfullname";
			},
			set: function(newValue) {
				return this.newtodo.name = newValue;
			}
		}
	},

	//父子组件->自定义事件，在创建实例时 `events` 选项简单地调用 `$on`
	events: {
		'child-msg': function(msg) {
			// 事件回调内的 `this` 自动绑定到注册它的实例上
			this.messages.push(msg)
		}
	}

});

//过渡触发别名
Vue.transition('bounce', {
	enterClass: 'bounceInLeft',
	leaveClass: 'bounceOutRight'
})

//过渡钩子，这里就需要自己添加过渡样式，框架不会自动
Vue.transition('bounceWO', {

	beforeEnter: function(el) {
		$(el).addClass("fadeInDown");
		console.log("beforeEnter");
	},
	enter: function(el, done) {
		console.log('enter');
	},
	afterEnter: function(el) {
		console.log('afterEnter');
	},
	enterCancelled: function(el) {
		// handle cancellation
	},

	beforeLeave: function(el) {
		$(el).addClass("fadeInUp");
	},
	leave: function(el) {
		console.log('leave');
	},
	afterLeave: function(el) {
		console.log('afterLeave');
	},
	leaveCancelled: function(el) {
		// handle cancellation
	}
})

//属性变化监控
sim1.$watch("newtodo", function(newVal, oldVal) {
	console.log("%o===%o", newVal, oldVal);
});