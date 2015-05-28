;(function () {
  window.Snake = window.Snake || {};

  Snake.Snake = function () {
    this.dir = 'N';
    this.segments = [
      new Snake.Coord(5, 6),
      new Snake.Coord(5, 7),
      new Snake.Coord(5, 8)
    ];
    this.head = this.segments[2];
    this.tail = this.segments[0];
  };

  Snake.Snake.prototype.dirs = function () {
    return {
      'N': new Snake.Coord(-1, 0),
      'E': new Snake.Coord(0, 1),
      'S': new Snake.Coord(1, 0),
      'W': new Snake.Coord(0, -1)
    }
  };

  Snake.Snake.prototype.rightDir = function(dir) {
    var dirsArray = ['N', 'E', 'S', 'W'];
    var i = dirsArray.indexOf(dir) + 1;
    return dirsArray[i % 4];
  }

  Snake.Snake.prototype.leftDir = function(dir) {
    var dirsArray = ['N', 'E', 'S', 'W'];
    var i = dirsArray.indexOf(dir) + 3;
    return dirsArray[i % 4];
  };

  Snake.Snake.prototype.almostEats = function (coord) {
    var nextCoord = this.dirs()[this.dir];
    var headCoord = this.segments[this.segments.length - 1];
    var newHeadCoord = nextCoord.plus(headCoord);
    if (!newHeadCoord.inBounds()) {
      var dir = this.rightDir(this.dir);
      nextCoord = this.dirs()[dir];
      newHeadCoord = nextCoord.plus(headCoord);
    }
    if (!newHeadCoord.inBounds()) {
      var dir = this.leftDir(this.dir);
      nextCoord = this.dirs()[dir];
      newHeadCoord = nextCoord.plus(headCoord);
    }

    return newHeadCoord.equals(coord);
  };

  Snake.Snake.prototype.eatApple = function () {
    var nextCoord = this.dirs()[this.dir];
    var headCoord = this.segments[this.segments.length - 1];
    var newHeadCoord = nextCoord.plus(headCoord);
    if (!newHeadCoord.inBounds()) {
      this.dir = this.rightDir(this.dir);
      nextCoord = this.dirs()[this.dir];
      newHeadCoord = nextCoord.plus(headCoord);
    }
    if (!newHeadCoord.inBounds()) {
      this.dir = this.leftDir(this.dir);
      nextCoord = this.dirs()[this.dir];
      newHeadCoord = nextCoord.plus(headCoord);
    }
    this.segments.push(newHeadCoord);
    this.tail = this.segments[0];
    this.head = this.segments[this.segments.length - 1];
  };

  Snake.Snake.prototype.move = function () {
    var nextCoord = this.dirs()[this.dir];
    var headCoord = this.segments[this.segments.length - 1];
    var newHeadCoord = nextCoord.plus(headCoord);
    if (!newHeadCoord.inBounds()) {
      this.dir = this.rightDir(this.dir);
      nextCoord = this.dirs()[this.dir];
      newHeadCoord = nextCoord.plus(headCoord);
    }
    if (!newHeadCoord.inBounds()) {
      this.dir = this.leftDir(this.dir);
      nextCoord = this.dirs()[this.dir];
      newHeadCoord = nextCoord.plus(headCoord);
    }
    // debugger
    this.segments.push(newHeadCoord);
    this.segments.shift();
    this.tail = this.segments[0];
    this.head = this.segments[this.segments.length - 1];

    if (this.segments.some(function (coord) {
      return coord !== newHeadCoord && coord.equals(newHeadCoord);
    })) {
      // debugger
      throw "Snake Died";
    }
  };

  Snake.Snake.prototype.turn = function (newDir) {
    !this.isOppositeDir(newDir) && (this.dir = newDir);
  };

  Snake.Snake.prototype.isOppositeDir = function (dir) {
    var dirsArray = ['N', 'E', 'S', 'W'];
    return (dirsArray.indexOf(dir) - dirsArray.indexOf(this.dir)) % 2 === 0;
  };

  Snake.Coord = function (x, y) {
    this.x = x;
    this.y = y;
  };

  Snake.Coord.prototype.plus = function (otherCoord) {
    return new Snake.Coord(this.x + otherCoord.x, this.y + otherCoord.y);
  };

  Snake.Coord.prototype.equals = function (otherCoord) {
    return this.x === otherCoord.x && this.y === otherCoord.y;
  };

  Snake.Coord.prototype.inBounds = function () {
    return this.x >= 0 && this.y >= 0 && this.x <= 11 && this.y <= 11;
  };

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
  }

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
          display += "H";
        } else if (this.grid[i][j] === undefined) {
          display += ".";
        } else if (this.grid[i][j] === "S") {
          display += "S";
        } else if (this.grid[i][j] === "A") {
          display += "A";
        }
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
