try {
  let canvas = document.querySelector(".candraw");
  let ctx = canvas.getContext('2d');
  let rectbtn = document.getElementById("rect");
  let circ = document.getElementById("circle");
  let tri = document.getElementById("tri");
  let brush = document.getElementById("Brush");
  let erase = document.getElementById("Eraser");
  let colorPicker = document.getElementById("colorPicker");
  let colorOptions = document.querySelectorAll('.circle');
  let clearBtn = document.getElementById("clear-canva");
  
  let shape = '';
  let isDrawing = false;
  let tool = '';



  colorOptions.forEach(colorBtn => {
    colorBtn.addEventListener('click', () => {
      
      
      currentColor = colorBtn.dataset.color;
      ctx.strokeStyle = currentColor;
      ctx.fillStyle = currentColor;
    });
  });

  // for creating rectangle
  rectbtn.addEventListener("click" , ()=>{
    shape = 'rectangle';
    canvas.addEventListener("mousedown", StartDrawing );
    canvas.addEventListener("mouseup" , stopDrawing);
  });

  //c ode for creating circle
  circ.addEventListener('click' , ()=>{
    shape = 'circle';
    canvas.addEventListener("mousedown", StartDrawing );
      canvas.addEventListener("mouseup" , stopDrawing);
  });

  // code for creating triangle
  tri.addEventListener('click' , ()=>{
    shape = 'triangle';
     canvas.addEventListener("mousedown", StartDrawing );
    canvas.addEventListener("mouseup" , stopDrawing);
  });

  // startDrawing function
  function StartDrawing(e){
    let StartX = e.offsetX;
    let startY = e.offsetY;

    //
    ctx.beginPath();
    if(shape === 'rectangle'){
      ctx.rect(StartX , startY, 120 , 100);
    }else if(shape === 'circle'){
      let radius = 25;
      ctx.arc(StartX, startY,radius,0,2*Math.PI);
    }else if(shape==='triangle'){
        drawTriangle(StartX , startY);
    };
    
    ctx.stroke();
    
  }
// for triangle
  function drawTriangle(StartX , startY){
    ctx.moveTo(StartX, startY);
    ctx.lineTo(StartX+50, startY+100);
    ctx.lineTo(StartX-50, startY+100);
    ctx.closePath();
  }

  //code for stopdrwaing drawing canvas
  function stopDrawing(e) {
    isDrawing = false;
    canvas.removeEventListener('mousedown', stopDrawing);
    canvas.removeEventListener('mouseup', stopDrawing);
  }

  
  // event listner on brush
  
  brush.addEventListener('click' , ()=>{
      tool = 'Brush';
      shape = '';
      canvas.addEventListener("mousedown", Startbrush );
      canvas.addEventListener("mouseup" , stopbrush);
      canvas.addEventListener('mousemove', drawbrush);

  })

  function Startbrush(e){
    isDrawing = true;
    ctx.beginPath();
    ctx.moveTo(e.offsetX, e.offsetY);
  }

  function drawbrush(e){
    if(!isDrawing) return;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  }

  function stopbrush(){
    isDrawing = false;
    ctx.closePath();
  }

  let isErazing = false;


  erase.addEventListener("click", () => {
    tool = "Eraser";
    isErazing = true;
    canvas.addEventListener("mousemove", erasedrawing);
});

function erasedrawing(e) {
  if (tool === "Eraser") {
    ctx.clearRect(e.offsetX - 50, e.offsetY - 50, 100, 100); 
}
}

// code for clear button
  clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  // generate random color on canvas
  function generateRandomColor() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return `rgb(${red}, ${green}, ${blue})`;
}

  colorPicker.addEventListener('input', function() {
    const randomColor = generateRandomColor();
    canvas.style.backgroundColor = randomColor;
});
 
 
} catch (error) {
   console.log(error);
}
