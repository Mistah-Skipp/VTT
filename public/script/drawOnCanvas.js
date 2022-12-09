
//MAIN SECTION CODE
var token;
var tokenID = 0;
const canvas = document.getElementById("gameArea"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
var dragging = new BABYLON.PointerDragBehavior({dragPlaneNormal:new BABYLON.Vector3(0,1,0)})
const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 25, 0), scene);
    camera.inputs.clear();

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 1), scene);
    light.intensity = 0.5;

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


    //dragging idea
    //use mouse to get closest mesh and append the dragging behavior rather than
    //adding it per mesh which breaks when a clone is made



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

  var mat = new BABYLON.StandardMaterial("mat", scene);
  var testMat = new BABYLON.Texture("https://i.imgur.com/lXehwjZ.jpg", scene);
  mat.diffuseTexture = testMat;

  var col = 6;
  var row = 1;
  var faceUv = [];
  for( let i= 0; i < 3; i++){
    faceUv[i] = new BABYLON.Vector4(i / col, 0 ,(i+1)/col, 1/row);
  }
  var faceCol = [];
  for( let i= 0; i < 3; i++){
    faceCol[i] = new BABYLON.Color4(255,255,255);
  }
  token = BABYLON.MeshBuilder.CreateCylinder(tokenID, {
    diameter: 1,
    height: .05,
    faceUV:faceUv,
    faceColors: faceCol
  }, scene);
  token.position.x = Math.random() * 10;
  token.position.z = Math.random() *10;
  token.material = mat;
  //draggin token logic
  
  //dragToken.onDragStartObservable
  dragging.onDragObservable.add()
  dragging.onDragEndObservable.add(()=>{console.log(token.id);})
  token.addBehavior(dragging);
  
  //TOKEN DELETE 
//https://doc.babylonjs.com/features/featuresDeepDive/events/actions#experimenting-with-actions
  
  
  
  console.log("NUM OF MESHES: "+scene.meshes.length + "||TOKENID: "+tokenID);
  
  
});
tokenID++;
//cylinder faces
//0 == bottom
//1 == side
//2 == top

//for grid toggle, set grid.y ~~ 5

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
              dice.addBehavior(dragging);
              break;
            case "D6":
              dice = BABYLON.MeshBuilder.CreateBox("D6",{},scene);
              dice.position.x = dice.position.z = 0;
              dice.addBehavior(dragging);
              break;
            case "D8":
              dice = BABYLON.MeshBuilder.CreatePolyhedron("D8",{type:1,size: 0.5,},scene);
              dice.position.x = dice.position.z = 0;
              dice.addBehavior(dragging);
              break;
            case "D10":
              dice = BABYLON.MeshBuilder.CreatePolyhedron("D10",{type:11,size: 0.8},scene);
              dice.position.x = dice.position.z = 0;
              dice.addBehavior(dragging);
              break;
            case "D12":
              dice = BABYLON.MeshBuilder.CreatePolyhedron("D12",{type:2,size: 0.5},scene);
              dice.position.x = dice.position.z = 0;
              dice.addBehavior(dragging);
              break;
            case "D20":
              dice = BABYLON.MeshBuilder.CreatePolyhedron("D20",{type:3,size: 0.5},scene);
              dice.position.x = dice.position.z = 0;
              dice.addBehavior(dragging);
              break;
          }
        dicePool.length = [];
        diceSize = 0;
      });//dragChecker.drop
    });//dragChecker.dragover
  });//diceBox.dragstart
  }//external for loop
  //EOF LEFT SECTION

//---------------------------------------------------------------------------------------------------

//RIGHT SECTION CODE

//EOF RIGHT SECTION

