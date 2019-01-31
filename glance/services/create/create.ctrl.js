(function () {
    'use strict';
    angular.module('glance.service')
        .controller('CreateServiceCtrl', CreateServiceCtrl);

    /* @ngInject */
    function CreateServiceCtrl($scope, $mdDialog, gHttp, $state) {
        var self = this;

	self.node_id = "";

	self.create = function() {
		if(self.node_id !== "") {
		    gHttp.Resource('service.create', {node_id:self.node_id}).post().then(function(data){
		    	console.log(data);	
		    });
		}
	};

        self.cancel = function() {
		$mdDialog.hide();
		$state.reload();
	};

	self.goBack = function() {
		$state.go('item.list', {reload: true});
	};
    }
})();
