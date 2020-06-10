'use strict';
var isDebug = true;
var instance;
var _bao_h5_browser = {
	debug: isDebug,
	maintenance: false,
	//apiUrl: isDebug ? 'http://192.168.1.100:8082/ydb/wxapi/' : 'http://api.yudianbao.net/ydb/wxapi/',
	apiUrl: 'http://api.yudianbao.net/ydb/wxapi/',
	oauthUrl: 'oauth2/authorize',
	cdnUrl: 'http://cdn.fuaotec.com/',
	userAgent: window.navigator.userAgent,
	connection: window.navigator.connection,
	networkType: 'unknown',
	isWx: window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger',
	pageUrl: function(page, param, path, isCustom) {
		//var url = location.protocol + '//' + location.hostname + '/app_bx/wx/';
		//var url = location.protocol + '//' + location.hostname + '/xingbao-migration/wechat/';
		var url = location.protocol + '//' + location.hostname + '/wx/';
		if (isDebug) {
			url = location.protocol + '//' + location.host + '/bx_ydb_wechat/wx/';
		}
		if (path) {
			url += path + '/';
		}
		if (page) {
			if (page.indexOf('.html') >= 0) {
				url += page;
			} else {
				url += page + '.html';
			}
		}
		if (isCustom) {
			url = location.protocol + page;
		}
		url += '?_t=' + new Date().getTime();
		if (param) {
			$.each(param, function(i, o) {
				if (!o) return !0;
				url += '&' + i + '=' + encodeURIComponent(o);
			});
		}
		return url;
	},
	encodeURI: function(url) {
		return _bao_h5_common.isEmpty(url) ? encodeURIComponent(window.location.href) : encodeURIComponent(url);
	},
	initAxios: function() {
		// 默认配置axios
		instance = axios.create({
			baseURL: _bao_h5_browser.apiUrl,
			timeout: 60000 * 3,
			withCredentials: true,
			headers: function() {
				var token = sessionStorage.getItem('x-auth-token');
				return {
					'token': token
				};
			}
		});

		//instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
		instance.defaults.transformRequest = [function(data) {
			return Qs.stringify(data);
		}];
		// 添加请求拦截器
		instance.interceptors.request.use(function(config) {
			// 在发送请求之前做些什么
			var token = sessionStorage.getItem('x-auth-token');
			//config.headers['access_token'] = token;
			//config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
			config.headers = {
				'token': token,
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			}
			return config;
		}, function(error) {
			// 对请求错误做些什么
			return Promise.reject(error);
		});

		// 添加响应拦截器
		instance.interceptors.response.use(function(res) {
			// 对响应数据做点什么
			console.log(res);
			console.log('response ==>> 响应拦截器');
			var code = res.data.code;
			if (code == 40001) { // token已过期
				// 作全局提示（弹框--确认），提示用户登录身份实效，请重新登录
				// 用户点击确认后跳转至登录页面
				// 注意：跳转至登录页面时需要获取用户需要请求的路径，登录成功后自动跳转至用户要访问的路径
				//询问框
				_bao_h5_common.wxAuth();

			} else if (code == 50008) { // 用户已登录
				// 当前用户已但又请求了登录接口
				// 直接跳转至登录首页
				var url = _bao_h5_tools.url_param('redirect');
				if (_bao_h5_common.isEmpty(url)) {
					url = _bao_h5_browser.pageUrl('products');
				}
				_bao_h5_common.openHref(url);
			}
			// 表示当前请求发生了其它异常，直接展示后台接口返回的错误信息
			return res.data;
		}, function(error) {
			// 对响应错误做点什么
			return Promise.reject(error);
		});
	},
	verifyUserToken: function() {
		/* sessionStorage.removeItem('x-auth-token');
		var token = sessionStorage.getItem('x-auth-token');
		
		if (_bao_h5_common.isEmpty(token)) {
			_bao_h5_common.wxAuth();
			return !1;
		} */

		_bao_h5_common.wxAuth();
		return !1;
	},
	resetLogin: function() {
		sessionStorage.removeItem('x-auth-token');
		_bao_h5_common.openHref(_bao_h5_browser.pageUrl('login', {
			'redirect': _bao_h5_browser.encodeURI()
		}));
	},
	isDebug: function() {
		var href = window.location.href;
		if (_bao_h5_browser.maintenance && href.indexOf('maintenance') == -1) {
			var url = _bao_h5_browser.pageUrl('maintenance', {
				'codetype': 'maintain'
			});
			_bao_h5_common.openHref(url);
		}
		//(_bao_h5_browser.debug || _bao_h5_tools.url_param('isDebug') === 'bao_h5_debug') && 
		/* if (_bao_h5_browser.isWx) {
			new VConsole();
			console.log(href);

		} else */
		if (!_bao_h5_browser.isWx && !isDebug) {
			var url = _bao_h5_browser.pageUrl('no-wechat');
			_bao_h5_common.openHref(url);
		}
		if (isDebug) {
			sessionStorage.setItem('x-auth-token',
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb2RlIjoib3hXRTB3TmMzMkIzdDA5UXRuMTQ4UklJcng5WSIsImlkIjoiMTQ1MmUwZjM1NTI1NDlkOWEyOTIzNTJkMDIzNTI1ZGQiLCJleHAiOjE1OTU5ODg3MzUsImlhdCI6MTU2NDM2NjMzNX0.86bsgp8df1CiSnmCbfpyDhCg41SyIuaHxSQ4AcZAokM'
			);
			new VConsole();
		}
	}
};
var _bao_h5_common = {
	getUser: function(){
		var user = {};
		_bao_h5_common.get("v1/getUser", {}, function(res) {
			if (!res.data) {
			    return;
			}
			
			var data = res.data;
			_bao_h5_common.session.set('x-auth-token', data.token);
			_bao_h5_common.session.set('userId', data.userId);
			_bao_h5_common.session.set('userNumber', data.userNumber);
			_bao_h5_common.session.set('users', JSON.stringify(data));
			user = data;
		},true);
		
		return user;
	},
	openHref: function(url, sleep) {
		setTimeout(function() {
			window.location.href = url;
		}, sleep ? sleep : 100);
	},
	session: {
		set: function(key, value){
			sessionStorage.setItem(key, value);
		},
		get: function(key){
			return sessionStorage.getItem(key);
		},
	},
	wxAuth: function() {
		var _vue = objItem.vue.obj;
		if (_vue.toastMask) {
			_vue.toastMask.hide();
		}
		_vue.$createDialog({
			type: 'confirm',
			icon: 'cubeic-alert',
			title: '微信授权访问身份失效',
			content: '请重新授权访问',
			confirmBtn: {
				text: '请求授权',
				active: true,
				disabled: false,
				href: 'javascript:;'
			},
			cancelBtn: {
				text: '取消',
				active: false,
				disabled: false,
				href: 'javascript:;'
			},
			onConfirm: () => {
				sessionStorage.removeItem('x-auth-token');
				var url = _bao_h5_browser.encodeURI();
				var redirect = _bao_h5_browser.apiUrl + _bao_h5_browser.oauthUrl + "?scope=snsapi_base&redirect=" + url;
				_bao_h5_common.openHref(redirect);
			}
		}).show();
		return;
	},
	get: function(method, params, successCB, isResult) {
		params.openid = _bao_h5_common.session.get('openid');
		instance.get(method, {
				params: params
			}).then(function(response) {
				if (response) {
					if (isResult) {
						successCB(response);
					} else {
						var code = response.code;
						if (code < 0) {
							_bao_h5_common.toast('系统繁忙，请稍候再试!');
							return false;
						} else if (code == 0) {
							successCB(response.data);
						} else {
							_bao_h5_common.toast(response.msg);
							return false;
						}
					}
				}
			})
			.catch(function(error) {
				console.error(error);
				var hint = "请求超时，请检查网络或稍候重试!";
				if (isDebug) {
					hint += "["+method+"]";
					console.log(hint);
					console.log(params);
				}
				_bao_h5_common.toast(hint);
				return false;
			});
	},
	post: function(method, params, successCB, isResult) {
		params.openid = _bao_h5_common.session.get('openid');
		instance.post(method, params)
			.then(function(response) {
				if (response) {
					if (isResult) {
						successCB(response);
					} else {
						var code = response.code;
						if (code < 0) {
							_bao_h5_common.toast('系统繁忙，请稍候再试!');
							return false;
						} else if (code == 0) {
							successCB(response.data);
						} else {
							_bao_h5_common.toast(response.msg);
							return false;
						}
					}
				}
			})
			.catch(function(error) {
				console.error(error);
				_bao_h5_common.toast('请求超时，请检查网络或稍候重试!');
				return false;
			});
	},
	toast: function(msg, time, domId) {
		try {
			if (!_bao_h5_common.isEmpty(msg)) {
				//提示
				layer.open({
					content: msg,
					skin: 'msg',
					time: time || 3 //3秒后自动关闭
				});
			}
		} catch (e) {}
		//if (domId) _bao_h5_common.scrollToDom(domId);
	},
	scrollToDom: function(domId) {
		var $dom = $('#' + domId);
		if (!$dom || $dom.length < 1) return;
		$dom.focus();
		var height = $(window).height() / 3 * 2;
		var offsetTop = $dom.offset().top;
		var scrollTop = document.documentElement.scrollTop;
		var isScroll = false;
		if (scrollTop > offsetTop) {
			isScroll = !0;
		} else if (offsetTop - scrollTop > height) {
			isScroll = !0;
		}
		isScroll && $dom[0].scrollIntoView({
			block: 'start',
			behavior: 'smooth'
		});
	},
	isEmpty: function(data) {
		var type = _bao_h5_common.isType(data);
		if (type == 'Array') {
			for (var at in data) {
				return false;
			}
			return true;
		} else if (type == 'Object') {
			if (Object.keys(data).length == 0 || JSON.stringify(data) == '{}') {
				return true;
			}
		} else {
			if (data == null || data == undefined || data == '') {
				return true;
			}
		}
		return false;
	},
	isType: function(data) {
		var type = Object.prototype.toString.call(data);
		if (type == '[object Array]') {
			return 'Array';
		} else if (type == '[object Object]') {
			return 'Object';
		} else {
			return 'String';
		}
	},
	noShare: function() {
		if (!_bao_h5_browser.isWx) return;
		if (typeof WeixinJSBridge == "undefined") {
			console.log('hideOptionMenu == undefined ');
			if (document.addEventListener) {
				document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
			} else if (document.attachEvent) {
				document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
				document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
			}
		} else {
			console.log('hideOptionMenu');
			onBridgeReady();
		}
	},
	wxConfig: function(data) {
		if (!_bao_h5_browser.isWx) return;
		_bao_h5_common.get("config/share", {
			url: location.href
		}, function(res) {
			if (!res) {
				_bao_h5_common.noShare();
				console.log('获取config接口注入权限验证配置失败');
				return;
			}
			var resData = res.data;
			wx.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: resData.appId, // 必填，公众号的唯一标识
				timestamp: resData.timestamp, // 必填，生成签名的时间戳
				nonceStr: resData.nonceStr, // 必填，生成签名的随机串
				signature: resData.signature, // 必填，签名，见附录1
				jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData']
				// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			_bao_h5_common.wxShare(data, resData);
		}, true);

	},
	wxShare: function(data, res) {
		//http://api.wx.zljan.com/wx/oauth2/authorize?subscribe=1&scope=snsapi_userinfo&redirect=http%3A%2F%2Fwx.zljan.com%2Fwechat%2Findex.html
		//var link = res.snsapi_base + _bao_h5_browser.encodeURI(data.link) + '&referrer_no=' + res.member_no;
		var link = res.snsapi_userinfo + _bao_h5_browser.encodeURI(data.link) + '&referrer_no=' + res.member_no;
		wx.ready(function() { //需在用户可能点击分享按钮前就先调用
			// 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
			wx.updateAppMessageShareData({
				title: data.title, // 分享标题
				desc: data.desc, // 分享描述
				link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: data.imgUrl, // 分享图标
				success: function() {
					// 设置成功
					console.log('自定义“分享给朋友”及“分享到QQ”成功');
				}
			});

			// 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容（1.4.0）
			wx.updateTimelineShareData({
				title: data.title, // 分享标题
				link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				imgUrl: data.imgUrl, // 分享图标
				success: function() {
					// 设置成功
					console.log('自定义“分享到朋友圈”及“分享到QQ空间”成功');
				}
			});
		});
	}
};
var _bao_h5_tools = {
	cardNo2Gender: function(cardNo) {
		if (!cardNo) return 1;
		if (parseInt(cardNo.substr(16, 1)) % 2 === 1) {
			return 1;
		} else {
			return 2;
		}
	},
	cardNo2Birth: function(cardNo) {
		return new Date([cardNo.substring(6, 10), cardNo.substring(10, 12), cardNo.substring(12, 14)].join('-'));
	},
	cardNo2Age: function(cardNo) {
		if (!cardNo) return 0;
		var birthDate = new Date([cardNo.substring(6, 10), cardNo.substring(10, 12), cardNo.substring(12, 14)].join('-'));
		return _bao_h5_tools.birth2Age(birthDate);
	},
	birth2Age: function(birthDate) {
		if (!birthDate) return 0;
		var nowDate = new Date();
		var age = nowDate.getFullYear() - birthDate.getFullYear() - 1;
		if (birthDate.getMonth() > nowDate.getMonth()) return age;
		if (birthDate.getMonth() < nowDate.getMonth()) return age + 1;
		if (birthDate.getMonth() === nowDate.getMonth()) {
			if (birthDate.getDate() > nowDate.getDate()) {
				return age;
			}
			//false-生日当天年龄不增加,true-生日当天年龄增加
			var nowDateAddAgeFlag = true;
			if (nowDateAddAgeFlag || birthDate.getDate() < nowDate.getDate()) {
				age++;
			}
		}
		return age;
	},
	url_param: function(key) {
		var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r !== null) return decodeURIComponent(r[2]);
		return '';
	},
	convert_url_protocol: function(url) {
		if (!url) return url;
		return location.protocol + '//' + url.replace('https://', '').replace('http://', '').replace('//', '');
	},
	get_plus_date: function(start_date, num, unit) {
		var date = new Date();
		if (start_date) {
			date = new Date(start_date);
		}
		if (unit == 'year') {
			date.setFullYear(date.getFullYear() + num);
			date.setDate(date.getDate() - 1);
		} else if (unit == 'month') {
			date.setMonth(date.getMonth() + num);
		} else {
			date.setDate(date.getDate() + num);
		}
		return _bao_h5_tools.get_format_date(date);
	},
	get_format_date: function(date) {
		var month = date.getMonth() + 1;
		month = month < 10 ? '0' + month : month;
		var day = date.getDate();
		day = day < 10 ? '0' + day : day;
		return date.getFullYear() + '-' + month + '-' + day;
	},
	listToTreeWithLevel: function(list, id_key, parent_key, parent, key_text, key_value) {
		var out = []
		for (var node of list) {
			if (node[parent_key] == parent) {
				//node.level = level;
				node.text = node[key_text];
				node.value = node[key_value];
				var children = _bao_h5_tools.listToTreeWithLevel(list, id_key, parent_key, node[id_key], key_text, key_value)
				if (children.length) {
					node.children = children
				}
				out.push(node)
			}
		}
		return out
	}
};
var _bao_h5_valid = {
	cardNo: function(cardNo) {
		/*校验身份证*/
		if (!cardNo) return false;
		cardNo = cardNo.toUpperCase();
		if (cardNo.length === 15) {
			return false;
		}
		if (cardNo.substring(cardNo.length - 1, cardNo.length) === 'X') {
			var cardNoRule = /^(\d{6})(19|20)?(\d{2})([01]\d)([0123]\d)(\d{3})(\d|X)?$/;
			return cardNoRule.test(cardNo);
		}
		if (!/^\d{17}(\d|x)$/i.test(cardNo)) {
			return false;
		}
		var iSum = 0;
		var sBirthday = cardNo.substr(6, 4) + '-' + Number(cardNo.substr(10, 2)) + '-' + Number(cardNo.substr(12, 2));
		var d = new Date(sBirthday.replace(/-/g, '/'));
		if (sBirthday !== (d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate())) {
			return false;
		}
		for (var i = 17; i >= 0; i--) {
			iSum += (Math.pow(2, i) % 11) * parseInt(cardNo.charAt(17 - i), 11);
		}
		if (iSum % 11 !== 1) {
			return false;
		}
		return true;
	},
	user_name: function(user_name) {
		/*校验姓名，包含少数民族姓名*/
		return /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/.test(user_name);
	},
	mobile: function(mobile) {
		/*校验手机号*/
		return /^1[0-9]\d{9}$/.test(mobile);
	},
	email: function(email) {
		return /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(email);
	},
	positive_int: function(str) {
		return /^[0-9]\d*$/.test(str);
	},
	url: function(url) {
		return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
	}
};

