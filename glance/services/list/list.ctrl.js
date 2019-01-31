(function () {
    'use strict';
    angular.module('glance.service')
        .controller('ListServicesCtrl', ListServicesCtrl);

    /* @ngInject */
    function ListServicesCtrl(gHttp,$stateParams, $state, confirmModal, $rootScope, $mdDialog, $scope, $mdPanel) {
        var self = this;
	self.services = [];
	self.selected = [];
	self.total = 0;
	self.query = {
	    filter: "",
    	    limit: 10,
    	    page: 0
  	};

	self.search = function() {
	    self.getServices();
	}
	
	self.next = function() {
	    self.query.page++;
	    self.getServices();
	}

        self.previous = function() {
	    self.query.page--;	
	    self.getServices();
	}

	self.getServices = function() {
	    gHttp.Resource('node.list').get({params:self.query}).then(function(resp) {
	    	var nodes = resp.data;
                for(var node of resp.data){
			var services = node.ss_services
			if (services !== null) {
			    for(var service of node.ss_services) {
			        self.services.push(service);
			    }
			}
		}
		self.total=self.services.length;
	    });
	}

	self.getServices();

	self.stateMap = {
	       "enabled": "上架",
       	       "disabled": "下架",
	}	       

	self.enablePlan = function() {
            angular.forEach(self.selected, function (item) {
		gHttp.Resource('plan.enable', {item_id: item.id}).patch().then(function(data){
			$state.reload();
		})
	    })
	};

	self.disableItem = function() {
	    angular.forEach(self.selected, function (item) {
		gHttp.Resource('plan.disable', {item_id: item.id}).patch().then(function(data){
			$state.reload();
		})
	    })
	};

	self.deleteItem = function() {
	    confirmModal.open("确认删除选中的套餐?").then(function () {
	           angular.forEach(self.selected, function (item) {
		        gHttp.Resource('item.delete', {item_id: item.id}).delete().then(function(data) {
		    	    $state.reload();
		        });
		    });
		})
	};

        self.showDialog = function(event) {
	    //$mdDialog.show({
	    //    scope :$scope,
            //    preserveScope: false,
	    //    templateUrl: 'glance/services/create/create.html',
	    //    targetEvent: event,
	    //    controller: 'CreateServiceCtrl',
	    //    controllerAs: 'ctrl',
	    //});
            var position = $mdPanel.newPanelPosition()
                .absolute()
                .centerHorizontally();
            var animation = $mdPanel.newPanelAnimation();
	    var config = {
                  attachTo: angular.element(document.body),
                  controller: 'CreateServiceCtrl', //PanelDialogCtrl,
                  controllerAs: 'ctrl',
                  disableParentScroll: false,
                  templateUrl: 'glance/services/create/create.html',
                  hasBackdrop: true,
                  panelClass: 'demox-dialog-example',
                  position: position,
	          animation: animation, //panelAnimation,
	          //fullscreen: true,
                  trapFocus: true,
                  zIndex: 10,
                  clickOutsideToClose: false,
                  escapeToClose: true,
                  focusOnOpen: true
            };

  	    $mdPanel.open(config);	
	}
    }
})();
