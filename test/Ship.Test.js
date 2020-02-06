const expect = require('chai').expect;
const Board = require("../src/Board");
const Ship = require("../src/Ship");



describe("Ship constructor", () => {
    it("should accept normal values",()=>{
        var ship = new Ship(10,10,4);
        ship.shipHasBeenHit();
        expect(ship.remainingActiveCell()).to.be.equal(3);
    })

    it("should not accept negative length", () => {
        expect(()=>new Ship(10, 10, -14)).to.throw();
    })
    it("should not accept non-integer value",()=>{
        expect(() =>new Ship("aa", 10, 14)).to.throw();
        expect(() =>new Ship(10, "aa", 14)).to.throw();
        expect(() =>new Ship(10, 10, "aa")).to.throw();
    })

    it("should be independent of Board", () => {
        // ship should be created regardless of the board size
        let board = new Board(5,5);
        let ship = new Ship(10,10,10);
        expect(ship.length).to.be.equal(10);
    })

 })
