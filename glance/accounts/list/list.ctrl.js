(function () {
    'use strict';
    angular.module('glance.account')
        .controller('ListAccountsCtrl', ListAccountsCtrl);

    /* @ngInject */
    function ListAccountsCtrl(gHttp,$stateParams, $state, confirmModal, $rootScope) {
        var self = this;
	self.accounts = [];
	self.selected = [];
	self.total = 0;
	self.query = {
	    filter: "",
    	    limit: 10,
    	    page: 0
  	};

	self.search = function() {
	    self.getAccounts();
	}
	
	self.next = function() {
	    self.query.page++;
	    self.getAccounts();
	}

        self.previous = function() {
	    self.query.page--;	
	    self.getAccounts();
	}

	self.getAccounts = function() {
	    gHttp.Resource('account.list').get({params:self.query}).then(function(resp) {
	    	self.accounts = resp.data;
                console.log(resp);
                console.log(resp.headers);
                console.log(resp.headers["Total-Records"]);
		self.total=resp.headers["Total-Records"];
	    });
	}

	self.getAccounts();

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
