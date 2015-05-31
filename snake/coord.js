;(function () {
  var Snake = window.Snake = window.Snake || {};

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
})();
