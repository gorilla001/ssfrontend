(function () {
    'use strict';
    angular.module('glance.item')
        .config(configure);

    /* @ngInject */
    function configure($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
        $stateProvider
            .state('item', {
                url: '/items',
                template: '<ui-view/>',
                targetState: 'list'
            })
            .state('item.list', {
                url: '?limit&page',
                templateUrl: '/glance/items/list/list.html',
                controller: 'ListItemCtrl as ctrl',
            })
            .state('item.detail', {
		url: '/list/:item_id',
                templateUrl: '/glance/items/detail/detail.html',
                controller: 'DetailItemCtrl as ctrl',
            })
	    .state('item.create', {
                url: '/new',
                templateUrl: '/glance/items/create/create.html',
                controller: 'CreateItemCtrl as createItemCtrl',
            }) 
	    .state('item.update', {
		url: '/list/:item_id/update',
                templateUrl: '/glance/items/update/update.html',
                controller: 'UpdateItemCtrl as ctrl',
            });

    }
})();
