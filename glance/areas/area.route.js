(function () {
    'use strict';
    angular.module('glance.area')
        .config(configure);

    /* @ngInject */
    function configure($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
        $stateProvider
            .state('area', {
                url: '/users',
                template: '<ui-view/>',
                targetState: 'list'
            })
            .state('area.list', {
                url: '/list',
                templateUrl: '/glance/users/list/list.html',
                controller: 'ListUserCtrl as ctrl',
		targetState: 'all'
            })
            .state('area.list.all', {
                url: '/finished',
                templateUrl: '/glance/users/list/user.html',
                controller: 'OrderCtrl as ctrl',
            });
    }
})();
