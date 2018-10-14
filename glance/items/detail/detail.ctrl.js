(function () {
    'use strict';
    angular.module('glance.item')
        .controller('DetailItemCtrl', DetailItemCtrl);

    /* @ngInject */
    function DetailItemCtrl(gHttp, $stateParams) {
        var self = this;

	self.item = {};

	gHttp.Resource('item.detail', {item_id: $stateParams.item_id}).get().then(function(data) {
		self.item = data.data;
	});
    }
        

})();
