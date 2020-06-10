'use strict';
var objItem = {};

// URL携带变量
objItem.variable = {
    reqItemId: _bao_h5_tools.url_param('itemId'),
    planId: _bao_h5_tools.url_param('planId')
};

// 请求参数
objItem.param = {
	p_product: function () {
	    var variable = objItem.variable;
	    var param = {
	        product_id: variable.reqItemId
	    };
	    return param;
	},
};

// ajax请求
objItem.ajax = {
	// 产品信息
	product: function () {
		console.log('ajax - product');
		_bao_h5_common.get("wx/product/v1/details", objItem.param.p_product(), function(res) {
			objItem.vue.init();
			objItem.module.m_product(res.product);
			objItem.ajax.scheme();
		});
	},
};

// 模块组件
objItem.module = {
	m_init: function () {
	    console.log('module - m_init');
		objItem.ajax.product();
	},
	
};

// 投保页面使用
objItem.valid = {
	v_pre_check: function () {
	    if (!objItem.valid.v_param_check()) return false;
	    //if (!objItem.valid.v_health_told()) return false;
	    return !0;
	},
};


objItem.vue = {
	obj: undefined,
	data: {
		product: {},
		scheme: {},
	},
	methods: {
		area_show: function (key) {
			var select_swiper = this.select_swiper.addressData;
			this.area_select_key = key;
			
			if (!select_swiper) {
				var addressData = provinceList;
				addressData.forEach(province => {
				  province.children = cityList[province.value]
				  province.children.forEach(city => {
					city.children = areaList[city.value]
				  })
				});
				select_swiper = this.$createCascadePicker({
					title: '选择地址',
					data: addressData,
					onSelect: this.areaSelect
				});
				this.select_swiper.addressData = select_swiper;
			}
			select_swiper.show();
        },
		
	},
	// computed用来监控自己定义的变量，该变量不在data里面声明，直接在computed里面定义，然后就可以在页面上进行双向数据绑定展示出结果或者用作其他处理；
	computed: {
		_total_price: function () {
			var totalPrice = this.price * this.number;
			var mainInsurancePrice = totalPrice;
			if (this.sumInsuredData.checked_value) {
				var sumPrice = this.sumInsuredData.checked_value;
				sumPrice = sumPrice * 10000 / 1000;
				totalPrice = totalPrice * sumPrice;
				mainInsurancePrice = totalPrice;
				var additionalRiskPrice = 0;
				if (this.price2 > 0) {
					//console.log(this.price2);
					additionalRiskPrice = totalPrice / 1000 * this.price2;
					this.additionalRiskPrice = additionalRiskPrice.toFixed(2);;
				}
				console.log(mainInsurancePrice);
				console.log(additionalRiskPrice);
				totalPrice = mainInsurancePrice + additionalRiskPrice;
			}
			this.mainInsurancePrice = mainInsurancePrice.toFixed(2);;
			var total_price = totalPrice.toFixed(2);
			this.totalPrice = total_price;
			return total_price;
		}
	},
	create: function () {
		objItem.vue.obj = new Vue({
            el: '#wxApp',
            data: objItem.vue.data,
            methods: objItem.vue.methods,
            computed: objItem.vue.computed,
            mounted: function () {
                //var _vue = this;
				
				/* setTimeout(function() {
					objItem.ajax.pay_info({'order_id': 'f39d032c381049a8aefd25d162aa7f23'});
				}, 2000); */
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
	},
	init: function () {
	    //objItem.vue.register();
	    objItem.vue.create();
	}
};

$(function () {
    console.log('item begin .....');
    objItem.module.m_init();
});