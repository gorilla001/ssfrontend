(function () {
    'use strict';
    angular.module('glance.plan')
        .controller('CreatePlanCtrl', CreatePlanCtrl);

    /* @ngInject */
    function CreatePlanCtrl($scope, $mdDialog, gHttp, $state, $timeout)  {
        var self = this;

	self.form = {
		"name": "",
		"transfer": "",
		"fee": "",
	}

	self.cancel = function() {
		$mdDialog.hide();
		$state.reload();
	};

	self.create = function() {
		gHttp.Resource('plan.create').post(self.form, {form: $scope.staticForm} ).then(function(data) {
			self.cancel();
		});
		
		$timeout(function () {
			$state.reload();
	    	}, 300);
	};
    }
})();
