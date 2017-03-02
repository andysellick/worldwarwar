
var spritepath = '/static/img/';


//map images from https://github.com/djaiss/mapsicon
var allcountries = [
	{	'name': 'Britain',
		'sprite': 'britain.svg',
		'xScale': 0.09, //apparently yScale is not needed
		//x and y pos and w and h are stored as percentages
		'x': 50, 
		'y': 30,
		'w': 40,
		'h': 40,
		'unique': [
			'Shakespeare',
			'the Beatles',
			'the steam turbine'
		]
	},
	{	'name': 'Ireland',
		'sprite': 'ireland.svg',
		'xScale': 0.035, //apparently yScale is not needed
		//x and y pos and w and h are stored as percentages
		'x': 43.5, 
		'y': 45,
		'w': 40,
		'h': 40,
		'unique': [
			'Guinness',
			'Sudocrem',
			'Clofazimine'
		]		
	},
	{	'name': 'France',
		'sprite': 'france.svg',
		'xScale': 0.09, //apparently yScale is not needed
		//x and y pos and w and h are stored as percentages
		'x': 55, 
		'y': 65,
		'w': 40,
		'h': 40,
		'unique': [
			'the Rabies vaccine',
			'champagne',
			'photography'
		]		
	},
	{	'name': 'Belgium',
		'sprite': 'belgium.svg',
		'xScale': 0.02, 
		'x': 56, 
		'y': 53,
		'w': 40,
		'h': 40,
		'unique': [
			'roller skates',
			'saxophones',
			'chlorofluorocarbons'
		]		
	},

	
];