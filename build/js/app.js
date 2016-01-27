(function (ng, app) {
    'use strict';

    app.grid = ng.module('app.grid', [
        'crip.grid-url'
    ]);

})(angular, window.app || (window.app = {}));
(function (ng, app) {
    'use strict';

    app.core = ng.module('app', [
        'ngResource',

        'crip.core',
        'crip.grid',
        'crip.input',

        'app.grid'
    ]);

})(angular, window.app || (window.app = {}));
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
(function (ng, app) {
    'use strict';

    app.core
        .service('SomeResource', SomeResource);

    SomeResource.$inject = ['$resource', 'cripStrRandom', '$timeout'];

    function SomeResource($resource, rnd, $timeout) {
        // This resource culd look something like this, but for demo add custom data loader
        //return $resource('/api/resource/:id', {id: '@id'}, {
        //    'save': {method: 'POST'},
        //    'find': {method: 'GET'},
        //    'update': {method: 'PUT'},
        //    'paginate': {
        //        method: 'GET',
        //        isArray: true,
        //        transformResponse: function (r, headers) {
        //            var response = ng.fromJson(r),
        //                data = response.data;
        //            headers()['total'] = response.total;
        //
        //            return data;
        //        }
        //    }
        //});

        var total = 169,
            data = [],
            sort_by = function (field, reverse) {
                reverse = !reverse ? 1 : -1;

                return function (a, b) {
                    return a = a[field], b = b[field], reverse * ((a > b) - (b > a));
                }
            };

        for (var i = 1; i <= total; i++) {
            data.push({
                id: i,
                text: rnd.new()
            });
        }

        return {
            paginate: function (parameters, callback) {

                console.log({
                    type: '$resource',
                    name: 'SomeResource',
                    method: 'paginate',
                    parameters: parameters,
                    callback: callback,
                    filters: JSON.parse(parameters.filters)
                });

                var lastId = parameters['page'] * parameters['per-page'],
                    firstId = lastId - parameters['per-page'],
                    filters = JSON.parse(parameters.filters),
                    result = [];

                // we overwritten parameters in module configuration, so we use new names from there, not default one
                // parameters['direction'] = parameters['sort-direction']
                // parameters['order']     = parameters['sort-field']
                data.sort(sort_by(parameters['sort-field'], parameters['sort-direction'] != 'asc'));

                result = data.filter(function (value, index, ar) {
                    var contains = true;
                    ng.forEach(filters, function (fValue, fKey) {
                        if ((value[fValue[0]] + '').indexOf(fValue[1]) < 0)
                            contains = false;
                    });

                    return contains;
                });

                $timeout(function () {
                    callback(result.slice(firstId, lastId), function (any) {
                        return result.length;
                    })
                }, 1);
            }
        };
    }
})(angular, window.app || (window.app = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdyaWQvZ3JpZC5tb2R1bGUuanMiLCJhcHAuanMiLCJncmlkL2NvbmZpZy5qcyIsImdyaWQvY29udHJvbGxlcnMvU29tZUdyaWRDb250cm9sbGVyLmpzIiwiZ3JpZC9jb250cm9sbGVycy9Tb21lT3RoZXJHcmlkQ29udHJvbGxlci5qcyIsImdyaWQvcmVzb3VyY2VzL1NvbWVSZXNvdXJjZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIChuZywgYXBwKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYXBwLmdyaWQgPSBuZy5tb2R1bGUoJ2FwcC5ncmlkJywgW1xyXG4gICAgICAgICdjcmlwLmdyaWQtdXJsJ1xyXG4gICAgXSk7XHJcblxyXG59KShhbmd1bGFyLCB3aW5kb3cuYXBwIHx8ICh3aW5kb3cuYXBwID0ge30pKTsiLCIoZnVuY3Rpb24gKG5nLCBhcHApIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhcHAuY29yZSA9IG5nLm1vZHVsZSgnYXBwJywgW1xyXG4gICAgICAgICduZ1Jlc291cmNlJyxcclxuXHJcbiAgICAgICAgJ2NyaXAuY29yZScsXHJcbiAgICAgICAgJ2NyaXAuZ3JpZCcsXHJcbiAgICAgICAgJ2NyaXAuaW5wdXQnLFxyXG5cclxuICAgICAgICAnYXBwLmdyaWQnXHJcbiAgICBdKTtcclxuXHJcbn0pKGFuZ3VsYXIsIHdpbmRvdy5hcHAgfHwgKHdpbmRvdy5hcHAgPSB7fSkpOyIsIihmdW5jdGlvbiAobmcsIGFwcCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIGFwcC5ncmlkXHJcbiAgICAgICAgLmNvbmZpZyhBcHBHcmlkQ29uZmlnKTtcclxuXHJcbiAgICBBcHBHcmlkQ29uZmlnLiRpbmplY3QgPSBbJ2NyaXBHcmlkQ29uZmlnUHJvdmlkZXInLCAnY3JpcEdyaWRVcmxDb25maWdQcm92aWRlciddO1xyXG5cclxuICAgIGZ1bmN0aW9uIEFwcEdyaWRDb25maWcoY3JpcEdyaWRDb25maWdQcm92aWRlciwgY3JpcEdyaWRVcmxDb25maWdQcm92aWRlcikge1xyXG5cclxuICAgICAgICAvLyBzZXQgcGx1Z2lucyBmb3IgZ3JpZCBtb2R1bGVcclxuICAgICAgICAvLyBlbmFibGUgY3JpcEdyaWRVcmwgd2l0aG91dCBkZXBlbmRlbmNpZXNcclxuICAgICAgICBjcmlwR3JpZENvbmZpZ1Byb3ZpZGVyLnNldFBsdWdpbnMoeydjcmlwR3JpZFVybCc6IHt9fSk7XHJcblxyXG4gICAgICAgIC8vIHNldCByZXF1ZXN0IHZhcmlhYmxlIG5hbWVzIGZvciBncmlkXHJcbiAgICAgICAgY3JpcEdyaWRDb25maWdQcm92aWRlci5zZXRSZXF1ZXN0TWFwcGluZ3MoJ3BhZ2UnLCAncGVyLXBhZ2UnLCAnc29ydC1kaXJlY3Rpb24nLCAnc29ydC1maWVsZCcsICdmaWx0ZXJzJyk7XHJcblxyXG4gICAgICAgIC8vIHNldCBwZXIgcGFnZSBvcHRpb25zXHJcbiAgICAgICAgY3JpcEdyaWRDb25maWdQcm92aWRlci5zZXRQZXJQYWdlT3B0aW9ucyhbMTAsIDIwLCA1MCwgMTAwXSk7XHJcblxyXG4gICAgICAgIGNyaXBHcmlkQ29uZmlnUHJvdmlkZXIudXBkYXRlT25GaWx0ZXJDaGFuZ2UgPSB0cnVlO1xyXG5cclxuICAgICAgICAvLyBzZXQgY3JpcEdyaWRVcmwgcGx1Z2luIGNvbmZpZ3VyYXRpb25zXHJcbiAgICAgICAgY3JpcEdyaWRVcmxDb25maWdQcm92aWRlci5zZXRNYXBwaW5ncygncGFnZScsICdwZXItcGFnZScsICd0b3RhbCcsICdkaXJlY3Rpb24nLCAnb3JkZXInLCAnZmlsdGVycycsICduYW1lJyk7XHJcbiAgICB9XHJcblxyXG59KShhbmd1bGFyLCB3aW5kb3cuYXBwIHx8ICh3aW5kb3cuYXBwID0ge30pKTsiLCIoZnVuY3Rpb24gKG5nLCBhcHApIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICBhcHAuZ3JpZFxyXG4gICAgICAgIC5jb250cm9sbGVyKCdTb21lR3JpZENvbnRyb2xsZXInLCBTb21lR3JpZENvbnRyb2xsZXIpO1xyXG5cclxuICAgIFNvbWVHcmlkQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnY3JpcEdyaWQnLCAnU29tZVJlc291cmNlJ107XHJcblxyXG4gICAgZnVuY3Rpb24gU29tZUdyaWRDb250cm9sbGVyKCRzY29wZSwgR3JpZCwgUmVzb3VyY2UpIHtcclxuXHJcbiAgICAgICAgR3JpZC5leHRlbmQoe3Njb3BlOiAkc2NvcGUsIHBhZ2luYXRlOiBsb2FkUGFnZSwgbmFtZTogJ3NvbWUtbGlzdCd9KTtcclxuXHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBjb250cm9sbGVyXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxseSBsb2FkIGZpcnN0IHBhZ2VcclxuICAgICAgICAgICAgbG9hZFBhZ2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRQYWdlKHRlc3QsIGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coe3Rlc3Q6IHRlc3QsIGRhdGE6ZGF0YX0pO1xyXG4gICAgICAgICAgICAvLyBwcmVwYXJlIGZpbHRlci9wYWdpbmcgcGFyYW1ldGVycyBmb3IgcmVxdWVzdFxyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gJHNjb3BlLmdyaWQucmVxdWVzdFBhcmFtcygpO1xyXG5cclxuICAgICAgICAgICAgUmVzb3VyY2UucGFnaW5hdGUocGFyYW1zLCBmdW5jdGlvbiAociwgaGVhZGVycykge1xyXG4gICAgICAgICAgICAgICAgLy8gYXBwbHkgbG9hZGVkIGRhdGEgdG8gVUkgYW5kIHNldCB0b3RhbCByZWNvcmQgY291bnQgZm9yIHBhZ2luYXRpb24gZnJvbSByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmdyaWQuc2V0UGFnZURhdGEociwgaGVhZGVycygndG90YWwnKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoYW5ndWxhciwgd2luZG93LmFwcCB8fCAod2luZG93LmFwcCA9IHt9KSk7IiwiKGZ1bmN0aW9uIChuZywgYXBwKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYXBwLmdyaWRcclxuICAgICAgICAuY29udHJvbGxlcignU29tZU90aGVyR3JpZENvbnRyb2xsZXInLCBTb21lT3RoZXJHcmlkQ29udHJvbGxlcik7XHJcblxyXG4gICAgU29tZU90aGVyR3JpZENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJ2NyaXBHcmlkJywgJ1NvbWVSZXNvdXJjZSddO1xyXG5cclxuICAgIGZ1bmN0aW9uIFNvbWVPdGhlckdyaWRDb250cm9sbGVyKCRzY29wZSwgR3JpZCwgUmVzb3VyY2UpIHtcclxuXHJcbiAgICAgICAgR3JpZC5leHRlbmQoe3Njb3BlOiAkc2NvcGUsIHBhZ2luYXRlOiBsb2FkUGFnZSwgbmFtZTogJ3NvbWUtb3RoZXItbGlzdCd9KTtcclxuXHJcbiAgICAgICAgLy8gaW5pdGlhbGl6ZSBjb250cm9sbGVyXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIC8vIGluaXRpYWxseSBsb2FkIGZpcnN0IHBhZ2VcclxuICAgICAgICAgICAgbG9hZFBhZ2UoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGxvYWRQYWdlKCkge1xyXG4gICAgICAgICAgICAvLyBwcmVwYXJlIGZpbHRlci9wYWdpbmcgcGFyYW1ldGVycyBmb3IgcmVxdWVzdFxyXG4gICAgICAgICAgICB2YXIgcGFyYW1zID0gJHNjb3BlLmdyaWQucmVxdWVzdFBhcmFtcygpO1xyXG4gICAgICAgICAgICBwYXJhbXMub3RoZXIgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgUmVzb3VyY2UucGFnaW5hdGUocGFyYW1zLCBmdW5jdGlvbiAociwgaGVhZGVycykge1xyXG4gICAgICAgICAgICAgICAgLy8gYXBwbHkgbG9hZGVkIGRhdGEgdG8gVUkgYW5kIHNldCB0b3RhbCByZWNvcmQgY291bnQgZm9yIHBhZ2luYXRpb24gZnJvbSByZXNwb25zZVxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmdyaWQuc2V0UGFnZURhdGEociwgaGVhZGVycygndG90YWwnKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSkoYW5ndWxhciwgd2luZG93LmFwcCB8fCAod2luZG93LmFwcCA9IHt9KSk7IiwiKGZ1bmN0aW9uIChuZywgYXBwKSB7XHJcbiAgICAndXNlIHN0cmljdCc7XHJcblxyXG4gICAgYXBwLmNvcmVcclxuICAgICAgICAuc2VydmljZSgnU29tZVJlc291cmNlJywgU29tZVJlc291cmNlKTtcclxuXHJcbiAgICBTb21lUmVzb3VyY2UuJGluamVjdCA9IFsnJHJlc291cmNlJywgJ2NyaXBTdHJSYW5kb20nLCAnJHRpbWVvdXQnXTtcclxuXHJcbiAgICBmdW5jdGlvbiBTb21lUmVzb3VyY2UoJHJlc291cmNlLCBybmQsICR0aW1lb3V0KSB7XHJcbiAgICAgICAgLy8gVGhpcyByZXNvdXJjZSBjdWxkIGxvb2sgc29tZXRoaW5nIGxpa2UgdGhpcywgYnV0IGZvciBkZW1vIGFkZCBjdXN0b20gZGF0YSBsb2FkZXJcclxuICAgICAgICAvL3JldHVybiAkcmVzb3VyY2UoJy9hcGkvcmVzb3VyY2UvOmlkJywge2lkOiAnQGlkJ30sIHtcclxuICAgICAgICAvLyAgICAnc2F2ZSc6IHttZXRob2Q6ICdQT1NUJ30sXHJcbiAgICAgICAgLy8gICAgJ2ZpbmQnOiB7bWV0aG9kOiAnR0VUJ30sXHJcbiAgICAgICAgLy8gICAgJ3VwZGF0ZSc6IHttZXRob2Q6ICdQVVQnfSxcclxuICAgICAgICAvLyAgICAncGFnaW5hdGUnOiB7XHJcbiAgICAgICAgLy8gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgLy8gICAgICAgIGlzQXJyYXk6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgIHRyYW5zZm9ybVJlc3BvbnNlOiBmdW5jdGlvbiAociwgaGVhZGVycykge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgdmFyIHJlc3BvbnNlID0gbmcuZnJvbUpzb24ociksXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgZGF0YSA9IHJlc3BvbnNlLmRhdGE7XHJcbiAgICAgICAgLy8gICAgICAgICAgICBoZWFkZXJzKClbJ3RvdGFsJ10gPSByZXNwb25zZS50b3RhbDtcclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vICAgICAgICAgICAgcmV0dXJuIGRhdGE7XHJcbiAgICAgICAgLy8gICAgICAgIH1cclxuICAgICAgICAvLyAgICB9XHJcbiAgICAgICAgLy99KTtcclxuXHJcbiAgICAgICAgdmFyIHRvdGFsID0gMTY5LFxyXG4gICAgICAgICAgICBkYXRhID0gW10sXHJcbiAgICAgICAgICAgIHNvcnRfYnkgPSBmdW5jdGlvbiAoZmllbGQsIHJldmVyc2UpIHtcclxuICAgICAgICAgICAgICAgIHJldmVyc2UgPSAhcmV2ZXJzZSA/IDEgOiAtMTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSA9IGFbZmllbGRdLCBiID0gYltmaWVsZF0sIHJldmVyc2UgKiAoKGEgPiBiKSAtIChiID4gYSkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8PSB0b3RhbDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRhdGEucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBpZDogaSxcclxuICAgICAgICAgICAgICAgIHRleHQ6IHJuZC5uZXcoKVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBhZ2luYXRlOiBmdW5jdGlvbiAocGFyYW1ldGVycywgY2FsbGJhY2spIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJyRyZXNvdXJjZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ1NvbWVSZXNvdXJjZScsXHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAncGFnaW5hdGUnLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMsXHJcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcnM6IEpTT04ucGFyc2UocGFyYW1ldGVycy5maWx0ZXJzKVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgdmFyIGxhc3RJZCA9IHBhcmFtZXRlcnNbJ3BhZ2UnXSAqIHBhcmFtZXRlcnNbJ3Blci1wYWdlJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RJZCA9IGxhc3RJZCAtIHBhcmFtZXRlcnNbJ3Blci1wYWdlJ10sXHJcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVycyA9IEpTT04ucGFyc2UocGFyYW1ldGVycy5maWx0ZXJzKSxcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBbXTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyB3ZSBvdmVyd3JpdHRlbiBwYXJhbWV0ZXJzIGluIG1vZHVsZSBjb25maWd1cmF0aW9uLCBzbyB3ZSB1c2UgbmV3IG5hbWVzIGZyb20gdGhlcmUsIG5vdCBkZWZhdWx0IG9uZVxyXG4gICAgICAgICAgICAgICAgLy8gcGFyYW1ldGVyc1snZGlyZWN0aW9uJ10gPSBwYXJhbWV0ZXJzWydzb3J0LWRpcmVjdGlvbiddXHJcbiAgICAgICAgICAgICAgICAvLyBwYXJhbWV0ZXJzWydvcmRlciddICAgICA9IHBhcmFtZXRlcnNbJ3NvcnQtZmllbGQnXVxyXG4gICAgICAgICAgICAgICAgZGF0YS5zb3J0KHNvcnRfYnkocGFyYW1ldGVyc1snc29ydC1maWVsZCddLCBwYXJhbWV0ZXJzWydzb3J0LWRpcmVjdGlvbiddICE9ICdhc2MnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGF0YS5maWx0ZXIoZnVuY3Rpb24gKHZhbHVlLCBpbmRleCwgYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgY29udGFpbnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIG5nLmZvckVhY2goZmlsdGVycywgZnVuY3Rpb24gKGZWYWx1ZSwgZktleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHZhbHVlW2ZWYWx1ZVswXV0gKyAnJykuaW5kZXhPZihmVmFsdWVbMV0pIDwgMClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb250YWlucztcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjayhyZXN1bHQuc2xpY2UoZmlyc3RJZCwgbGFzdElkKSwgZnVuY3Rpb24gKGFueSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59KShhbmd1bGFyLCB3aW5kb3cuYXBwIHx8ICh3aW5kb3cuYXBwID0ge30pKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
