// RAIN > MATRIX > CUSTOM
with (window){oncontextmenu = function(){return false}; onselectstart = function(){return false}; ondragstart = function(){return false}; onmousedown = function(){return false}; ondblclick = function(){return false}};

var bgr = '205,163,152'; var font_face = 'normal normal normal 100% "archive","courier 10 pitch",monospace';
function Matrix(opts){opts = opts || {}; this.canvID = opts.canvID || 'matrix';
 this.preload(); if (document.getElementById(this.canvID)){
  this.canv = document.getElementById(this.canvID); this.context = this.canv.getContext('2d');
  this.count = opts.count || 10; this.interval = false; this.paused = false;
  this.resize(); this.genStrings(); if (opts.auto) setTimeout(function(){this.init();}.bind(this),100);
 } else { alert('No canvas available!')}
};
//
Matrix.prototype.preload = function(){
 var canv = document.createElement("canvas"); canv.setAttribute('class',this.canvID); canv.setAttribute('id',this.canvID);
 canv.setAttribute('style','position:fixed;width:100vw;height:100vh;z-index:2;cursor:none;')
 document.getElementsByTagName("main")[0].appendChild(canv);
};
//
Matrix.prototype.resize = function(){
 var e = window, a = 'inner'; if (!('innerWidth' in window)){ a = 'client'; e = document.documentElement || document.body;}
 var s = {width:e[a + 'Width'], height:e [a + 'Height']}; this.canv.width = s.width; this.canv.height = s.height;
 this.context.font = font_face; window.onresize = function(){ this.resize();}.bind(this);
};
//
Matrix.prototype.genStrings = function(){
 this.strings = []; for (var i = 0; i < this.count; i++) this.strings.push(this.makeString());
};
//
Matrix.prototype.randletter = function(){
 return String.fromCharCode(65 + Math.round(Math.random()*25));
};
//
Matrix.prototype.makeString = function(){
 var string = {};
 string.x = Math.floor(Math.random()*this.canv.width);
 string.y = Math.floor(Math.random()*this.canv.height) - Math.floor(Math.random()*250);
 string.z = Math.floor(Math.random()*14) + 7; if (Math.random() < 10) string.c = true;
 string.s = Math.floor(Math.random()*10) + 2; return string;
};
//
Matrix.prototype.init = function(){
 if (this.interval) return false; this.paused = false; this.context.font = font_face;
 this.interval = setInterval(function(){
  this.context.fillStyle = 'rgba(0,0,0,0.5)'; this.context.textAlign = 'end'; this.globalAlpha = 0.5;
  this.context.fillRect(0,0,this.canv.width,this.canv.height); this.context.globalAlpha = 0.9;
  //
  for (var i = 0; i < this.count; i++){
   var string = this.strings[i]; if (string.c !== undefined) this.context.fillStyle = 'whitesmoke'; this.context.textAlign = 'end';
   this.context.fillText(this.randletter(), string.x, string.y); this.context.fillStyle = 'lime'; this.context.textAlign = 'end';
   for (var x = 1; x < string.z; x++){this.context.fillText(this.randletter(), string.x, string.y-(x*25));}
   string.y += string.s; if (string.y > this.canv.height + 250) this.strings[i] = this.makeString();
  }
 }.bind(this),100);
};
//
Matrix.prototype.pause = function(){
 if (this.interval) clearInterval(this.interval); this.interval = false; this.paused = true;
};
//
Matrix.prototype.stop = function(){
 if (this.interval){
  clearInterval(this.interval); this.interval - false; this.context.fillStyle = 'rgba(0,0,0,0.0)';
  this.context.fillRect(0, 0, this.canv.width, this.canv.height); this.genStrings();
 }
};
// PLAYm
var matrix = false;
let RUN_0 = function(){matrix = new Matrix({count:49,auto:1});};
let start = function(){if (matrix && !matrix.interval) matrix.init();};
let pause = function(){if (matrix && matrix.interval) matrix.pause();};
// END

self.setTimeout(function(){RUN_0(); document.title = '\u200E'},500);
