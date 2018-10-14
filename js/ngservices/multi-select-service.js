(function () {
    'use strict';
    angular.module('glance.node')
        .factory('multiSelectConfig', multiSelectConfig);

    multiSelectConfig.$inject = [];

    function multiSelectConfig() {
        return {
            setMultiConfig: setMultiConfig
        };

        function setMultiConfig(selectAllText, selectNoneText, resetText, searchText, nothingSelectedText) {
            var multiConfig = {
                selectAll: selectAllText,
                selectNone: selectNoneText,
                reset: resetText,
                search: searchText,
                nothingSelected: nothingSelectedText
            };

            return multiConfig
        }


    }
})();
