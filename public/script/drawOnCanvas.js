var stage, layer;

function init(){
  stage = new Konva.Stage({
    container: "gameArea",
    height: 1000,
    width:1440
    });
   layer = new Konva.Layer();


  $("body").on('click',"#spawn", function(){
    var token = new Konva.Circle({
        x: Math.random() *(stage.width()),
        y: Math.random() *(stage.height()),
        radius: 48,
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
    });//onclick EOF
    
  }


  //96px = inch