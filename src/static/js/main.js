/* globals Matter, www, Deferred, allcountries, spritepath, allimages */

//date shim
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); };
}

/* preload images */
/* we're not actually using these specific objects once created, but the browser should indirectly cache them, apparently */
var loaders = [];
var imageloadprogress = 0;
var imageloadtotal = 0;

function loadFile(src,array,num){
	var deferred = new Deferred();
	var sprite = new Image();
	sprite.onload = function() {
		array[num] = sprite;
		deferred.resolve();
		imageloadprogress++;
		document.getElementById('loadingbar').style.width = (imageloadprogress / imageloadtotal) * 100 + '%';
	};
	sprite.src = src + '.svg';
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
	callAllPreloads(allimages[im].images, spritepath + 'highlight/' + allimages[im].dir + '/');
	callAllPreloads(allimages[im].images, spritepath + 'regular/' + allimages[im].dir + '/');
}

//main code
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
	canvasw: 0,
	canvash: 0, //used to set width and height of canvas
	idealw: 1600, 
	idealh: 900, 
	enemycount: 0,
	enemyhealth: 1,
	enemiesfire: 1,
	firechance: 1, //used to calculate the probability that a country will fire in any given loop of the game
	playerhealth: 10,
	playerhealthorig: 10,
	playerscore: 0,
	boundswidth: 100, //used to determine the thickness of the walls we build to limit the game
	enemies: [],
	bullets: [],
	bulletlife: 1000, //how many milliseconds a bullet should exist for
	chosen: 2000, //the country chosen by the player, starts at 2000 so that when the page first loads we don't draw a country red
	chosenenemy: -1, //the enemy country, only used in some game modes
	timer: 0,
	hascountdown: 0,
	hassplash: 0,
	hasnextlevel: 0,
	midlevel: 0,
	scaleFactor: 1.9,//1.9, //how big to draw everything. 
	mode: 3,
	gamelength: 30000, //if game mode hastimer, number of milliseconds in game
	gameloopspeed: 500, //important that interval divisible by seconds for timer purposes
	bestscores: [
		{'country':'','score':0},
		{'country':'','score':0},
		{'country':'','score':0},
		{'country':'','score':0}
	],
	//enableZoom: 0, //FIXME this is mainly for debug, potentially remove for production
	translated: {x:0,y:0}, //keep a track of any view translations for locating click events
	
	general: {
		//only call this once, during page load
		preGameInit: function(){
			www.general.initCountrySelect();
			www.ctx = www.canvas.getContext('2d');
			www.general.setCanvasSize();
			www.general.createEvents();
		},

		//only call this once, when game has finished loading, world should be visible, so overlay with menu etc.
		init: function(){
			www.general.showPopup('intro');
			//load saved data if found
			var saved = localStorage.getItem('worldwarwar');
			if(saved !== null && saved.length > 0){
				www.bestscores = JSON.parse(saved);
				if(www.bestscores.length < 4){ //check for the old saved value, which only saved 2 scores, not 4
					www.bestscores.push({'country':'','score':0});
					www.bestscores.push({'country':'','score':0});
				}
				www.general.updateScores();
			}
		},
				
		//setup and configure the matter engine
		setupMatter: function(){
			www.engine = www.Engine.create(); // create an engine
			www.engine.world.gravity.y = 0; //turn off gravity
			www.engine.world.gravity.x = 0; //turn off gravity - needed for x?

			// create a renderer
			www.render = www.Render.create({
				canvas: www.canvas,
				engine: www.engine,
				options: {
					width: www.canvasw,
					height: www.canvash,
					background: 'transparent',
					hasBounds: true,
					//showBounds: true,
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
			/*
			if(www.enableZoom){
				// add mouse control FIXME this now conflicts with the limits imposed on viewport repositioning
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
				
				// keep track of current bounds scale (view zoom)
				www.boundsScaleTarget = 1;
				www.boundsScale = {
					x: 1,
					y: 1
				};		
			}
			*/
			www.general.setWorldSize();
			www.general.drawBoundary(); //draw the boundary first, so countries overlap it			
			if(www.chosen !== 2000){ //when the map first loads we're not in a game (www.chosen == 2000), so don't choose a player country
				if(www.chosen === -1){
					www.chosen = www.general.randomInt(0,allcountries.length - 1);
				}
				www.mycountry = www.general.createPlayer(www.chosen,'player',www.playerhealth);			
			
				//if vs or assassinate mode, we need to pick a single adversary
				if(www.mode === 4 || www.mode === 5){
					www.chosenenemy = www.chosen;
					//console.log('Player is:',allcountries[www.chosen].name,'enemy is:',allcountries[www.chosenenemy].name);
					while(www.chosenenemy === www.chosen){
						www.chosenenemy = www.general.randomInt(0,allcountries.length - 1);
					}
				}
			}
			www.general.createEnemies();		
		},
		
		//once the engine and everything is initialised, run matter
		runMatter: function(){
			www.Engine.run(www.engine);	// run the engine			
			www.Render.run(www.render); // run the renderer
		},

		//called before creating the matter engine, fixes the weird pausing and seeing old versions of the game bug
		resetMatter: function(){
			www.World.clear(www.engine.world);
			www.Engine.clear(www.engine);
			www.Render.stop(www.render);
		},
		
		//called when a new game button is pressed, resets stuff to do with the game
		resetGame: function(){
			www.playerscore = 0;
			www.enemycount = 0;
			www.enemies = [];
			www.chosenenemy = -1;
			www.hassplash = 0;
			www.hascountdown = 0;
			www.hasnextlevel = 0;
			www.hastimer = 0;
			document.getElementById('messages').innerHTML = '';			
		},
		
		determineGameSetup: function(chosenmode){
			www.mode = chosenmode;
			document.getElementById('wwwpage').dataset.gamemode = www.mode;
			//setup game attributes according to mode
			if(www.mode === 1){ //sandbox - enemies don't fire and take one hit				
				www.enemyhealth = 2;
				www.enemiesfire = 0;
				www.gamewonmsg = 'The world has finally been destroyed. There, wasn\'t that satisfying?';
				//no healthbar or score
			}
			else if(www.mode === 2){ //normal - enemies fire at a normal rate, have good health, player has better health
				www.playerhealth = 10;
				www.enemyhealth = 5;
				www.enemiesfire = 1;
				www.firechance = 10;
				www.hascountdown = 1;
				www.gamelostmsg = 'Clearly you need to work on your defence budget.';
				www.gamewonmsg = 'Congratulations, your country is finally safe from the threat of strangers!';
			}
			else if(www.mode === 3){ //extreme	- enemies fire at extreme rate, player and enemies have same, low health
				www.playerhealth = 5;
				www.enemyhealth = 5;
				www.enemiesfire = 1;
				www.firechance = 3;
				www.hascountdown = 1;
				www.gamelostmsg = 'Clearly you need to work on your defence budget.';
				www.gamewonmsg = 'Congratulations, your country is finally safe from the threat of strangers!';
			}
			else if(www.mode === 4){ //versus - only the one enemy fires, they and player have same health, all other countries have 1 health
				www.playerhealth = 5;
				www.enemyhealth = 5;
				www.enemiesfire = 1;
				www.firechance = 1;
				www.hascountdown = 1;		
				www.hassplash = 1;
				www.hasnextlevel = 1;
				www.gamelostmsg = 'You were defeated! Better try harder next time.';
				www.gamewonmsg = 'You won! You\'re clearly much better than that other country.';
				//no country count, no score
			}
			else if(www.mode === 5){ //assassinate - enemies don't fire, take one hit
				www.playerhealth = 5;
				www.enemyhealth = 1;
				www.enemiesfire = 0;
				www.hascountdown = 1;
				www.hassplash = 1;
				www.hasnextlevel = 1;
				www.hastimer = 1;
				www.gamelostmsg = 'You failed to destroy your target. Better try harder next time.';
				www.gamewonmsg = 'You successfully assassinated your target. Well done.';
				//no healthbar, score or country count
			}
			www.playerhealthorig = www.playerhealth;
		},
		
		//setup and start the game
		initGame: function(chosenmode){
			www.general.resetMatter();
			www.counttime = www.gamelength;
			www.translated = {x:0,y:0};		
			www.general.determineGameSetup(chosenmode);		
			www.general.setupMatter();
			
			//recentre the canvas onto the player, this calculates how much we need to translate the viewport by
			var translate = {
				x: www.mycountry.position.x - (www.canvasw / 2),
				y: www.mycountry.position.y - (www.canvash / 2)
			};			
			var arbitrarybound = www.boundswidth / 2;
			//console.log('Original view translation',translate);
			translate.x = Math.min(translate.x, www.engine.world.bounds.max.x - (www.canvasw - arbitrarybound));
			translate.x = Math.max(translate.x, -((www.worldw / 2) - (www.canvasw / 2) + arbitrarybound));			
			translate.y = Math.min(translate.y, www.engine.world.bounds.max.y - (www.canvash - arbitrarybound));
			translate.y = Math.max(translate.y,-((www.worldh / 2) - (www.canvash / 2) + arbitrarybound));
			
			www.translated.x += translate.x; //keep track of all view translations
			www.translated.y += translate.y;			
			www.Bounds.translate(www.render.bounds, translate); 
	
			www.general.createMatterEvents();						
			www.Engine.run(www.engine);	// run the engine			
			www.Render.run(www.render); // run the renderer
			
			www.general.removeClass(document.getElementById('cancelbtn'),'hidden');
			
			if(www.hassplash){
				//console.log('Player is:',allcountries[www.chosen].name,'enemy is:',allcountries[www.chosenenemy].name);
				var player1 = 'url(' + spritepath + 'highlight/' + allcountries[www.chosen].dir + allcountries[www.chosen].sprite + '.svg';
				var player2 = 'url(' + spritepath + 'highlight/' + allcountries[www.chosenenemy].dir + allcountries[www.chosenenemy].sprite + '.svg';
				document.getElementById('splashyou').style.backgroundImage = player1;
				document.getElementById('splashyouname').innerHTML = allcountries[www.chosen].name;
				document.getElementById('splashenemy').style.backgroundImage = player2;
				document.getElementById('splashenemyname').innerHTML = allcountries[www.chosenenemy].name;
				www.general.showPopup('splashwrap');
				setTimeout(www.general.startCountDown,3000);
			}
			else {
				if(www.hascountdown){
					www.general.startCountDown();
				}
				else {
					www.general.startGame();
				}
			}
		},
		
		//initialise and call the countdown
		startCountDown: function(){
			//console.log('loading countdown');
			www.general.showPopup('countdownwrap');
			www.tally = 3;
			www.general.countDown();
		},
		
		//do countdown
		countDown: function(){
			if(www.tally > 0){
				document.getElementById('countdown').innerHTML = www.tally + '...';
				www.tally--;
				setTimeout(www.general.countDown,1000);
			}
			else if(www.tally === 0){
				document.getElementById('countdown').innerHTML = 'FIGHT!';
				www.tally--;
				setTimeout(www.general.countDown,1000);
			}
			else {
				www.general.startGame();
			}
		},
		
		startGame: function(){
			www.general.hideAllPopups();
			//document.getElementById('countdownwrap').dataset.shown = '';
			www.general.addClass(document.getElementById('wwwpage'),'gameon');
			document.getElementById('countdown').innerHTML = '';
			if(www.enemiesfire || www.hastimer){
				//console.log('starting game loop');
				www.timer = setInterval(www.general.gameLoop,www.gameloopspeed); //important that interval divisible by seconds for timer purposes
			}
		},
		
		//actually just save your highscores
		saveGame: function(){
			www.general.updateScores();
			var tosave = JSON.stringify(www.bestscores);
			localStorage.setItem('worldwarwar', tosave);
		},

		//pause matter js
		pauseGame: function(){
			//console.log('pause game');
			www.general.removeClass(document.getElementById('wwwpage'),'gameon');
			//document.getElementById('wwwpage').className = '';
			clearInterval(www.timer);
			www.Render.stop(www.render);
		},
		
		resumeGame: function(){
			//console.log('resume game');
			www.general.addClass(document.getElementById('wwwpage'),'gameon');
			www.Render.run(www.render);
			if(www.enemiesfire){
				www.timer = setInterval(www.general.gameLoop,500);
			}
		},
		
		endGame: function(){
			//console.log('end game');
			document.getElementById('wwwpage').dataset.gamemode = '';
			www.general.removeClass(document.getElementById('wwwpage'),'gameon');
			www.Render.stop(www.render);
			clearInterval(www.timer);
			www.general.saveGame();
			www.general.addClass(document.getElementById('cancelbtn'),'hidden');
		},

		gameWon: function(){
			document.getElementById('gamewonmsg').innerHTML = www.gamewonmsg;
			www.general.endGame();
			if(www.hasnextlevel){
				www.playerscore++;
				www.general.updateScores();
				clearInterval(www.timer);
				www.Render.stop(www.render);
				www.general.showPopup('nextlevel');
			}
			else {
				www.general.showPopup('gamewon');
			}
		},
		//FIXME bug here, render doesn't actually pause all the objects moving, matter problem
		gameLost: function(){
			document.getElementById('gamelostmsg').innerHTML = www.gamelostmsg;
			www.general.endGame();
			www.general.showPopup('gamelost');			
		},
		
		//called if browser is resized. Too complex to rescale everything so just reset it all and reconfigure canvas
		resizeGame: function(){
			www.general.endGame();
			www.general.setCanvasSize();
			www.general.resetMatter();
			www.general.setupMatter();
			www.general.runMatter();		
			www.general.showPopup('intro');
		},
		
		//modify some elements to insert the player scores
		updateScores: function(){
			if(www.mode === 2 && www.playerscore > www.bestscores[0].score){
				www.bestscores[0].score = www.playerscore;
				www.bestscores[0].country = www.mycountry.myname;
			}
			else if(www.mode === 3 && www.playerscore > www.bestscores[1].score){
				www.bestscores[1].score = www.playerscore;
				www.bestscores[1].country = www.mycountry.myname;
			}
			else if(www.mode === 4 && www.playerscore > www.bestscores[2].score){
				www.bestscores[2].score = www.playerscore;
				www.bestscores[2].country = www.mycountry.myname;
			}
			else if(www.mode === 5 && www.playerscore > www.bestscores[3].score){
				www.bestscores[3].score = www.playerscore;
				www.bestscores[3].country = www.mycountry.myname;
			}
			document.getElementById('savedscore2').innerHTML = 'Hi-score: ' + www.bestscores[0].score + ' ' + www.bestscores[0].country; //normal
			document.getElementById('savedscore3').innerHTML = 'Hi-score: ' + www.bestscores[1].score + ' ' + www.bestscores[1].country; //extreme
			document.getElementById('savedscore4').innerHTML = 'Hi-score: ' + www.bestscores[2].score + ' ' + www.bestscores[2].country; //versus
			document.getElementById('savedscore5').innerHTML = 'Hi-score: ' + www.bestscores[3].score + ' ' + www.bestscores[3].country; //assassinate
			var allels = document.getElementsByClassName('js-scoregeneral');
			[].slice.call(allels).forEach(function(div){
				div.innerHTML = www.playerscore;
			});
		},
		
		//set up world size and boundaries
		setWorldSize: function(){		
			var sizes = www.general.calculateAspectRatio(www.idealw,www.idealh,www.canvasw,www.canvash);
			www.worldw = sizes[0];
			www.worldh = sizes[1];
			
			if(www.worldw < www.canvasw){ //world too short
				www.worldw = www.canvasw;
				var scalew = (sizes[0] / www.worldw) * 100;
				www.worldh = (www.worldh / scalew) * 100;
			}
			else if(www.worldh < www.canvash){ //world too narrow
				www.worldh = www.canvash;
				var scaleh = (sizes[1] / www.worldh) * 100;
				www.worldw = (www.worldw / scaleh) * 100;
			}		
			www.worldw *= www.scaleFactor;
			www.worldh *= www.scaleFactor;
	
			//console.log('Canvas width',www.canvasw,'World width',www.worldw);
			//console.log('Canvas height',www.canvash,'World height',www.worldh);
					
			//make the world bounds twice as big as the canvas (render bounds)
			var minx = (www.canvasw - www.worldw) / 2;
			var miny = (www.canvash - www.worldh) / 2;
			var maxx = minx + www.worldw;
			var maxy = miny + www.worldh;			
			//console.log('World size',www.worldw,www.worldh,'Bounds',minx,miny,maxx,maxy);
		
			www.engine.world.bounds.min.x = minx; //-300;
			www.engine.world.bounds.min.y = miny; //-300;
			www.engine.world.bounds.max.x = maxx; //1100;
			www.engine.world.bounds.max.y = maxy; //900;
		},
		
		//set size of canvas
		setCanvasSize: function(){
			//new approach - make canvas as big as possible, but set world size within it according to fixed aspect ratio (elsewhere)
			www.canvasw = www.canvas.width = www.parentel.offsetWidth;
			www.canvash = www.canvas.height = document.documentElement.clientHeight;//www.parentel.offsetHeight; //this should now be more ios mobile friendly
		},
			
		createEvents: function(){				
			//start the various game modes
			var startbtns = document.getElementsByClassName('startgame');
			for(var b = 0; b < startbtns.length; b++){
				var btn = startbtns[b];
				www.general.createEventStart(btn);
			}
			
			document.getElementById('continuegame').onmousedown = function(e){
				www.general.initGame(www.mode);
			};

			//help buttons on main menu
			var helpbtns = document.getElementsByClassName('js-help');
			for(var d = 0; d < helpbtns.length; d++){
				var hbtn = helpbtns[d];
				www.general.createEventHelp(hbtn,helpbtns);
			}

			//hide all help popups
			document.getElementById('wwwpage').onmousedown = function(e){
				var helpbtns = document.getElementsByClassName('js-help');
				for(var p = 0; p < helpbtns.length; p++){
					www.general.removeClass(helpbtns[p],'active');
				}
			};

			//menu button, i.e. quit/pause
			document.getElementById('menu').onmousedown = function(e){
				www.general.pauseGame();
				clearInterval(www.timer);
				www.general.saveGame();
				www.general.showPopup('intro');
			};
			
			//cancel menu button i.e. resume
			document.getElementById('cancelbtn').onmousedown = function(e){
				www.general.hideAllPopups();
				www.general.resumeGame();
			};
			
			//game over, restart			
			document.getElementById('playagain').onmousedown = function(e){
				www.general.showPopup('intro');
			};
			document.getElementById('playagain2').onmousedown = function(e){
				www.general.showPopup('intro');
			};
			
			//click to fire
			//we could use matter's built in mouse click stuff for this but it only works within the canvas, we want it outside as well
			document.getElementById('canvasparent').onmousedown = function(e){
				www.general.clickDown(e);
			};
		},

		//click event for all start game buttons
		createEventStart: function(btn){
			btn.onmousedown = function(e){
				e.preventDefault();
				www.general.resetGame();
				var dd = document.getElementById('choosecountry');
				www.chosen = parseInt(dd.options[dd.selectedIndex].value);
				www.general.initGame(parseInt(e.target.dataset.gametype));
			};
		},
		
		//click event for all help buttons
		createEventHelp: function(btn,helpbtns){
			btn.onmousedown = function(e){
				e.preventDefault();
				e.stopPropagation();
				var addclass = 1;
				if(btn.className.search('active') !== -1){
					addclass = 0;
				}
				for(var o = 0; o < helpbtns.length; o++){
					www.general.removeClass(helpbtns[o],'active');
				}
				if(addclass){
					www.general.addClass(btn,'active');
				}
				else {
					www.general.removeClass(btn,'active');
				}
			};
		},	
		
		createMatterEvents: function(){		
			//on object collision
			www.Events.on(www.engine,'collisionStart',function(e){			
				for(var obj = 0; obj < e.pairs.length; obj++){				
					var obj1 = e.pairs[obj].bodyA;
					var obj2 = e.pairs[obj].bodyB;
									
					//don't care about country/country collisions, or country/wall
					if(obj1.myobjtype === 'bullet' || obj2.myobjtype === 'bullet'){
						//this bullet just came from this country, so disable the collision
						if(obj1.myorigin === obj2.myid || obj2.myorigin === obj1.myid){
							e.pairs[obj].isActive = false;
						}
						else {
							e.pairs[obj].bodyA.myhealth = Math.max(0, e.pairs[obj].bodyA.myhealth - 1);
							e.pairs[obj].bodyB.myhealth = Math.max(0, e.pairs[obj].bodyB.myhealth - 1);
							if(e.pairs[obj].bodyA.myhealth === 0){
								www.general.killObject(e.pairs[obj].bodyA,e.pairs[obj].bodyB.myorigin);
							}
							if(e.pairs[obj].bodyB.myhealth === 0){
								www.general.killObject(e.pairs[obj].bodyB,e.pairs[obj].bodyA.myorigin);
							}
							//remove bullets after collision
							if(obj1.myobjtype === 'bullet'){
								www.World.remove(www.engine.world, e.pairs[obj].bodyA);//remove bullet bodyA
							}
							if(obj2.myobjtype === 'bullet'){
								www.World.remove(www.engine.world, e.pairs[obj].bodyB);//remove bullet bodyB
							}
						}
					}
				}
			});	
			
			/* https://github.com/liabru/matter-js/blob/master/examples/views.js */
			// use the engine tick event to control our view
			www.Events.on(www.engine, 'afterTick', function(e) {
				/*
				if(www.enableZoom){
					var translate;
					// mouse wheel controls zoom FIXME removing this functionality as it conflicts with limits imposed on viewpoint translation
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
						//www.translated.x += translate.x; //FIXME
						//www.translated.y += translate.y;						
						www.Bounds.translate(www.render.bounds, translate);

						// update mouse
						www.Mouse.setScale(www.mouse, www.boundsScale);
						www.Mouse.setOffset(www.mouse, www.render.bounds.min);
					}				
				}		
				*/				
				
				//reposition the screen to keep the player centered
				var diffx = www.mycountry.myxpos - www.mycountry.position.x;
				var diffy = www.mycountry.myypos - www.mycountry.position.y;
				www.mycountry.myxpos = www.mycountry.position.x;
				www.mycountry.myypos = www.mycountry.position.y;								
				www.origx += diffx;
				www.origy += diffy;
				
				//www.Bounds.translate(www.render.bounds,{x:moveto0,y:moveto1});
				var translate = www.general.checkBounds(diffx,diffy);
				www.translated.x += translate.x;
				www.translated.y += translate.y;						
				www.Bounds.translate(www.render.bounds,translate);
				
				//check to see if we should remove any bullets, functionality now disabled
				/*
				var now = Date.now();
				for(var b = 0; b < www.bullets.length; b++){
					var lifespan = now - www.bullets[b].mycreated;
					if(lifespan > www.bulletlife){
						www.World.remove(www.engine.world, www.bullets[b]);
					}
				}
				*/
				//now update the HUD
				document.getElementById('score').innerHTML = www.playerscore;
				if(!www.hastimer){
					document.getElementById('count').innerHTML = www.enemycount;
				}
				else {
					document.getElementById('count').innerHTML = Math.floor(www.counttime / 1000);
				}
				document.getElementById('health').style.width = (www.mycountry.myhealth / www.playerhealthorig) * 100 + '%';				
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
		
		//check to see if an x,y movement falls outside of the boundaries in which we should scroll. If they do, return 0, otherwise return the original values
		checkBounds: function(posx,posy){
			if(www.mycountry.myxpos < www.engine.world.bounds.min.x - (www.boundswidth / 2) + (www.canvas.width / 2) || www.mycountry.myxpos > www.engine.world.bounds.max.x + (www.boundswidth / 2) - (www.canvas.width / 2)){
				posx = 0;
			}
			if(www.mycountry.myypos < www.engine.world.bounds.min.y - (www.boundswidth / 2) + (www.canvas.height / 2) || www.mycountry.myypos > www.engine.world.bounds.max.y + (www.boundswidth / 2) - (www.canvas.height / 2)){
				posy = 0;
			}
			return({x:-posx,y:-posy});
		},
				
		//reduce health and 'kill' a country
		killObject: function(country,origin){
			if(country.myobjtype === 'enemy'){
				if(origin === www.mycountry.myid){
					if(www.mode !== 4 && www.mode !== 5){
						www.playerscore++;
					}
				}					
				
				var things = '';
				if(country.mythings.length > 0){
					var solongs = [
						'Say goodbye to',
						'No more',
						'So long,',
						'So much for',
						'We can live without',
						'We don\'t need',
						'Who needs',
						'Take a hike,',
					];
					//if there's more than one item, construct a sentence with them
					if(country.mythings.length > 1){
						for(var t = 0; t < country.mythings.length - 1; t++){
							things += country.mythings[t] + ', ';
						}
						things += 'and ' + country.mythings[country.mythings.length - 1];
					}
					//otherwise just output the one thing
					else {
						things = country.mythings[0];
					}
					things = solongs[www.general.randomInt(0,solongs.length - 1)] + ' ' + things + '.';
				}
				else {
					var insults = [
						'Take a hike, foreign country!',
						'Take that, people I\'ve never met!',
						'Go away strangers!',
						'Your country is less good than some arbitrary standard!',
						'In your collective faces!',
						'We disliked you because you were different from us!',
						'See you in Helsinki!',
						'Bet you wished you\'d spent more on your defence budget, losers!',
						'So much for wherever that is',
					];
					things = insults[www.general.randomInt(0,insults.length - 1)];
				}
				//update the messages window
				var div = document.createElement('div');
				div.className = 'message';
				var title = document.createElement('p');
				title.className = 'title';
				title.innerHTML = country.myname + ' has been destroyed';
				div.appendChild(title);
				var desc = document.createElement('p');
				desc.className = 'desc';
				desc.innerHTML = things;
				div.appendChild(desc);
				document.getElementById('messages').insertBefore(div,document.getElementById('messages').firstChild);

				www.World.remove(www.engine.world, country);
				www.enemycount--;
				if(www.enemycount <= 0 || ((www.mode === 4 || www.mode === 5) && country.myid === www.chosenenemy)){ //FIXME game usually ends with 2 countries still in place
					www.general.gameWon();
				}
			}
			else if(country.myobjtype === 'player'){
				www.general.gameLost();
			}				
		},
		
		//draw some shapes to create a boundary for the game
		//there's probably a matterjs specific way of doing this but I haven't found it yet
		drawBoundary: function(){
			var walloptions = { 
				isStatic: true,
				render: {
					fillStyle: 'rgba(120,200,230,0)',
					strokeStyle: 'rgba(120,200,230,0)',
					lineWidth: 0
				}				
			};
			//top edge
			var wall1 = {
				x:www.engine.world.bounds.min.x + (www.worldw / 2),
				y:www.engine.world.bounds.min.y - (www.boundswidth / 2) + 1, 
				w:www.worldw * 2,
				h:www.boundswidth
			};
			//right edge
			var wall2 = {
				x:www.engine.world.bounds.max.x + (www.boundswidth / 2) - 1,
				y:www.engine.world.bounds.min.y + (www.worldh / 2),
				w:www.boundswidth,
				h:www.worldh * 2
			};		
			//bottom edge
			var wall3 = {
				x:www.engine.world.bounds.min.x + (www.worldw / 2),
				y:www.engine.world.bounds.max.y + (www.boundswidth / 2) - 1, //was outside the boundary so not 'solid', this tiny adjustment fixes it. Rounding error, I guess?
				w:www.worldw * 2,
				h:www.boundswidth * 1.5
			};			
			//left edge
			var wall4 = {
				x:www.engine.world.bounds.min.x - (www.boundswidth / 2) + 1,
				y:www.engine.world.bounds.min.y + (www.worldh / 2),
				w:www.boundswidth,
				h:www.worldh * 2
			};	
			//top left corner
			var wall5 = {
				x:www.engine.world.bounds.min.x + 1,
				y:www.engine.world.bounds.min.y + 1,
				w:www.boundswidth,
				h:www.worldh
			};
			//top right corner
			var wall6 = {
				x:www.engine.world.bounds.max.x - 1,
				y:www.engine.world.bounds.min.y + 1,
				w:www.boundswidth,
				h:www.worldh
			};
			//bottom right corner
			var wall7 = {
				x:www.engine.world.bounds.max.x - 1,
				y:www.engine.world.bounds.max.y - 1,
				w:www.boundswidth,
				h:www.worldh
			};
			//bottom left corner
			var wall8 = {
				x:www.engine.world.bounds.min.x + 1,
				y:www.engine.world.bounds.max.y - 1,
				w:www.boundswidth,
				h:www.worldh
			};
			var topwall = www.Bodies.rectangle(wall1.x,wall1.y,wall1.w,wall1.h,walloptions);				
			var rightwall = www.Bodies.rectangle(wall2.x,wall2.y,wall2.w,wall2.h,walloptions);
			var bottomwall = www.Bodies.rectangle(wall3.x,wall3.y,wall3.w,wall3.h,walloptions);
			var leftwall = www.Bodies.rectangle(wall4.x,wall4.y,wall4.w,wall4.h,walloptions);
			var tlcorner = www.Bodies.rectangle(wall5.x,wall5.y,wall5.w,wall5.h,walloptions);
			www.Body.rotate(tlcorner,45);
			var trcorner = www.Bodies.rectangle(wall6.x,wall6.y,wall6.w,wall6.h,walloptions);
			www.Body.rotate(trcorner,-45);
			var brcorner = www.Bodies.rectangle(wall7.x,wall7.y,wall7.w,wall7.h,walloptions);
			www.Body.rotate(brcorner,45);
			var blcorner = www.Bodies.rectangle(wall8.x,wall8.y,wall8.w,wall8.h,walloptions);
			www.Body.rotate(blcorner,-45);
			www.World.add(www.engine.world, [topwall,rightwall,bottomwall,leftwall,tlcorner,trcorner,brcorner,blcorner]);
		},
			
		//create player object
		createPlayer: function(which,type,health){
			var me = allcountries[which];
			var x = www.engine.world.bounds.min.x + ((www.worldw / 100) * me.x);
			var y = www.engine.world.bounds.min.y + ((www.worldh / 100) * me.y);
			var percscalex = (www.worldw / www.idealw) * 100;
			var w = (me.w / 100) * percscalex;
			var mass = Math.max(0.4,me.w / 10); //countries now move slower if they're bigger
			if(typeof(me.h) !== 'undefined'){
				mass = Math.max(me.w,me.h) / 10;
			}
			var spath = spritepath + 'regular/';
			if(type === 'player' || which === www.chosenenemy){
				spath = spritepath + 'highlight/';
			}
			
			var options = {
				density: 0.0001,
				friction: 0,
				restitution: 0.6, //how much a collision will cause a bounce, 0 to 1
				frictionAir: 0,
				mass: mass, 
				//inverseInertia: 1, //don't know what this property does
				render: {
					sprite: {
						texture: spath + me.dir + me.sprite + '.svg',
						xScale: ((0.11) / 100) * percscalex, //slightly bad, partly based on legacy code (countries used to have different scale factors)
						yScale: ((0.11) / 100) * percscalex,
					}
				}
			};	
			
			//most countries fit into a roughly round polygon, but some (e.g. russia) require a specific width and height, set as a rectangle
			var thisobj = www.Bodies.polygon(x,y,4,w,options);
			if(typeof(me.h) !== 'undefined'){
				var h = (me.h / 100) * percscalex;
				thisobj = www.Bodies.rectangle(x,y,w,h,options);
			}
			
			thisobj.myid = which;
			thisobj.myxpos = thisobj.position.x;
			thisobj.myypos = thisobj.position.y;
			thisobj.myname = me.name;
			thisobj.myobjtype = type;
			if(www.mode === 4 && (which !== www.chosenenemy && type !== 'player')){
				thisobj.myhealth = 1;
			}
			else {
				thisobj.myhealth = health;
			}
			thisobj.mythings = me.unique;
			www.World.add(www.engine.world, [thisobj]);			
			return(thisobj);
		},
		
		//once the player has been chosen, create the rest of the countries
		createEnemies: function(){
			//console.log('Found',allcountries.length,'countries. There should be 196.');
			for(var i = 0; i < allcountries.length; i++){
				if(i !== www.chosen){
					var enemy = www.general.createPlayer(i,'enemy',www.enemyhealth);
					www.enemies.push(enemy);
					www.enemycount++;
				}
			}
		},
	
		//click to fire
		clickDown: function(e){
			var rect = www.canvas.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;
			if(typeof e.changedTouches !== 'undefined'){
				x = e.changedTouches[0].pageX - rect.left;
				y = e.changedTouches[0].pageY - rect.top;
			}
			//figure out where we clicked in relation to the actual world
			x += www.translated.x;
			y += www.translated.y;
			
			var bullet = www.general.createBullet(www.mycountry.position.x,www.mycountry.position.y,www.mycountry.myid,'#c83737');			
			www.general.fireBullet(bullet,x,y,www.mycountry);
		},
		
		createBullet: function(posx,posy,origin,bulletcolour){
			var options = {
				density: 0.001,
				friction: 0.1,
				restitution: 1,
				frictionAir: 0,
				mass: 0.05,
				render: {
					fillStyle: bulletcolour,
					strokeStyle: bulletcolour,
					lineWidth: 0
				}
			};
			var bullet = www.Bodies.circle(posx,posy,www.worldw / 400, options);
			bullet.myid = -1;
			bullet.myobjtype = 'bullet';
			bullet.myname = 'bullet';
			bullet.myorigin = origin;
			bullet.myhealth = 1;
			//bullet.mycreated = Date.now(); //used to have bullets expire after set time, but too heavy on browser and inconsistent across screen sizes
			www.bullets.push(bullet);
			www.World.add(www.engine.world, [bullet]);
			return(bullet);
		},
		
		fireBullet: function(bullet,x,y,origin){			
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
			myvect.x /= scaleby;
			myvect.y /= scaleby;				
			www.Body.applyForce(bullet, bullet.position, myvect);
			
			//create recoil to move the country, opposite direction to bullet and reduced power
			var recoil = {
				x: -(myvect.x),
				y: -(myvect.y)
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
			
			//add an independant option 'random'
			var ran = document.createElement('option');
			ran.value = -1;
			ran.innerHTML = 'Random';
			document.getElementById('choosecountry').appendChild(ran);				
			
			//add the rest
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
			if(www.hastimer){
				www.counttime -= www.gameloopspeed;
				if(www.counttime <= 0){
					www.general.gameLost();
				}
			}
			if(www.enemiesfire){
				for(var e = 0; e < www.enemies.length; e++){
					if(www.enemies[e].myhealth > 0){
						if((www.mode === 4 && www.enemies[e].myid === www.chosenenemy) || (www.mode !== 5 && www.mode !== 4)){ //this is contorted but works. Could probably write better
							if(!www.general.randomInt(0,www.firechance)){
								var bullet = www.general.createBullet(www.enemies[e].position.x,www.enemies[e].position.y,www.enemies[e].myid,'black');			
								var x = www.general.randomInt(0,www.canvas.width);
								var y = www.general.randomInt(0,www.canvas.height);
								www.general.fireBullet(bullet,x,y,www.enemies[e]);				
							}
						}
					}
				}
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

        //returns the percentage amount that object is of wrapper
        calculatePercentage: function(object,wrapper){
			return((100 / wrapper) * object);
		},
		
		randomInt: function(min,max){
			return Math.floor(Math.random()*(max-min+1)+min);
		},
		
		//jquery's addClass without jquery
		addClass: function(el,className){
			if(el.classList){
				el.classList.add(className);
			}
			else {
				el.className += ' ' + className;
			}
		},
		
		removeClass: function(el,className){
			el.className = el.className.replace(className,'');
		},		
		
	}
};
window.www = www;
})(window);

window.onload = function(){
	www.general.preGameInit();
	www.general.setupMatter();
	www.general.runMatter();
	Deferred.when(loaders).then(
		function(){
			www.general.init();
			www.general.addClass(document.getElementById('wwwpage'),'loaded');

			function getMetaContentByName(name,attrtype){
				var ret = document.querySelector("meta["+attrtype+"='"+name+"']").getAttribute('content');
				return ret.replace(/ /gi,'+');
			}
			var el = document.getElementById('sharelinks');
			var desc = getMetaContentByName('description','name');
			var txt = el.innerHTML.replace(/SBDESC/gi,desc);
			var title = getMetaContentByName('og:title','property');
			txt = txt.replace(/SBTITLE/gi,title);
			var img = getMetaContentByName('og:image','property');
			txt = txt.replace(/SBIMG/gi,img);
			var link = escape(window.location.href);
			txt = txt.replace(/SBLINK/gi,link);
			el.innerHTML = txt;
			el.className += ' loaded';				
		}
	);	

	var resize;
	window.addEventListener('resize', function(event){
		clearTimeout(resize);
		resize = setTimeout(www.general.resizeGame,500);
	});
};

