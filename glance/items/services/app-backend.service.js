(function () {
    'use strict';
    angular.module('glance.item')
        .factory('appservice', appservice);

    appservice.$inject = ['Notification', 'gHttp'];

    function appservice(Notification, gHttp) {
        //////
        return {
            listItems: listItems,
            createItem: createItem,
            updateItem: updateItem,
            deleteItem: deleteItem,
            getItem: getItem,
        };
        function listItems(params, loading) {
            return gHttp.Resource('item.list').get({params: params, "loading": loading});
        }

        function createItem(data, form) {
            return gHttp.Resource('item.create').post(data, {form: form});
        }

        function updateItem(data, clusterId, appId, form) {
            return gHttp.Resource('item.update', {cluster_id: clusterId, app_id: appId}).put(data, {form: form});
        }

        function deleteItem(appId) {
            return gHttp.Resource('item.delete', {app_id: appId}).delete();
        }

        function getItem(clusterId, appId, loading) {
            return gHttp.Resource('item.show', {cluster_id: clusterId, app_id: appId}).get({'loading': loading});
        }

    }
})();
