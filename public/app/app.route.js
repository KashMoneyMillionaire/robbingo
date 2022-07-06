(function (angular, undefined) {

    angular.module('robbingo')
        .config(routeConfig)
        .run(routeRun);

    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$urlMatcherFactoryProvider'];

    function routeConfig($stateProvider, $urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider) {

        // Routing styles
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlMatcherFactoryProvider.strictMode(false);
        $locationProvider.html5Mode(true);


        // Declare states
        buildStates($stateProvider);
        // set up default
        $urlRouterProvider.otherwise('/play');

        //////////////////////////////////

        function buildStates($stateProvider) {

            $stateProvider
                .state('play', {
                    url: '/play',
                    templateUrl: 'views/play.html',
                    controller: 'playController as play'
                })
                .state('admin', {
                    url: '/admin',
                    templateUrl: 'views/admin.html',
                    controller: 'createController as create'
                });
        }

    }

    routeRun.$inject = ['$rootScope', '$state', '$stateParams'];

    function routeRun($rootScope, $state, $stateParams) {

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {

        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {

        });
    }

})(window.angular);
