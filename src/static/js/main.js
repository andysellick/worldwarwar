/* globals Matter, www, Deferred, allcountries, spritepath */

//date shim
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); };
}

/* preload images */
/* we're not actually using these specific objects once created, but the browser should indirectly cache them, apparently */
var loaders = [];
var imgpath = 'static/img/';
var imageloadprogress = 0;
var imageloadtotal = 0;

var allimages = [
	{
		'name': 'africa',
		'images': ['algeria.svg','cameroon.svg','egypt.svg','ghana.svg','madagascar.svg','namibia.svg','sierraleone.svg','togo.svg','angola.svg','car.svg','equatorialguinea.svg','guinea.svg','malawi.svg','niger.svg','somalia.svg','tunisia.svg','benin.svg','chad.svg','eritrea.svg','guineabissau.svg','mali.svg','nigeria.svg','southafrica.svg','uganda.svg','botswana.svg','cotedivoire.svg','ethiopia.svg','kenya.svg','mauritania.svg','republicofthecongo.svg','southsudan.svg','westernsahara.svg','burkinafaso.svg','democraticrepublicofthecongo.svg','gabon.svg','liberia.svg','morocco.svg','rwanda.svg','sudan.svg','zambia.svg','burundi.svg','djibouti.svg','gambia.svg','libya.svg','mozambique.svg','senegal.svg','tanzania.svg','zimbabwe.svg'],
		'dir': 'africa'
	},
	{
		'name': 'asia',
		'images': ['afghanistan.svg','cambodia.svg','iran.svg','jordan.svg','lebanon.svg','nepal.svg','palestine.svg','southkorea.svg','tajikistan.svg','uzbekistan.svg','azerbaijan.svg','china.svg','iraq.svg','kuwait.svg','malaysia.svg','northkorea.svg','philippines.svg','srilanka.svg','thailand.svg','vietnam.svg','bangladesh.svg','india.svg','israel.svg','kyrgyzstan.svg','mongolia.svg','oman.svg','qatar.svg','syria.svg','turkmenistan.svg','yemen.svg','bhutan.svg','indonesia.svg','japan.svg','laos.svg','myanmar.svg','pakistan.svg','saudiarabia.svg','taiwan.svg','uae.svg'],
		'dir': 'asia'
	},
	{
		'name': 'europe',
		'images': ['albania.svg','belgium.svg','cyprus.svg','finland.svg','greece.svg','ireland.svg','lithuania.svg','montenegro.svg','portugal.svg','slovakia.svg','switzerland.svg','armenia.svg','bosniaandherz.svg','czechrepublic.svg','france.svg','greenland.svg','italy.svg','luxembourg.svg','netherlands.svg','romania.svg','slovenia.svg','turkey.svg','austria.svg','bulgaria.svg','denmark.svg','georgia.svg','hungary.svg','kazakhstan.svg','macedonia.svg','norway.svg','russia.svg','spain.svg','ukraine.svg','belarus.svg','croatia.svg','estonia.svg','germany.svg','iceland.svg','latvia.svg','moldova.svg','poland.svg','serbia.svg','sweden.svg','unitedkingdom.svg'],
		'dir': 'europe'
	},
	{
		'name': 'namerica',
		'images': ['bahamas.svg','canada.svg','cuba.svg','elsalvador.svg','haiti.svg','jamaica.svg','nicaragua.svg','puertorico.svg','us_hawaii.svg','belize.svg','costarica.svg','dominicanrepublic.svg','guatemala.svg','honduras.svg','mexico.svg','panama.svg','us_alaska.svg','us_main.svg'],
		'dir': 'namerica'
	},
	{
		'name': 'namerica',
		'images': ['bahamas.svg','canada.svg','cuba.svg','elsalvador.svg','haiti.svg','jamaica.svg','nicaragua.svg','puertorico.svg','us_hawaii.svg','belize.svg','costarica.svg','dominicanrepublic.svg','guatemala.svg','honduras.svg','mexico.svg','panama.svg','us_alaska.svg','us_main.svg'],
		'dir': 'namerica'
	},
	{
		'name': 'oceania',
		'images': ['australia.svg','newzealand.svg','papuanewguinea.svg'],
		'dir': 'oceania'
	},
	{
		'name': 'samerica',
		'images': ['argentina.svg','brazil.svg','colombia.svg','falklandislands.svg','guyana.svg','peru.svg','uruguay.svg','bolivia.svg','chile.svg','ecuador.svg','frenchguiana.svg','paraguay.svg','suriname.svg','venezuela.svg'],
		'dir': 'samerica'
	},
];
function loadFile(src,array,num){
	var deferred = new Deferred();
	var sprite = new Image();
	sprite.onload = function() {
		array[num] = sprite;
		deferred.resolve();
		imageloadprogress++;
		document.getElementById('loadingbar').style.width = (imageloadprogress / imageloadtotal) * 100 + '%';
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
	bulletlife: 800, //how many milliseconds a bullet should exist for
	chosen: 0, //the country chosen by the player
	timer: 0,
	scaleFactor: 1.5,//1.5, //how big to draw everything. 
	debug: 0,
	mode: 3,
	bestscores: [
		{'country':'','score':0},
		{'country':'','score':0}
	],
	enableZoom: 0, //FIXME this is mainly for debug, potentially remove for production
	translated: {x:0,y:0}, //keep a track of any view translations for locating click events
	
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
			var saved = localStorage.getItem('worldwarwar');
			if(saved !== null && saved.length > 0){
				www.bestscores = JSON.parse(saved);	
				//console.log('Saved scores',www.bestscores);
				www.general.updateScores();
			}
		},
		
		//setup and start the game
		initGame: function(chosenmode){
			document.getElementById('wwwpage').className = 'gameon';
			www.mode = chosenmode;
			www.enemycount = 0;
			www.translated = {x:0,y:0};
			//setup game attributes according to mode
			if(www.mode === 1){ //just float around destroying the world, sandbox				
				www.enemyhealth = 2;
				www.enemiesfire = 0;
			}
			else if(www.mode === 2){ //reasonable level of violence				
				www.playerhealth = 10;
				www.enemyhealth = 5;
				www.enemiesfire = 1;
				www.firechance = 10;
			}
			else { //extreme				
				www.playerhealth = 5;
				www.enemyhealth = 5;
				www.enemiesfire = 1;
				www.firechance = 3;
			}
			www.playerhealthorig = www.playerhealth;
			
			www.enemies = [];
			www.playerscore = 0;
			document.getElementById('messages').innerHTML = '';			
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
			www.general.setWorldSize();
			
			if(www.debug){
				www.chosen = allcountries.length - 1;
			}
			
			www.general.drawBoundary(); //draw the boundary first, so countries overlap it
			www.mycountry = www.general.createPlayer(www.chosen,'player',www.playerhealth,www.chosen);			
			www.general.createEnemies();		
			
			//recentre the canvas onto the player, this calculates how much we need to translate the viewport by
			var translate = {
				x: www.mycountry.position.x - (www.canvasw / 2),
				y: www.mycountry.position.y - (www.canvash / 2)
			};			
			//focus on the last country added
			/*
			if(www.debug){
				translate = {
					x: www.enemies[www.enemies.length - 1].position.x - (www.canvasw / 2),
					y: www.enemies[www.enemies.length - 1].position.y - (www.canvash / 2)
				};
			}
			*/					
			var arbitrarybound = www.boundswidth / 2;
			//console.log('Original view translation',translate);
			translate.x = Math.min(translate.x, www.engine.world.bounds.max.x - (www.canvasw - arbitrarybound));
			//translate.x = Math.max(translate.x,-(translate.x - (translate.x - (www.canvasw / 2) - arbitrarybound)));
			translate.x = Math.max(translate.x, -((www.worldw / 2) - (www.canvasw / 2) + arbitrarybound));
			
			translate.y = Math.min(translate.y, www.engine.world.bounds.max.y - (www.canvash - arbitrarybound));
			translate.y = Math.max(translate.y,-((www.worldh / 2) - (www.canvash / 2) + arbitrarybound));
			
			www.translated.x += translate.x; //keep track of all view translations
			www.translated.y += translate.y;			
			//console.log('Initial view translation',translate);
			www.Bounds.translate(www.render.bounds, translate); 
	
			www.general.createMatterEvents();			
			
			www.Engine.run(www.engine);	// run the engine			
			www.Render.run(www.render); // run the renderer
			
			www.general.removeClass(document.getElementById('cancelbtn'),'hidden');
			if(!www.debug && www.enemiesfire){
				www.timer = setInterval(www.general.gameLoop,500);
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
			document.getElementById('wwwpage').className = '';
			www.Render.stop(www.render);
		},
		
		resumeGame: function(){
			document.getElementById('wwwpage').className = 'gameon';
			www.Render.run(www.render);
			if(!www.debug && www.enemiesfire){
				www.timer = setInterval(www.general.gameLoop,500);
			}
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
			document.getElementById('savedscore1').innerHTML = 'Hi-score: ' + www.bestscores[0].score + ' ' + www.bestscores[0].country;
			document.getElementById('savedscore2').innerHTML = 'Hi-score: ' + www.bestscores[1].score + ' ' + www.bestscores[1].country;
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

        //returns the percentage amount that object is of wrapper
        calculatePercentage: function(object,wrapper){
			return((100 / wrapper) * object);
		},
		
		randomInt: function(min,max){
			return Math.floor(Math.random()*(max-min+1)+min);
		},
		
		//set size of canvas
		setCanvasSize: function(){
			//new approach - make canvas as big as possible, but set world size within it according to fixed aspect ratio (elsewhere)
			www.canvasw = www.canvas.width = www.parentel.offsetWidth;
			www.canvash = www.canvas.height = www.parentel.offsetHeight;		
			
			//old approach - set canvas size according to fixed aspect ratio
			/*
			//account for padding within the parent element
			var computedStyle = getComputedStyle(www.parentel);
			targetw -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
			targeth -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
			var sizes = www.general.calculateAspectRatio(www.idealw,www.idealh,targetw,targeth);			
			www.canvasw = www.canvas.width = sizes[0];
			www.canvash = www.canvas.height = sizes[1];
			*/
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
	
		createEvents: function(){			
			//start the various game modes FIXME surely a more efficient way to do this
			var beginning1 = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			document.getElementById('startgame1').addEventListener(beginning1,function(e){
				var dd = document.getElementById('choosecountry');
				www.chosen = parseInt(dd.options[dd.selectedIndex].value);
				www.general.initGame(1);
				www.general.hideAllPopups();
			},false);
			var beginning2 = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			document.getElementById('startgame2').addEventListener(beginning2,function(e){
				var dd = document.getElementById('choosecountry');
				www.chosen = parseInt(dd.options[dd.selectedIndex].value);
				www.general.initGame(2);
				www.general.hideAllPopups();
			},false);
			var beginning3 = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			document.getElementById('startgame3').addEventListener(beginning3,function(e){
				var dd = document.getElementById('choosecountry');
				www.chosen = parseInt(dd.options[dd.selectedIndex].value);
				www.general.initGame(3);
				www.general.hideAllPopups();
			},false);
			
			//menu button, i.e. quit/pause
			var menu = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			document.getElementById('menu').addEventListener(menu,function(e){
				www.general.pauseGame();
				clearInterval(www.timer);
				www.general.saveGame();
				www.general.showPopup('intro');
			},false);			
			
			//cancel menu button i.e. resume
			var cancelbtn = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			document.getElementById('cancelbtn').addEventListener(cancelbtn,function(e){
				www.general.hideAllPopups();
				www.general.resumeGame();
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
			//on object collision
			www.Events.on(www.engine,'collisionStart',function(e){			
				//console.log(e.pairs);
				for(var obj = 0; obj < e.pairs.length; obj++){				
					var obj1 = e.pairs[obj].bodyA;
					var obj2 = e.pairs[obj].bodyB;
									
					//don't care about country/country collisions, or country/wall
					if(obj1.myobjtype === 'bullet' || obj2.myobjtype === 'bullet'){
						/*
						if(obj1.myobjtype === 'player' || obj2.myobjtype === 'player'){
							console.log('you got hit');
						}
						*/
						//console.log('Collision!',obj1.myorigin,obj1.myid,obj1.myname);
						//console.log('Collision!',obj2.myorigin,obj2.myid,obj2.myname);
											
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
				
				//check to see if we should remove any bullets
				var now = Date.now();
				for(var b = 0; b < www.bullets.length; b++){
					var lifespan = now - www.bullets[b].mycreated;
					if(lifespan > www.bulletlife){
						www.World.remove(www.engine.world, www.bullets[b]);
					}
				}				
				//now update the HUD
				document.getElementById('score').innerHTML = www.playerscore;
				document.getElementById('count').innerHTML = www.enemycount;
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
		//FIXME this still isn't working for hawaii at a large screen size
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
			//console.log('killObject',country.myname);
			//console.log(country,origin,www.mycountry.myid);
			if(country.myobjtype === 'enemy'){
				if(origin === www.mycountry.myid){
					www.playerscore++;
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
						'Begone,'
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
						'Adios, strangers!',
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
				if(www.enemycount <= 0){
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
				h:www.boundswidth
			};			
			//left edge
			var wall4 = {
				x:www.engine.world.bounds.min.x - (www.boundswidth / 2) + 1,
				y:www.engine.world.bounds.min.y + (www.worldh / 2),
				w:www.boundswidth,
				h:www.worldh * 2
			};			
			var topwall = www.Bodies.rectangle(wall1.x,wall1.y,wall1.w,wall1.h,walloptions);				
			var rightwall = www.Bodies.rectangle(wall2.x,wall2.y,wall2.w,wall2.h,walloptions);
			var bottomwall = www.Bodies.rectangle(wall3.x,wall3.y,wall3.w,wall3.h,walloptions);
			var leftwall = www.Bodies.rectangle(wall4.x,wall4.y,wall4.w,wall4.h,walloptions);
			www.World.add(www.engine.world, [topwall,rightwall,bottomwall,leftwall]);
		},
			
		//create player object
		createPlayer: function(which,type,health,theid){
			var me = allcountries[which];
			var x = www.engine.world.bounds.min.x + ((www.worldw / 100) * me.x);
			var y = www.engine.world.bounds.min.y + ((www.worldh / 100) * me.y);
			var percscalex = (www.worldw / www.idealw) * 100;
			var w = (me.w / 100) * percscalex;
			var mass = me.w / 10; //countries now move slower if they're bigger
			if(typeof(me.h) !== 'undefined'){
				mass = Math.max(me.w,me.h) / 10;
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
						texture: spritepath + me.dir + me.sprite,
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
			
			thisobj.myid = theid;
			thisobj.myxpos = thisobj.position.x;
			thisobj.myypos = thisobj.position.y;
			thisobj.myname = me.name;
			thisobj.myobjtype = type;
			thisobj.myhealth = health;
			thisobj.mythings = me.unique;

			www.World.add(www.engine.world, [thisobj]);			
			return(thisobj);
		},
		
		//once the player has been chosen, create the rest of the countries
		createEnemies: function(){
			//console.log('Found',allcountries.length,'countries. There should be 196.');
			for(var i = 0; i < allcountries.length; i++){
				if(i !== www.chosen){
					var enemy = www.general.createPlayer(i,'enemy',www.enemyhealth,i);
					www.enemies.push(enemy);
					//www.World.add(www.engine.world, [enemy]);
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
			
			var bullet = www.general.createBullet(www.mycountry.position.x,www.mycountry.position.y,www.mycountry.myid,'red');			
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
			bullet.mycreated = Date.now();
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
					if(!www.general.randomInt(0,www.firechance)){
						var bullet = www.general.createBullet(www.enemies[e].position.x,www.enemies[e].position.y,www.enemies[e].myid,'black');			
						var x = www.general.randomInt(0,www.canvas.width);
						var y = www.general.randomInt(0,www.canvas.height);
						www.general.fireBullet(bullet,x,y,www.enemies[e]);				
					}
				}
			}		
		},
		
		gameWon: function(){
			document.getElementById('wwwpage').className = '';
			clearInterval(www.timer);
			www.general.saveGame();
			www.general.showPopup('gamewon');
			www.general.addClass(document.getElementById('cancelbtn'),'hidden');
		},
		gameLost: function(){
			document.getElementById('wwwpage').className = '';
			clearInterval(www.timer);
			www.general.saveGame();
			www.general.showPopup('gamelost');			
			www.general.addClass(document.getElementById('cancelbtn'),'hidden');
		},

	}
};
window.www = www;
})(window);

window.onload = function(){
	Deferred.when(loaders).then(
		function(){
			www.general.init();
			www.general.addClass(document.getElementById('loadingwrap'),'fadeout');
		}
	);	
	/*
	var resize;
	window.addEventListener('resize', function(event){
		clearTimeout(resize);
		resize = setTimeout(www.general.setCanvasSize,500);
	});
	*/
};

