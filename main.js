


var __main = function() {

    var paddle = function () {
        var image = imageFromPath('img/paddle.png')
        var o = {
            image: image,
            x: 150,
            y: 200,
            speed: 5,
        }
        o.moveLeft = function () {
            o.x -= o.speed
        }
        o.moveRight = function () {
            o.x += o.speed
        }
        return o
    }

    var ball = function () {
        var image = imageFromPath('img/ball.png')
        var o = {
            image: image,
            x: 150,
            y: 150,
            speedX: 8,
            speedY: 8,
            fired: false,
        }
        o.fire = function() {
            fired = true
        }
        o.move = function() {
            if (o.x < 0 || o.x > 300) {
               o.speedX = -o.speedX
            }
            if (o.y < 0 || o.y > 400) {
               o.speedY = -o.speedY
            }
            // move
            o.x += o.speedX
            o.y += o.speedY
        }
        return o
    }

    var game = YuaGame(60)
    var paddle = paddle()
    var ball = ball()

    game.registerAction('a', function() {
        paddle.moveLeft()
    })
    game.registerAction('d', function() {
        paddle.moveRight()
    })
    game.registerAction('f', function() {
        ball.fire()
    })

    game.update = function() {
        ball.move()
    }
    game.draw = function () {
        game.drawImage(paddle)
        game.drawImage(ball)
    }



}
var log = console.log.bind(console)

var imageFromPath = function (path) {
    var img = new Image()
    img.src = path
    return img
}

var YuaGame = function (fps) {
    var g = {
        actions: {},
        keyDown: {},
    }
    var canvas = document.querySelector('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context

    //events
    window.addEventListener('keydown', function(event) {
        g.keyDown[event.key] = true
    })
    window.addEventListener('keyup', function(event) {
        g.keyDown[event.key] = false
    })

    g.drawImage = function(YuaImage) {
        g.context.drawImage(YuaImage.image, YuaImage.x, YuaImage.y)
    }
    g.registerAction = function (key, callback) {
        g.actions[key] = callback
    }

    g.update = function() {

    }
    g.draw = function() {

    }
    setInterval(function() {
        //events
        var actions = Object.keys(g.actions)
        for (var i = 0; i <  actions.length; i++) {
            var k = actions[i]
            if(g.keyDown[k]) {
                g.actions[k]()
            }
        }
        //update
        g.update()
        //clearRect
        g.context.clearRect(0, 0, g.canvas.width, g.canvas.height)
        //draw
        g.draw()
    }, 1000/fps)
    return g
}



__main()
