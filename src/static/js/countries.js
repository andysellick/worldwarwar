
var spritepath = '/static/img/';


//map images from https://github.com/djaiss/mapsicon
var allcountries = [
	{	'name': 'Britain',
		'sprite': 'britain.svg',
		'xScale': 0.07, //apparently yScale is not needed
		//x and y pos are stored as percentages
		'x': 46.5, 
		'y': 23,
		'w': 10,
		'unique': [
			'Shakespeare',
			'the Beatles',
			'the steam turbine'
		]
	},
	{	'name': 'Ireland',
		'sprite': 'ireland.svg',
		'xScale': 0.035,
		'x': 45.5, 
		'y': 24,
		'w': 6,
		'unique': [
			'Guinness',
			'Sudocrem',
			'Clofazimine'
		]		
	},
	{	'name': 'France',
		'sprite': 'france.svg',
		'xScale': 0.07, 
		'x': 48, 
		'y': 27,
		'w': 15,
		'unique': [
			'the Rabies vaccine',
			'champagne',
			'photography'
		]		
	},
	{	'name': 'Belgium',
		'sprite': 'belgium.svg',
		'xScale': 0.02, 
		'x': 48.2, 
		'y': 24.7,
		'w': 4,
		'unique': [
			'roller skates',
			'saxophones',
			'chlorofluorocarbons'
		]		
	},
	{	'name': 'Spain',
		'sprite': 'spain.svg',
		'xScale': 0.07, 
		'x': 46.5, 
		'y': 30,
		'w': 13,
		'unique': [
			'laryngoscopy',
			'paella',
			'sherry'
		]		
	},
	{	'name': 'Portugal',
		'sprite': 'portugal.svg',
		'xScale': 0.04, 
		'x': 45.5, 
		'y': 30,
		'w': 3,
		'unique': [
			'eslicarbazepine acetate',
			'cerebral angiography',
			'the carrack'
		]		
	},
	{	'name': 'The Netherlands',
		'sprite': 'netherlands.svg',
		'xScale': 0.027, 
		'x': 48.6, 
		'y': 23.9,
		'w': 3,
		'unique': [
			'the electrocardiograph',
			'the microscope',
			'Python'
		]		
	},
	{	'name': 'Luxembourg',
		'sprite': 'luxembourg.svg',
		'xScale': 0.01, 
		'x': 48, 
		'y': 25.2,
		'w': 2,
		'unique': [
			'bouneschlupp',
			'Andy Schleck',
			'Edward Steichen'
		]		
	},
	{	'name': 'Germany',
		'sprite': 'germany.svg',
		'xScale': 0.06, 
		'x': 49.5, 
		'y': 24.7,
		'w': 10,
		'unique': [
			'aspirin',
			'the integrated circuit',
			'the diesel engine'
		]		
	},
	{	'name': 'Switzerland',
		'sprite': 'switzerland.svg',
		'xScale': 0.02, 
		'x': 49.1, 
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
		'xScale': 0.07, 
		'x': 50, 
		'y': 29.5,
		'w': 10,
		'unique': [
			'pizza',
			'espresso',
			'glasses'
		]		
	},
	{	'name': 'Austria',
		'sprite': 'austria.svg',
		'xScale': 0.03, 
		'x': 50.2, 
		'y': 26.5,
		'w': 4,
		'unique': [
			'digital clocks',
			'the Altekruse Puzzle',
			'the Schrodinger equation'
		]		
	},
	{	'name': 'Denmark',
		'sprite': 'denmark.svg',
		'xScale': 0.03, 
		'x': 50, 
		'y': 22,
		'w': 4,
		'unique': [
			'Gaboxadol',
			'Google Maps',
			'Lego'
		]		
	},
	{	'name': 'The Czech Republic',
		'sprite': 'czechrepublic.svg',
		'xScale': 0.03, 
		'x': 50.5, 
		'y': 25.5,
		'w': 4,
		'unique': [
			'Jan Hammer',
			'Gregor Mendel',
			'Skoda cars'
		]		
	},
	{	'name': 'Poland',
		'sprite': 'poland.svg',
		'xScale': 0.06, 
		'x': 51.2, 
		'y': 24.5,
		'w': 10,
		'unique': [
			'Copernicus',
			'vodka',
			'bagels'
		]		
	},

	
	
];