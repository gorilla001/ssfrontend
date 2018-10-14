(function () {
    'use strict';
    angular.module('glance.order')
        .config(configure);

    /* @ngInject */
    function configure($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
        $stateProvider
            .state('order', {
                url: '/orders',
                template: '<ui-view/>',
                targetState: 'list'
            })
            .state('order.list', {
                url: '',
                templateUrl: '/glance/orders/list/order.html',
                controller: 'ListOrderCtrl as ctrl',
		targetState: 'all'
            })
            .state('order.list.all', {
                url: '',
                templateUrl: '/glance/orders/list/order.html',
                controller: 'OrderCtrl as ctrl',
            })
            .state('order.list.unpay', {
                url: '/unpay',
                templateUrl: '/glance/orders/list/order.html',
                controller: 'OrderCtrl as ctrl',
            })
	    .state('order.list.undistributed', {
                url: '/undistributed',
                templateUrl: '/glance/orders/list/order.html',
                controller: 'OrderCtrl as ctrl',
            })
            .state('order.list.distributing', {
                url: '/distributing',
                templateUrl: '/glance/orders/list/order.html',
                controller: 'OrderCtrl as ctrl',
            })
            .state('order.list.finished', {
                url: '/finished',
                templateUrl: '/glance/orders/list/order.html',
                controller: 'OrderCtrl as ctrl',
            })
	    .state('order.list.search', {
                url: '/search',
		templateUrl: '/glance/orders/list/search.html',
		controller: 'SearchOrderCtrl as ctrl',
	    })
            .state('order.detail', {
		url: '/:order_id',
                templateUrl: '/glance/orders/detail/detail.html',
                controller: 'DetailOrderCtrl as ctrl',
            });
    }
})();
