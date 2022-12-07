
//MAIN SECTION CODE
var token;
const canvas = document.getElementById("gameArea"); // Get the canvas element
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
const createScene = function () {
    const scene = new BABYLON.Scene(engine);
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 25, 0), scene);
    //camera.inputs.clear();

    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(canvas, true);

    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 1), scene);
    light.intensity = 0.5;

    var ground = BABYLON.MeshBuilder.CreateGround("tableTop",{
      width:1920,
      height:1080,
      subdivisions:10
    },scene);
    ground.position.y = -10;




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
      token = BABYLON.MeshBuilder.CreateCylinder("token", {
        diameter: 1,
        height: .05,
        faceUV:faceUv,
        faceColors: faceCol
    
      }, scene);
      token.position.x = Math.random() * 10;
      token.position.z = Math.random() *10;
      token.material = mat;
      //draggin token logic
      var dragTokenX = new BABYLON.PointerDragBehavior();
      dragTokenX.useObjectOrientationForDragging = false;
      dragTokenX.onDragStartObservable.add(()=>{console.log("dragStart");})
      dragTokenX.onDragObservable.add(()=>{console.log("Y:"+token.position.y);})
      dragTokenX.onDragEndObservable.add(()=>{token.position.y = 1;})
      token.addBehavior(dragTokenX);
      
    });


      



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
/*$("#left-section").on("click",'#spawn',function () {
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
  token = BABYLON.MeshBuilder.CreateCylinder("token", {
    diameter: 1,
    height: .05,
    faceUV:faceUv,
    faceColors: faceCol

  }, scene);
  token.position.x = Math.random() * 10;
  token.position.z = Math.random() *10;
  token.material = mat;
  
});*/
//cylinder faces
//0 == bottom
//1 == side
//2 == top

//for grid toggle, set grid.y ~~ 5
//EOF LEFT SECTION

//---------------------------------------------------------------------------------------------------

//RIGHT SECTION CODE

//EOF RIGHT SECTION

