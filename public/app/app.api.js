(function (angular, undefined) {
    angular
        .module('robbingo')
        .factory('api', api);

    api.$inject = ['$http', '$q', '$location', '$rootScope'];

    function api($http, $q, $location, $rootScope) {


        var exports = {
            cacheGet: cacheGet,
            get: get,
            post: post,
            formPost: formPost,
            'delete': del,
        };

        return exports;

        ////////////////

        function handleError(reject, response) {
            if (!response || !response.Handled) {
                reject(response);
            }
        }

        function cacheGet(url) {
            return $q(function (resolve, reject) {
                $http({ cache: true, url: url, method: 'GET' })
                    .success(function (response) {
                        resolve(response);
                    })
                    .error(function (response) {
                        handleError(reject, response);
                    });
            });
        }

        function get(url, config) {
            return $q(function (resolve, reject) {
                $http.get(url, config)
                    .success(function (response) {
                        resolve(response);
                    })
                    .error(function (response) {
                        handleError(reject, response);
                    });
            });
        }

        function post(url, model, config) {
            return $q(function (resolve, reject) {
                $http.post(url, model, config)
                    .success(function (response) {
                        resolve(response);
                    })
                    .error(function (response) {
                        handleError(reject, response);
                    });
            });
        }

        function formPost(url, model) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'POST',
                    url: url,
                    data: model,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                    .success(function (response) {
                        resolve(response);
                    })
                    .error(function (response) {
                        handleError(reject, response);
                    });
            });
        }

        function del(url, id, config) {
            return $q(function (resolve, reject) {
                $http.delete(url + '/' + id, config)
                    .success(function (response) {
                        resolve(response);
                    })
                    .error(function (response) {
                        handleError(reject, response);
                    });
            });
        }
    }
})(angular);