(function () {
    'use strict';
    angular.module('glance.node')
        .controller('ListNodeCtrl', ListNodeCtrl);

    /* @ngInject */
    function ListNodeCtrl(gHttp,$stateParams, $state, confirmModal, $rootScope) {
        var self = this;
	self.nodes = [];
	self.selected = [];
	self.total = 0;
	self.query = {
	    filter: "",
    	    limit: 10,
    	    page: 0
  	};

	self.search = function() {
	    self.getNodes();
	}
	
	self.next = function() {
	    self.query.page++;
	    self.getNodes();
	}

        self.previous = function() {
	    self.query.page--;	
	    self.getNodes();
	}

	self.getNodes = function() {
	    gHttp.Resource('node.list').get({params:self.query}).then(function(resp) {
	    	self.nodes = resp.data;
		self.total=resp.headers["total-records"];
	    });
	}

	self.getNodes();

	self.stateMap = {
	       "online": "在线",
       	       "offline": "离线",
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

	const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	self.niceBytes = function (x){
		  let l = 0, n = parseInt(x, 10) || 0;
		    while(n >= 1024 && ++l)
			          n = n/1024;
		      return(n.toFixed(n >= 10 || l < 1 ? 0 : 1) + ' ' + units[l]);
	}
    }
})();
