
var stage , layer , gridLayer;
var gridButtonStatus = 0;
const gridSize = 72;
var testID = 0;
const numDice = [];
var diceSize = 0, diceAdder;

//INIT()
window.onload = function(){
  stage = new Konva.Stage({
    container: "gameArea",
    height: 1920,
    width:1440
  });
  layer = new Konva.Layer();
  drawGrid();
  
  
  var diceBox = document.getElementById('dice-holder-container').childNodes;
  //adds the following eventListeners for each type of dice
  for (let i = 0; i< diceBox.length-1; i++){
    diceBox[i].addEventListener("dragstart", function(evt){
      diceAdder = stage.container();
      diceSize = this.id;
      numDice.push(diceSize);
      
    diceAdder.addEventListener('dragover', function(evt){
        evt.preventDefault();   
        diceAdder.addEventListener('drop', function(){
          if(diceSize != 0){
            for(let i = 0 ; i < numDice.length; i ++){
              drawDice(numDice[i]);
            }
            console.log("------")
          }
          //reset stored diceSize & array to avoid printing out dice X times dragover was active
          diceSize = 0; 
          numDice.length = 0;
        });//diceAdder.drop
      });//diceAdder.dragover
    });//diceBox[i].dragstart
  }//for loop
}
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


/*
-----------------------------------------------------------------------------
curr dice plan
-make a rule per dice type
-on mousedrag function make a shape of the dice
-rotate it/ bounce it(via shrink/grow) randomly 3-5 times
-stop and then show the random number generated

-----------------------------------------------------------------------------
*/

//DRAW DICE
function drawDice(size){
  if(size == 4){
    size -= 1;
  } else if (size == 8 || size == 6){
    size = 4;
  } else if (size == 20){
    size = 6;
  }
  var newDice = new Konva.RegularPolygon({
    x: Math.random()* 1000,
    y: Math.random()* 500,
    sides: size,
    fill: "white",
    radius: 36,
    id: "dice",
    draggable: true
  });
  layer.add(newDice);
  stage.add(layer);
  newDice.on('dblclick', function(){
    newDice.destroy();
  });

/*
-------------------------------------------------
draw dice based off size recieved
use konva polygons
possibly dont need a switch case, just one general constructor
have text attach to it that display a random num from [1,size]
on click delete dice? or delete after x secs?

might  need a slightly special switch case
d4 - side: 3
d6 & d8 side: 4, rotate d8 45degree before drawing
d20 side:6


-------------------------------------------------
*/
  switch(size){
    case "4":
      console.log("D4");
      break;
    case "6":
      console.log("D6");
      break;
    case "8":
      console.log("D8");
      break;
    case "10":
      console.log("D10");
      break;
    case "12":
      console.log("D12");
      break;
    case "20":
      console.log("D20");
      break;
  }
}

//EOF DRAW DICE

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


//TEST IMG UPLOAD
$("#file_input").change(function(e){

  var URL = window.webkitURL || window.URL;
  var url = URL.createObjectURL(e.target.files[0]);
  var img = new Image();
  img.src = url;


  img.onload = function() {

    var img_width = img.width;
    var img_height = img.height;

    // calculate dimensions to get max 300px
    var max = 300;
    var ratio = (img_width > img_height ? (img_width / max) : (img_height / max))

    // now load the Konva image
    var theImg = new Konva.Image({
      image: img,
      x: 50,
      y: 30,
      width: img_width/ratio,
      height: img_height/ratio,
      draggable: true
    });

    layer.add(theImg);
    stage.add(layer);
    layer.draw();
  }


});
//EOF TEST IMG UPLOAD