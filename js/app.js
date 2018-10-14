var glanceApp = angular.module('glance',
    [
        'ngCookies',
        'ui.router',
        'ngAnimate',
        'ui.bootstrap',
        'ngSocket',
        'infinite-scroll',
        'ngSanitize',
        'isteven-multi-select',
        'ui.bootstrap.datetimepicker',
        'ui-notification',
        'ngTable',
        'glance.utils',
        'glance.login',
        'glance.dashboard',
        'glance.node',
        'glance.account',
        'glance.plan',
        'glance.order',
        'glance.shop',
        'glance.community',
        'ngMaterial',
	'lfNgMdFileInput',
	'fixed.table.header',
	'ngLocalStorage',
    ]);

glanceApp.config(['$stateProvider', '$urlRouterProvider', '$interpolateProvider', '$locationProvider','NotificationProvider',
    function ($stateProvider, $urlRouterProvider, $interpolateProvider, $locationProvider, NotificationProvider) {
        NotificationProvider.setOptions({
            delay: 3000,
            positionX: 'right',
            positionY: 'top',
            replaceMessage: true,
            startTop: 20,
            startRight: 260
        });

        $urlRouterProvider.otherwise('/dashboard');
        $stateProvider
            .state('404', {
                views: {
                    '': {
                        templateUrl: '/views/common/notFound.html'
                    }
                }
            });


        $locationProvider.html5Mode(false);

        $interpolateProvider.startSymbol('{/');
        $interpolateProvider.endSymbol('/}');
    }]);

//glanceApp.run(init);

function init($cookies, glanceUser, glanceHttp, $rootScope, gHttp, $state) {
	$rootScope.IsAuthed = false;

	var token = $cookies.get("token");
	if (token) {
		gHttp.setToken(token);
		$rootScope.IsAuthed = true;
		return;
	}

	var href = "/#/login";
	window.location.href = href;
	$rootScope.$destroy();
}
