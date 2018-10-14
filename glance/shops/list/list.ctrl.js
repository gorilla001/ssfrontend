(function () {
    'use strict';
    angular.module('glance.shop')
        .controller('ListShopCtrl', ListShopCtrl);

    /* @ngInject */
    function ListShopCtrl(gHttp,$stateParams, $state, confirmModal, $rootScope) {
        var self = this;
	self.shops = [];
	self.selected = [];
	self.total = 0;
	self.query = {
	    filter: "",
    	    limit: 10,
    	    page: 0
  	};

	self.search = function() {
	    self.getShops();
	}
	
	self.next = function() {
	    self.query.page++;
	    self.getShops();
	}

        self.previous = function() {
	    self.query.page--;	
	    self.getShops();
	}

	self.getShops = function() {
	    gHttp.Resource('shop.list').get({params:self.query}).then(function(resp) {
	    	self.shops = resp.data;
		self.total=resp.headers["count"];
	    });
	}

	self.getShops();

	self.stateMap = {
	       "enabled": "营业",
       	       "disabled": "停业",
	}	       

	self.enableShop = function() {
            angular.forEach(self.selected, function (shop) {
		gHttp.Resource('shop.enable', {shop_id: shop.id}).patch().then(function(data){
			$state.reload();
		})
	    })
	};

	self.disableShop = function() {
	    angular.forEach(self.selected, function (shop) {
		gHttp.Resource('shop.disable', {shop_id: shop.id}).patch().then(function(data){
			$state.reload();
		})
	    })
	};

	self.deleteShop = function() {
	    confirmModal.open("确认删除选中的商家?").then(function () {
	           angular.forEach(self.selected, function (shop) {
		        gHttp.Resource('shop.delete', {shop_id: shop.id}).delete().then(function(data) {
		    	    $state.reload();
		        });
		    });
		})
	};
    }
})();
