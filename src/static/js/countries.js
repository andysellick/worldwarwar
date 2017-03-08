
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
];
var temp = [
	{	'name': 'Slovakia',
		'sprite': 'slovakia.svg',
		'xScale': 0.11, 
		'x': 51.85, 
		'y': 25.95,
		'w': 4,
		'unique': [
			'plastic ice skates',
			'the Skocjan caves',
			'potica'
		]		
	},
	{	'name': 'Hungary',
		'sprite': 'hungary.svg',
		'xScale': 0.11, 
		'x': 51.85, 
		'y': 26.85,
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
		'x': 51.1, 
		'y': 28.45,
		'w': 4,
		'unique': [
			'the necktie',
			'dalmatians',
			'the Puretic power block'
		]		
	},
	{	'name': 'Bosnia and Herzegovina',
		'sprite': 'bosniaandherz.svg',
		'xScale': 0.11, 
		'x': 51.44, 
		'y': 28.9,
		'w': 3,
		'unique': [
			'Ivo Andric',
			'Mesa Selimovic'
		]		
	},
	{	'name': 'Serbia',
		'sprite': 'serbia.svg',
		'xScale': 0.11, 
		'x': 52.25, 
		'y': 28.8,
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
		'x': 51.85, 
		'y': 29.6,
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
		'x': 52.07, 
		'y': 30.5,
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
		'x': 52.45, 
		'y': 30.25,
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
		'x': 53, 
		'y': 32.1,
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
		'x': 53.35, 
		'y': 29.6,
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
		'x': 53.3, 
		'y': 27.6,
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
		'x': 54.1, 
		'y': 26.9,
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
		'x': 54.8, 
		'y': 26.15,
		'w': 10,
		'unique': [
			'postal codes',
			'Battleship Potemkin', 
			'the S.T.A.L.K.E.R. games' 
		]		
	},
	{	'name': 'Belarus',
		'sprite': 'belarus.svg',
		'xScale': 0.025, 
		'x': 54, 
		'y': 22.8,
		'w': 8,
		'unique': [
			'minsk computers',
			'draniki',
			'' //FIXME
		]		
	},
	{	'name': 'Lithuania',
		'sprite': 'lithuania.svg',
		'xScale': 0.014, 
		'x': 53.15, 
		'y': 21.85,
		'w': 5,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Latvia',
		'sprite': 'latvia.svg',
		'xScale': 0.016, 
		'x': 53.34, 
		'y': 20.8,
		'w': 4,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Estonia',
		'sprite': 'estonia.svg',
		'xScale': 0.014, 
		'x': 53.4, 
		'y': 19.75,
		'w': 4,
		'unique': [
			'',
			'', //FIXME
			'Skype'
		]		
	},
	{	'name': 'Sweden',
		'sprite': 'sweden.svg',
		'xScale': 0.06, 
		'x': 51.3, 
		'y': 17.4,
		'w': 10,
		'unique': [
			'Bluetooth',
			'celsius',
			'styrofoam'
		]		
	},
	{	'name': 'Russia',
		'sprite': 'russia.svg',
		'xScale': 0.25, 
		'x': 66, 
		'y': 20,
		'w': 10,
		'unique': [
			'',
			'',
			''
		]		
	},


	
	
];

//alter SVGS:
//background #CBE6A3

//1090, 720
//500, 300