class Bowling {

    constructor() {
        this.points = 0;
        this.totalRolls = 0;
        this.scoreBoard = [];
        this.currentFrame = [];
    }

    roll(pins) {
        this.validate(pins);

        if (this.isSpare() || this.isLastFrameWasStrike()) {
            pins += pins;
        }

        this.points = this.points + pins;
        this.resetCurrentFrameAfterTwoRolls();
        this.currentFrame.push(pins);
        this.updateScoreBoard();
        this.totalRolls ++;
        return true;
    }

    isLastFrameWasStrike() {
        return this.scoreBoard.length > 0 && this.scoreBoard[this.scoreBoard.length - 1].is_strike;
    }

    score() {
        return this.points;
    }

    totalFrames() {
        return Math.floor(this.totalRolls / 2);
    }

    resetCurrentFrameAfterTwoRolls() {
        if (this.currentFrame.length === 2) {
            this.currentFrame = [];
        }
    }

    isGameOver() {
        return this.totalFrames() >= 10;
    }

    updateScoreBoard() {
        if (this.currentFrame.length === 1 && this.isStrike()) {
            this.currentFrame.push(0);
            this.totalRolls++;
        }

        if (this.currentFrame.length === 2) {
            this.scoreBoard.push({
                is_strike : this.isStrike(),
                is_spare : this.isSpare(),
                score : this.currentFrame
            });
        }
    }

    isSpare() {
        if (this.currentFrame.length === 2 && !this.isStrike()) {
            return (this.currentFrame[0] + this.currentFrame[1]) === 10;
        }

        return false;
    }

    validate(pins) {
        if (this.isGameOver()) {
            throw new Error("Game over");
        }

        let leftOverPins = 10;
        if (this.currentFrame.length === 1 && this.currentFrame[0] !== 10) {
            leftOverPins -= this.currentFrame[0];
        }

        if (pins > leftOverPins) {
            throw new Error("Wrong input, only "+ leftOverPins +" pins can be knocked down.")
        }
        return true;
    }

    isStrike() {
        if (this.currentFrame.length >= 1) {
            return this.currentFrame[0] === 10;
        }

        return false;
    }
}