(function (angular) {
    'use strict'

    angular.module("robbingo")
        .controller("playController", Controller);

    Controller.$inject = ['api', 'ngToast'];

    function Controller(api, ngToast) {

    }

})(window.angular);
