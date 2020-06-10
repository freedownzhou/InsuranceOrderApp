'use strict';
var objItem = {};
objItem.variable = {
    reqItemId: _bao_h5_tools.url_param('itemId'),
    sourceType: _bao_h5_tools.url_param('sourceType') || 'mobile'
    //resourcePlace: _bao_h5_tools.url_param('resourcePlace') || 'DEFAULT',
    //reItemId: _bao_h5_tools.url_param('reItemId'),
    //reOrderId: _bao_h5_tools.url_param('reOrderId'),
    //reSource: _bao_h5_tools.url_param('reSource'),
    //userId: _bao_h5_tools.url_param('userId'),
    //openId: _bao_h5_tools.url_param('openId'),
    //isInsurance: window.location.pathname.indexOf('/insurance') > 0
};
objItem.data = {
	
};
objItem.param = {
    p_product: function () {
//      var variable = objItem.variable;
//      var param = {
//          product_id: variable.reqItemId,
//			type: '0|1'
//      };
//      return param;
    },
	p_serials: function () {
//		var _vue = objItem.vue.obj;
//		var conditions = _vue.conditions;
//		
//		var param = {};
//		if (conditions) {
//			$.each(conditions, function (i, o) {
//				if (o.calculate_price === 'y') {
//					param[o.param_key] = o.checked_value;
//				}
//			});
//		}
//		return param;
	},
	p_serials_verify: function (trial_param, conditions) {
//		var _vue = objItem.vue.obj;
//		var success = true;
//		for (var key in trial_param) {
//			if (trial_param[key] == '-1') {
//				success = false;
//				return;
//			}
//		}
//		//var rule = _vue.check_scheme_calculate.recognizee;
//		var conditions = _vue.check_scheme_conditions;
//		if (conditions) {
//			$.each(conditions, function (i, o) {
//				if (o.verify) {
//					var a = trial_param[o.param_key];
//					if (o.verify.isAge) {
//						success = objItem.valid.v_age(_vue.check_scheme_calculate.recognizee, _vue.conditions[i].checked_value, _vue.conditions[i].checked_text);
//					}
//				}
//			});
//		}
		return success;
	},
	// 提交
    p_confirm: function () {
       
    }
};
objItem.ajax = {
	// 产品信息
	product: function () {
//		console.log('ajax - product');
//		_bao_h5_common.get("wx/product/v1/details", objItem.param.p_product(), function(res) {
//			objItem.vue.init();
//			objItem.module.m_product(res.product);
//			objItem.ajax.schemes();
//			objItem.ajax.common_issues();
//		});
	},
	schemes: function () {
//		console.log('ajax - schemes');
//		_bao_h5_common.get("wx/product/v1/schemes", objItem.param.p_product(), function(res) {
//			objItem.module.m_schemes(res.schemes);
//		});
    },
	/* 不启用 */
	clause: function () {
       
    },
	common_issues: function () {
//		console.log('ajax - schemes');
//		_bao_h5_common.get("wx/product/v1/commonIssues", objItem.param.p_product(), function(res) {
//			objItem.module.m_common_issues(res.issues);
//		});
	},
	// 计算价格
	calculate_price: function () {
//		var _vue = objItem.vue.obj;
//		if(!_vue.calculate.trial_pop_show) return;
//		console.log('ajax - calculate_price');
//		var scheme = _vue.scheme;
//		if (scheme.is_calculate_price == 'y') {
//			var trial_param = objItem.param.p_serials();
//			
//			if(!objItem.param.p_serials_verify(trial_param)) {
//				_vue.total_price = 0.00;
//				_vue._total_price;
//				return;
//			}
//			trial_param.scheme_id = scheme.scheme_id;
//			_bao_h5_common.get("wx/product/v1/calculatePrice", trial_param, function(res) {
//				if (res.price) {
//					_vue.total_price = res.price.price;
//				} else {
//					_vue.total_price = 0.00;
//				}
//			});
//		} else {
//			_vue.total_price = scheme.present_price;
//		}
//		_vue._total_price;
	}
};

