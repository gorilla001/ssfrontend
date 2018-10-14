(function () {
    'use strict';
    angular.module('glance.community')
        .controller('UpdateCommunityCtrl', UpdateCommunityCtrl);

    /* @ngInject */
    function UpdateCommunityCtrl(gHttp, $state, $scope, $stateParams) {
        var self = this;
	
	self.form = {};

	gHttp.Resource('community.detail', {community_id: $stateParams.community_id}).get().then(function(data) {
		self.form = data.data;
		console.log(self.form);
	});

	self.updateCommunity = function() {
		gHttp.Resource('community.update', {community_id: $stateParams.community_id}).
			patch(self.form, {form: $scope.staticForm}).then(
			       function(data) {
			       $state.go('community.list', {reload: true});
		});	       
	};

	self.goBack = function() {
		$state.go('community.list', {reload: true});
	};
    }
})();
