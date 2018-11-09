(function () {
    'use strict';
    angular.module('glance.plan')
        .controller('DetailPlanCtrl', DetailPlanCtrl);

    /* @ngInject */
    function DetailPlanCtrl(gHttp, $stateParams) {
        var self = this;

	self.plan= {};

	gHttp.Resource('plan.detail', {plan_id: $stateParams.plan_id}).get().then(function(data) {
		self.plan= data.data;
	});
    }
        

})();
