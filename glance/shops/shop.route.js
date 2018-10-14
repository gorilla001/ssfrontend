(function () {
    'use strict';
    angular.module('glance.shop')
        .config(configure);

    /* @ngInject */
    function configure($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
        $stateProvider
            .state('shop', {
                url: '/shops',
                template: '<ui-view/>',
                targetState: 'list'
            })
            .state('shop.list', {
                url: '?limit&page',
                templateUrl: '/glance/shops/list/list.html',
                controller: 'ListShopCtrl as ctrl',
            })
            .state('shop.detail', {
		url: '/detail/:shop_id',
                templateUrl: '/glance/shops/detail/detail.html',
                controller: 'DetailShopCtrl as ctrl',
            })
	    .state('shop.create', {
                url: '/new',
                templateUrl: '/glance/shops/create/create.html',
                controller: 'CreateShopCtrl as createShopCtrl',
            }) 
	    .state('shop.update', {
		url: '/:shop_id/update',
                templateUrl: '/glance/shops/update/update.html',
                controller: 'UpdateShopCtrl as ctrl',
            });

    }
})();