Date.prototype.format = function(fmt) {
	var o = {
		'M+': this.getMonth() + 1, //月份
		'd+': this.getDate(), //日
		'h+': this.getHours(), //小时
		'm+': this.getMinutes(), //分
		's+': this.getSeconds(), //秒
		'S': this.getMilliseconds(), //毫秒,
		'q+': Math.floor((this.getMonth() + 3) / 3) //季度
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[
			k]).substr(('' + o[k]).length)));
	return fmt;
};

function onBridgeReady() {
	WeixinJSBridge.call('hideOptionMenu');
}

function layerOpen() {
	layer.open({
		content: '您确定要刷新一下本页面吗？',
		btn: ['刷新', '不要'],
		yes: function(index) {
			location.reload();
			layer.close(index);
		}
	});
}
//屏幕适配
(function(doc, win) { //屏幕自适应
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= 760) {
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
			}
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
	_bao_h5_browser.isDebug();
	_bao_h5_browser.initAxios();

	// (/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur', (e) => {
	// 	['input', 'textarea'].includes(e.target.localName) && document.body.scrollIntoView(false)
	// }, true);

	$('input,textarea').on('blur', function() {
		window.scroll(0, 0);
	});
	$('select').on('change', function() {
		window.scroll(0, 0);
	});

	var pathname = window.location.pathname;
	var reg = RegExp(/products|product-detail/);
	if (!reg.exec(pathname)) {
		setTimeout(function() {
			_bao_h5_common.noShare();
		}, 500);
	}

})(document, window);
