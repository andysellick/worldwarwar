/* globals Matter, www, Deferred */

var loaders = [];
var imgpath = 'static/img/';
var imageloadprogress = 0;
var imageloadtotal = 0;

var allimages = [
	{
		'name': 'countries',
		'images': ['britain.svg'],
		'dir': ''
	},
];

//preload images
function loadFile(src,array,num){
	var deferred = new Deferred();
	var sprite = new Image();
	sprite.onload = function() {
		array[num] = sprite;
		deferred.resolve();
		imageloadprogress++;
		//document.getElementById('loading').style.width = (imageloadprogress / imageloadtotal) * 100 + '%';
	};
	sprite.src = src;
    return deferred.promise();
}

//loop through and call all the preload images
function callAllPreloads(array,dir){
    for(var z = 0; z < array.length; z++){
        loaders.push(loadFile(dir + array[z], array, z));
    }
}

for(var im = 0; im < allimages.length; im++){
	imageloadtotal += allimages[im].images.length;
	callAllPreloads(allimages[im].images, imgpath + allimages[im].dir + '/');
}

(function( window, undefined ) {
var www = {
	parentel: document.getElementById('canvasparent'),
	canvas: document.getElementById('canvas'),
	ctx: 0,
	Engine: Matter.Engine,
	Render: Matter.Render,
	World: Matter.World,
	Body: Matter.Body,
	Bodies: Matter.Bodies,
	Events: Matter.Events,
	Svg: Matter.Svg,
	w: 0,
	h: 0,
	bullets: [],
	
	general: {
		init: function(){
			console.log(allimages[0].images[0]);
			//set size of canvas
			www.ctx = www.canvas.getContext('2d');
			var targetw = www.parentel.offsetWidth;
			var targeth = www.parentel.offsetHeight;
			var sizes = www.general.calculateAspectRatio(1200,500,targetw,targeth);
			www.w = sizes[0];
			www.h = sizes[1];
			
			// create an engine
			www.engine = www.Engine.create();
			www.engine.world.gravity.y = 0; //turn off gravity

			// create a renderer
			var render = www.Render.create({
				canvas: www.canvas,
				engine: www.engine,
				options: {
					width: www.w,
					height: www.h,
					background:'#aaaaaa',
					wireframes: false
				}
			});

			var ondown = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			www.canvas.addEventListener(ondown,function(e){
				www.general.clickDown(e);
			},false);
		
			//create player object			
			www.mycountry = www.Bodies.rectangle((www.canvas.width / 2), (www.canvas.height / 2), (www.canvas.height / 100) * 10, (www.canvas.height / 100) * 10, {
				render: {
					sprite: {
						texture: '/static/img/britain.svg',
						xScale: 0.09
					}
				}
			});
			www.mycountry.mytype = 'mycountry';
			//console.log('mycountry',www.mycountry.mytype);
			www.World.add(www.engine.world, [www.mycountry]);
			
			
			//test enemies
			var enemy = www.Bodies.rectangle((www.canvas.width / 4), (www.canvas.height / 4), (www.canvas.height / 100) * 10, (www.canvas.height / 100) * 10, {
				render: {
					sprite: {
						texture: '/static/img/ireland.svg',
						xScale: 0.05
					}
				}
			});
			enemy.mytype = 'enemy';
			enemy.myhealth = 10;
			www.World.add(www.engine.world, [enemy]);

			var enemy2 = www.Bodies.rectangle((www.canvas.width / 5), (www.canvas.height / 5), (www.canvas.height / 100) * 10, (www.canvas.height / 100) * 10);
			enemy2.mytype = 'enemy';
			enemy2.myhealth = 10;
			www.World.add(www.engine.world, [enemy2]);
			
			//console.log(www.w,www.h);
			//create the boundary FIXME why do widths and heights need to be doubled??
			var topline = www.Bodies.rectangle(0,0,www.w * 2,5, { isStatic: true });
			var rightline = www.Bodies.rectangle(www.w,0,5,www.h * 2, { isStatic: true });
			var bottomline = www.Bodies.rectangle(0,www.h,www.w * 2,5, { isStatic: true });
			var leftline = www.Bodies.rectangle(0,0,5,www.h * 2, { isStatic: true });
			www.World.add(www.engine.world, [topline,rightline,bottomline,leftline]);

			// run the engine
			www.Engine.run(www.engine);	

			// run the renderer
			www.Render.run(render);
			//www.general.gameLoop();
			
			www.Events.on(www.engine,'collisionStart',function(e){
				//console.log(e.pairs[0].bodyA);
				var collided = [e.pairs[0].bodyA,e.pairs[0].bodyB];
				
				if(e.pairs[0].bodyA.mytype !== 'mycountry' && e.pairs[0].bodyB.mytype !== 'mycountry'){
					for(var x = 0; x < collided.length; x++){
						//if object is a bullet, remove it
						if(collided[x].mytype === 'bullet'){
							www.World.remove(www.engine.world, collided[x]);
						}
						else if(collided[x].mytype === 'enemy'){
							collided[x].myhealth -= 1;
							if(collided[x].myhealth <= 0){
								www.World.remove(www.engine.world, collided[x]);
							}
						}
					}
				}
				
			});
		},
		//given a width and height representing an aspect ratio, and the size of the containing thing, return the largest w and h matching that aspect ratio
		calculateAspectRatio: function(idealw,idealh,parentw,parenth){
			var aspect = Math.floor((parenth / idealh) * idealw);
			var cwidth = Math.min(idealw, parentw);
			var cheight = Math.min(idealh, parenth);
			var w = Math.min(parentw,aspect);
			var h = (w / idealw) * idealh;
			return([w,h]);
		},	
	
		//click to fire
		//FIXME bug here - the larger the screen, the lower the speed of the bullet. On small screens bullet is so fast as to be invisible
		clickDown: function(e){
			var rect = www.canvas.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;
			if(typeof e.changedTouches !== 'undefined'){
				x = e.changedTouches[0].pageX - rect.left;
				y = e.changedTouches[0].pageY - rect.top;
			}
			//console.log(x,y);
			//var bullet = www.Bodies.fromVertices(www.mycountry.position.x,www.mycountry.position.y, [Matter.Vector.create(0,0),Matter.Vector.create(20,0),Matter.Vector.create(10,10),Matter.Vector.create(0,10)]);
			
			var bullet = www.Bodies.circle(www.mycountry.position.x,www.mycountry.position.y,www.canvas.width / 200);
			bullet.mytype = 'bullet';
			www.World.add(www.engine.world, [bullet]);		
/*
			var dirx = x - www.mycountry.position.x;
			var diry = y - www.mycountry.position.y;
			
			dirx = Math.max(-1,Math.min(1,dirx));
			diry = Math.max(-1,Math.min(1,diry));
			
			dirx += www.mycountry.position.x;
			diry += www.mycountry.position.y;
			
			
			console.log('x',dirx,www.mycountry.position.x);
			console.log('y',diry,www.mycountry.position.y);

			var myvect = {
				x: dirx - www.mycountry.position.x,
				y: diry - www.mycountry.position.y
			};
*/			
			
			var myvect = {
				x: x - bullet.position.x,
				y: y - bullet.position.y
			};
			
			//console.log('Not normalised:',myvect);
			//normalise the vector, http://stackoverflow.com/questions/3592040/javascript-function-that-works-like-actionscripts-normalize1
			
			var len = Math.sqrt(myvect.x * myvect.x + myvect.y * myvect.y);
			myvect.x /= len;
			myvect.y /= len;	
			
			
			//need something like 800 for small screens, more like 100 for large			
			var scaleby = 200; //weirdly the vector still needs to be massively shrunk still
			//console.log(scaleby);
			myvect.x /= scaleby;
			myvect.y /= scaleby;			
			
			//console.log('Normalised:',myvect);
			
			www.Body.applyForce(bullet, bullet.position, myvect);
		},
			
		//this approach doesn't seem to be working
		gameLoop: function(){
			//console.log('loop');
			window.requestAnimationFrame(www.general.gameLoop);
			//www.Engine.update(www.engine,1000);
		}
	
	}
};
window.www = www;
})(window);

window.onload = function(){
	Deferred.when(loaders).then(
    	function(){
			www.general.init();
		    //js.general.addClass(document.getElementById('loading'),'fadeout');
		}
    );	
	
	var resize;
	window.addEventListener('resize', function(event){
		clearTimeout(resize);
		resize = setTimeout(0,200);
	});
};

