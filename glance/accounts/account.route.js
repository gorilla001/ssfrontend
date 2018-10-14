(function () {
    'use strict';
    angular.module('glance.account')
        .config(configure);

    /* @ngInject */
    function configure($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
        $stateProvider
            .state('account', {
                url: '/accounts',
                template: '<ui-view/>',
                targetState: 'list'
            })
            .state('account.list', {
                url: '?limit&page',
                templateUrl: '/glance/accounts/list/list.html',
                controller: 'ListAccountsCtrl as ctrl',
            })
            .state('account.detail', {
	        url: '/accounts/:account_id',
                templateUrl: '/glance/accounts/detail/detail.html',
                controller: 'DetailAccountCtrl as ctrl',
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
