(function () {
    'use strict';

    angular
        .module('glance.login')
        .controller('LoginController', LoginController);

    function LoginController($state, gHttp, $scope, $cookies, $rootScope) {
        var vm = this;


	function logout() {
	    if ($cookies.get("token")) {
	        $cookies.remove("token");
	        $rootScope.IsAuthed = false;
	    }
	}

	logout();

	vm.user = {
		'name': "",
		'password':"", 
	}


        vm.login = login;
	vm.showAlert = false;

        function login() {
		$cookies.put("token", "xxxxxxxxxxxxxxxxxxxxx");
		$rootScope.IsAuthed = true;
		$state.go('dashboard');
		//gHttp.Resource('login.login').post(vm.user, {form: $scope.staticForm}).then(
		//    function(data) {
                //        if (data.status != "200") {
		//	    vm.showAlert = true;
		//	}

		//	if (data.status == "200") {
		//	    $cookies.put("token", data.data.token);
		//	    $rootScope.IsAuthed = true;
		//	    $state.go('dashboard');
		//	}
		//});
        };
    }

})();
