/* globals Matter, www, Deferred, allcountries, spritepath */

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
	render: 0,
	w: 0,
	h: 0,
	enemycount: 0,
	enemies: [],
	chosen: 0, //the country chosen by the player
	timer: 0,
	
	general: {
		init: function(){
			www.general.initCountrySelect();
			www.general.showPopup('intro');
			www.ctx = www.canvas.getContext('2d');
			www.general.setCanvasSize();
			www.general.createEvents();
			//www.general.initGame();
		},
		
		initCountrySelect: function(){
			for(var c = 0; c < allcountries.length; c++){
				var opt = document.createElement('option');
				opt.value = c;
				opt.innerHTML = allcountries[c].name;
				document.getElementById('choosecountry').appendChild(opt);				
			}
		},
		
		initGame: function(){
			www.enemies = [];
			clearInterval(www.timer);
			document.getElementById('messages').innerHTML = '';
			// create an engine
			www.engine = www.Engine.create();
			www.engine.world.gravity.y = 0; //turn off gravity

			// create a renderer
			www.render = www.Render.create({
				canvas: www.canvas,
				engine: www.engine,
				options: {
					width: www.w,
					height: www.h,
					background:'#aaaaaa',
					wireframes: false,
					showVelocity: true,
					showCollisions: true,
					showAxes: true,
					showAngleIndicator: true,
					showPositions: true,
					showIds: true,
					showShadows: true
				}
			});

			www.mycountry = www.general.createPlayer(www.chosen,'mycountry');			
			www.World.add(www.engine.world, [www.mycountry]);
			//allcountries.splice(www.chosen,1);
						
			www.general.createEnemies();
			
			//console.log(www.w,www.h);
			//create the boundary FIXME why do widths and heights need to be doubled??
			var topline = www.Bodies.rectangle(0,-5,www.w * 2,5, { isStatic: true });
			var rightline = www.Bodies.rectangle(www.w + 5,0,5,www.h * 2, { isStatic: true });
			var bottomline = www.Bodies.rectangle(0,www.h + 5,www.w * 2,5, { isStatic: true });
			var leftline = www.Bodies.rectangle(-5,0,5,www.h * 2, { isStatic: true });
			www.World.add(www.engine.world, [topline,rightline,bottomline,leftline]);

			www.general.createMatterEvents();
			
			// run the engine
			www.Engine.run(www.engine);	

			// run the renderer
			www.Render.run(www.render);
			
			www.timer = setInterval(www.general.gameLoop,1000);
		},
		
		showPopup: function(whichone){
			www.general.hideAllPopups();
			document.getElementById(whichone).dataset.shown = 'true';
		},
		
		hideAllPopups: function(){
			var popups = document.getElementsByClassName('popup');
			for(var p = 0; p < popups.length; p++){
				popups[p].dataset.shown = 'false';
			}
		},
		
		createEvents: function(){
			//start the game by choosing a country
			var beginning = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			document.getElementById('startgame').addEventListener(beginning,function(e){
				var dd = document.getElementById('choosecountry');
				www.chosen = parseInt(dd.options[dd.selectedIndex].value);
				www.general.initGame();
				www.general.hideAllPopups();
			},false);
			
			//game over, restart			
			var replay = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			document.getElementById('playagain').addEventListener(replay,function(e){
				www.general.showPopup('intro');
			},false);
			
			//click to fire
			var ondown = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			www.canvas.addEventListener(ondown,function(e){
				www.general.clickDown(e);
			},false);
			
		},
		
		createMatterEvents: function(){		
			//on object collision
			www.Events.on(www.engine,'collisionStart',function(e){
				//console.log(www.engine.world.bodies);
				
				//console.log(e.pairs[0].bodyA);
				var collided = [e.pairs[0].bodyA,e.pairs[0].bodyB];
				var solongs = [
					'Say goodbye to',
					'No more',
					'The world is better off without',
					'So long,',
					'We can live without',
					'Good riddance to',
					'We don\'t need',
					'Who needs'
				];
				
				//FIXME this needs rewriting now other countries fire as well
				if(e.pairs[0].bodyA.mytype !== 'mycountry' && e.pairs[0].bodyB.mytype !== 'mycountry'){
					for(var x = 0; x < collided.length; x++){
						//if object is a bullet, remove it
						if(collided[x].mytype === 'bullet'){
							www.World.remove(www.engine.world, collided[x]);
						}
						else if(collided[x].mytype === 'enemy'){
							collided[x].myhealth -= 1;
							if(collided[x].myhealth <= 0){
								var things = '';
								for(var t = 0; t < collided[x].mythings.length - 1; t++){
									things += collided[x].mythings[t] + ', ';
								}
								things += 'and ' + collided[x].mythings[collided[x].mythings.length - 1] + '.';
								
								//update the messages window
								var div = document.createElement('div');
								div.className = 'message';
								var title = document.createElement('p');
								title.className = 'title';
								title.innerHTML = 'You destroyed ' + collided[x].myname + '!';
								div.appendChild(title);
								var desc = document.createElement('p');
								desc.className = 'desc';
								desc.innerHTML = solongs[www.general.randomInt(0,solongs.length - 1)] + ' ' + things;
								div.appendChild(desc);
								document.getElementById('messages').insertBefore(div,document.getElementById('messages').firstChild);
								www.World.remove(www.engine.world, collided[x]);
								www.enemies.splice(x,1);
								www.enemycount--;
								if(www.enemycount <= 0){
									www.general.gameOver();
								}
							}
						}
					}
				}
			});		
		},
		
		randomInt: function(min,max){
			return Math.floor(Math.random()*(max-min+1)+min);
		},
		
		//set size of canvas
		setCanvasSize: function(){
			var targetw = www.parentel.offsetWidth;
			var targeth = www.parentel.offsetHeight;
			var sizes = www.general.calculateAspectRatio(1200,500,targetw,targeth);
			www.canvas.width = sizes[0];
			www.canvas.height = sizes[1];
			www.w = sizes[0];
			www.h = sizes[1];
			if(www.render){
				www.render.options.width = sizes[0];
				www.render.options.height = sizes[0];
				//fixme this works when the screen resizes - unfortunately we also need to rescale and reposition all the objects in the canvas as well. Does matter.js have a function for doing this automatically?
			}
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
		
		//create player object
		createPlayer: function(which,type){
			var me = allcountries[which];
			var xpos = (www.canvas.width / 100) * me.x;
			var ypos = (www.canvas.height / 100) * me.y;
			var w = (www.canvas.width / 100) * me.w;
			var h = (www.canvas.height / 100) * me.h; //fixme object size as a percentage means if the canvas aspect ratio changes then so do the objects
			//me.sprite.style.fill = 'yellow';
			
			var sprite = spritepath + me.sprite;
			
			var thisobj = www.Bodies.rectangle(xpos, ypos, w, h, {
				render: {
					sprite: {
						texture: sprite,
						xScale: me.xScale,
						strokeStyle: 'red',
						lineWidth: 3,
						fillStyle: 'green'
					}
				}
			});
			thisobj.myname = me.name;
			thisobj.mytype = type;
			thisobj.myhealth = 10;
			thisobj.mythings = me.unique;
			return(thisobj);
		},
		
		//once the player has been chosen, create the rest of the countries
		createEnemies: function(){
			for(var i = 0; i < allcountries.length; i++){
				if(i !== www.chosen){
					var enemy = www.general.createPlayer(i,'enemy');
					www.enemies.push(enemy); 
					www.World.add(www.engine.world, [enemy]);
					www.enemycount++;
				}
			}
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
			
			var bullet = www.general.createBullet(www.mycountry.position.x,www.mycountry.position.y);			
			www.general.fireBullet(bullet,x,y);
		},
		
		createBullet: function(posx,posy){
			var bullet = www.Bodies.circle(posx,posy,www.canvas.width / 200);
			bullet.mytype = 'bullet';
			www.World.add(www.engine.world, [bullet]);
			return(bullet);
		},
		
		fireBullet: function(bullet,x,y){			
			/* this works but the sizing bug happens here */
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

			/* okay, new approach, incomplete, so far doesn't work. Idea was to turn vectors into percentages
			var percx = (x / www.canvas.width) * 100;
			var percy = (y / www.canvas.height) * 100;
			
			var percbx = (bullet.position.x / www.canvas.width) * 100;
			var percby = (bullet.position.y / www.canvas.height) * 100;
			
			var myvect = {
				x: percx - percbx,
				y: percy - percby
			};
			//normalise
			var len = Math.sqrt(myvect.x * myvect.x + myvect.y * myvect.y);
			myvect.x /= len;
			myvect.y /= len;	
		
			var scaleby = 200; //weirdly the vector still needs to be massively shrunk still
			//console.log(scaleby);
			myvect.x /= scaleby;
			myvect.y /= scaleby;			

			console.log(myvect);
			www.Body.applyForce(bullet, bullet.position, myvect);
			*/
		},
		
		gameLoop: function(){
			console.log('moo');
			for(var e = 0; e < www.enemies.length; e++){
				var bullet = www.general.createBullet(www.enemies[e].position.x,www.enemies[e].position.y);			
				var x = www.general.randomInt(0,www.canvas.width);
				var y = www.general.randomInt(0,www.canvas.height);
				www.general.fireBullet(bullet,x,y);				
			}
		},
		
		gameOver: function(){
			www.general.showPopup('gamewon');			
		}
	}
};
window.www = www;
})(window);

window.onload = function(){
	www.general.init();
	
	var resize;
	window.addEventListener('resize', function(event){
		clearTimeout(resize);
		resize = setTimeout(www.general.setCanvasSize,200);
	});
};

