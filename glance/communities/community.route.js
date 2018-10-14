(function () {
    'use strict';
    angular.module('glance.community')
        .config(configure);

    /* @ngInject */
    function configure($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
        $stateProvider
            .state('community', {
                url: '/communities',
                template: '<ui-view/>',
                targetState: 'list'
            })
            .state('community.list', {
                url: '?limit&page',
                templateUrl: '/glance/communities/list/list.html',
                controller: 'ListCommunityCtrl as ctrl',
            })
            .state('community.detail', {
		url: '/detail/:community_id',
                templateUrl: '/glance/communities/detail/detail.html',
                controller: 'DetailCommunityCtrl as ctrl',
            })
	    .state('community.create', {
                url: '/new',
                templateUrl: '/glance/communities/create/create.html',
                controller: 'CreateCommunityCtrl as createCommunityCtrl',
            }) 
	    .state('community.update', {
		url: '/:community_id/update',
                templateUrl: '/glance/communities/update/update.html',
                controller: 'UpdateCommunityCtrl as ctrl',
            });

    }
})();
