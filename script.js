var scale = 1;
var phase = 100;
var W;
var H;

const t_rate = .02;
var t = 0;

const fps = 30;
var fpsInterval, startTime, now, then, elapsed;

const enable_interaction = true;
var get_mouse_pos = false;
var get_touch_pos = false;

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');


var dwitter_mode = true;

if (dwitter_mode) {
    function S(x){return Math.sin(x)}
    function C(x){return Math.cos(x)}
    function T(x){return Math.tan(x)}
    function R(r,g,b,a){return `rgba(${r},${g},${b},${a})`}
    var c = canvas;
    var x = ctx;
}

function DwitterCode(t,w,h,phase) {
    for(i=0;i<229;i++){k=(2e3+99*C(t*i/phase))*.992**i;x.lineTo(w/2+scale*k*S(b=i*Math.PI/3),h/2+scale*k*C(b))}x.fill('evenodd')
}


startAnimating(fps);


function draw() {

    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    scale = W/1920;
    
    ctx.fillStyle = 'rgba(255,255,255,1)';
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = 'rgba(0,0,0,1)';

    DwitterCode(t, W, H, phase);

    t += t_rate;
    
}


function startAnimating(fps) {
    
    fpsInterval = 1000/fps;
    then = window.performance.now();
    startTime = then;
    
    animate();
 }
 
 function animate(newtime) {
    
    
     requestAnimationFrame(animate);
 
     now = newtime;
     elapsed = now - then;
 
     if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
     
        draw();

     }


    if(enable_interaction) {
        canvas.addEventListener('mousedown', e => {
            get_mouse_pos = true;
            getMousePosition(canvas, e)
            phase = 10;
        });
            
        canvas.addEventListener('mouseup', e => {
            get_mouse_pos = false;
            phase = 100;
        });
        
        canvas.addEventListener('mousemove', function(e) {
            if(get_mouse_pos) {
                getMousePosition(canvas, e)
            }
        })
        
        canvas.addEventListener('touchstart', function(e) {
            getTouchPosition(canvas,e);
            e.preventDefault();
            phase = 10;

        }, false);
            
        canvas.addEventListener('touchend', function(e) {
            phase = 100;
        }, false);
            
        canvas.addEventListener('touchmove', function(e) {
            getTouchPosition(canvas,e);
            e.preventDefault();
        }, false);
    }
  
 }
 

function getMousePosition(canvas, event) {
    interaction(canvas,event)
}

function getTouchPosition(canvas, event) {
    var event = event.touches[0];
    interaction(canvas,event)
}


function interaction(canvas, event) {

    mouse_x = event.clientX/canvas.width;
    mouse_y = event.clientY/canvas.height;

    x_center = mouse_x - 0.5;
    y_center = mouse_y - 0.5;

    mouse_r = Math.sqrt(x_center**2 + y_center**2)
    mouse_a = Math.atan2(y_center,x_center);

    phase = 100 - 90*(1 - Math.min(1,mouse_r));

}