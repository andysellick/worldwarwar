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
	Mouse: Matter.Mouse,
	MouseConstraint: Matter.MouseConstraint,
	Bounds: Matter.Bounds,
	Vector: Matter.Vector,
	origx: 0,
	origy: 0, //used to keep track of view position changes
	render: 0,
	w: 0,
	h: 0, //used to set width and height of canvas
	idealw: 1600, 
	idealh: 900, 
	enemycount: 0,
	enemyhealth: 10,
	playerhealth: 10,
	boundswidth: 20, //used to determine the thickness of the walls we build to limit the game
	enemies: [],
	chosen: 0, //the country chosen by the player
	timer: 0,
	scaleFactor: 4, //how big to draw everything. Game should normally be twice width/height of canvas, scale of 0.5 will fit everything in
	debug: 1,
	
	general: {
		init: function(){
			www.general.initCountrySelect();
			if(!www.debug){
				www.general.showPopup('intro');
			}
			www.ctx = www.canvas.getContext('2d');
			www.general.setCanvasSize();
			www.general.createEvents();
						
			if(www.debug){
				www.general.initGame();
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
					background:'#aa0000',
					hasBounds: true,
					showBounds: true,
					wireframes: false,
					//showVelocity: true,
					//showCollisions: true,
					//showAxes: true,
					//showAngleIndicator: true,
					//showPositions: true,
					//showIds: true,
					//showShadows: true
				}
			});
			
			// add mouse control
			www.mouse = www.Mouse.create(www.render.canvas);
			www.mouseConstraint = www.MouseConstraint.create(www.engine, {
				mouse: www.mouse,
				constraint: {
					stiffness: 0.2,
					render: {
						visible: false
					}
				}
			});						
			www.World.add(www.engine.world, www.mouseConstraint);
			www.render.mouse = www.mouse; // keep the mouse in sync with rendering
			// get the centre of the viewport
			www.viewportCentre = {
				x: www.render.options.width * 0.5,
				y: www.render.options.height * 0.5
			};		
			www.general.setWorldSize();
			
			// keep track of current bounds scale (view zoom)
			www.boundsScaleTarget = 1;
			www.boundsScale = {
				x: 1,
				y: 1
			};					
			www.mycountry = www.general.createPlayer(www.chosen,'player',www.playerhealth);			
			www.general.createEnemies();		

			//recentre the canvas onto the player
			var translate = {
				x: www.mycountry.position.x - (www.w / 2),
				y: www.mycountry.position.y - (www.h / 2)
			};			
			//focus on the last country added
			if(www.debug){
				translate = {
					x: www.enemies[www.enemies.length - 1].position.x - (www.w / 2),
					y: www.enemies[www.enemies.length - 1].position.y - (www.h / 2)
				};
			}
			www.Bounds.translate(www.render.bounds, translate);			
	
			www.general.drawBoundary();
			www.general.createMatterEvents();			
			
			www.Engine.run(www.engine);	// run the engine			
			www.Render.run(www.render); // run the renderer
			
			if(!www.debug){
				www.timer = setInterval(www.general.gameLoop,500);
			}
		},
		
		//set up world size and boundaries
		setWorldSize: function(){
			//make the world bounds twice as big as the canvas (render bounds)
			www.worldw = (www.w * www.scaleFactor) * 2;
			www.worldh = (www.h * www.scaleFactor) * 2;
			var minx = (www.w - www.worldw) / 2;
			var miny = (www.h - www.worldh) / 2;
			var maxx = minx + www.worldw;
			var maxy = miny + www.worldh;
			
			//console.log('World size',www.worldw,www.worldh,minx,miny,maxx,maxy);
		
			www.engine.world.bounds.min.x = minx; //-300;
			www.engine.world.bounds.min.y = miny; //-300;
			www.engine.world.bounds.max.x = maxx; //1100;
			www.engine.world.bounds.max.y = maxy; //900;
			//console.log('World bounds are',www.engine.world.bounds);
		},
		
		randomInt: function(min,max){
			return Math.floor(Math.random()*(max-min+1)+min);
		},
		
		//set size of canvas
		setCanvasSize: function(){
			console.log('setting canvas size');
			var targetw = www.parentel.offsetWidth;
			var targeth = www.parentel.offsetHeight;
			//account for padding within the parent element
			var computedStyle = getComputedStyle(www.parentel);
			targetw -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
			targeth -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
			var sizes = www.general.calculateAspectRatio(www.idealw,www.idealh,targetw,targeth);
			
			www.w = www.canvas.width = sizes[0];
			www.h = www.canvas.height = sizes[1];
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
/*	
		//jquery's addClass without jquery
		addClass: function(el,className){
			if(el.classList){
				el.classList.add(className);
			}
			else {
				el.className += ' ' + className;
			}
		},
*/	
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
			//we could use matter's built in mouse click stuff for this but it only works within the canvas, we want it outside as well
			var ondown = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			document.getElementById('canvasparent').addEventListener(ondown,function(e){ //FIXME using the canvas parent for this click event, so making our own canvas isn't necessary now
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
			});
		
			//on object collision
			www.Events.on(www.engine,'collisionStart',function(e){
				var collided = [e.pairs[0].bodyA,e.pairs[0].bodyB];
				var bullets = [];
				var countries = [];
				
				var obj1 = e.pairs[0].bodyA;
				var obj2 = e.pairs[0].bodyB;
				/*
					scenarios of interest:
						both objects are bullets - do something
						one object is a bullet and one is a country - do something
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
				//two bullets
				//FIXME maybe more fun if bullets simply deflect each other?
				if(bullets.length === 2){
					www.World.remove(www.engine.world, bullets[0]);
					www.World.remove(www.engine.world, bullets[1]);
				}
				//one bullet, one country
				else if(bullets.length === 1 && countries.length === 1){
					//if the bullet did not originate from this country, inflict damage
					if(bullets[0].myorigin !== countries[0].id){
						www.general.inflictDamage(countries[0]);
						www.World.remove(www.engine.world, bullets[0]);
					}
					//otherwise, this bullet just came from this country, so disable the collision
					else {
						e.pairs[0].isActive = false;
					}
				}
				//this is a bullet has hit a wall, just remove the bullet
				else if(bullets.length === 1){
					www.World.remove(www.engine.world, bullets[0]);					
				}
			});	
			
			/* https://github.com/liabru/matter-js/blob/master/examples/views.js */
			// use the engine tick event to control our view
			www.Events.on(www.engine, 'beforeTick', function(e) {
				var translate;
				// mouse wheel controls zoom
				var scaleFactor = www.mouse.wheelDelta * -0.1;
				if (scaleFactor !== 0) {
					if ((scaleFactor < 0 && www.boundsScale.x >= 0.6) || (scaleFactor > 0 && www.boundsScale.x <= 1.4)) { //these two numbers control the min and max zoom levels
						www.boundsScaleTarget += scaleFactor;
					}
				}	

				// if scale has changed
				if (Math.abs(www.boundsScale.x - www.boundsScaleTarget) > 0.01) {
					// smoothly tween scale factor
					scaleFactor = (www.boundsScaleTarget - www.boundsScale.x) * 0.2;
					www.boundsScale.x += scaleFactor;
					www.boundsScale.y += scaleFactor;

					// scale the render bounds
					www.render.bounds.max.x = www.render.bounds.min.x + www.render.options.width * www.boundsScale.x;
					www.render.bounds.max.y = www.render.bounds.min.y + www.render.options.height * www.boundsScale.y;

					// translate so zoom is from centre of view
					translate = {
						x: www.render.options.width * scaleFactor * -0.5,
						y: www.render.options.height * scaleFactor * -0.5
					};

					www.Bounds.translate(www.render.bounds, translate);

					// update mouse
					www.Mouse.setScale(www.mouse, www.boundsScale);
					www.Mouse.setOffset(www.mouse, www.render.bounds.min);
				}				
				
				//reposition the screen to keep the player centered
				var diffx = www.mycountry.myxpos - www.mycountry.position.x;
				var diffy = www.mycountry.myypos - www.mycountry.position.y;
				www.mycountry.myxpos = www.mycountry.position.x;
				www.mycountry.myypos = www.mycountry.position.y;								
				www.origx += diffx;
				www.origy += diffy;
				
				/*
				var diffx = www.mycountry.myxpos - www.mycountry.bounds.min.x;
				var diffy = www.mycountry.myypos - www.mycountry.bounds.min.y;
				console.log('Translating:',www.mycountry.myxpos,www.mycountry.bounds.min.x,diffx,diffy);
				www.mycountry.myxpos = www.mycountry.bounds.min.x;
				www.mycountry.myypos = www.mycountry.bounds.min.y;				
				www.origx += diffx;
				www.origy += diffy;
				*/
				//console.log('Ah wait this isnt right the first time',diffx,diffy);
				www.Bounds.translate(www.render.bounds,{x:-diffx,y:-diffy});
			});
			
			/*
			//proper matter way of doing mouse clicks
			www.Events.on(www.mouseConstraint, 'mousedown', function(e) {
				if(www.mouseConstraint.mouse.button === 0){
					//console.log(e.mouse);
					//var mousePosition = e.mouse.position;
					//console.log('clicked',mousePosition);
					www.general.clickDown(e.mouse.position);
				}
			});
			*/
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
						'Who needs',
						'Take a hike,'
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
		
		//FIXME this is pretty ugly
		drawBoundary: function(){
			var walloptions = { isStatic: true };
			//top edge
			var wall1 = {
				x:www.engine.world.bounds.min.x + (www.worldw / 2),
				y:www.engine.world.bounds.min.y, 
				w:www.worldw,
				h:www.boundswidth
			};
			//right edge
			var wall2 = {
				x:www.engine.world.bounds.max.x,
				y:www.engine.world.bounds.min.y + (www.worldh / 2),
				w:www.boundswidth,
				h:www.worldh
			};		
			//bottom edge
			var wall3 = {
				x:www.engine.world.bounds.min.x + (www.worldw / 2),
				y:www.engine.world.bounds.max.y,
				w:www.worldw,
				h:www.boundswidth
			};			
			//left edge
			var wall4 = {
				x:www.engine.world.bounds.min.x,
				y:www.engine.world.bounds.min.y + (www.worldh / 2),
				w:www.boundswidth,
				h:www.worldh
			};			
			var topwall = www.Bodies.rectangle(wall1.x,wall1.y,wall1.w,wall1.h,walloptions);				
			var rightwall = www.Bodies.rectangle(wall2.x,wall2.y,wall2.w,wall2.h,walloptions);
			var bottomwall = www.Bodies.rectangle(wall3.x,wall3.y,wall3.w,wall3.h,walloptions);
			var leftwall = www.Bodies.rectangle(wall4.x,wall4.y,wall4.w,wall4.h,walloptions);
			www.World.add(www.engine.world, [topwall,rightwall,bottomwall,leftwall]);
		},
			
		//create player object
		createPlayer: function(which,type,health){
			var me = allcountries[which];
			var x = www.engine.world.bounds.min.x + ((www.worldw / 100) * me.x);
			var y = www.engine.world.bounds.min.y + ((www.worldh / 100) * me.y);
			var percscalex = (www.worldw / www.idealw) * 100;
			var w = (me.w / 100) * percscalex;
			var options = {
				density: 0.0001,
				friction: 0,
				restitution: 0.8, //how much a collision will cause a bounce, 0 to 1
				frictionAir: 0,
				mass: 0.5,
				//inverseInertia: 1, //don't know what this property does
				render: {
					sprite: {
						texture: spritepath + me.dir + me.sprite,
						//xScale: ((www.scaleFactor * me.xScale) / 100) * percscalex,
						xScale: ((me.xScale) / 100) * percscalex,
						yScale: ((me.xScale) / 100) * percscalex,
						strokeStyle: 'red',
						lineWidth: 3,
						fillStyle: 'green',
					}
				}
			};			
			//most countries fit into a roughly round polygon, but some (e.g. russia) require a specific width and height, set as a rectangle
			var thisobj = www.Bodies.polygon(x,y,7,w,options);
			if(typeof(me.h) !== 'undefined'){
				var h = (me.h / 100) * percscalex;
				thisobj = www.Bodies.rectangle(x,y,w,h,options);
			}
			
			thisobj.myxpos = thisobj.position.x;
			thisobj.myypos = thisobj.position.y;
			thisobj.myname = me.name;
			thisobj.mytype = 'country';
			thisobj.myobjtype = type;
			thisobj.myhealth = health;
			thisobj.mythings = me.unique;

			www.World.add(www.engine.world, [thisobj]);			
			return(thisobj);
		},
		
		//once the player has been chosen, create the rest of the countries
		createEnemies: function(){
			console.log('Found',allcountries.length,'countries. There should be 196.');
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
			//adjust click position based on any translations to the world
			x -= www.origx;
			y -= www.origy;
			
			//console.log(www.mycountry);
			var bullet = www.general.createBullet(www.mycountry.position.x,www.mycountry.position.y,www.mycountry.id);			
			www.general.fireBullet(bullet,x,y,www.mycountry);
		},
		
		createBullet: function(posx,posy,origin){
			var options = {
				density: 0.001,
				friction: 0.1,
				restitution: 1,
				frictionAir: 0,
				mass: 0.05,
			};
			var bullet = www.Bodies.circle(posx,posy,www.canvas.width / 200, options);
			bullet.mytype = 'bullet';
			bullet.myorigin = origin;
			www.World.add(www.engine.world, [bullet]);
			return(bullet);
		},
		
		fireBullet: function(bullet,x,y,origin){			
			/* FIXME this works but the sizing bug happens here */
			
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
			var scaleby = 500; //FIXME weirdly the vector still needs to be massively shrunk still
			//console.log(scaleby);
			myvect.x /= scaleby;
			myvect.y /= scaleby;				
			//console.log('Normalised:',myvect);			
			www.Body.applyForce(bullet, bullet.position, myvect);
			
			//create recoil to move the country, opposite direction to bullet and half the power
			var recoil = {
				x: -(myvect.x / 2),
				y: -(myvect.y / 2)
			};
			www.Body.applyForce(origin, origin.position, recoil);
		},

		//populate the select dropdown on the first screen to hold the list of all available countries
		initCountrySelect: function(){
			var sorted = [];
			for(var c = 0; c < allcountries.length; c++){
				var d = {'name': allcountries[c].name,'value':c};
				sorted.push(d);
			}
			sorted.sort(www.general.sortStuff);
			console.log(sorted);
			for(var o = 0; o < sorted.length; o++){
				var opt = document.createElement('option');
				opt.value = sorted[o].value;
				opt.innerHTML = sorted[o].name;
				document.getElementById('choosecountry').appendChild(opt);				
			}
		},
		
		sortStuff: function(a,b){
			if (a.name < b.name){
				return -1;
			}
			if (a.name > b.name){
				return 1;
			}
			return 0;			
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
		
		gameLoop: function(){
			for(var e = 0; e < www.enemies.length; e++){
				if(www.enemies[e].myhealth > 0){
					if(www.general.randomInt(0,1)){
						var bullet = www.general.createBullet(www.enemies[e].position.x,www.enemies[e].position.y,www.enemies[e].id);			
						var x = www.general.randomInt(0,www.canvas.width);
						var y = www.general.randomInt(0,www.canvas.height);
						www.general.fireBullet(bullet,x,y,www.enemies[e]);				
					}
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
	/*
	var resize;
	window.addEventListener('resize', function(event){
		clearTimeout(resize);
		resize = setTimeout(www.general.setCanvasSize,500);
	});
	*/
};

