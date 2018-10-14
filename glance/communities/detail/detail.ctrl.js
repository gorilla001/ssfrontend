(function () {
    'use strict';
    angular.module('glance.community')
        .controller('DetailCommunityCtrl', DetailCommunityCtrl);

    /* @ngInject */
    function DetailCommunityCtrl(gHttp, $stateParams) {
        var self = this;

	self.community= {};

	gHttp.Resource('community.detail', {community_id: $stateParams.community_id}).get().then(function(data) {
		self.community= data.data;
	});
    }
        

})();
