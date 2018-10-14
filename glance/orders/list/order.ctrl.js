(function () {
    'use strict';
    angular.module('glance.order')
        .controller('OrderCtrl', OrderCtrl);

    /* @ngInject */
    function OrderCtrl(gHttp,$stateParams, $state, confirmModal) {
        var self = this;
	self.orders = [];

	switch ($state.current.name) {
	    case "order.list.all":
	        gHttp.Resource('order.list').get().then(function(data) {
		    self.orders = data;
		    console.log(self.orders);
	        });
		break;
	    case "order.list.unpay":
	        gHttp.Resource('order.list').get().then(function(data) {
		    self.orders = data;
	        });
		break;
	    case "order.list.undistributed":
	        gHttp.Resource('order.list').get().then(function(data) {
		    self.orders = data;
	        });
		break;
	    case "order.list.distributing":
	        gHttp.Resource('order.list').get().then(function(data) {
		    self.orders = data;
	        });
		break;
	    case "order.list.finished":
	        gHttp.Resource('order.list').get().then(function(data) {
		    self.orders = data;
	        });
		break;
	}
	
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

	self.IsUndestributed = function() {
		return $state.current.name == "order.list.undistributed"
	}

	self.enableItem = function(itemId) {
		gHttp.Resource('item.enable', {item_id: itemId}).patch().then(function(data){
			$state.reload();
		})
	};

	self.disableItem = function(itemId) {
		gHttp.Resource('item.disable', {item_id: itemId}).patch().then(function(data){
			$state.reload();
		});
	};

	self.deleteItem = function(itemId) {
		confirmModal.open("是否确认删除该商品?").then(function () {
		    gHttp.Resource('item.delete', {item_id: itemId}).delete().then(function(data) {
		    	$state.reload();
		    });
		});
	};
    }
})();
