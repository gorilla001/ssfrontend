(function () {
    'use strict';
    angular.module('glance.user')
        .config(configure);

    /* @ngInject */
    function configure($stateProvider, $urlRouterProvider, $locationProvider, $interpolateProvider) {
        $stateProvider
            .state('user', {
                url: '/users',
                template: '<ui-view/>',
                targetState: 'list'
            })
            .state('user.list', {
                url: '/list',
                templateUrl: '/glance/users/list/list.html',
                controller: 'ListUserCtrl as ctrl',
		targetState: 'all'
            })
            .state('user.list.all', {
                url: '/finished',
                templateUrl: '/glance/users/list/user.html',
                controller: 'OrderCtrl as ctrl',
            });
    }
})();
