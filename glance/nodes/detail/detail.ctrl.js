(function () {
    'use strict';
    angular.module('glance.node')
        .controller('DetailNodeCtrl', DetailNodeCtrl);

    /* @ngInject */
    function DetailNodeCtrl(gHttp, $stateParams) {
        var self = this;

	self.node = {};

	gHttp.Resource('node.detail', {node_id: $stateParams.node_id}).get().then(function(data) {
		self.node = data.data;
	});
    }
        

})();
