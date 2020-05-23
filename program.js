var Processingjs=function(processing){ with (processing){
size(400, 400); 
frameRate(30);
  //APCSP Create Task code made using Processing.js
  textSize(24);//font size
  var linewidth=1;
  var textcolor=color(0, 0, 0);
  var buttoncolor=color(200,200,200);
  var input="";
  var buttons=[["1", "2", "3", "÷"],
              ["4", "5", "6", "×"],
              ["7", "8", "9", "-"],
              ["0", ".", "=", "+"]];
  var Width=(width-linewidth)/buttons.length, //width of each box
      Height=(height-linewidth)/(buttons[0].length+1); //height of each box

  var evaluate=function(expression){
      var answer=NaN;
      answer=expression.replace(/÷/g,"/");//replace division signs
      answer=expression.replace(/×/g,"*");//replace multiplication signs
      answer=expression.replace(/[^0-9.\/\*-+]/g,"");//remove everything not on calculator
      println(eval(answer));
      return eval(answer);
  };
  var updateInput = function(buttony, buttonx, buttonPressed){
      var buttonPressed=buttons[buttony][buttonx];
      var previousNum=input[input.length-1];//number before buttonPressed
      if(buttonPressed==="="){//if clicked equals
          input=evaluate(input);
      }else if((buttonPressed==="÷"||buttonPressed==="×"||buttonPressed==="-"||buttonPressed==="+"||buttonPressed===".")&&(previousNum==="÷"||previousNum==="×"||previousNum==="-"||previousNum==="+")){//dont allow two functions in a row
          //do nothing
      }else{//if a valid number or function was pressed
          input+=buttonPressed;

      }
      fill(textcolor);
  };
  var button=function(x, y, w, h, txt){
      fill(buttoncolor);
      rect(x, y, w, h);
      fill(textcolor);
      textAlign(CENTER, CENTER);//center characters
      text(txt, x+(Width/2), y+(Height/2));//draw characters in buttons[][], centered
      mouseClicked=function(){//executes when the mouse is clicked
          if(mouseX>=0&&mouseY>=Height && mouseX<=width&&height){//if clicked any button
              updateInput(floor(mouseY/Height)-1,floor(mouseX/Width),buttons[floor(mouseY/Height)-1][floor(mouseX/Width)]);
              //clicked button index y and x, rounded with floor() 
          }
          /*if(mouseX>=x&&mouseY>=y && mouseX<=x+Width&&mouseY<=y+Height){
          input += " " + txt;
          println(input);
          }*/
      };
      keyPressed=function(){
          updateInput(floor(mouseY/Height)-1,floor(mouseX/Width),key);
      };

  };
  var initButtons=function(X, Y){
      for(var iy=0;iy<4;iy++){//collumns
          for(var ix=0;ix<4;ix++){//rows
              //println(x+","+y);
              button(X+(Width*ix), Y+(Height*iy), Width, Height, buttons[iy][ix]);
          }
      }
  };
  var draw = function() {//Processing.js executes draw() every frame
      background(225,225,225);
      strokeWeight(linewidth);
      initButtons(0, Height);//draw buttons
      textAlign(LEFT, CENTER);//alignment=left, center
      text(input, 0, Height/2);
  };
}};
