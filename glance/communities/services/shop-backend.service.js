(function () {
    'use strict';
    angular.module('glance.shop')
        .factory('shopservice', shopservice);

    shopservice.$inject = ['Notification', 'gHttp'];

    function shopservice(Notification, gHttp) {
        //////
        return {
            listShops: listShops,
	    createShop: createShop,
        };

        function listShops(params, loading) {
            return gHttp.Resource('shop.list').get({params: params, "loading": loading});
        }

        function createShop(data, form) {
            return gHttp.Resource('shop.create').post(data, {form: form});
        }
    }
})();
