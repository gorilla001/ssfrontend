(function () {
    'use strict';
    angular.module('glance.community')
        .controller('ListCommunityCtrl', ListCommunityCtrl);

    /* @ngInject */
    function ListCommunityCtrl(gHttp,$stateParams, $state, confirmModal, $rootScope) {
        var self = this;
	self.communities= [];
	self.selected = [];
	self.total = 0;
	self.query = {
	    filter: "",
    	    limit: 10,
    	    page: 0
  	};

	self.search = function() {
	    self.getCommunities();
	}
	
	self.next = function() {
	    self.query.page++;
	    self.getCommunities();
	}

        self.previous = function() {
	    self.query.page--;	
	    self.getCommunities();
	}

	self.getCommunities = function() {
	    gHttp.Resource('community.list').get({params:self.query}).then(function(resp) {
	    	self.communities= resp.data;
		self.total=resp.headers["count"];
	    });
	}

	self.getCommunities();

	self.deleteCommunity = function() {
	    confirmModal.open("确认删除选中的小区?").then(function () {
	           angular.forEach(self.selected, function (community) {
		        gHttp.Resource('community.delete', {community_id: community.id}).delete().then(function(data) {
		    	    $state.reload();
		        });
		    });
		})
	};
    }
})();
