(function (angular) {
    'use strict'
    
    angular.lowercase = text => (text || '').toLowerCase();
    angular.module("robbingo", ['ngRoute', 'ui.router', 'ngToast']);

})(window.angular);
