(function () {
    'use strict';
    angular.module('glance.community')
        .controller('CreateCommunityCtrl', CreateCommunityCtrl);

    /* @ngInject */
    function CreateCommunityCtrl(gHttp, $state, $scope) {
        var self = this;

	self.form = {
		"name": "",
		"master": "",
		"contact": "",
		"community": "",
	}

	self.createCommunity = function() {
		gHttp.Resource('community.create').post(self.form, {form: $scope.staticForm}).then(
			function(data) {
				$state.go('community.list', {reload: true});
			});
	};

	self.goBack = function() {
		$state.go('community.list', {reload: true});
	};
    }
})();
