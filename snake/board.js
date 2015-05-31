;(function () {
  var Snake = window.Snake = window.Snake || {};


  Snake.Board = function () {
    this.snake = new Snake.Snake();
    this.head = this.snake.head;
    this.tail = this.snake.tail;
    this.apples = null;
    this.grid = this.createGrid();
    this.placeSnake();
    this.placeApple();
  };

  Snake.Board.prototype.createGrid = function () {
    var arr = new Array(12);
    for (var i = 0; i < 12; i++) {
      arr[i] = new Array(12);
    }

    return arr;
  };

  Snake.Board.prototype.placeSnake = function () {
    for (var i = 0; i < this.snake.segments.length; i++) {
      var coord = this.snake.segments[i];
      this.grid[coord.x][coord.y] = 'S';
    }
  };

  Snake.Board.prototype.placeApple = function () {
    var appleSet = true;
    while (appleSet) {
      var x = Math.floor(Math.random() * 12);
      var y = Math.floor(Math.random() * 12);

      if (this.grid[x][y] !== 'S') {
        this.grid[x][y] = 'A';
        this.apple = new Snake.Coord(x, y);
        appleSet = false;
      }
    }
  };

  Snake.Board.prototype.render = function () {
    var display = "";
    var oldTail = this.tail;
    this.head = this.snake.head;
    this.tail = this.snake.tail;
    for (var i = 0; i < this.grid.length; i++) {
      for (var j = 0; j < this.grid.length; j++) {
        if (oldTail.x === i && oldTail.y === j && !this.head.equals(oldTail)) {
          this.grid[i][j] = undefined;
          display += ".";
        } else if (this.head.x === i && this.head.y === j) {
          this.grid[i][j] = "S";
          display += "<b>H</b>";
        } else if (this.grid[i][j] === undefined) {
          display += ".";
        } else if (this.grid[i][j] === "S") {
          display += "<b>S</b>";
        } else if (this.grid[i][j] === "A") {
          display += '<span style="color: red">A</span>';
        }
        display += " ";
      }
      display += "\n";
    }
    return display;
  };

  Snake.Board.prototype.turn = function (dir) {
    this.snake.turn(dir);
  };

  Snake.Board.prototype.move = function () {
    if (this.snake.almostEats(this.apple)) {
      this.snake.eatApple();
      this.placeApple();
    } else {
      this.snake.move();
    }
  };

})();
