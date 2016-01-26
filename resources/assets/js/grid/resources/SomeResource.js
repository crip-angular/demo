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