/**
 * Battleship board game 
 * 
 * @description The Board class represents the 2D board for the battleship game.
 * It's can add ship to the game, attack on certain position, notify whether ship has been attacked,
 * Notify remaining ships and notify if player has lost the game
 * 
 * 
 */


class Board {

    /**
     * @description
     * The constructor sets up a board with x/y cells
     * 
     * @param {int} verticalLength - Horizontal length of the borad
     * @param {int} horizontalLength - Vertical length of the board
     */
    constructor(horizontalLength, verticalLength) {
        this.totalShips = 0;
        this.totalShipSunk = 0;
        this.board = new Map();

        const vLength = parseInt(verticalLength);
        const hLength = parseInt(horizontalLength);

        if (isNaN(vLength) || isNaN(hLength) ||
            vLength <= 0 || hLength <= 0) {
            throw new Error("Invalid argument. Vertical and horizontal length should be a positive number")
        }

        this.verticalLength = vLength;
        this.horizontalLength = hLength;

    }


    /**
     * @description For space & performance reason, we will store ship data in 
     * a map
     * 
     * @param {Ship} ship - Ship Object
     * @param {String} alignment - 'VERTICAL' or 'HORIZONTAL' alignment
     * 
     * @returns {Boolean} True if ship is added successfully, false if not
     * 
     */
    addShip(ship, alignment) {

        // Check if ship and aignment 
        if(!ship) return false;


        // Check ship's bound and overlap
        const shipCanBePlaced = this.canShipBePlaced(ship, alignment);
        
        // Place ship on board
        if ( shipCanBePlaced ) {
            this.placeShipOnBoard(ship,alignment);
        } else {
            // Ship cannot be placed. Notify sender
            return false;
        }

        // Ship has been added
        return true;

    }





    /**
     * @description Tells whether ship exist at given coordinate
     * 
     * @param {int} x of Coordinate of the board
     * @param {int} y Y Coordinate of the board
     */
    hasShipAtCoordinate(x, y) {
        
        // Calculate unique key of the coordinate
        const key = this.getUniqueKeyFromPosition(x,y);
        if (this.board.has(key)) {
            return true;
        } else {
            return false;
        }
    }
    


    /**
     * @description Add ship to individual cell (Coordinate)
     * 
     * @param {Ship} ship Ship object
     * @param {int} x X Coordinate of ship
     * @param {int} y Y coordinate of ship
     */
    addShipToCoordinate(ship, x, y) {

        // Ship shouldn't be null at this point
        if(!ship) {
            throw new Error("InvalidShipPlacementError")
        }


        const key = this.getUniqueKeyFromPosition(x,y);

        if (!this.board.has(key)) {
            this.board.set(key, ship);
        }
    }



    /**
     * 
     * @param {int} x X coordinate on board
     * @param {int} y Y coordinate on board
     */
    attackOnPosition(x, y) {

        const key = this.getUniqueKeyFromPosition(x,y);

        // Check if the map contains value at coordinate
        if (this.board.has(key)) {

            // Notify ship that it has been hit
            const currentShip = this.board.get(key);
            currentShip.shipHasBeenHit();
            
            // remove key it from the board
            this.board.delete(key);
            
            if (currentShip.isSunk()) {
                // Increase totalShipSunk if ship's sunk
                this.totalShipSunk++;
            }

            // Notify caller that it's a hit
            return true;
        } else {
            // Notify caller that it's a miss
            return false;
        }
    }



    /**
     * @description Tells whether all ships on board are sunk
     * 
     * @returns True if all ships are sunk, false otherwise
     */
    areAllShipsSunk() {

        // If map is empty and ship sunk equals totalship
        if (this.board.size <= 0 && 
            this.totalShipSunk > 0 &&
            this.totalShipSunk == this.totalShips) {
            return true;
        } else {
            return false;
        }
    }



    /**
     * 
     * @description Helper function - generate unique key for individual cells on board
     * 
     * @param {int} x X Coordinate
     * @param {int} y Y Coordinate
     */
    getUniqueKeyFromPosition(x,y){
        return x+"x"+y;
    }





    /**
     * @description Helper function - Given the ship and it's alignment, 
     * function returns an array of [x,y] coordinate 
     * of it's end position
     * 
     * @param {Ship} Ship - Ship
     * @param {String} alignment - Either VERTICAL or HORIZONTAL
     */
    getEndCoordinateOfShip(ship, alignment) {
        let endXCoordinate = ship.x;
        let endYCoordinate = ship.y;

        // End coordinate depends on ships alignment
        switch (alignment) {
            case "HORIZONTAL":
                endXCoordinate += (ship.length - 1);
                break;
            case "VERTICAL":
                endYCoordinate += (ship.length - 1);
                break;
            default:
                throw new Error("Undefined ship alignment");
        }

        return [endXCoordinate, endYCoordinate];

    }



    /**
     * @description Check if given ship can be placed on board
     * 
     * @param {Ship} ship Ship to be placed
     * @param {String} alignment Alignment of the ship
     * 
     * @returns {Boolean} True if ship can be placed, false if not
     */
    canShipBePlaced(ship, alignment){

        // Calculate end coordinate of the system
        const endCoordinates = this.getEndCoordinateOfShip(ship,alignment);
        
        const endXCoordinate = endCoordinates[0];
        const endYCoordinate = endCoordinates[1];


        // Check whether the ship is out of bound
        if (endXCoordinate > this.horizontalLength ||
            endYCoordinate > this.verticalLength) {
            return false;
        }

        // Check individual coordinate
        switch (alignment) {
            case "HORIZONTAL":
                for (let index = ship.x; index <= endXCoordinate; index++) {
                    if (this.hasShipAtCoordinate(index, ship.y)) {
                        return false;
                    }
                }
                break;
            case "VERTICAL":
                for (let index = ship.y; index <= endYCoordinate; index++) {
                    if (this.hasShipAtCoordinate(ship.x, index)) {
                        return false;
                    }
                }
                break;
            default:
                throw new Error("Undefined ship alignment");
        }
        
        // Ship can be placed 
        return true;
    }


    /**
     * @description Place ship on board
     * 
     * @param {Ship} ship Ship to be placed
     * @param {String} alignment VERTICAL or HORIZONTAL alignment accepted
     */
    placeShipOnBoard(ship, alignment) {
        // Calculate end coordinate of the system
        const endCoordinates = this.getEndCoordinateOfShip(ship, alignment);
        const endXCoordinate = endCoordinates[0];
        const endYCoordinate = endCoordinates[1];


        // Bound check
        if (endXCoordinate <= this.horizontalLength &&
            endYCoordinate <= this.verticalLength) {

            // Add ship to individual element
            switch (alignment) {
                case "HORIZONTAL":
                    for (var index = ship.x; index <= endXCoordinate; index++) {
                        this.addShipToCoordinate(ship, index, ship.y);
                    }
                    break;
                case "VERTICAL":
                    for (var index = ship.y; index <= endYCoordinate; index++) {
                        this.addShipToCoordinate(ship, ship.x, index);
                    }
                    break;
                default:
                    throw new Error("Undefined ship alignment");
            }

            // Mark ship as used
            this.shipInUse = true;

            // increment total ships on board
            this.totalShips++;
        }
    }
}

module.exports = Board;