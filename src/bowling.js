/**
 * Bowling game.
 */
class Bowling {

    /**
     * @constructor
     */
    constructor() {
        this.scoreBoard = [];
        this.frame = {
            number : 1,
            pins : [],
        };
    }

    /**
     * Player rolls the ball.
     *
     * @param {number} pins
     * @return {boolean}
     */
    roll(pins) {
        this.validate(pins);
        this.resetThisFrame();
        this.frame.pins.push(pins);
        this.updateScoreBoard();
        return true;
    }

    /**
     * Score of the game at any instance.
     *
     * @return {number}
     */
    score() {
        let score = 0;
        for (let i = 0; i < this.scoreBoard.length; i++) {
            score += this.scoreBoard[i].score[0] + (this.scoreBoard[i].score[1] ? this.scoreBoard[i].score[1] : 0);
        }

        return score;
    }

    /**
     * Is the game over?
     *
     * @return {boolean}
     */
    isGameOver() {
        // Game is not over until 10 frames are reached
        if (this.scoreBoard.length < 10 || (!this.scoreBoard[9].is_strike && this.scoreBoard[9].score.length < 2)) {
            return false;
        }

        // Game is not over if there is a strike in the last frame
        if (this.scoreBoard.length >= 10 && this.scoreBoard[9].is_strike) {
            // Game will be over after two more rolls
            return (this.frame.number === 11 && this.frame.pins.length === 2) || (this.frame.number === 12);
        }

        // Game is not over if there is a spare in the last frame
        if (this.scoreBoard.length >= 10 && this.scoreBoard[9].is_spare) {
            // Game will be over after one more rolls
            return this.frame.number === 11 && this.frame.pins.length === 1;
        }

        return true;
    }

    /**
     * Did the last frame caused a spare?
     *
     * @return {boolean}
     */
    isSpare() {
        if (this.frame.pins.length === 2 && !this.isStrike()) {
            return (this.frame.pins[0] + this.frame.pins[1]) === 10;
        }

        return false;
    }

    /**
     * Did the last frame caused a strike?
     *
     * @return {boolean}
     */
    isStrike() {
        if (this.frame.pins.length >= 1) {
            return this.frame.pins[0] >= 10;
        }

        return false;
    }

    /**
     * Reset frame to start for the new frame.
     */
    resetThisFrame() {
        if (this.frame.pins.length === 2 || this.isStrike()) {
            this.frame.number ++;
            this.frame.pins = [];
        }
    }

    /**
     * Update score board after the last roll.
     */
    updateScoreBoard() {
        if (this.frame.number > 1 && this.frame.number <= 10) {

            // If last frame had a strike
            if (this.scoreBoard[this.frame.number - 2].is_strike) {
                this.scoreBoard[this.frame.number - 2].score[0] += this.frame.pins[this.frame.pins.length - 1];
            }

            // If last frame was strike and second last frame was also strike
            if (this.frame.number > 2 &&
                this.frame.pins.length === 1 &&
                this.scoreBoard[this.frame.number - 2].is_strike &&
                this.scoreBoard[this.frame.number - 3].is_strike) {
                this.scoreBoard[this.frame.number - 3].score[0] += this.frame.pins[0];
            }

            // If last frame had spare then award bonus
            if (this.scoreBoard[this.frame.number - 2].is_spare && this.frame.pins.length === 1){
                this.scoreBoard[this.frame.number - 2].score[1] += this.frame.pins[0];
            }
        }

        if (this.frame.number > 10 && this.scoreBoard[9].is_strike) {
            this.scoreBoard[9].score[0] += this.frame.pins[0];

            if (this.frame.number === 11 && this.scoreBoard[8].is_strike) {
                this.scoreBoard[8].score[0] += this.frame.pins[0];
            }
        }

        if (this.frame.number > 10 && this.scoreBoard[9].is_spare) {
            this.scoreBoard[9].score[1] += this.frame.pins[0];
        }

        let scoreboard = {
            is_strike : this.isStrike(),
            is_spare : this.isSpare(),
            score : this.frame.pins,
        };

        if (this.scoreBoard[this.frame.number - 1]) {
            this.scoreBoard[this.frame.number - 1] = scoreboard;
        } else if (this.scoreBoard.length < 10) {
            this.scoreBoard.push(scoreboard);
        }
    }

    /**
     * Are the given pins valid?
     *
     * @param {number} pins
     * @return {boolean}
     */
    validate(pins) {
        if (this.isGameOver()) {
            throw new Error("Game over");
        }

        let leftOverPins = 10;
        if (this.frame.pins.length === 1 && this.frame.pins[0] < 10) {
            leftOverPins -= this.frame.pins[0];
        }

        if (pins > leftOverPins) {
            throw new Error("Wrong input, only "+ leftOverPins +" pins can be knocked down.");
        }
        return true;
    }

}