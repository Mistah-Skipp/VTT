var stage, layer, gridLayer;
var gridButtonStatus = 0;
const gridSize = 72;
var testID = 0;

//INIT()
  stage = new Konva.Stage({
    container: "gameArea",
    height: 1920,
    width:1440
    });
  layer = new Konva.Layer();
  drawGrid();
//EOF init()

function drawGrid() {
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
  gridLayer.opacity(0);
  stage.add(gridLayer);

}//EOF DRAW GRID

//TOGGLE GRID
$("body").on('click','#gridToggle', function(){
  if(gridButtonStatus == 0){
    console.log("on");                                                     //DEBUG
    gridLayer.opacity(1);
    gridButtonStatus = 1;
  } else {
    console.log("off");                                                      //DEBUG
    gridLayer.opacity(0);
    gridButtonStatus = 0;
  }

});//EOF TOGGLE GRID

//DICE DRAG
      // what is url of dragging element?
      var itemURL = '';
      document.getElementById('dice-holder-container').addEventListener('dragstart', function (e) {
          itemURL = e.target.src;
        });

      var con = stage.container();
      con.addEventListener('dragover', function (e) {
        e.preventDefault(); // !important
      });

      con.addEventListener('drop', function (e) {
        e.preventDefault();
        stage.setPointersPositions(e);
        var imgGet = document.getElementById('dice-holder-container').childNodes;
        console.log(imgGet);                              //DEBUG
        for(let i = 0; i <= imgGet.length -1; i++){
          if(imgGet[i].id != null){
            console.log("id: " + imgGet[i].id);            //DEBUG
          }
        }
      });
//DICE DRAG EOF

/*
-----------------------------------------------------------------------------
curr dice plan
-make a rule per dice type
-on mousedrag function make a shape of the dice
-rotate it/ bounce it(via shrink/grow) randomly 3-5 times
-stop and then show the random number generated

-----------------------------------------------------------------------------
*/



//TEST TOKEN                                                                   //DEBUG
$("body").on('click',"#spawn", function(){
  var token = new Konva.Circle({
      x: Math.random() *(stage.width()),
      y: Math.random() *(stage.height()),
      radius: 36,
      fill: 'cyan',
      draggable: true,
      id: testID++
    });   
    //layer.draw();
    layer.add(token);
    stage.add(layer);
    token.on('dragmove', () =>{
      console.log( "ID:" + token.id()+ "|| X: "+token.x()+"|| Y:"+token.y());                      //DEBUG
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
