(function () {
    'use strict';
    angular.module('glance.utils')
        .run(Constant);

    /* @ngInject */
    function Constant($rootScope) {
        $rootScope.BACKEND_URL = {
	    login: {
		login: '/v1/login',	    	
	    },
            summary: {
	        get: '/v1/admin/summary',
	    },
            node: {
                list: '/api/ss_nodes',
                detail: '/api/ss_nodes/$node_id',
	    },
            account: {
                list: '/api/ss_accounts',
                detail: '/api/ss_accounts/$account_id',
	    },
            plan: {
                list: '/api/ss_plans',
                detail: '/api/ss_plans/$plan_id',
	    },
            item: {
                list: '/v1/admin/items',
		detail: '/v1/admin/items/$item_id',
		delete: '/v1/admin/items/$item_id',
		create: '/v1/admin/items',
		update: '/v1/admin/items/$item_id',
		enable: '/v1/admin/items/$item_id/enable',
		disable: '/v1/admin/items/$item_id/disable',
            },
	    order: {
		list: '/v1/admin/orders',
		detail: '/v1/admin/orders/$order_id',
		update: '/v1/admin/orders/$order_id',
	    },
	    shop: {
                list: '/v1/admin/shops',
                create: '/v1/admin/shops',
		delete: '/v1/admin/shops/$shop_id',
		detail: '/v1/admin/shops/$shop_id',
		update: '/v1/admin/shops/$shop_id',
                enable: '/v1/admin/shops/$shop_id/enable',
                disable: '/v1/admin/shops/$shop_id/disable',
	    },
	    community: {
                list: '/v1/admin/communities',
		create: '/v1/admin/communities',
		detail: '/v1/admin/communities/$community_id',
		update: '/v1/admin/communities/$community_id',
		delete: '/v1/admin/communities/$community_id',
	    },
        };
    }
})();
