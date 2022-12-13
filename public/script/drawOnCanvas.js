
//MAIN SECTION CODE
var token;
var tokenID = 0;
const canvas = document.getElementById("gameArea"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var meshList = [];

const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 25, 0), scene);
    //camera.inputs.clear();
    //replace default camera w/ one that pans on Lclick

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 1), scene);
    light.intensity = 1;

    var ground = BABYLON.MeshBuilder.CreateGround("tableTop",{
      width:1920,
      height:1080,
      subdivisions:10
    },scene);
    var groundColor = new BABYLON.StandardMaterial(scene);
    groundColor.alpha = 0.75;
    groundColor.diffuseColor = new BABYLON.Color3(130,130,130);
    ground.material = groundColor;
    ground.position.y = -10;
    ground.enablePointerMoveEvents = true;
    

    return scene;
};//createScene EOF


const scene = createScene(); 
engine.runRenderLoop(function () {
        scene.render();
        //if other renders need to happen, else add to createScene
});
//EOF MAIN SECTION

//---------------------------------------------------------------------------------------------------

//LEFT SECTION CODE
$("#left-section").on("click",'#spawn',function () {
  console.log("spawning token");

  var faceCol = [];
  for( let i= 0; i < 3; i++){
    faceCol[i] = new BABYLON.Color4(255,255,255);
  }
  token = new BABYLON.MeshBuilder.CreateCylinder(tokenID, {
    diameter: 1,
    height: .05,
    faceColors: faceCol
  }, scene);
  token.position.x = Math.random() * 10;
  token.position.z = Math.random() *10;
  var dragging = new BABYLON.PointerDragBehavior({dragPlaneNormal:new BABYLON.Vector3(0,1,0)});
  token.addBehavior(dragging);
  meshList.push(token);
  
  tokenID++;
});



//dice img drag
var diceBox = document.getElementById("dice-container").childNodes;
var dicePool = [];
var diceSize , dice;
for(let i = 0;i < diceBox.length;i++){
  diceBox[i].addEventListener("dragstart",function(){
    diceSize = this.alt;
    dragChecker = document.getElementById("gameArea");
    dragChecker.addEventListener("dragover",function(evt){
      dicePool.push(diceSize);
      evt.preventDefault();
      dragChecker.addEventListener("drop",function(){
          switch(dicePool[i]){
            case "D4":
              dice = BABYLON.MeshBuilder.CreatePolyhedron("D4",{type:0,size: 0.5},scene);
              dice.position.x = dice.position.z = 0;
              var dragging = new BABYLON.PointerDragBehavior({dragPlaneNormal:new BABYLON.Vector3(0,1,0)});
              dice.addBehavior(dragging);
              meshList.push(dice);
              break;
            case "D6":
              var mat = new BABYLON.StandardMaterial("mat", scene);
              var testMat = new BABYLON.Texture("./public/img/d6Test.jpg", scene);
              //testMat.level = 5;
              mat.diffuseTexture = testMat;
              var col = 6;
              var row = 1;
              var faceUv = [];
              for( let i= 0; i < 6; i++){faceUv[i] = new BABYLON.Vector4(i / col, 0 ,(i+1)/col, 1/row);}
              dice = BABYLON.MeshBuilder.CreateBox("D6",{faceUV:faceUv},scene);
              dice.position.x = dice.position.z = 0;
              dice.material = mat;
              var dragging = new BABYLON.PointerDragBehavior({dragPlaneNormal:new BABYLON.Vector3(0,1,0)});
              dice.addBehavior(dragging);
              meshList.push(dice);
              break;
            case "D8":
              dice = BABYLON.MeshBuilder.CreatePolyhedron("D8",{type:1,size: 0.5,},scene);
              dice.position.x = dice.position.z = 0;
              var dragging = new BABYLON.PointerDragBehavior({dragPlaneNormal:new BABYLON.Vector3(0,1,0)});
              dice.addBehavior(dragging);
              meshList.push(dice);
              break;
            case "D10":
              dice = BABYLON.MeshBuilder.CreatePolyhedron("D10",{type:11,size: 0.8},scene);
              dice.position.x = dice.position.z = 0;
              var dragging = new BABYLON.PointerDragBehavior({dragPlaneNormal:new BABYLON.Vector3(0,1,0)});
              dice.addBehavior(dragging);
              meshList.push(dice);
              break;
            case "D12":
              dice = BABYLON.MeshBuilder.CreatePolyhedron("D12",{type:2,size: 0.5},scene);
              dice.position.x = dice.position.z = 0;
              var dragging = new BABYLON.PointerDragBehavior({dragPlaneNormal:new BABYLON.Vector3(0,1,0)});
              dice.addBehavior(dragging);
              meshList.push(dice);
              break;
            case "D20":
              dice = BABYLON.MeshBuilder.CreatePolyhedron("D20",{type:3,size: 0.5},scene);
              dice.position.x = dice.position.z = 0;
              var dragging = new BABYLON.PointerDragBehavior({dragPlaneNormal:new BABYLON.Vector3(0,1,0)});
              dice.addBehavior(dragging);
              meshList.push(dice);
              break;
          }
        dicePool.length = [];
        diceSize = 0;
      });//dragChecker.drop
    });//dragChecker.dragover
  });//diceBox.dragstart
  }//external for loop

//EOF dice img drag 
  //EOF LEFT SECTION

//---------------------------------------------------------------------------------------------------

//RIGHT SECTION CODE

//EOF RIGHT SECTION

