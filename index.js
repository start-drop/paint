var canvas = document.getElementById('mycavs');
var ctx = canvas.getContext('2d');
var key = false;
var arrImg = [];
init();
function init(){
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    var x = canvas.offsetLeft;
    var y = canvas.offsetTop;
    canvas.onmousedown = function(e){
        e = e || window.event;
        key = true;
        var img = ctx.getImageData(0,0,canvas.width,canvas.height);
        arrImg.push(img);
        ctx.moveTo(e.pageX - x,e.pageY - y);
        
        ctx.beginPath();
        canvas.onmousemove = function(e){
            e = e || widonw.event;
            if(key){
                ctx.lineTo(e.pageX - x,e.pageY - y);
                ctx.stroke();   
            }
            
        }
        canvas.onmouseup = function(e){
            ctx.closePath();
            key = false;
        }
    }
    
    listHandle();
}
function listHandle(){
    $('.list').on('click',function(e){
        
        switch(e.target.className){
            case 'clear': 
                ctx.clearRect(0,0,canvas.width,canvas.height) 
                break;
            case 'eraser': 
                ctx.strokeStyle = "#fff";
                break;
            case 'recine': 
                if(arrImg.length > 0)ctx.putImageData(arrImg.pop(),0,0)
                break;
        }
    })
    $('.color').change(function(e){
        ctx.strokeStyle = e.target.value;
    })
    $('.line').change(function(e){
        ctx.lineWidth = $(this).val();
    })
}