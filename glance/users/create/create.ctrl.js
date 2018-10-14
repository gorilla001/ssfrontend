(function () {
    'use strict';
    angular.module('glance.user')
        .controller('CreateUserCtrl', CreateUserCtrl);

    /* @ngInject */
    function CreateUserCtrl(appservice, $state, $scope) {
        var self = this;

	self.form = {
		"name": "",
		"desc": "",
		"price": "",
		"size": "",
		"origin": "",
	}

	self.createUser = function() {
		return appservice.createItem(self.form, $scope.staticForm).then(function (data) {
			$state.go('item.list', {reload: true});
		});	
	};

	self.goBack = function() {
		$state.go('item.list', {reload: true});
	};
    }
})();
