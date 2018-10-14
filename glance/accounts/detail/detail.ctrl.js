(function () {
    'use strict';
    angular.module('glance.account')
        .controller('DetailAccountCtrl', DetailAccountCtrl);

    /* @ngInject */
    function DetailAccountCtrl(gHttp, $stateParams) {
        var self = this;

	self.account = {};

	gHttp.Resource('account.detail', {node_id: $stateParams.node_id}).get().then(function(data) {
		self.account = data.data;
	});
    }
        

})();
