(function (ng, app) {
    'use strict';

    app.core = ng.module('app', [
        'ngResource',

        'crip.core',
        'crip.grid',

        'app.grid'
    ]);

})(angular, window.app || (window.app = {}));