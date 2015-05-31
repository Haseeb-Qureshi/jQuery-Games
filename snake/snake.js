;(function () {
  var Snake = window.Snake = window.Snake || {};

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
    };
  };

  Snake.Snake.prototype.rightDir = function(dir) {
    var dirsArray = ['N', 'E', 'S', 'W'];
    var i = dirsArray.indexOf(dir) + 1;
    return dirsArray[i % 4];
  };

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
      var right = this.rightDir(this.dir);
      nextCoord = this.dirs()[right];
      newHeadCoord = nextCoord.plus(headCoord);
    }
    if (!newHeadCoord.inBounds()) {
      var left = this.leftDir(this.dir);
      nextCoord = this.dirs()[left];
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


})();
