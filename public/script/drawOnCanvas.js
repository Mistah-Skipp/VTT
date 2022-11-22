
function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 120);
}

var myGameArea = {
    canvas : document.createElement('canvas'),
    start : function() {
        this.canvas.width = 1920;
        this.canvas.height = 1080;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[2])
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('mousemove', function (e) {
            myGameArea.x = e.pageX - 20;
            myGameArea.y = e.pageY - 200;
          })
    },
    clear : function(){
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
      }
  }

  function updateGameArea() {
    var timer;
    window.addEventListener("mousedown", function (){
         timer = this.setInterval(function(){
            myGameArea.clear();
            if (myGameArea.x && myGameArea.y) {
                myGamePiece.x = myGameArea.x;
                myGamePiece.y = myGameArea.y;
              }
            myGamePiece.update();
        }, 10);
    });
    window.addEventListener("mouseup", function(){
        if(timer) clearInterval(timer)
    });

  }





  function moveup() {
    myGamePiece.speedY -= 1;
  }
  
  function movedown() {
    myGamePiece.speedY += 1;
  }
  
  function moveleft() {
    myGamePiece.speedX -= 1;
  }
  
  function moveright() {
    myGamePiece.speedX += 1;
  }

  function stopMove() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
  }