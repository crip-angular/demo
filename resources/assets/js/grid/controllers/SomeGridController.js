(function (ng, app) {
    'use strict';

    app.grid
        .controller('SomeGridController', SomeGridController);

    SomeGridController.$inject = ['$scope', 'cripGrid', 'SomeResource'];

    function SomeGridController($scope, Grid, Resource) {

        Grid.extend({scope: $scope, paginate: loadPage, name: 'some-list'});

        // initialize controller
        activate();

        function activate() {
            // initially load first page
            loadPage();
        }

        function loadPage(test, data) {
            // console.log({test: test, data:data});
            // prepare filter/paging parameters for request
            var params = $scope.grid.requestParams();

            Resource.paginate(params, function (r, headers) {
                // apply loaded data to UI and set total record count for pagination from response
                $scope.grid.setPageData(r, headers('total'));
            });
        }
    }
})(angular, window.app || (window.app = {}));