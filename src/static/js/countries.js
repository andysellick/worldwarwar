
var spritepath = '/static/img/';

//map images now from https://en.wikipedia.org/wiki/Wikipedia%3aBlank_maps#/media/File:BlankMap-World6.svg
//previous map images from https://www.amcharts.com/svg-maps/
//previous map images from https://github.com/djaiss/mapsicon
var allcountries = [
	{	'name': 'Britain',
		'sprite': 'britain.svg',
		'xScale': 0.11, //apparently yScale is not needed
		'yScale': 0.2,
		//x and y pos are stored as percentages
		'x': 47, 
		'y': 19.5,
		'w': 11,
		'unique': [
			'Shakespeare',
			'the Beatles',
			'the steam turbine'
		]
	},
	{	'name': 'Ireland',
		'sprite': 'ireland.svg',
		'xScale': 0.11,
		'yScale': 0.1,
		'x': 45.81, 
		'y': 20.14,
		'w': 8,
		'unique': [
			'Guinness',
			'Sudocrem',
			'Clofazimine'
		]		
	},
	{	'name': 'France',
		'sprite': 'france.svg',
		'xScale': 0.11, 
		'x': 48.2, 
		'y': 24.1,
		'w': 15,
		'unique': [
			'the Rabies vaccine',
			'champagne',
			'photography'
		]		
	},
	{	'name': 'Belgium',
		'sprite': 'belgium.svg',
		'xScale': 0.11, 
		'x': 48.64, 
		'y': 21.87,
		'w': 4,
		'unique': [
			'roller skates',
			'saxophones',
			'chlorofluorocarbons'
		]		
	},
	{	'name': 'Spain',
		'sprite': 'spain.svg',
		'xScale': 0.11, 
		'x': 46.96, 
		'y': 27.425,
		'w': 15,
		'unique': [
			'laryngoscopy',
			'paella',
			'sherry'
		]		
	},
	{	'name': 'Portugal',
		'sprite': 'portugal.svg',
		'xScale': 0.11, 
		'x': 45.55, 
		'y': 27.575,
		'w': 5,
		'unique': [
			'eslicarbazepine acetate',
			'cerebral angiography',
			'the carrack'
		]		
	},
	{	'name': 'The Netherlands',
		'sprite': 'netherlands.svg',
		'xScale': 0.11, 
		'x': 48.84, 
		'y': 21.045,
		'w': 4,
		'unique': [
			'the electrocardiograph',
			'the microscope',
			'Python'
		]		
	},
	{	'name': 'Luxembourg',
		'sprite': 'luxembourg.svg',
		'xScale': 0.11, 
		'x': 48.99, 
		'y': 22.321,
		'w': 1,
		'unique': [
			'bouneschlupp',
			'Andy Schleck',
			'Edward Steichen'
		]		
	},
	{	'name': 'Germany',
		'sprite': 'germany.svg',
		'xScale': 0.11, 
		'x': 50.05, 
		'y': 21.56,
		'w': 14,
		'unique': [
			'aspirin',
			'the integrated circuit',
			'the diesel engine'
		]		
	},
	{	'name': 'Switzerland',
		'sprite': 'switzerland.svg',
		'xScale': 0.11, 
		'x': 49.495, 
		'y': 23.78,
		'w': 4,
		'unique': [
			'bobsleigh',
			'muesli',
			'white chocolate'
		]		
	},
	{	'name': 'Italy',
		'sprite': 'italy.svg',
		'xScale': 0.11, 
		'x': 50.59, 
		'y': 26.37,
		'w': 10,
		'unique': [
			'pizza',
			'espresso',
			'glasses'
		]		
	},
	{	'name': 'Austria',
		'sprite': 'austria.svg',
		'xScale': 0.11, 
		'x': 50.72, 
		'y': 23.31,
		'w': 5,
		'unique': [
			'digital clocks',
			'the Altekruse Puzzle',
			'the Schrodinger equation'
		]		
	},
	{	'name': 'Denmark',
		'sprite': 'denmark.svg',
		'xScale': 0.11, 
		'x': 50, 
		'y': 19,
		'w': 7,
		'unique': [
			'Gaboxadol',
			'Google Maps',
			'Lego'
		]		
	},
	{	'name': 'The Czech Republic',
		'sprite': 'czechrepublic.svg',
		'xScale': 0.11, 
		'x': 51.2, 
		'y': 22.23,
		'w': 4,
		'unique': [
			'Jan Hammer',
			'Gregor Mendel',
			'Skoda cars'
		]		
	},
	{	'name': 'Poland',
		'sprite': 'poland.svg',
		'xScale': 0.11, 
		'x': 52.03, 
		'y': 21.15,
		'w': 10,
		'unique': [
			'Copernicus',
			'vodka',
			'bagels'
		]		
	},
	{	'name': 'Slovenia',
		'sprite': 'slovenia.svg',
		'xScale': 0.11, 
		'x': 51.09, 
		'y': 24.12,
		'w': 3,
		'unique': [
			'plastic ice skates',
			'the Skocjan caves',
			'potica'
		]		
	},
	{	'name': 'Slovakia',
		'sprite': 'slovakia.svg',
		'xScale': 0.11, 
		'x': 52.18, 
		'y': 22.82,
		'w': 3,
		'unique': [
			'plastic ice skates',
			'the Skocjan caves',
			'potica'
		]		
	},
	{	'name': 'Hungary',
		'sprite': 'hungary.svg',
		'xScale': 0.11, 
		'x': 52.15, 
		'y': 23.6,
		'w': 4,
		'unique': [
			'the biro',
			'electric motors',
			'the Rubik\'s cube'
		]		
	},
	{	'name': 'Croatia',
		'sprite': 'croatia.svg',
		'xScale': 0.11, 
		'x': 51.457, 
		'y': 25,
		'w': 3,
		'unique': [
			'the necktie',
			'dalmatians',
			'the Puretic power block'
		]		
	},
	{	'name': 'Bosnia and Herzegovina',
		'sprite': 'bosniaandherz.svg',
		'xScale': 0.11, 
		'x': 51.75, 
		'y': 25.32,
		'w': 2,
		'unique': [
			'Ivo Andric',
			'Mesa Selimovic'
		]		
	},
	{	'name': 'Serbia',
		'sprite': 'serbia.svg',
		'xScale': 0.11, 
		'x': 52.52, 
		'y': 25.25,
		'w': 6,
		'unique': [
			'alternating current',
			'radio',
			'lasers'
		]		
	},
	{	'name': 'Montenegro',
		'sprite': 'montenegro.svg',
		'xScale': 0.11, 
		'x': 52.135, 
		'y': 25.95,
		'w': 2,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Albania',
		'sprite': 'albania.svg',
		'xScale': 0.11, 
		'x': 52.38, 
		'y': 26.78,
		'w': 2,
		'unique': [
			'John Belushi',
			'', 
			'' //FIXME
		]		
	},
	{	'name': 'Macedonia',
		'sprite': 'macedonia.svg',
		'xScale': 0.11, 
		'x': 52.75, 
		'y': 26.53,
		'w': 3,
		'unique': [
			'',
			'', 
			'' //FIXME
		]		
	},
	{	'name': 'Greece',
		'sprite': 'greece.svg',
		'xScale': 0.11, 
		'x': 53.395, 
		'y': 28.28,
		'w': 12,
		'unique': [
			'democracy',
			'Euclidean geometry', 
			'the Olympic Games' 
		]		
	},
	{	'name': 'Bulgaria',
		'sprite': 'bulgaria.svg',
		'xScale': 0.11, 
		'x': 53.64, 
		'y': 25.935,
		'w': 6,
		'unique': [
			'cyrillic script',
			'mavrud', 
			'Stefka Kostadinova' 
		]		
	},
	{	'name': 'Romania',
		'sprite': 'romania.svg',
		'xScale': 0.11, 
		'x': 53.5, 
		'y': 24.24,
		'w': 9,
		'unique': [
			'the Teclu burner',
			'George Enescu', 
			'Simona Halep' 
		]		
	},
	{	'name': 'Moldova',
		'sprite': 'moldova.svg',
		'xScale': 0.11, 
		'x': 54.22, 
		'y': 23.7,
		'w': 3,
		'unique': [
			'',
			'', //FIXME
			'' 
		]		
	},
	{	'name': 'Ukraine',
		'sprite': 'ukraine.svg',
		'xScale': 0.11, 
		'x': 54.9, 
		'y': 22.98,
		'w': 10,
		'unique': [
			'postal codes',
			'Battleship Potemkin', 
			'the S.T.A.L.K.E.R. games' 
		]		
	},
	{	'name': 'Belarus',
		'sprite': 'belarus.svg',
		'xScale': 0.11, 
		'x': 53.99, 
		'y': 20.24,
		'w': 8,
		'unique': [
			'minsk computers',
			'draniki',
			'' //FIXME
		]		
	},
	{	'name': 'Lithuania',
		'sprite': 'lithuania.svg',
		'xScale': 0.11, 
		'x': 52.99, 
		'y': 19.5,
		'w': 5,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Latvia',
		'sprite': 'latvia.svg',
		'xScale': 0.11, 
		'x': 53.13, 
		'y': 18.64,
		'w': 3,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Estonia',
		'sprite': 'estonia.svg',
		'xScale': 0.11, 
		'x': 53.13, 
		'y': 17.78,
		'w': 4,
		'unique': [
			'',
			'', //FIXME
			'Skype'
		]		
	},
	{	'name': 'Russia',
		'sprite': 'russia.svg',
		'xScale': 0.11, 
		'x': 69.6, 
		'y': 17.2,
		'w': 450,
		'h': 60,
		'unique': [
			'space suits',
			'nuclear power plants',
			'Isaac Asimov'
		]		
	},
	{	'name': 'Finland',
		'sprite': 'finland.svg',
		'xScale': 0.11, 
		'x': 53.18, 
		'y': 14.79,
		'w': 10,
		'unique': [
			'ice skates',
			'the heart rate monitor',
			'Linux'
		]		
	},
	{	'name': 'Sweden',
		'sprite': 'sweden.svg',
		'xScale': 0.11, 
		'x': 51.5, 
		'y': 16.12,
		'w': 8,
		'unique': [
			'Bluetooth',
			'celsius',
			'styrofoam'
		]		
	},
	{	'name': 'Norway',
		'sprite': 'norway.svg',
		'xScale': 0.11, 
		'x': 51.36, 
		'y': 14.99,
		'w': 30,
		'h': 2,
		'unique': [
			'aerosol spray',
			'the cheese slicer',
			'object oriented programming'
		]		
	},
	{	'name': 'Turkey',
		'sprite': 'turkey.svg',
		'xScale': 0.11, 
		'x': 56.11, 
		'y': 27.95,
		'w': 60,
		'h': 20,
		'unique': [
			'the Turkish bath',
			'Turkish coffee',
			'Turkish carpets'
		]		
	},
	{	'name': 'Syria',
		'sprite': 'syria.svg',
		'xScale': 0.11, 
		'x': 57.15, 
		'y': 30.15,
		'w': 8,
		'unique': [
			'Steve Jobs',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Lebanon',
		'sprite': 'lebanon.svg',
		'xScale': 0.11, 
		'x': 56.37, 
		'y': 30.65,
		'w': 2,
		'unique': [
			'Samir Sammoun',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Israel',
		'sprite': 'israel.svg',
		'xScale': 0.11, 
		'x': 56.2, 
		'y': 31.98,
		'w': 3,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Jordan',
		'sprite': 'jordan.svg',
		'xScale': 0.11, 
		'x': 56.79, 
		'y': 32.04,
		'w': 5,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Iraq',
		'sprite': 'iraq.svg',
		'xScale': 0.11, 
		'x': 58.47, 
		'y': 31.01,
		'w': 8,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Saudi Arabia',
		'sprite': 'saudiarabia.svg',
		'xScale': 0.11, 
		'x': 59.1, 
		'y': 35.79,
		'w': 22,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Kuwait',
		'sprite': 'kuwait.svg',
		'xScale': 0.11, 
		'x': 59.46, 
		'y': 33.1,
		'w': 2,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Qatar',
		'sprite': 'qatar.svg',
		'xScale': 0.11, 
		'x': 60.49, 
		'y': 35.25,
		'w': 2,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'United Arab Emirates',
		'sprite': 'uae.svg',
		'xScale': 0.11, 
		'x': 61.26, 
		'y': 35.719,
		'w': 7,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Oman',
		'sprite': 'oman.svg',
		'xScale': 0.11, 
		'x': 61.87, 
		'y': 37.23,
		'w': 8,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Yemen',
		'sprite': 'yemen.svg',
		'xScale': 0.11, 
		'x': 60.09, 
		'y': 40.38,
		'w': 13,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},	
	{	'name': 'Egypt',
		'sprite': 'egypt.svg',
		'xScale': 0.11, 
		'x': 55.19, 
		'y': 34.55,
		'w': 18,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Libya',
		'sprite': 'libya.svg',
		'xScale': 0.11, 
		'x': 51.89, 
		'y': 34.71,
		'w': 22,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},	
	{	'name': 'Tunisia',
		'sprite': 'tunisia.svg',
		'xScale': 0.11, 
		'x': 49.83, 
		'y': 30.75,
		'w': 8,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},			
	{	'name': 'Algeria',
		'sprite': 'algeria.svg',
		'xScale': 0.11, 
		'x': 47.92, 
		'y': 33.8,
		'w': 24,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},			
	{	'name': 'Morocco',
		'sprite': 'morocco.svg',
		'xScale': 0.11, 
		'x': 45.64, 
		'y': 31.83,
		'w': 13,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Western Sahara',
		'sprite': 'westernsahara.svg',
		'xScale': 0.11, 
		'x': 44.08, 
		'y': 35.85,
		'w': 7,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},	
	{	'name': 'Mauritania',
		'sprite': 'mauritania.svg',
		'xScale': 0.11, 
		'x': 44.6, 
		'y': 37.54,
		'w': 10,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Mali',
		'sprite': 'mali.svg',
		'xScale': 0.11, 
		'x': 46.38, 
		'y': 39.38,
		'w': 15,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Senegal',
		'sprite': 'senegal.svg',
		'xScale': 0.11, 
		'x': 43.57, 
		'y': 41.02,
		'w': 3,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'The Gambia',
		'sprite': 'gambia.svg',
		'xScale': 0.11, 
		'x': 43.32, 
		'y': 41.6,
		'w': 2,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},	
	{	'name': 'Guinea-Bissau',
		'sprite': 'guineabissau.svg',
		'xScale': 0.11, 
		'x': 43.345, 
		'y': 42.46,
		'w': 2,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},	
	{	'name': 'Guinea',
		'sprite': 'guinea.svg',
		'xScale': 0.11, 
		'x': 44.37, 
		'y': 43.45,
		'w': 4,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Sierra Leone',
		'sprite': 'sierraleone.svg',
		'xScale': 0.11, 
		'x': 44.22, 
		'y': 44.235,
		'w': 3,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Liberia',
		'sprite': 'liberia.svg',
		'xScale': 0.11, 
		'x': 44.84, 
		'y': 45.3,
		'w': 4,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Cote d\'Ivoire',
		'sprite': 'cotedeivoire.svg',
		'xScale': 0.11, 
		'x': 45.875, 
		'y': 44.71,
		'w': 10,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},			
	{	'name': 'Burkina Faso',
		'sprite': 'burkinafaso.svg',
		'xScale': 0.11, 
		'x': 46.94, 
		'y': 42.22,
		'w': 10,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},	
	{	'name': 'Ghana',
		'sprite': 'ghana.svg',
		'xScale': 0.11, 
		'x': 47.06, 
		'y': 44.52,
		'w': 5,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Togo',
		'sprite': 'togo.svg',
		'xScale': 0.11, 
		'x': 47.54, 
		'y': 44.16,
		'w': 2,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Benin',
		'sprite': 'benin.svg',
		'xScale': 0.11, 
		'x': 47.94, 
		'y': 43.79,
		'w': 4,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Niger',
		'sprite': 'niger.svg',
		'xScale': 0.11, 
		'x': 49.52, 
		'y': 39.38,
		'w': 20,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Nigeria',
		'sprite': 'nigeria.svg',
		'xScale': 0.11, 
		'x': 49.66, 
		'y': 43.9,
		'w': 14,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Chad',
		'sprite': 'chad.svg',
		'xScale': 0.11, 
		'x': 52.29, 
		'y': 40.5,
		'w': 18,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Sudan',
		'sprite': 'sudan.svg',
		'xScale': 0.11, 
		'x': 55.32, 
		'y': 40.1,
		'w': 24,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		

	
	
];
var temp = [


	
	
];

//alter SVGS:
//background #CBE6A3

//1090, 720
//500, 300

/*
macedonia is a really awkward shape
russia appears to own a chunk of land on the coast between Poland and Lithuania
norway is also a really awkward shape
western sahara isn't a place? Confusing
there are a LOT of countries
potentially provocative - should Palestine be in here?
fascinating learning experience - didn't even know benin existed
*/