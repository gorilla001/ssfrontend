(function () {
    'use strict';
    angular.module('glance.order')
        .controller('DetailOrderCtrl', DetailOrderCtrl);

    /* @ngInject */
    function DetailOrderCtrl(gHttp, $stateParams) {
        var self = this;

	self.order= {};

	self.psMap = {
		'0': '待支付',
		'1': '已支付'
	}

	self.dlMap = {
		'0': '-',
		'1': '待配送',
		'2': '配送中',
		'3': '已完成'
	}

	gHttp.Resource('order.detail', {order_id: $stateParams.order_id}).get().then(function(resp) {
		self.order = resp.data;
	});
    }
        

})();
