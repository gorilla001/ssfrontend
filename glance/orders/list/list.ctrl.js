(function () {
    'use strict';
    angular.module('glance.order')
        .controller('ListOrderCtrl', ListOrderCtrl);

    /* @ngInject */
    function ListOrderCtrl(gHttp,$stateParams, $state, confirmModal) {
        var self = this;
	self.orders = [];

	self.orderStatus = {
	       "0": "--",
       	       "1": "待配送",
       	       "2": "配送中",
       	       "3": "已完成",
	}	       

	self.paymentStatus = {
	       "0": "待付款",
               "1": "已付款",
	}	

	self.query = {
	    filter: "",
	    limit: 10,
	    page:0,
	}
	
	self.total = 0;

	self.getOrders = function() {
	    gHttp.Resource('order.list').get({params:self.query}).then(function(resp) {
	        self.orders = resp.data;
		self.total = resp.headers["count"];
	    });
	}

	self.next = function() {
	    self.query.page++;
	    self.getOrders();
	}

        self.previous = function() {
	    self.query.page--;	
	    self.getOrders();
	}

	self.search = function() {
		console.log("search");
            self.getOrders();
	}

	self.getOrders();
    }
})();
