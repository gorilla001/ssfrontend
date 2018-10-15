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
	        url: '/:node_id',
                templateUrl: '/glance/nodes/detail/detail.html',
                controller: 'DetailNodeCtrl as ctrl',
            })
	    .state('node.create', {
                url: '/new',
                templateUrl: '/glance/nodes/create/create.html',
                controller: 'CreateNodeCtrl as ctrl',
            }) 
	    .state('node.services', {
		url: '/:node_id/services',
                templateUrl: '/glance/nodes/detail/services/list.html',
                controller: 'ListServicesCtrl as ctrl',
            }) 
	    //.state('item.update', {
	    //    url: '/list/:item_id/update',
            //    templateUrl: '/glance/items/update/update.html',
            //    controller: 'UpdateItemCtrl as ctrl',
            //});

    }
})();
