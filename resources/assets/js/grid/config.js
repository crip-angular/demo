(function (ng, app) {
    'use strict';

    app.grid
        .config(AppGridConfig);

    AppGridConfig.$inject = ['cripGridConfigProvider', 'cripGridUrlConfigProvider'];

    function AppGridConfig(cripGridConfigProvider, cripGridUrlConfigProvider) {

        // set plugins for grid module
        // enable cripGridUrl without dependencies
        cripGridConfigProvider.setPlugins({'cripGridUrl': {}});

        // set request variable names for grid
        cripGridConfigProvider.setRequestMappings('page', 'per-page', 'sort-direction', 'sort-field', 'filters');

        // set per page options
        cripGridConfigProvider.setPerPageOptions([10, 20, 50, 100]);

        cripGridConfigProvider.updateOnFilterChange = true;

        // set cripGridUrl plugin configurations
        cripGridUrlConfigProvider.setMappings('page', 'per-page', 'total', 'direction', 'order', 'filters', 'name');
    }

})(angular, window.app || (window.app = {}));