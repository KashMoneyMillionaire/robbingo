(function (angular, undefined) {

    angular
        .module('robbingo')
        .directive('bingoBoard', bingoBoard)
    ;

    bingoBoard.$inject = [];

    function bingoBoard() {
        var directive = {
            bindToController: true,
            controller: Controller,
            templateUrl: 'views/directives/boardTemplate.html',
            controllerAs: 'board',
            restrict: 'E',
            scope: {
                isBingo: '='
            }
        };
        return directive;

    }

    Controller.$inject = ['$element', '$scope', 'api'];

    function Controller(element, scope, api) {

        var vm = {
            tiles: [[], [], [], [], []],
            buildClass: buildClass
        };

        vm = angular.extend(this, vm);

        activate();

        ///////////////////////

        function activate() {
            getTiles();
        }

        function tileInBingo(tile) {
            var horBingos = getHorBingos();
            var vertBingos = getVertBingos();
            var diagBingos = getDiagBingos();
            
            return horBingos.indexOf(tile.boxNumber) !== -1
                || vertBingos.indexOf(tile.boxNumber) !== -1
                || diagBingos.indexOf(tile.boxNumber) !== -1;
        }

        function getHorBingos() {
            var bingos = [];
            if (areSelected(0,5,10,15,20)) {
                bingos = bingos.concat([0,5,10,15,20])
            }
            if (areSelected(1,6,11,16,21)) {
                bingos = bingos.concat([1,6,11,16,21])
            }
            if (areSelected(2,7,12,17,22)) {
                bingos = bingos.concat([2,7,12,17,22])
            }
            if (areSelected(3,8,13,18,23)) {
                bingos = bingos.concat([3,8,13,18,23])
            }
            if (areSelected(4,9,14,19,24)) {
                bingos = bingos.concat([4,9,14,19,24])
            }
            return bingos;
        }
        
        function getVertBingos() {
            var bingos = [];
            if (areSelected(0,1,2,3,4)) {
                bingos = bingos.concat([0,1,2,3,4])
            }
            if (areSelected(5,6,7,8,9)) {
                bingos = bingos.concat([5,6,7,8,9])
            }
            if (areSelected(10,11,12,13,14)) {
                bingos = bingos.concat([10,11,12,13,14])
            }
            if (areSelected(15,16,17,18,19)) {
                bingos = bingos.concat([15,16,17,18,19])
            }
            if (areSelected(20,21,22,23,24)) {
                bingos = bingos.concat([20,21,22,23,24])
            }
            return bingos;
        }
        
        function getDiagBingos() {
            var bingos = [];
            if (areSelected(0,6,12,18,24)) {
                bingos = bingos.concat([0,6,12,18,24])
            }
            if (areSelected(4,8,12,16,20)) {
                bingos = bingos.concat([4,8,12,16,20])
            }
            return bingos;
        }
        
        function areSelected() {
            for (var j = 0; j < arguments.length; j++) {
                var col = arguments[j] % 5;
                var row = arguments[j]/5|0;
                var element = vm.tiles[row][col];
                if (!element.isSelected) {
                    return false;
                }
            }
            return true;
        }

        function buildClass(tile) {
            if (!tile) return {};
            
            var tileR = tile.nextHor,
                tileL = tile.previousHor,
                tileT = tile.previousVert,
                tileB = tile.nextVert;
            
            return {
                isSelected: tile.isSelected,
                isBingo: tileInBingo(tile),
                bingoRight: tileR && tileInBingo(tileR),
                bingoLeft: tileL && tileInBingo(tileL),
                bingoTop: tileT && tileInBingo(tileT),
                bingoBottom: tileB && tileInBingo(tileB),
                isBottom: !tile.nextVert,
                isRight: !tile.nextHor
            };
        }

        function getTiles() {

            api.get('api/v1/generate')
                .then(function (tiles) {
                    tiles.splice(12, 0, {
                        "_id": "blah blah blah you won't need this",
                        "number": 12,
                        "text": "Free Space"
                    });
                    for (var col = 0; col < 5; col++) {
                        for (var row = 0; row < 5; row++) {
                            var boxNumber = col * 5 + row,
                                tile = tiles[boxNumber];
                            tile.boxNumber = boxNumber;
                            tile.isSelected = boxNumber === 12;
                            tile.bingoBoarder = {l: false, r: false, t: false, b: false};

                            vm.tiles[col].push(tile);

                            if (row !== 0) {
                                tile.previousVert = tiles[boxNumber - 1];
                            }
                            if (row !== 4) {
                                tile.nextVert = tiles[boxNumber + 1];
                            }
                            if (col != 0) {
                                tile.previousHor = tiles[boxNumber - 5];
                            }
                            if (col != 4) {
                                tile.nextHor = tiles[boxNumber + 5];
                            }
                        }
                    }
                })

        }

        function isHorizontal(tile) {

            if (!tile || !tile.isSelected) {
                return false;
            }

            while (tile.previousHor) {
                tile = tile.previousHor;
            }

            while (tile) {
                if (!tile.isSelected) {
                    return false;
                }
                tile = tile.nextHor
            }

            return true;
        }

        function isVertical(tile) {

            if (!tile || !tile.isSelected) {
                return false;
            }

            while (tile.previousVert) {
                tile = tile.previousVert;
            }

            while (tile) {
                if (!tile.isSelected) {
                    return false;
                }
                tile = tile.nextVert
            }

            return true;
        }

        function isDiagonal(tile) {
            var t = vm.tiles;
            if (t.length == 0) return false;
            if (!tile || [0, 6, 12, 18, 24, 4, 8, 16, 20].indexOf(tile.boxNumber) === -1) {
                return false;
            }

            if ([0, 6, 12, 18, 24].indexOf(tile.boxNumber) !== -1) {
                return (t[0][0].isSelected && t[1][1].isSelected && t[2][2].isSelected && t[3][3].isSelected && t[4][4].isSelected);
            }
            else {

                return (t[4][0].isSelected && t[0][4].isSelected && t[1][3].isSelected && t[3][1].isSelected && t[2][2].isSelected);
            }
        }

    }
})(angular);