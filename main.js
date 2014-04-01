$(document).ready(function () {
    displayBoard();
    tourBus(itinerary({x: random(), y: random()}, 0));
})

// the tour
var tour = {};
// the moves
tour.moves = [];
// the knight
tour.knight = $('.knight');
// the board
tour.board = (function () {
    var board = [];
    for (var i = 0; i < 8; i++) {
        board.push([0,0,0,0,0,0,0,0])
    }
    return board;
})();

tour.map = (function () {
    var x = [-1,  1, -2,  2, -2, 2, -1, 1];
    var y = [-2, -2, -1, -1,  1, 1,  2, 2];
    var map = [];

    for (var i = 0; i < 8; i++) {
        map.push({ x: x[i], y: y[i] });
    }
    return map;
})();

// find all reachable positions not yet landed on
function search (position) {
    var positions = [];
    _.each(tour.map, function (mapPosition) {
        var x = position.x + mapPosition.x;
        var y = position.y + mapPosition.y;
        if (tour.board[x] && tour.board[x][y] !== undefined && !tour.board[x][y]) positions.push({x: x, y: y});
    })
    return positions;
}

// determine next position by choosing the one that provides the knight with the fewest onward moves
function reSearch (positions) {
    var options = _.map(positions, function (position) {
        return search(position).length;
    })
    return positions[options.indexOf(_.min(options))];
}

// solve the Knight's Tour
function itinerary (position, num) {
    tour.board[position.x][position.y] = 1;
    tour.moves.push(position);
    return num > 62 ? tour.moves : itinerary(reSearch(search(position)), num + 1);
}

// visualize the tour
function tourBus (positions) {
    _.each(positions, function (position, i) {
        setTimeout(function () {
            var square = $('#' + [position.x, position.y].join(''));
            square.text('x');
            tour.knight.css({ left: position.x * 75, bottom: position.y * 75 });
        }, i * 500)
    })
}

// random nums
function random () {
    return Math.floor(Math.random() * 8);
}

// display the board
function displayBoard () {
    var color = ['#2D2D2D', '#C5C5C5']
    var board = '';
    for (var i = 0; i < 64; i++) {
        if (!(i % 8)) color.reverse();
        console.log(Math.floor(i / 8), i % 8)
        board += ('<div class="square" id="'+[i % 8, Math.abs(Math.floor(i / 8) - 7)].join('') +'" style="background: '+color[i % 2]+'"></div>')
    }
    $('.board').append(board);
}



