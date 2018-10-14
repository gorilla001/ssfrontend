(function () {
    'use strict';
    angular.module('glance.shop')
        .controller('CreateShopCtrl', CreateShopCtrl);

    /* @ngInject */
    function CreateShopCtrl(shopservice, $state, $scope) {
        var self = this;

	self.form = {
		"name": "",
		"master": "",
		"contact": "",
		"community": "",
	}

	self.createShop = function() {
		return shopservice.createShop(self.form, $scope.staticForm).then(function (data) {
			$state.go('shop.list', {reload: true});
		});	
	};

	self.goBack = function() {
		$state.go('shop.list', {reload: true});
	};
    }
})();
