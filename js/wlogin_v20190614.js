'use strict';
var objItem = {};
objItem.variable = {
    sourceType: _bao_h5_tools.url_param('sourceType') || 'mobile',
    reSource: _bao_h5_tools.url_param('reSource'),
    userId: _bao_h5_tools.url_param('userId'),
    openId: _bao_h5_tools.url_param('openId'),
    isInsurance: window.location.pathname.indexOf('/insurance') > 0
};
/* objItem.ajax */
objItem.ajax = {
	/* init: function (register, create) {
	    //objItem.vue.register();
	    objItem.vue.create(create.data, create.methods, create.computed);
	}, */
	login: function () {
		sessionStorage.setItem('x-auth-token', 'login');
		objItem.vue.init({}, {
			data: {
				d_login: objItem.vue.data.d_login
			},
			methods: objItem.vue.methods.m_login,
			computed: {}
		});
	}
};
objItem.tools = {
	// 下拉选择指定数据的对象
    t_select_by_value: function (data, value) {
        var obj = {index: -1, data: undefined};
        if (!data) return obj;
        obj.data = data[0];
        $.each(data, function (i, o) {
            if (o.value === value) {
                obj.data = o;
                obj.index = i;
                return false;
            }
        });
        return obj;
    },
	// 下拉选择指定数据的索引
    t_select_by_index: function (data, index) {
        if (!data) return undefined;
        var obj = data[0];
        $.each(data, function (i, o) {
            if (i === index) {
                obj = o;
                return false;
            }
        });
        return obj;
    },
	// 获取对象的value值
    t_object_val: function (obj) {
        return objItem.tools.t_object_field(obj, 'value');
    },
	value_notnull: function (id){
		var e = !0;
		return $(id).each(function() {
			if (!$(this).val().trim()) return e = !1, !1
		}), e
	},
	// 获取对象的对应字段值
    t_object_field: function (obj, field) {
        if (!obj || obj === null) return '';
        if (!field) return obj;
        var _field = obj[field];
        if (!_field) _field = '';
        return _field;
    },
	// 获取当前年月日时间
    t_date_ymd_now: function () {
        var date = new Date();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        return date;
    },
    t_toast: function (msg, domId) {
        _bao_h5_common.toast(msg, domId);
    }
};
objItem.vue = {
    obj: undefined,
    data: {
		d_login: {
			user_name: '',
			phone: '',
			verificationCode: '',
			disabled: true,
			sendSms: false,
			mobileType: 'tel',
			passwordType: 'password',
			verificationCodeType: 'tel',
			p_user_name: '请输入姓名',
			p_phone: '请输入手机号',
			p_code: '请输入验证码',
			loadingShow: false
		}
    },
    methods: {
		m_login: {
			login_submit: function() {
				var that = this;
				var data = that.d_login;
				
				that.d_login.disabled = true;
				that.d_login.loadingShow = true;
				$("#loginBtn").removeClass("model_btn_color");
				setTimeout(function() {
					_bao_h5_common.post("wx/user/v1/wxBinding", {
						openid: _bao_h5_tools.url_param('openid'),
						user_name: data.user_name,
						user_phone: $.trim(data.phone),
						sms_code: data.verificationCode,
						sms_token: sessionStorage.getItem('x-sms-token')
					}, function(res) {
						that.d_login.disabled = false;
						that.d_login.loadingShow = false;
						that.propertychange('');
						if (res.code == 0) {
							sessionStorage.removeItem('x-sms-token');
							sessionStorage.setItem('x-auth-token', res.data.token);
							_bao_h5_common.toast('绑定成功，正在请求跳转···');
							var redirect = _bao_h5_tools.url_param('redirect');
							
							if (_bao_h5_valid.url(redirect)) {
								var url = decodeURIComponent(redirect);
								_bao_h5_common.openHref(url);
							} else {
								_bao_h5_common.openHref(_bao_h5_browser.pageUrl('products'));
							}
						} else {
							_bao_h5_common.toast(res.msg ? res.msg : '抱歉，手机号绑定失败');
						}
						return !1;
					}, true);
				}, 500);
			},
			propertychange: function() {
				if (this.d_login.phone.trim().length == 11 && _bao_h5_valid.mobile(this.d_login.phone.trim())) {
					//this.loginInput.sendSms = false;
					$(".get_code").removeClass("mesg-disable");
					if (objItem.tools.value_notnull('.txt-input input')) {
						this.d_login.disabled = false;
						setTimeout(function() {
							$("#loginBtn").addClass("model_btn_color");
						}, 200);
					} else {
						this.d_login.disabled = true;
						$("#loginBtn").removeClass("model_btn_color");
					}
				} else {
					this.d_login.disabled = true;
					//this.loginInput.sendSms = true;
					$(".get_code").addClass("mesg-disable");
					$("#loginBtn").removeClass("model_btn_color");
				}
			},
			get_verify_code: function() {
				var that = this;
				var el = event.currentTarget;
				var data = that.d_login;
				if ($(el).hasClass("mesg-disable") || that.d_login.sendSms) return !1;
				$(".get_code").addClass("mesg-disable");
				const toast = this.$createToast({
					time: 0,
					txt: '请求加载中'
				});
				toast.show();
				_bao_h5_common.post("client/general/v1/sendSms", {
					openid: _bao_h5_tools.url_param('openid'),
					send_phone: $.trim(data.phone)
				}, function(res) {
					toast.hide();
					if (!res) {
						$(".get_code").html('获取验证码').removeClass("mesg-disable");
						that.d_login.sendSms = true;
					    _bao_h5_common.toast('验证码发送失败，请稍后重试！');
					    return;
					}
					_bao_h5_common.toast('验证码发送成功！');
					that.d_login.sendSms = true;
					//that.loginInput.sms_token = res.data.sms_token;
					sessionStorage.setItem('x-sms-token', res.data.sms_token);
					var c = 59;
					$(".get_code").addClass("mesg-disable").html("重新发送(" + c + "s)");
					var o = setInterval(function() {
						c--;
						if (c > 0) $(".get_code").addClass("mesg-disable").html("重新发送(" + c + "s)");
						else {
							var d = that.d_login.phone;
							_bao_h5_valid.mobile(d) ? ($(".get_code").html('重新发送').removeClass("mesg-disable"), that.d_login.sendSms =
								false) : $(".get_code").html('获取验证码');
							clearInterval(o);
						}
					}, 1000);
					return !1;
				}, true);
			}
		}
    },
    init: function (register, create) {
        //objItem.vue.register();
        objItem.vue.create(create.data, create.methods, create.computed);
    },
    create: function (data, methods, computed) {
        objItem.vue.obj = new Vue({
            el: '#app',
            data: data,
            methods: methods,
            computed: computed,
            mounted: function () {
                //var _vue = this;
               
                /* this.$nextTick(function () {
                    objItem.vue.session_to_vue(_vue);
                    $(window).scroll(function () {
                        _vue.tab_scroll_update();
                    });
                    _vue.init_insurance_select();
                }); */
            }
        });
    },
};
$(function () {
    console.log('item begin .....');
    objItem.ajax.login();
	_bao_h5_common.noShare();
});