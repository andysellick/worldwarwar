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
	Bounds: Matter.Bounds,
	render: 0,
	w: 0,
	h: 0,
	enemycount: 0,
	enemyhealth: 10,
	playerhealth: 10,
	enemies: [],
	chosen: 0, //the country chosen by the player
	timer: 0,
	scaleFactor: 1, //global variable of how big to draw everything and where positioned. A value of 1 should draw everything to fit in one screen, 0.5 would be half the screen, etc.
	
	general: {
		init: function(){
			www.general.initCountrySelect();
			//www.general.showPopup('intro'); //FIXME put this back
			www.ctx = www.canvas.getContext('2d');
			www.general.setCanvasSize();
			www.general.createEvents();
						
			www.general.initGame(); //FIXME remove this
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
			document.getElementById('messages').innerHTML = '';			
			www.engine = www.Engine.create(); // create an engine
			www.engine.world.gravity.y = 0; //turn off gravity
			www.engine.world.gravity.x = 0; //turn off gravity - needed for x?

			// create a renderer
			www.render = www.Render.create({
				canvas: www.canvas,
				engine: www.engine,
				options: {
					width: www.w,
					height: www.h,
					background:'#aaaaaa',
					hasBounds: true,
					//wireframes: false,
					showVelocity: true,
					showCollisions: true,
					showAxes: true,
					showAngleIndicator: true,
					showPositions: true,
					showIds: true,
					showShadows: true
				}
			});
			
			/* FIXME need to use the scale to set these bounds. Or do we 
			www.engine.world.bounds.min.x = 100;
			www.engine.world.bounds.min.y = 100;
			www.engine.world.bounds.max.x = 1000;
			www.engine.world.bounds.max.y = 500;
			*/

			www.mycountry = www.general.createPlayer(www.chosen,'player',www.playerhealth);	
			www.general.createEnemies();		
			www.general.drawBoundary();
			www.general.createMatterEvents();			
			
			www.Engine.run(www.engine);	// run the engine			
			www.Render.run(www.render); // run the renderer
			
			www.timer = setInterval(www.general.gameLoop,1000);		//FIXME put this back	
			//www.Bounds.translate(www.render.bounds,{x:-100,y:-200});
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
			var replay2 = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			document.getElementById('playagain2').addEventListener(replay2,function(e){
				www.general.showPopup('intro');
			},false);
			
			//click to fire
			var ondown = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			www.canvas.addEventListener(ondown,function(e){
				www.general.clickDown(e);
			},false);
			
		},
		
		createMatterEvents: function(){		
			www.Events.on(www.engine,'collisionEnd',function(e){
				//www.Body.translate(www.engine.world.bodies,{x:-100,y:10});
				//console.log(www.engine.world.bodies);

				//console.log('Speed',www.mycountry.speed,www.mycountry.angularSpeed);
				//bounds.min is the left/top edge, bounds.max is the right/bottom edge
				//console.log('Min',www.mycountry.bounds.min.x,www.mycountry.bounds.min.y);
				//console.log('Max',www.mycountry.bounds.max.x,www.mycountry.bounds.max.y);
				
				//these are the midpoint positions of the object
				/*
				var avgx = www.mycountry.bounds.min.x + ((www.mycountry.bounds.max.x - www.mycountry.bounds.min.x) / 2);
				var avgy = www.mycountry.bounds.min.y + ((www.mycountry.bounds.max.y - www.mycountry.bounds.min.y) / 2);
				console.log('avg',avgx,avgy);
				*/
				
				var diffx = www.mycountry.myxpos - www.mycountry.bounds.min.x;
				var diffy = www.mycountry.myypos - www.mycountry.bounds.min.y;
				www.mycountry.myxpos = www.mycountry.bounds.min.x;
				www.mycountry.myypos = www.mycountry.bounds.min.y;
				
				//www.Body.translate(www.engine.world.bodies,{x:diffx,y:diffy});
				
				//this works
				www.Bounds.translate(www.render.bounds,{x:-diffx,y:-diffy});
				
			});
		
			//on object collision
			www.Events.on(www.engine,'collisionStart',function(e){
				//console.log(www.engine.world.bodies);				
				//console.log(e.pairs[0].bodyA);
				
				var collided = [e.pairs[0].bodyA,e.pairs[0].bodyB];
				var bullets = [];
				var countries = [];
				
				var obj1 = e.pairs[0].bodyA;
				var obj2 = e.pairs[0].bodyB;
				
				/*
					possible scenarios:
						both objects are bullets - do something
						one object is a bullet and one is a country - do something
						both objects are countries
						one object is a country and one is a wall
				*/
				//first sort the two colliding objects
				for(var x = 0; x < collided.length; x++){
					if(collided[x].mytype === 'bullet'){
						bullets.push(collided[x]);
					}
					else if(collided[x].mytype === 'country'){
						countries.push(collided[x]);
					}
				}
				//FIXME need to add in that only cause damage if bullet myorigin is not equal to collision object id
							
				//two bullets
				//FIXME maybe more fun if bullets simply deflect each other?
				if(bullets.length === 2){
					www.World.remove(www.engine.world, bullets[0]);
					www.World.remove(www.engine.world, bullets[1]);
				}
				//one bullet, one country
				else if(bullets.length === 1 && countries.length === 1){
					if(bullets[0].myorigin !== countries[0].id){
						www.general.inflictDamage(countries[0]);
						www.World.remove(www.engine.world, bullets[0]);
					}
				}
				//anything else we don't care about
				else if(bullets.length === 1){
					//console.log(bullets);
					www.World.remove(www.engine.world, bullets[0]);					
				}
			});		
		},
		
		//reduce health and 'kill' a country
		inflictDamage: function(country,x){
			country.myhealth -= 1;
			if(country.myhealth <= 0){			
				if(country.myobjtype === 'enemy'){
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
					var things = '';
					for(var t = 0; t < country.mythings.length - 1; t++){
						things += country.mythings[t] + ', ';
					}
					things += 'and ' + country.mythings[country.mythings.length - 1] + '.';
					
					//update the messages window
					var div = document.createElement('div');
					div.className = 'message';
					var title = document.createElement('p');
					title.className = 'title';
					title.innerHTML = country.myname + ' has been destroyed';
					div.appendChild(title);
					var desc = document.createElement('p');
					desc.className = 'desc';
					desc.innerHTML = solongs[www.general.randomInt(0,solongs.length - 1)] + ' ' + things;
					div.appendChild(desc);
					document.getElementById('messages').insertBefore(div,document.getElementById('messages').firstChild);

					www.World.remove(www.engine.world, country);
					www.enemycount--;
					if(www.enemycount <= 0){
						www.general.gameWon();
					}
				}
				else if(country.myobjtype === 'player'){
					www.general.gameLost();
				}				
			}
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
		
		//FIXME this is pretty ugly
		drawBoundary: function(){
			var walloptions = { isStatic: true };
			var wall1 = {
				x:50,
				y:0,
				w:www.w,
				h:5
			};			
			www.general.drawRectangle(wall1,walloptions);
			var wall2 = {
				x:100,
				y:50,
				w:5,
				h:www.h
			};			
			www.general.drawRectangle(wall2,walloptions);
			var wall3 = {
				x:50,
				y:100,
				w:www.w,
				h:5
			};			
			www.general.drawRectangle(wall3,walloptions);
			var wall4 = {
				x:0,
				y:50,
				w:5,
				h:www.h
			};			
			www.general.drawRectangle(wall4,walloptions);
		},
		
		//draw an object based on the scale value. Remember the x/y creation point of an object represents the middle of where the object will be created
		//pass x and y as percentages of overall canvas, i.e. must be between 0 and 100
		//w and h should be number values unrelated to percentage, but could still be passed as e.g. canvas width / 2
		drawRectangle: function(obj,options){		
			var relw = www.canvas.width * www.scaleFactor;
			var relh = www.canvas.height * www.scaleFactor;
			
			var x = (relw / 100) * obj.x;
			var y = (relh / 100) * obj.y;
			var w = obj.w * www.scaleFactor;
			var h = obj.h * www.scaleFactor;
			
			var newobj = www.Bodies.rectangle(x,y,w,h,options);
			www.World.add(www.engine.world, [newobj]);
			return(newobj);
		},
		
		//create player object
		createPlayer: function(which,type,health){
			var me = allcountries[which];
			var options = {
				render: {
					sprite: {
						texture: spritepath + me.sprite,
						xScale: www.scaleFactor * me.xScale,
						strokeStyle: 'red',
						lineWidth: 3,
						fillStyle: 'green'
					}
				}
			};			
			var thisobj = www.general.drawRectangle(me,options);
			thisobj.myxpos = thisobj.position.x;
			thisobj.myypos = thisobj.position.y;
			thisobj.myname = me.name;
			thisobj.mytype = 'country';
			thisobj.myobjtype = type;
			thisobj.myhealth = health;
			thisobj.mythings = me.unique;
			return(thisobj);
		},
		
		//once the player has been chosen, create the rest of the countries
		createEnemies: function(){
			for(var i = 0; i < allcountries.length; i++){
				if(i !== www.chosen){
					var enemy = www.general.createPlayer(i,'enemy',www.enemyhealth);
					www.enemies.push(enemy);
					//www.World.add(www.engine.world, [enemy]);
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
			
			console.log(www.mycountry);
			var bullet = www.general.createBullet(www.mycountry.position.x,www.mycountry.position.y,www.mycountry.id);			
			www.general.fireBullet(bullet,x,y);
		},
		
		//FIXME might be better to create the bullet outside of the object then apply a specific force to simulate recoil
		createBullet: function(posx,posy,origin){
			var bullet = www.Bodies.circle(posx,posy,www.canvas.width / 200);
			bullet.mytype = 'bullet';
			bullet.myorigin = origin;
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
			for(var e = 0; e < www.enemies.length; e++){
				if(www.enemies[e].myhealth > 0){
					var bullet = www.general.createBullet(www.enemies[e].position.x,www.enemies[e].position.y,www.enemies[e].id);			
					var x = www.general.randomInt(0,www.canvas.width);
					var y = www.general.randomInt(0,www.canvas.height);
					www.general.fireBullet(bullet,x,y);				
				}
			}		
		},
		
		gameWon: function(){
			clearInterval(www.timer);
			www.general.showPopup('gamewon');			
		},
		gameLost: function(){
			clearInterval(www.timer);
			www.general.showPopup('gamelost');			
		},

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

