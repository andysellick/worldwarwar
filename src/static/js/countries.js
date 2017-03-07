
var spritepath = '/static/img/';


//map images from https://github.com/djaiss/mapsicon
var allcountries = [
	{	'name': 'Britain',
		'sprite': 'britain.svg',
		'xScale': 0.04, //apparently yScale is not needed
		//x and y pos are stored as percentages
		'x': 46.8, 
		'y': 22.2,
		'w': 11,
		'unique': [
			'Shakespeare',
			'the Beatles',
			'the steam turbine'
		]
	},
	{	'name': 'Ireland',
		'sprite': 'ireland.svg',
		'xScale': 0.017,
		'x': 45.67, 
		'y': 23.13,
		'w': 6,
		'unique': [
			'Guinness',
			'Sudocrem',
			'Clofazimine'
		]		
	},
	{	'name': 'France',
		'sprite': 'france.svg',
		'xScale': 0.037, 
		'x': 48, 
		'y': 27.3,
		'w': 15,
		'unique': [
			'the Rabies vaccine',
			'champagne',
			'photography'
		]		
	},
	{	'name': 'Belgium',
		'sprite': 'belgium.svg',
		'xScale': 0.0095, 
		'x': 48.3, 
		'y': 24.95,
		'w': 4,
		'unique': [
			'roller skates',
			'saxophones',
			'chlorofluorocarbons'
		]		
	},
	{	'name': 'Spain',
		'sprite': 'spain.svg',
		'xScale': 0.033, 
		'x': 46.85, 
		'y': 30.7,
		'w': 13,
		'unique': [
			'laryngoscopy',
			'paella',
			'sherry'
		]		
	},
	{	'name': 'Portugal',
		'sprite': 'portugal.svg',
		'xScale': 0.016, 
		'x': 45.7, 
		'y': 30.88,
		'w': 3,
		'unique': [
			'eslicarbazepine acetate',
			'cerebral angiography',
			'the carrack'
		]		
	},
	{	'name': 'The Netherlands',
		'sprite': 'netherlands.svg',
		'xScale': 0.0115, 
		'x': 48.47, 
		'y': 23.95,
		'w': 3,
		'unique': [
			'the electrocardiograph',
			'the microscope',
			'Python'
		]		
	},
	{	'name': 'Luxembourg',
		'sprite': 'luxembourg.svg',
		'xScale': 0.003, 
		'x': 48.65, 
		'y': 25.35,
		'w': 2,
		'unique': [
			'bouneschlupp',
			'Andy Schleck',
			'Edward Steichen'
		]		
	},
	{	'name': 'Germany',
		'sprite': 'germany.svg',
		'xScale': 0.029, 
		'x': 49.68, 
		'y': 24.53,
		'w': 10,
		'unique': [
			'aspirin',
			'the integrated circuit',
			'the diesel engine'
		]		
	},
	{	'name': 'Switzerland',
		'sprite': 'switzerland.svg',
		'xScale': 0.013, 
		'x': 49.17, 
		'y': 27,
		'w': 4,
		'unique': [
			'bobsleigh',
			'muesli',
			'white chocolate'
		]		
	},
	{	'name': 'Italy',
		'sprite': 'italy.svg',
		'xScale': 0.037, 
		'x': 50.15, 
		'y': 29.85,
		'w': 10,
		'unique': [
			'pizza',
			'espresso',
			'glasses'
		]		
	},
	{	'name': 'Austria',
		'sprite': 'austria.svg',
		'xScale': 0.014, 
		'x': 50.35, 
		'y': 26.55,
		'w': 7,
		'unique': [
			'digital clocks',
			'the Altekruse Puzzle',
			'the Schrodinger equation'
		]		
	},
	{	'name': 'Denmark',
		'sprite': 'denmark.svg',
		'xScale': 0.015, 
		'x': 49.6, 
		'y': 21.5,
		'w': 7,
		'unique': [
			'Gaboxadol',
			'Google Maps',
			'Lego'
		]		
	},
	{	'name': 'The Czech Republic',
		'sprite': 'czechrepublic.svg',
		'xScale': 0.018, 
		'x': 50.83, 
		'y': 25.3,
		'w': 4,
		'unique': [
			'Jan Hammer',
			'Gregor Mendel',
			'Skoda cars'
		]		
	},
	{	'name': 'Poland',
		'sprite': 'poland.svg',
		'xScale': 0.032, 
		'x': 51.85, 
		'y': 24.08,
		'w': 10,
		'unique': [
			'Copernicus',
			'vodka',
			'bagels'
		]		
	},
	{	'name': 'Slovenia',
		'sprite': 'slovenia.svg',
		'xScale': 0.011, 
		'x': 50.68, 
		'y': 27.55,
		'w': 3,
		'unique': [
			'plastic ice skates',
			'the Skocjan caves',
			'potica'
		]		
	},
	{	'name': 'Slovakia',
		'sprite': 'slovakia.svg',
		'xScale': 0.016, 
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
		'xScale': 0.02, 
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
		'xScale': 0.017, 
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
		'xScale': 0.012, 
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
		'xScale': 0.018, 
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
		'xScale': 0.006, 
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
		'xScale': 0.012, 
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
		'xScale': 0.007, 
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
		'xScale': 0.025, 
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
		'xScale': 0.017, 
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
		'xScale': 0.029, 
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
		'xScale': 0.011, 
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
		'xScale': 0.048, 
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

];
var temp = [

	
	
];

//alter SVGS:
//background #CBE6A3
//border black, 5px