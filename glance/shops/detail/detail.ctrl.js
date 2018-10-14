(function () {
    'use strict';
    angular.module('glance.shop')
        .controller('DetailShopCtrl', DetailShopCtrl);

    /* @ngInject */
    function DetailShopCtrl(gHttp, $stateParams) {
        var self = this;

	self.shop= {};

	gHttp.Resource('shop.detail', {shop_id: $stateParams.shop_id}).get().then(function(data) {
		self.shop= data.data;
	});
    }
        

})();
