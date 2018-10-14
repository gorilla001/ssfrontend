(function () {
    'use strict';
    angular.module('glance.shop')
        .controller('UpdateShopCtrl', UpdateShopCtrl);

    /* @ngInject */
    function UpdateShopCtrl(gHttp, $state, $scope, $stateParams) {
        var self = this;
	
	self.form = {};

	gHttp.Resource('shop.detail', {shop_id: $stateParams.shop_id}).get().then(function(data) {
		self.form = data.data;
	});

	self.updateShop = function() {
		gHttp.Resource('shop.update', {shop_id: $stateParams.shop_id}).
			patch(self.form, {form: $scope.staticForm}).then(
			       function(data) {
			       $state.go('shop.list', {reload: true});
			       });	       
	};

	self.goBack = function() {
		$state.go('shop.list', {reload: true});
	};
    }
})();
