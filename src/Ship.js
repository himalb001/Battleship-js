

class Ship {
    
    /**
     * 
     * @param {int} x X Coordinate
     * @param {int} y Y coordinate
     * @param {int} length - Length of ship
     */
    constructor(x, y, length) {
        const _x = parseInt(x);
        const _y = parseInt(y);

        const _length = parseInt(length);

        if (isNaN(_x) || isNaN(_y) || isNaN(_length) ||
            _x <= 0 || _y <= 0 || _length <= 0) {
            throw new Error("Invalid argument. Vertical and horizontal length should be a positive number")
        }

        this.x = _x;
        this.y = _y;
        this.length = _length;
        this.totalHit = 0;
    }



    /**
     * @description Take a hit
     * 
     */
    shipHasBeenHit(){

        // Update the number of hits that ship has taken
        this.totalHit++;
    }

    /**
     * @description Tells whether the ship is sunk or not
     * 
     * @returns {Boolean} True is sunk, false if not
     */
    isSunk(){
        // Total hit needs to be e1ual to ship's length
        return this.totalHit >= this.length;
    }


    /**
     * @description Gives the remaining number of un-it cells
     * 
     * @returns {Int} Number of cells that hasn't yet been hit
     */
    remainingActiveCell(){
        return this.length - this.totalHit;
    }
}

module.exports = Ship