var __main = function() {

  var log = console.log.bind(console)
  var canvas = document.querySelector('#id-canvas')
  var context = canvas.getContext('2d')

  x = 150
  y = 200
  speed = 5
  var img = new Image()
  img.src = 'img/paddle.png'
  img.onload = function() {
      context.drawImage(img, x, y)
  }

  //events
  window.addEventListener('keydown', function(event) {
      var k = event.key
      if (k == 'd') {
          x += speed
      } else if (k == 'a') {
          x -= speed
      }
      context.clearRect(0, 0, canvas.width, canvas.height)
      context.drawImage(img, x, y)
  })

}

__main()
