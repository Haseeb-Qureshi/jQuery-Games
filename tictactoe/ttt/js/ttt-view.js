(function () {
  if (typeof TTT === "undefined") {
    window.TTT = {};
  }

  var View = window.TTT.View = function (game, $el) {
    this.game = game;
    this.$grid = $el;
    this.setupBoard();
    this.bindEvents();
    this.currentMark = 'X';
  };

  View.prototype.swapMark = function () {
    this.currentMark = this.currentMark === 'X' ? 'O' : 'X';
  };

  View.prototype.bindEvents = function () {
    var that = this;
    $('.row').on('click', '.cell', function (event) {
      var $tar = $(event.target).addClass('clicked');
      that.makeMove($tar);
    });
  };

  View.prototype.makeMove = function ($square) {
    try {
      this.game.playMove(JSON.parse($square.attr('data-coord')));
      $square.addClass(this.currentMark).text(this.currentMark);
      this.swapMark();
    }
    catch(MoveError) {
      alert("Invalid move!");
    }

    if (this.game.winner()) {
      $('.cell').addClass('clicked');
      $('.' + this.game.winner().toUpperCase()).css({ background: 'teal' });
      $('body').append($('<h2>').text(
        'Congratulations, ' + this.game.winner().toUpperCase() + "!"
      ));
      $('.row').off('click', '.cell');
    }
  };

  View.prototype.setupBoard = function () {
    for(var i = 0; i < 3; i++) {
      var $row = $('<div>').addClass('row');
      for(var j = 0; j < 3; j++) {
        $row.append($('<div>').addClass('cell').attr('data-coord',
          JSON.stringify([i, j])));
      }
      this.$grid.append($row);
    }
  };
})();
