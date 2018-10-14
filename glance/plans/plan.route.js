(function () {
    'use strict';
    angular.module('glance.plan')
        .config(configure);

    /* @ngInject */
    function configure($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
        $stateProvider
            .state('plan', {
                url: '/plans',
                template: '<ui-view/>',
                targetState: 'list'
            })
            .state('plan.list', {
                url: '?limit&page',
                templateUrl: '/glance/plans/list/list.html',
                controller: 'ListPlanCtrl as ctrl',
            })
            .state('plan.detail', {
	        url: '/plans/:plan_id',
                templateUrl: '/glance/plans/detail/detail.html',
                controller: 'DetailPlanCtrl as ctrl',
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
