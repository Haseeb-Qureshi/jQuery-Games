;(function () {
  var Snake = window.Snake = window.Snake || {};

  Snake.gameView = function ($el) {
    this.board = new Snake.Board();
    this.$display = $el;
    this.bindListeners();
    this.nextDir = 'N';
    this.setInterval();
  };

  Snake.gameView.prototype.setInterval = function () {
    this.intervalId = setInterval(this.step.bind(this), 100);
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
    clearInterval(this.intervalId);
    this.setInterval();
    this.step();
  };


  Snake.gameView.prototype.step = function () {
    try {
      if(this.nextDir) {
        this.board.turn(this.nextDir);
        this.nextDir = null;
      }
      this.board.move();
      this.$display.html(this.board.render());
    }
    catch(err) {
      this.clearListeners();
      setTimeout(function () {
        this.board = new Snake.Board();
        this.setInterval();
        this.bindListeners();
      }.bind(this), 1000);
    }
  };

  Snake.gameView.prototype.clearListeners = function () {
    $('body').off('keydown');
    for (var i = 0; i <= 9999; i++) {
      window.clearInterval(i);
    }
  };

})();
