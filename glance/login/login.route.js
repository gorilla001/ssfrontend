(function () {
    'use strict';
    angular.module('glance.login')
        .config(route);

    /* @ngInject */
    function route($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: '/glance/login/login.html',
                controller: 'LoginController as ctrl'
            });
    }
})();
