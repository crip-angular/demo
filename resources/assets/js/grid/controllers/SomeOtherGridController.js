(function (ng, app) {
    'use strict';

    app.grid
        .controller('SomeOtherGridController', SomeOtherGridController);

    SomeOtherGridController.$inject = ['$scope', 'cripGrid', 'SomeResource'];

    function SomeOtherGridController($scope, Grid, Resource) {

        Grid.extend({scope: $scope, paginate: loadPage, name: 'some-other-list'});

        // initialize controller
        activate();

        function activate() {
            // initially load first page
            loadPage();
        }

        function loadPage() {
            // prepare filter/paging parameters for request
            var params = $scope.grid.requestParams();
            params.other = true;

            Resource.paginate(params, function (r, headers) {
                // apply loaded data to UI and set total record count for pagination from response
                $scope.grid.setPageData(r, headers('total'));
            });
        }
    }
})(angular, window.app || (window.app = {}));