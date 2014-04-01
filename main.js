$(document).ready(function () {
    displayBoard();
    tourBus(itinerary([random(), random()]));
})

// the tour
var tour = {
    board: _.map(_.range(8), function (row) { return [0,0,0,0,0,0,0,0]; }),
    map:   _.zip([-1,  1, -2,  2, -2, 2, -1, 1], [-2, -2, -1, -1,  1, 1,  2, 2])
};

// find all immediate positions not yet landed on
function scout (position) {
    var positions = [];
    _.each(tour.map, function (mapPosition) {
        var x = position[0] + mapPosition[0];
        var y = position[1] + mapPosition[1];
        if (tour.board[x] && tour.board[x][y] !== undefined && !tour.board[x][y]) positions.push([x, y]);
    })
    // return all potential immediate positions that have not yet been landed on
    return positions;
}

// determine next position by choosing the one that provides the knight with the fewest onward moves -> Warnsdorff's rule
function reScout (positions) {
    var options = _.map(positions, function (position) {
        return scout(position).length;
    })
    // return the position with the fewest onward moves
    return positions[options.indexOf(_.min(options))];
}

// solve the Knight's Tour
itinerary = (function (route) {
    return function (position) {
        // change value of each position that has been landed on from 0 to 1
        tour.board[position[0]][position[1]] = 1;
        // call itinerary till 64 positions have been pushed to route
        return route.push(position) === 63 ? route : itinerary(reScout(scout(position)));
    }
})([]);

// visualize the tour
function tourBus (positions) {
    _.each(positions, function (position, i) {
        setTimeout(function () {
            setTimeout(function () { $('#' + [position[0], position[1]].join('')).text('x'); }, 500)
            $('.knight').css({ left: position[0] * 75, bottom: position[1] * 75 });
        }, i * 500)
    })
}

// for random initial position
function random () {
    return Math.floor(Math.random() * 8);
}

// display the board
function displayBoard () {
    var color = ['#2D2D2D', '#C5C5C5']
    var board = '';
    for (var i = 0; i < 64; i++) {
        if (!(i % 8)) color.reverse();
        board += ('<div class="square" id="'+[i % 8, Math.abs(Math.floor(i / 8) - 7)].join('') +'" style="background: '+color[i % 2]+'"></div>')
    }
    $('.board').append(board);
}



