;(function () {
  window.Snake = window.Snake || {};

  Snake.gameView = function ($el) {
    this.board = new Snake.Board();
    this.$display = $el;
    this.bindListeners();
    this.nextDir = 'N';

    setInterval(this.step.bind(this), 100);
  };

  Snake.gameView.prototype.bindListeners = function () {
    $('body').on('keydown', this.handleKeyEvent.bind(this));
  };

  Snake.gameView.prototype.handleKeyEvent = function (event) {
    switch (event.which)
    {
      case 37: this.nextDir = 'W';
               break;
      case 38: this.nextDir = 'N';
               break;
      case 39: this.nextDir = 'E';
               break;
      case 40: this.nextDir = 'S';
               break;
    }
    this.step();
  };

  Snake.gameView.prototype.step = function () {
    try {
      if(this.nextDir) {
        this.board.turn(this.nextDir);
        this.nextDir = null;
      }
      this.board.move();
      this.$display.text(this.board.render());
    }
    catch(err) {
      this.board = new Snake.Board();
    }
  };
})();
