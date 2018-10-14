(function () {
    'use strict';
    angular.module('glance.item')
        .controller('ListItemCtrl', ListItemCtrl);

    /* @ngInject */
    function ListItemCtrl(gHttp,$stateParams, $state, confirmModal, $rootScope) {
        var self = this;
	self.items = [];
	self.selected = [];
	self.total = 0;
	self.query = {
	    filter: "",
    	    limit: 10,
    	    page: 0
  	};

	self.search = function() {
	    self.getItems();
	}
	
	self.next = function() {
	    self.query.page++;
	    self.getItems();
	}

        self.previous = function() {
	    self.query.page--;	
	    self.getItems();
	}

	self.getItems = function() {
	    gHttp.Resource('item.list').get({params:self.query}).then(function(resp) {
	    	self.items = resp.data;
		self.total=resp.headers["count"];
	    });
	}

	self.getItems();

	self.stateMap = {
	       "enabled": "上架",
       	       "disabled": "下架",
	}	       

	self.enableItem = function() {
            angular.forEach(self.selected, function (item) {
		gHttp.Resource('item.enable', {item_id: item.id}).patch().then(function(data){
			$state.reload();
		})
	    })
	};

	self.disableItem = function() {
	    angular.forEach(self.selected, function (item) {
		gHttp.Resource('item.disable', {item_id: item.id}).patch().then(function(data){
			$state.reload();
		})
	    })
	};

	self.deleteItem = function() {
	    confirmModal.open("确认删除选中的商品?").then(function () {
	           angular.forEach(self.selected, function (item) {
		        gHttp.Resource('item.delete', {item_id: item.id}).delete().then(function(data) {
		    	    $state.reload();
		        });
		    });
		})
	};
    }
})();
