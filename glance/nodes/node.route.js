(function () {
    'use strict';
    angular.module('glance.node')
        .config(configure);

    /* @ngInject */
    function configure($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
        $stateProvider
            .state('node', {
                url: '/nodes',
                template: '<ui-view/>',
                targetState: 'list'
            })
            .state('node.list', {
                url: '?limit&page',
                templateUrl: '/glance/nodes/list/list.html',
                controller: 'ListNodeCtrl as ctrl',
            })
            .state('node.detail', {
	        url: '/nodes/:node_id',
                templateUrl: '/glance/nodes/detail/detail.html',
                controller: 'DetailNodeCtrl as ctrl',
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
