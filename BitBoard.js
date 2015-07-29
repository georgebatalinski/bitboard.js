/** @module BitBoard
 * Provides BitBoard module for writing board games.
 *
 * An example of an 8x8 Board is depicted as follows: 
 *
 *             01234567  (X)
 *            0........
 *            1........
 *            2........
 *            3........
 *            4........
 *            5........
 *            6........
 *            7........
 *            
 *           (Y)
 */ 

define(function() {
    'use strict';

    //==============================================//
    // static constant variables for class BitBoard //
    //==============================================//

    /** @private */
    var numPlayers;

    /** @private */
    var width;

    /** @private */
    var height;

    /** @const {number} - row mask of board row */
    var ROW_MASK = 128;

    /**
     * Represents a BitBoard: https://chessprogramming.wikispaces.com/Bitboards
     *
     * @constructor
     * @class
     * @param {number} np - number of players for this bitboard
     * @param {number} w - width of this bitboard
     * @param {number} h - height this bitboard
     */
    function BitBoard (np, w, h) {
        numPlayers = np;
        width      = w;
        height     = h;

        /** @public */
        this.players  = [];

        /** @public */
        this.bitboard = new Uint8Array(new ArrayBuffer(w * Math.floor(h/8)));
    }

    /** @function setPosition
     * Sets a player's position on board.
     * 
     * @param {number} player - the player for which the postion to be set
     * @param {number} x - the x coordinate of the postion
     * @param {number} y - the y coordinate of the postion
     */
    BitBoard.prototype.setPosition = function (player, x, y) {
        // TODO: need to check if that position is already taken before setting?!
        this.bitboard[y]     |= ROW_MASK >>> x;
        this.players [player] = y*height + x;
    };

    /** @function getPosition
     * Gets a player's position on board.
     * 
     * @param {number} player - the player for which the postion to be retrieved
     * @returns {Object} - the x and y coordinate in Object literal format
     */
    BitBoard.prototype.getPosition = function (player) {
        var pos = this.players[player];

        return {
            x: pos % 8,
            y: Math.floor(pos/8)
        };
    };

    /** @function getBoardCopy
     * Copy instance variables for a BitBoard object and return a new object.
     * 
     * @returns {BitBoard} - a new object copy with same instance variable contents
     */
    BitBoard.prototype.getBoardCopy = function () {
        var board = new BitBoard(numPlayers, width, height);

        board.player = this.player.slice();

        for (var r = 0; r < height; ++r) {
            board.bitboard[r] = this.bitboard[r];
        }

        return board;
    };

    /** @function @public printBoard
     * A debugging method for this module; it is exposed to public interface.
     * It prints out the board state to console.
     *
     * @param {Uint8Array} - the bitboard data structure to be printed
     */
    var printBoard = function (board) {

        console.log();
        console.log("bit-board looks like:");
        console.log();

        var strBoard = "";
        for (var row = 0; row < height; ++row)
        {
            for (var col = 0; col < width; ++col)
            {
                strBoard += (board[row]&(ROW_MASK>>>col))? "1" : "0"; 
            }
            strBoard += "\n";
        }

        console.log(strBoard);
    };

    // export module public interface
    return {
        initBitBoard: function(np, w, h /*, ppa */) {
            // TODO: probably need to pass in player position array 
            //       and set it also in this function
            var board = new BitBoard(np, w, h);

            for (var i = 0; i < height; ++i) {
                board.bitboard[i] = 0;
            }

            return board;
        },
        printBoard: printBoard
    };
});
