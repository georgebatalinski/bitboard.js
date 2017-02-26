var requirejs = require('requirejs');
var chai      = require('chai');

requirejs.config({
    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    baseUrl: '.',
    nodeRequire: require
});

describe('BitBoard Learning Tests', function() {

    var module = requirejs('./bitboard.js'),
        expect = chai.expect,
        assert = chai.assert,
        should = chai.should();

    describe('board basics', function() {

        it('should create 8 bytes based on height', function() {
            var board = module.initBitBoard(8, 8);
            //module.printBoard(board);
            expect( board.bitboard ).to.have.length(8);
        });

        it('should create 16 bytes based on height', function() {
            var board = module.initBitBoard(8, 16);
            //module.printBoard(board);
            expect( board.bitboard ).to.have.length(16);
        });

        it('should setPosition', function() {
            var x = 1, y = 1;
            var width = 8, height = 8;
            var board = module.setPos(width, height, x, y);
            var binaryShift = Math.pow(2, width - (x + 1));
            expect( board.bitboard[y] ).to.equal( binaryShift );
        });

        it('should setPosition another val', function() {
            var x = 2, y = 1;
            var width = 8, height = 8;
            var board = module.setPos(width, height, x, y);
            var binaryShift = Math.pow(2, width - (x + 1));
            expect( board.bitboard[y] ).to.equal( binaryShift );
        });

        it('should setPosition another val - yet another', function() {
            var x = 3, y = 2;
            var width = 8, height = 8;
            var board = module.setPos(width, height, x, y);
            var binaryShift = Math.pow(2, width - (x + 1));
            expect( board.bitboard[y] ).to.equal( binaryShift );
        });

        //NEXT: Multi -pos does not work
        it('should multi-pos', function() {
            var x = 3, y = 2;
            var width = 8, height = 8;
            var board = module.setPos(width, height, x, y);

            var x2 = 3, y2 = 2;
            var board1 = module.setPosition(board, x2, y2);
            module.printBoard(board1);
            // var binaryShift = Math.pow(2, width - (x + 1));
            // expect( board.bitboard[y] ).to.equal( binaryShift );
        });

});
});
