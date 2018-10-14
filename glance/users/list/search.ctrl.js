(function () {
    'use strict';
    angular.module('glance.order')
        .controller('SearchOrderCtrl', SearchOrderCtrl);

    /* @ngInject */
    function SearchOrderCtrl(gHttp,$stateParams, $state, confirmModal) {
        var self = this;
	self.orders = [];

	self.filter = "";

	self.doSearch = function(filter) {
		console.log(filter);
		gHttp.Resource('order.search', {phone:filter}).get().then(function(data){
			self.orders = data;
		});
	};
    }
})();
