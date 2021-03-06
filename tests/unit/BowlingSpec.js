describe("Bowling game", function () {

    it("starts a new game", function () {
        let bowling = new Bowling();
        expect(bowling).toBeDefined();
        expect(bowling.score()).toBe(0);
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

    it("does not allow another roll when a game is over", function () {
        let bowling = new Bowling();
        let i;
        for (i = 1; i <= 20; i++) {
            bowling.roll(1);
        }
        expect(function () {
            bowling.roll(1);
        }).toThrowError("Game over");
    });

    it("is over", function () {
        let bowling = new Bowling();
        expect(bowling.isGameOver()).toBeFalsy();
        for (let i = 1; i <= 20; i++) {
            bowling.roll(1);
        }

        expect(bowling.isGameOver()).toBeTruthy();
    });

    it("is a scoreboard", function () {
        let bowling = new Bowling();

        bowling.roll(1);
        bowling.roll(9);

        expect(bowling.scoreBoard instanceof Array).toBeTruthy();
        expect(bowling.scoreBoard[0].score).toEqual([1, 9]);
    });

    it("has only 10 pins to knock down", function () {
        let bowling = new Bowling();

        expect(function () {
            bowling.roll(11)
        }).toThrowError("Wrong input, only 10 pins can be knocked down.");
    });

    it("awards a spare when 10 balls are knocked down in one frame", function () {
        let bowling = new Bowling();

        bowling.roll(0);
        bowling.roll(0);
        expect(bowling.isSpare()).toBeFalsy();

        bowling = new Bowling();
        bowling.roll(1);
        bowling.roll(9);
        expect(bowling.isSpare()).toBeTruthy();

        bowling = new Bowling();
        bowling.roll(2);
        bowling.roll(4);
        expect(bowling.isSpare()).toBeFalsy();

        bowling = new Bowling();
        bowling.roll(10);
        bowling.roll(0);
        expect(bowling.isSpare()).toBeFalsy();

        bowling = new Bowling();
        bowling.roll(0);
        bowling.roll(10);
        expect(bowling.isSpare()).toBeTruthy();

        bowling = new Bowling();
        bowling.roll(2);
        expect(function () {
            bowling.roll(9)
        }).toThrowError("Wrong input, only 8 pins can be knocked down.");
    });

    it("scores double (spare) in the next ball when knocks down 10 balls in first frame", function () {
       let bowling = new Bowling();
       bowling.roll(7);
       bowling.roll(3);
       bowling.roll(4);
       bowling.roll(2);

       expect(bowling.score()).toBe(20);
    });

    it("scores 16, when a spare is in the first frame, followed by three pins, followed by all misses", function () {
        let bowling = new Bowling();

        bowling.roll(1);
        bowling.roll(9);
        bowling.roll(3);
        for (let i = 1; i <= 17; i++) {
            bowling.roll(0);
        }

        expect(bowling.score()).toBe(16);
    });

    it("awards a strike when 10 balls are knocked down in first roll of one frame", function () {
        let bowling = new Bowling();
        bowling.roll(10);
        expect(bowling.isStrike()).toBeTruthy();

        bowling = new Bowling();
        bowling.roll(0);
        bowling.roll(10);
        expect(bowling.isStrike()).toBeFalsy();

        bowling = new Bowling();
        bowling.roll(1);
        expect(bowling.isStrike()).toBeFalsy();

        bowling = new Bowling();
        bowling.roll(1);
        bowling.roll(2);
        expect(bowling.isStrike()).toBeFalsy();

        bowling = new Bowling();
        bowling.roll(1);
        bowling.roll(9);
        expect(bowling.isStrike()).toBeFalsy();
    });

    it("allows one roll in a frame when their is a strike on the first roll", function () {
        let bowling = new Bowling();

        bowling.roll(10);
        expect(bowling.frame.number).toBe(1);

        bowling.roll(0);
        expect(bowling.frame.number).toBe(2);

    });

    it("scores double in next frame, when previous frame is a strike", function () {
       let bowling = new Bowling();

       // Srike in first frame
       bowling.roll(10);

       // Second frame
       bowling.roll(2);
       bowling.roll(6);

       expect(bowling.score()).toBe(26);
    });

    it("scores 24 when there is a strike in the first frame, followed by three and then four pins, followed by all misses", function () {
        let bowling = new Bowling();

        // Strike
        bowling.roll(10);

        // Second frame
        bowling.roll(3);
        bowling.roll(4);

        for (let i = 1; i <= 16; i++) {
            bowling.roll(0);
        }

        expect(bowling.score()).toBe(24);
    });

    it("is possible to do two consecutive strikes", function () {
        let bowling = new Bowling();

        bowling.roll(10);
        expect(bowling.isStrike()).toBeTruthy();

        bowling.roll(10);
        expect(bowling.isStrike()).toBeTruthy();

        bowling.roll(4);
        bowling.roll(2);

        expect(bowling.scoreBoard[0].is_strike).toBeTruthy();
        expect(bowling.scoreBoard[1].is_strike).toBeTruthy();
        expect(bowling.scoreBoard[2].is_strike).toBeFalsy();

        expect(bowling.scoreBoard[0].score).toEqual([24]);
        expect(bowling.scoreBoard[1].score).toEqual([16]);
        expect(bowling.scoreBoard[2].score).toEqual([4, 2]);
    });

    it("allows one extra ball if it is a spare in 10th frame",function () {
        let bowling = new Bowling();

        // Given that there are all misses in first 9 frames
        for (let i = 1; i <= 18; i++) {
            bowling.roll(0);
        }

        // And then a spare in 10th frame
        bowling.roll(2);
        bowling.roll(8);
        expect(bowling.isGameOver()).toBeFalsy();
        expect(bowling.score()).toBe(10);

        bowling.roll(5);
        expect(bowling.isGameOver()).toBeTruthy();
        expect(bowling.score()).toBe(15);
    });

    it("allows two extra balls if it is a strike in 10th frame",function () {
        let bowling = new Bowling();

        // Given that there are all misses in first 9 frames
        for (let i = 1; i <= 18; i++) {
            bowling.roll(0);
        }

        // And then a strike in 10th frame
        bowling.roll(10);
        expect(bowling.isGameOver()).toBeFalsy();

        // Another strike
        bowling.roll(10);
        expect(bowling.isGameOver()).toBeFalsy();

        // Another strike
        bowling.roll(10);
        expect(bowling.isGameOver()).toBeTruthy();
        expect(bowling.scoreBoard[9].score).toEqual([30]);
    });

    it("is a perfect game with 12 strikes and scores 300", function () {
        let bowling = new Bowling();

        while(!bowling.isGameOver()) {
            bowling.roll(10);
            expect(bowling.isStrike()).toBeTruthy();
        }

        expect(bowling.score()).toBe(300);
    });
});