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
        assert = chai.assert,
        should = chai.should();

    describe('board basics', function() {

        it('should throw error for only one argument', function() {
            var board = module.initBitBoard(2, 2);
            console.log( board );
        
        });

});
});
