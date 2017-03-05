describe("Bowling game", function () {

    it("starts a new game", function () {
        let bowling = new Bowling();
        expect(bowling).toBeDefined();
    });

    it("scores zero on first roll", function () {
        let bowling = new Bowling();
        bowling.roll(0);
        expect(bowling.score()).toBe(0);
    });

    it("scores zero on two rolls", function () {
        let bowling = new Bowling();
        bowling.roll(0);
        bowling.roll(0);
        expect(bowling.score()).toBe(0);
    });

    it("scores zero on a full game of gutter balls", function () {
        let bowling = new Bowling();
        for (let i = 0; i < 20; ++i) {
            bowling.roll(0);
        }
        expect(bowling.score()).toBe(0);
    });

    it("scores two when hits 2 pins on first roll", function () {
        let bowling = new Bowling();
        bowling.roll(2);

        expect(bowling.score()).toBe(2);
    });

    it("scores two when hits 2 pin in first roll and 3 pin in second roll", function () {
        let bowling = new Bowling();
        bowling.roll(2);
        bowling.roll(3);

        expect(bowling.score()).toBe(5);
    });

    it("scores twenty in a game when knocks down one pin in each roll", function () {
        let bowling = new Bowling();
        let i;
        for (i = 1; i <= 20; i++) {
            bowling.roll(1);
        }
        expect(bowling.score()).toBe(20);
    });

    it("gives a frame number after a roll", function () {
        let bowling = new Bowling();
        bowling.roll(0);
        bowling.roll(0);

        expect(bowling.totalFrames()).toBe(1);

        bowling.roll(0);
        expect(bowling.totalFrames()).toBe(1);

        bowling.roll(0);
        expect(bowling.totalFrames()).toBe(2);
    });

    it("does not allow another roll when game is over", function () {
        let bowling = new Bowling();
        let i;
        for (i = 1; i <= 20; i++) {
            bowling.roll(1);
        }

        expect(bowling.roll()).toBe(false);
    });

});