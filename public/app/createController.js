(function (angular) {
    'use strict'

    angular.module("robbingo")
        .controller("createController", Controller);

    Controller.$inject = ['api', '$timeout', 'ngToast'];

    function Controller(api, $timeout, ngToast) {

        var vm = {
            input: '',
            create: createFn
        };
        vm = angular.copy(vm, this);

        activate();

        ////////////////////

        function activate() {
            document.getElementById('robism').focus();
            document.getElementById('container').style.opacity = "1";
        }

        function createFn() {
            if (vm.input) {
                api.post('/api/v1/create', { text: vm.input })
                    .then(function () {
                        vm.input = '';
                        ngToast.success({
                            content: 'Rob-ism created!',
                            timeout: 5000
                        });
                    },
                        function () {
                            ngToast.danger({
                                content: 'Error creating Rob-ism...',
                                timeout: 5000
                            });
                        });
            }
        }

    }

})(window.angular);
