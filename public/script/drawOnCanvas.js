var stage, layer, gridLayer;
var gridButtonStatus = 1;

function init(){
  stage = new Konva.Stage({
    container: "gameArea",
    height: 1920,
    width:1440
    });
    layer = new Konva.Layer();
    drawGrid();
  }//EOF init()

  function drawGrid() {
    const gridSize = 72;
    gridLayer = new Konva.Layer();

    const xSize = stage.width(),
          ySize = stage.height(),
          xSteps = (Math.round(xSize/gridSize)),
          ySteps = (Math.round(ySize/gridSize));
     // draw vertical lines
  for (let i = 0; i <= xSteps; i++) {
    gridLayer.add(
      new Konva.Line({
        x: i * gridSize,
        points: [0, 0, 0, ySize],
        stroke: 'black',
        strokeWidth: 1,
      })
    );
  }
  //draw Horizontal lines
  for (let i = 0; i <= ySteps; i++) {
    gridLayer.add(
      new Konva.Line({
        y: i * gridSize,
        points: [0, 0, xSize, 0],
        stroke: 'black',
        strokeWidth: 1,
      })
    );
  }
  gridLayer.batchDraw();
  stage.add(gridLayer);

}
//TOGGLE GRID
$("body").on('click','#gridToggle', function(){
  if(gridButtonStatus == 1){
    console.log("on");
    gridLayer.opacity(0);
    gridButtonStatus = 0;
  } else {
    console.log("off");
    gridLayer.opacity(1);
    gridButtonStatus = 1;
  }

});//EOF TOGGLE GRID



//TEST TOKEN
  $("body").on('click',"#spawn", function(){
    var token = new Konva.Circle({
        x: Math.random() *(stage.width()),
        y: Math.random() *(stage.height()),
        radius: 36,
        fill: 'cyan',
        draggable: true,
      });   
      //layer.draw();
      layer.add(token);
      stage.add(layer);
      token.on('dragmove', () =>{
        console.log( "X: "+token.x()+"||Y:"+token.y());
        if (token.x()-(token.radius()/2)< 0){//left  side
            token.x(token.radius());
        } else if(token.x()+(token.radius()/2) > stage.width()){//right side
            token.x(stage.width()-token.radius())
        } else if(token.y()-(token.radius()/2)< 0){//top side
            token.y(token.radius());
        } else if(token.y()+(token.radius()/2) > stage.height()){//bottom side
            token.y(stage.height()-token.radius());
        }
      })
    });//EOF on click
//EOF TEST TOKEN


  //96px = inch