var canvas, stage, offset, mouseTarget, dragStart;
var update = true;

function init() {
  canvas = document.getElementById("test");
  stage = new createjs.Stage(canvas);

  //mouse enable
  stage.enableMouseOver(1);

  handleLoader();
}

function handleLoader(event){
  //var object = event.target;
  var circle;
  //var drawArea = new createjs.Container();
  
  $("#mainArea").on('click', '#spawn', function () {
    circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(10,10,40);
    circle.x = (Math.random() * 1920) + 50;
    circle.y = (Math.random() * 1080)+ 50;
    
    stage.addChild(circle);
    stage.update();
    
    circle.on("mousedown", function (evt){
      this.parent.addChild(this);
      this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
    });
    
    circle.on("pressmove", function (ext){
      this.x = ext.stageX + this.offset.x;
      this.y = ext.stageY + this.offset.y;
      update = true;
      
    });
    
  });
  createjs.Ticker.addEventListener(("tick"), tick);
}

function tick(ticked){
  if(update){
    update = false;
    stage.update(ticked);
  }
}


  //https://www.createjs.com/demos/easeljs/draganddrop