objItem.module = {
	m_init: function () {
        console.log('module - m_init');
		objItem.ajax.product();
        
    },
	m_share: function (product) {
		
//		setTimeout(function () {
//			console.log('module - m_share');
//			var variable = objItem.variable;
//			
//			var shareUrl = _bao_h5_browser.pageUrl('product-detail', {
//				itemId: variable.reqItemId,
//				sourceType: variable.sourceType
//			});
//			var shareIcon = _bao_h5_browser.cdnUrl + product.simages_url;
//		    _bao_h5_common.wxConfig({
//				title: '中联金安经纪保险 为您推荐' + product.product_name,
//				desc: product.product_feature,
//				link: shareUrl,
//				imgUrl: shareIcon
//			});
//		}, 1000);
		
	},
	m_product: function (data) {
//      console.log('module - m_product');
//      var _vue = objItem.vue.obj;
//		Vue.set(_vue, 'product', data);
//		objItem.module.m_share(data);
    },
	m_schemes: function (data) {
//	    console.log('module - m_schemes');
//		var scheme = data[0];
//		var calculate = scheme.calculate; // 方案投保条件
//		var conditions = scheme.conditions; // 方案投保条件
//		var check_scheme_id = scheme.scheme_id;
//		var check_scheme_index = 0;
//		$.each(data, function (i, o) {
//			if (o.first_choice === 'y') {
//				scheme = o;
//				check_scheme_id = o.scheme_id;
//				check_scheme_index = i;
//				calculate = o.calculate;
//				conditions = o.conditions;
//				return;
//			}
//      });
//		
//	    var _vue = objItem.vue.obj;
//	    Vue.set(_vue, 'scheme', scheme);
//	    Vue.set(_vue, 'check_scheme_id', check_scheme_id);
//	    Vue.set(_vue, 'check_scheme_index', check_scheme_index);
//	    Vue.set(_vue, 'scheme_count', data.length);
//	    Vue.set(_vue, 'schemeList', data);
//	    //Vue.set(_vue, 'calculate', calculate);
//	    Vue.set(_vue, 'conditions', conditions);
//	    Vue.set(_vue, 'check_scheme_calculate', calculate);
//	    Vue.set(_vue, 'check_scheme_conditions', conditions);
	},
	m_common_issues: function (data) {
//	    console.log('module - common_issues');
//	    var _vue = objItem.vue.obj;
//	    Vue.set(_vue, 'issueList', data);
	}
};
// 投保页面使用
objItem.valid = {
	v_age: function (rule, age, birthday) {
//		var success = true;
//		var earliestAge = rule.earliestAge != null ? rule.earliestAge * 1 : 0;
//		var minAge = rule.minAge;
//		var maxAge = rule.maxAge;
//		var info = '产品方案';
//		if (earliestAge > 0) {
//			var birth = new Date(birthday);
//			var nowDate = new Date();
//			nowDate.setDate(nowDate.getDate() + Number(earliestAge * -1));
//			if (nowDate.getTime() < birth.getTime() || age > maxAge) {
//				_bao_h5_common.toast('该' + info + rule.title + '年龄须处于出生满' + earliestAge + '天和' + maxAge + '岁之间');
//				success = false;
//				return;
//			}
//		} else {
//			if (age < minAge || age > maxAge) {
//				_bao_h5_common.toast('该' + info + rule.title + '年龄须处于' + minAge + '岁和' + maxAge + '岁之间');
//				success = false;
//				return;
//			}
//		}
		return success;
	}
	
};
objItem.vue = {
	obj: undefined,
	data: {
		product: {},
		scheme: {},
		schemeList: [],
		safeguards: [],
		clauses: [],
		informations: [],
		calculate: [],
		check_scheme_calculate: {},
		conditions: [],
		check_scheme_conditions: [],
		total_price: 0,
		number: 1,
		check_scheme_id: '',
		check_scheme_index: 0,
		scheme_count: 0,
		birthday: '',
		tip_pop: {
			show: false,
			title: '',
			content: ''
		},
		swiperScheme:{},
		swiperPopScheme:{},
		calculate: {
			trial_pop_show: false
            /* plan: {key: 'plan', name: '保险方案'},
            periods: {key: 'periods', name: '保障期间'},
            payPeriod: {key: 'payPeriod', name: '交费期间'},
            amount: {key: 'amount', name: '保障额度'},
            socials: {key: 'socials', name: '有无社保'},
            gender: {key: 'gender', name: '性别'},
            scheme: {key: 'scheme', name: '项目列表'},
            age: {birth: undefined},
            trialClick: false */
        },
		tabs: {
			isCheck: false,
			check_tab_index: 0,
			data: [
				{name: '产品介绍', tag: 0, _id: 'tab_0'},
				{name: '购买须知', tag: 1, _id: 'tab_1'},
				{name: '理赔流程', tag: 2, _id: 'tab_2'},
				{name: '常见问题', tag: 3, _id: 'tab_3'}
			]
		},
		select_swiper:{},
		//trial_param:{},
		issueList:[]
	},
	methods: {
		// 方案计划选择改变
//		plan_change: function (item, index) {
//			this.scheme = item;
//			this.check_scheme_calculate = item.calculate;
//			this.check_scheme_conditions = item.conditions;
//			this.check_scheme_id = item.scheme_id;
//			this.check_scheme_index = index;
//          //this.calculate.plan.select = item;
//          if (index > 1) {
//          	this.swiperScheme.slideTo(index, 500, false);
//          	this.swiperPopScheme.slideTo(index, 500, false);
//          } else {
//          	this.swiperScheme.slideTo(0, 500, false);
//          	this.swiperPopScheme.slideTo(0, 500, false);
//          }
//			objItem.ajax.calculate_price();
//      },
//		tip_pop_condition:function(title, content){
//			this.tip_pop = {
//				show: true,
//				title: title,
//				content: content
//			}
//		},
//		tab_change: function (index, _id) {
//			var _vue = this;
//			_vue.tabs.isCheck = true;
//			_vue.tabs.check_tab_index = index;
//			var _navH = $(".slide_nav").outerHeight(true);
//			var a_h = parseInt($('#' + _id).offset().top-_navH);
//			$('html,body').animate({'scrollTop': a_h}, function () {
//              _vue.tabs.isCheck = false;
//          });
//		},
//		tab_scroll_update: function () {
//          var _vue = this;
//			if (_vue.tabs.isCheck) return;
//          var scrollT = $(window).scrollTop();
//			var _navH = $(".slide_nav").outerHeight(true);
//          $.each(_vue.tabs.data, function (i, o) {
//              var $tabs = $('#tab_' + i);
//              var maxOffset = $tabs.offset().top - scrollT + $tabs.height() - _navH;
//              _vue.tabs.check_tab_index = i;
//              if (maxOffset > 0) return false;
//          });
//      },
//		// 出生日期选择
//		birth_show: function (item, index) {
//			//this.trial_date_class = item.class_name;
//			//this.trial_date_key = item.param_key;
//			this.trial_date_index = index;
//          if (!this.datePicker) {
//            this.datePicker = this.$createDatePicker({
//              title: item.default_txt,
//              min: new Date(1950, 1, 1),
//              max: new Date(),
//              value: new Date(),
//              onSelect: this.birth_confirm
//            })
//          }
//          this.datePicker.show();
//      },
//		// 出生日期提交
//      birth_confirm: function (date, selectedVal, selectedText) {
//          //var chose_text = `${selectedText.join('-')}`;
//			var date_text = _bao_h5_tools.get_format_date(date)
//			var age = _bao_h5_tools.birth2Age(date);
//			var index = this.trial_date_index;
//			
//			this.conditions_change({'index':index,'value':age,'text':date_text}, index);
//      },
//		
//		// 试算保费弹框显示
//		trial_pop_show: function () {
//			var _vue = this;
//			_vue.calculate.trial_pop_show = true;
//			_vue.init_calculate_price_param();
//      },
//		// 查看保障详情
//		to_safeguard_detail: function (product_id) {
//          var index = this.check_scheme_index;
//			var scheme_id = this.scheme.scheme_id;
//          var url = _bao_h5_browser.pageUrl('safeguard-detail', {
//              itemId: product_id,
//				sId: scheme_id,
//				index: index,
//              redirect: _bao_h5_browser.encodeURI('')
//          });
//      },
//		conditions_change: function (item, index) {
//			this.conditions[index].checked_index = item.index;
//			this.conditions[index].checked_value = item.value;
//			this.conditions[index].checked_text = item.text;
//			objItem.ajax.calculate_price();
//		},
//		trial_button_change: function(item, index){
//			
//			this.conditions_change(item, index);
//		},
//		trial_select_change: function (item, index) {
//			
//			this.trial_select_index = index;
//          this.create_select_swiper(item);
//			
//      },
//		create_select_swiper: function (item) {
//			var select_swiper = this.select_swiper[item.param_key];
//			if (!select_swiper) {
//				select_swiper = this.$createPicker({
//					title: item.title,
//					selectedIndex: [item.checked_index],
//					data: [item.datas],
//					onSelect: this.on_select_swiper
//				});
//				this.select_swiper[item.param_key] = select_swiper;
//			}
//			select_swiper.show();
//		},
//		on_select_swiper: function (selectedVal, selectedIndex, selectedText) {
//			var value = `${selectedVal}`;
//			var index = `${selectedIndex}`;
//			var text = `${selectedText}`;
//			this.conditions_change({'index':index,'value':value,'text':text}, this.trial_select_index);
//			
//		},
//		// 去投保
//		to_insurance: function () {
//          var _vue = this;
//          var scheme = _vue.scheme;
//			var product = _vue.product;
//			var insure_page = 'plan-insure';
//			if (scheme.insure_page) {
//				insure_page = scheme.insure_page;
//			}
//			if (_bao_h5_valid.url(insure_page)) {
//				_bao_h5_common.openHref(insure_page);
//			} else{
//				var url = _bao_h5_browser.pageUrl(insure_page, {
//					'itemId': objItem.variable.reqItemId,
//					'planId': scheme.scheme_id 
//				});
//				if (product.health_told == 'y') {
//					var url2 = _bao_h5_browser.pageUrl('notify/'+product.product_no+'_notify', {
//						'redirect': _bao_h5_browser.encodeURI(url)
//					});
//					_bao_h5_common.openHref(url2);
//				} else {
//					_bao_h5_common.openHref(url);
//				}
//			}
//          
//      },
//		create_swiper: function (key) {
//			var _vue = this;
//			var obj = new Swiper('#'+key,{
//			    watchSlidesProgress : true,
//				watchSlidesVisibility : true,
//				observer:true,
//				observeParents:true,
//				initialSlide:0,
//				slidesPerView: 'auto'
//			});
//			_vue[key] = obj;
//		},
//		// 初始化试算价格参数
//		init_calculate_price_param: function () {
//			objItem.ajax.calculate_price();
//		},
//		insure_confirm: function () {
//			
//		}
		
	},
	// computed用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；
	computed: {
//		_total_price: function () {
//			var totalPrice = this.total_price * this.number;
//			/* if (this.powerful.needInsure) {
//				if (this.powerful.price > totalPrice) {
//					if (totalPrice > 0) {
//						this.powerful.price = totalPrice;
//					} else {
//						this.powerful.price = 1;
//					}
//				}
//				totalPrice += Number(this.powerful.price);
//			} */
//			var total_price = totalPrice.toFixed(2);
//			this.total_price = total_price;
//			return total_price;
//		}
	},
	init: function () {
        //objItem.vue.register();
        objItem.vue.create();
    },
	create: function () {
		objItem.vue.obj = new Vue({
            el: '#app',
            data: objItem.vue.data,
            methods: objItem.vue.methods,
            computed: objItem.vue.computed,
            mounted: function () {
//              var _vue = this;
//				_vue.create_swiper('swiperScheme');
//				_vue.create_swiper('swiperPopScheme');
//				setTimeout(function(){
//					_vue.swiperScheme.slideTo(0, 0, false);
//					_vue.swiperPopScheme.slideTo(0, 0, false);
//					$('#app').removeClass('none');
//				},500);
//				
//              this.$nextTick(function () {
//                  //objItem.vue.session_to_vue(_vue);
//                  $(window).scroll(function () {
//                      _vue.tab_scroll_update();
//                  });
//                  //_vue.init_insurance_select();
//              });
//				
            },
            updated () {
            	try {
            		if (window._scrollBack_) {
            			new _scrollBack_()
            		}
            	} catch (e) {
            		console.log(e)
            	}
            }
        });
	}
};
$(function () {
    console.log('item begin .....');
    objItem.module.m_init();
});