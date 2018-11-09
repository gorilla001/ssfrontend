(function () {
    'use strict';
    angular.module('glance.service')
        .config(configure);

    /* @ngInject */
    function configure($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
        $stateProvider
            .state('service', {
                url: '/services',
                template: '<ui-view/>',
                targetState: 'list'
            })
            .state('service.list', {
                url: '?limit&page',
                templateUrl: '/glance/services/list/list.html',
                controller: 'ListServicesCtrl as ctrl',
            })
            .state('service.detail', {
	        url: '/services/:service_id',
                templateUrl: '/glance/services/detail/detail.html',
                controller: 'DetailServiceCtrl as ctrl',
            })
	    //.state('item.create', {
            //    url: '/new',
            //    templateUrl: '/glance/items/create/create.html',
            //    controller: 'CreateItemCtrl as createItemCtrl',
            //}) 
	    //.state('item.update', {
	    //    url: '/list/:item_id/update',
            //    templateUrl: '/glance/items/update/update.html',
            //    controller: 'UpdateItemCtrl as ctrl',
            //});

    }
})();
