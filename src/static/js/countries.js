var spritepath = '/static/img/';
var direurope = 'europe/';
var dirasia = 'asia/';
var dirafrica = 'africa/';
var diroceania = 'oceania/';
var dirnamerica = 'namerica/';
var dirsamerica = 'samerica/';


//map images now from https://en.wikipedia.org/wiki/Wikipedia%3aBlank_maps#/media/File:BlankMap-World6.svg
//previous map images from https://www.amcharts.com/svg-maps/
//previous map images from https://github.com/djaiss/mapsicon
var allcountries = [
	{	'name': 'United Kingdom',
		'dir': direurope,
		'sprite': 'unitedkingdom.svg',
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
		'dir': direurope,
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
	{	'name': 'Iceland',
		'dir': direurope,
		'sprite': 'iceland.svg',
		'xScale': 0.11,
		'yScale': 0.1,
		'x': 44, 
		'y': 14.1,
		'w': 9,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'France',
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
	{	'name': 'Andorra',
		'dir': direurope,
		'sprite': 'andorra.svg',
		'xScale': 0.11, 
		'x': 47.85,
		'y': 26.01,
		'w': 0.8,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'The Netherlands',
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
		'sprite': 'slovakia.svg',
		'xScale': 0.11, 
		'x': 52.18, 
		'y': 22.82,
		'w': 3,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Hungary',
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
		'sprite': 'russia.svg',
		'xScale': 0.11, 
		'x': 69.6, 
		'y': 17.23,
		'w': 450,
		'h': 60,
		'unique': [
			'space suits',
			'nuclear power plants',
			'Isaac Asimov'
		]		
	},
	{	'name': 'Kazakhstan',
		'dir': direurope,
		'sprite': 'kazakhstan.svg',
		'xScale': 0.11, 
		'x': 63.06, 
		'y': 23.21,
		'w': 130,
		'h': 40,
		'unique': [
			'',
			'',
			''
		]		
	},
	{	'name': 'Finland',
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
		'dir': direurope,
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
	{	'name': 'Cyprus',
		'dir': direurope,
		'sprite': 'cyprus.svg',
		'xScale': 0.11, 
		'x': 55.7, 
		'y': 30.1,
		'w': 2,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Armenia',
		'dir': direurope,
		'sprite': 'armenia.svg',
		'xScale': 0.11, 
		'x': 58.45, 
		'y': 27.36,
		'w': 4,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Azerbaijan',
		'dir': dirasia,
		'sprite': 'azerbaijan.svg',
		'xScale': 0.11, 
		'x': 59.09, 
		'y': 27.31,
		'w': 2,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Georgia',
		'dir': direurope,
		'sprite': 'georgia.svg',
		'xScale': 0.11, 
		'x': 57.98, 
		'y': 26.15,
		'w': 2,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Syria',
		'dir': dirasia,
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
		'dir': dirasia,
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
		'dir': dirasia,
		'sprite': 'israel.svg',
		'xScale': 0.11, 
		'x': 56.19, 
		'y': 31.98,
		'w': 2,
		'h': 12,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Palestine',
		'dir': dirasia,
		'sprite': 'palestine.svg',
		'xScale': 0.11, 
		'x': 56.3, 
		'y': 31.7,
		'w': 0.9,
		'h': 5,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Jordan',
		'dir': dirasia,
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
		'dir': dirasia,
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
		'dir': dirasia,
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
		'dir': dirasia,
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
		'dir': dirasia,
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
		'dir': dirasia,
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
		'dir': dirasia,
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
		'dir': dirasia,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
		'sprite': 'cotedivoire.svg',
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
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
		'dir': dirafrica,
		'sprite': 'nigeria.svg',
		'xScale': 0.11, 
		'x': 49.66, 
		'y': 43.9,
		'w': 10,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Chad',
		'dir': dirafrica,
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
		'dir': dirafrica,
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
	{	'name': 'Eritrea',
		'dir': dirafrica,
		'sprite': 'eritrea.svg',
		'xScale': 0.11, 
		'x': 57.79, 
		'y': 40.66,
		'w': 6,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Djibouti',
		'dir': dirafrica,
		'sprite': 'djibouti.svg',
		'xScale': 0.11, 
		'x': 58.52, 
		'y': 42.46,
		'w': 3,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Ethiopia',
		'dir': dirafrica,
		'sprite': 'ethiopia.svg',
		'xScale': 0.11, 
		'x': 58.075, 
		'y': 43.89,
		'w': 10,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'Somalia',
		'dir': dirafrica,
		'sprite': 'somalia.svg',
		'xScale': 0.11, 
		'x': 59.555, 
		'y': 46.03,
		'w': 10,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},		
	{	'name': 'South Sudan',
		'dir': dirafrica,
		'sprite': 'southsudan.svg',
		'xScale': 0.11, 
		'x': 55.21, 
		'y': 44.53,
		'w': 14,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},	
	
	{	'name': 'Central Africa Republic',
		'dir': dirafrica,
		'sprite': 'car.svg',
		'xScale': 0.11, 
		'x': 52.91, 
		'y': 45.23,
		'w': 12,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Cameroon',
		'dir': dirafrica,
		'sprite': 'cameroon.svg',
		'xScale': 0.11, 
		'x': 50.56, 
		'y': 44.82,
		'w': 10,
		'h': 40,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Equatorial Guinea',
		'dir': dirafrica,
		'sprite': 'equatorialguinea.svg',
		'xScale': 0.11, 
		'x': 49.92, 
		'y': 47.47,
		'w': 5,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Gabon',
		'dir': dirafrica,
		'sprite': 'gabon.svg',
		'xScale': 0.11, 
		'x': 50.412, 
		'y': 49.16,
		'w': 8,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Republic of the Congo',
		'dir': dirafrica,
		'sprite': 'republicofthecongo.svg',
		'xScale': 0.11, 
		'x': 51.28, 
		'y': 49.1,
		'w': 6,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Democratic Republic of the Congo',
		'dir': dirafrica,
		'sprite': 'democraticrepublicofthecongo.svg',
		'xScale': 0.11, 
		'x': 53.18, 
		'y': 50.9,
		'w': 20,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Uganda',
		'dir': dirafrica,
		'sprite': 'uganda.svg',
		'xScale': 0.11, 
		'x': 55.875, 
		'y': 48,
		'w': 8,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Kenya',
		'dir': dirafrica,
		'sprite': 'kenya.svg',
		'xScale': 0.11, 
		'x': 57.38, 
		'y': 48.77,
		'w': 12,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Rwanda',
		'dir': dirafrica,
		'sprite': 'rwanda.svg',
		'xScale': 0.11, 
		'x': 55.2, 
		'y': 49.79,
		'w': 2,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Burundi',
		'dir': dirafrica,
		'sprite': 'burundi.svg',
		'xScale': 0.11, 
		'x': 55.22, 
		'y': 50.57,
		'w': 3,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Tanzania',
		'dir': dirafrica,
		'sprite': 'tanzania.svg',
		'xScale': 0.11, 
		'x': 56.6, 
		'y': 52.14,
		'w': 15,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Zambia',
		'dir': dirafrica,
		'sprite': 'zambia.svg',
		'xScale': 0.11, 
		'x': 54.7, 
		'y': 55.73,
		'w': 14,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Angola',
		'dir': dirafrica,
		'sprite': 'angola.svg',
		'xScale': 0.11, 
		'x': 52.1, 
		'y': 54.7,
		'w': 18,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Namibia',
		'dir': dirafrica,
		'sprite': 'namibia.svg',
		'xScale': 0.11, 
		'x': 52.24, 
		'y': 60.94,
		'w': 14,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Botswana',
		'dir': dirafrica,
		'sprite': 'botswana.svg',
		'xScale': 0.11, 
		'x': 53.79, 
		'y': 60.62,
		'w': 12,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Zimbabwe',
		'dir': dirafrica,
		'sprite': 'zimbabwe.svg',
		'xScale': 0.11, 
		'x': 54.98, 
		'y': 58.87,
		'w': 10,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Malawi',
		'dir': dirafrica,
		'sprite': 'malawi.svg',
		'xScale': 0.11, 
		'x': 56.33, 
		'y': 55.79,
		'w': 4,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Mozambique',
		'dir': dirafrica,
		'sprite': 'mozambique.svg',
		'xScale': 0.11, 
		'x': 56.69, 
		'y': 58.69,
		'w': 16,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Madagascar',
		'dir': dirafrica,
		'sprite': 'madagascar.svg',
		'xScale': 0.11, 
		'x': 59.6, 
		'y': 58.69,
		'w': 14,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'South Africa',
		'dir': dirafrica,
		'sprite': 'southafrica.svg',
		'xScale': 0.11, 
		'x': 53.8, 
		'y': 63.89,
		'w': 17,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Turkmenistan',
		'dir': dirasia,
		'sprite': 'turkmenistan.svg',
		'xScale': 0.11, 
		'x': 62.1, 
		'y': 27.95,
		'w': 12,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Iran',
		'dir': dirasia,
		'sprite': 'iran.svg',
		'xScale': 0.11, 
		'x': 61.02, 
		'y': 31.43,
		'w': 20,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Uzbekistan',
		'dir': dirasia,
		'sprite': 'uzbekistan.svg',
		'xScale': 0.11, 
		'x': 63.11, 
		'y': 26.67,
		'w': 8,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Kyrgyzstan',
		'dir': dirasia,
		'sprite': 'kyrgyzstan.svg',
		'xScale': 0.11, 
		'x': 65.65, 
		'y': 26.73,
		'w': 6,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Tajikistan',
		'dir': dirasia,
		'sprite': 'tajikistan.svg',
		'xScale': 0.11, 
		'x': 64.99, 
		'y': 27.97,
		'w': 8,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Afghanistan',
		'dir': dirasia,
		'sprite': 'afghanistan.svg',
		'xScale': 0.11, 
		'x': 64.32, 
		'y': 30.62,
		'w': 10,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Pakistan',
		'dir': dirasia,
		'sprite': 'pakistan.svg',
		'xScale': 0.11, 
		'x': 64.91, 
		'y': 32.51,
		'w': 10,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'India',
		'dir': dirasia,
		'sprite': 'india.svg',
		'xScale': 0.11, 
		'x': 68.76, 
		'y': 37.45,
		'w': 24,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Sri Lanka',
		'dir': dirasia,
		'sprite': 'srilanka.svg',
		'xScale': 0.11, 
		'x': 68.6, 
		'y': 44.5,
		'w': 5,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Nepal',
		'dir': dirasia,
		'sprite': 'nepal.svg',
		'xScale': 0.11, 
		'x': 68.9, 
		'y': 33.57,
		'w': 5,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'China',
		'dir': dirasia,
		'sprite': 'china.svg',
		'xScale': 0.11, 
		'x': 72.25, 
		'y': 29.66,
		'w': 140,
		'h': 50,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Mongolia',
		'dir': dirasia,
		'sprite': 'mongolia.svg',
		'xScale': 0.11, 
		'x': 71.75, 
		'y': 23.8,
		'w': 100,
		'h': 30,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Bhutan',
		'dir': dirasia,
		'sprite': 'bhutan.svg',
		'xScale': 0.11, 
		'x': 70.51, 
		'y': 34.06,
		'w': 6,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Bangladesh',
		'dir': dirasia,
		'sprite': 'bangladesh.svg',
		'xScale': 0.11, 
		'x': 70.68, 
		'y': 36.09,
		'w': 8,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Myanmar',
		'dir': dirasia,
		'sprite': 'myanmar.svg',
		'xScale': 0.11, 
		'x': 72.35, 
		'y': 38.42,
		'w': 15,
		'h': 60,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Thailand',
		'dir': dirasia,
		'sprite': 'thailand.svg',
		'xScale': 0.11, 
		'x': 73.78, 
		'y': 41.71,
		'w': 10,
		'h': 60,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Laos',
		'dir': dirasia,
		'sprite': 'laos.svg',
		'xScale': 0.11, 
		'x': 74.37, 
		'y': 38.95,
		'w': 8,
		'h': 30,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Vietnam',
		'dir': dirasia,
		'sprite': 'vietnam.svg',
		'xScale': 0.11, 
		'x': 74.87, 
		'y': 40.15,
		'w': 6,
		'h': 25,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Cambodia',
		'dir': dirasia,
		'sprite': 'cambodia.svg',
		'xScale': 0.11, 
		'x': 74.86, 
		'y': 42.07,
		'w': 4,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Taiwan',
		'dir': dirasia,
		'sprite': 'taiwan.svg',
		'xScale': 0.11, 
		'x': 78.1, 
		'y': 36.5,
		'w': 4,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'North Korea',
		'dir': dirasia,
		'sprite': 'northkorea.svg',
		'xScale': 0.11, 
		'x': 78.38, 
		'y': 27.25,
		'w': 9,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'South Korea',
		'dir': dirasia,
		'sprite': 'southkorea.svg',
		'xScale': 0.11, 
		'x': 79.11, 
		'y': 29.6,
		'w': 9,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Japan',
		'dir': dirasia,
		'sprite': 'japan.svg',
		'xScale': 0.11, 
		'x': 80.9, 
		'y': 30.1,
		'w': 18,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Malaysia',
		'dir': dirasia,
		'sprite': 'malaysia.svg',
		'xScale': 0.11, 
		'x': 76.185, 
		'y': 46.48,
		'w': 70,
		'h': 20,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Philippines',
		'dir': dirasia,
		'sprite': 'philippines.svg',
		'xScale': 0.11, 
		'x': 79.4, 
		'y': 42,
		'w': 23,
		'h': 58,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Indonesia',
		'dir': dirasia,
		'sprite': 'indonesia.svg',
		'xScale': 0.11, 
		'x': 78.45, 
		'y': 50,
		'w': 170,
		'h': 40,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Papua New Guinea',
		'dir': diroceania,
		'sprite': 'papuanewguinea.svg',
		'xScale': 0.11, 
		'x': 86.41, 
		'y': 52.12,
		'w': 60,
		'h': 40,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Australia',
		'dir': diroceania,
		'sprite': 'australia.svg',
		'xScale': 0.11, 
		'x': 81.7, 
		'y': 62.9,
		'w': 60,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'New Zealand',
		'dir': diroceania,
		'sprite': 'newzealand.svg',
		'xScale': 0.11, 
		'x': 89, 
		'y': 71.5,
		'w': 16,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Greenland',
		'dir': direurope,
		'sprite': 'greenland.svg',
		'xScale': 0.11, 
		'x': 41, 
		'y': 11.5,
		'w': 40,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Canada',
		'dir': dirnamerica,
		'sprite': 'canada.svg',
		'xScale': 0.11, 
		'x': 27.1, 
		'y': 16.5,
		'w': 210,
		'h': 90,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'United States (mainland)',
		'dir': dirnamerica,
		'sprite': 'us_main.svg',
		'xScale': 0.11, 
		'x': 23.25, 
		'y': 28.51,
		'w': 180,
		'h': 60,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'United States (Alaska)',
		'dir': dirnamerica,
		'sprite': 'us_alaska.svg',
		'xScale': 0.11, 
		'x': 15.39, 
		'y': 15.47,
		'w': 30,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'United States (Hawaii)',
		'dir': dirnamerica,
		'sprite': 'us_hawaii.svg',
		'xScale': 0.11, 
		'x': 4.5, 
		'y': 38.5,
		'w': 6,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Mexico',
		'dir': dirnamerica,
		'sprite': 'mexico.svg',
		'xScale': 0.11, 
		'x': 20.05, 
		'y': 35.73,
		'w': 25,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Guatemala',
		'dir': dirnamerica,
		'sprite': 'guatemala.svg',
		'xScale': 0.11, 
		'x': 22.53, 
		'y': 39.9,
		'w': 7,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Honduras',
		'dir': dirnamerica,
		'sprite': 'honduras.svg',
		'xScale': 0.11, 
		'x': 23.56, 
		'y': 40.49,
		'w': 5,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'El Salvador',
		'dir': dirnamerica,
		'sprite': 'elsalvador.svg',
		'xScale': 0.11, 
		'x': 22.81, 
		'y': 40.98,
		'w': 3,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Belize',
		'dir': dirnamerica,
		'sprite': 'belize.svg',
		'xScale': 0.11, 
		'x': 23.02, 
		'y': 39.15,
		'w': 3,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Nicaragua',
		'dir': dirnamerica,
		'sprite': 'nicaragua.svg',
		'xScale': 0.11, 
		'x': 23.75, 
		'y': 41.48,
		'w': 4,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Costa Rica',
		'dir': dirnamerica,
		'sprite': 'costarica.svg',
		'xScale': 0.11, 
		'x': 23.94, 
		'y': 43.22,
		'w': 5,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Panama',
		'dir': dirnamerica,
		'sprite': 'panama.svg',
		'xScale': 0.11, 
		'x': 25.01, 
		'y': 43.88,
		'w': 5,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Cuba',
		'dir': dirnamerica,
		'sprite': 'cuba.svg',
		'xScale': 0.11, 
		'x': 26, 
		'y': 36.8,
		'w': 30,
		'h': 6,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'The Bahamas',
		'dir': dirnamerica,
		'sprite': 'bahamas.svg',
		'xScale': 0.11, 
		'x': 27, 
		'y': 35.6,
		'w': 8,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Jamaica',
		'dir': dirnamerica,
		'sprite': 'jamaica.svg',
		'xScale': 0.11, 
		'x': 26.5, 
		'y': 38.5,
		'w': 3,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Haiti',
		'dir': dirnamerica,
		'sprite': 'haiti.svg',
		'xScale': 0.11, 
		'x': 27.6, 
		'y': 38,
		'w': 4,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Dominican Republic',
		'dir': dirnamerica,
		'sprite': 'dominicanrepublic.svg',
		'xScale': 0.11, 
		'x': 28.35, 
		'y': 38.16,
		'w': 6,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Puerto Rico',
		'dir': dirnamerica,
		'sprite': 'puertorico.svg',
		'xScale': 0.11, 
		'x': 29.3, 
		'y': 38.3,
		'w': 2,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Colombia',
		'dir': dirsamerica,
		'sprite': 'colombia.svg',
		'xScale': 0.11, 
		'x': 26.875, 
		'y': 46.18,
		'w': 16,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Venezuela',
		'dir': dirsamerica,
		'sprite': 'venezuela.svg',
		'xScale': 0.11, 
		'x': 28.63, 
		'y': 44.94,
		'w': 14,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Guyana',
		'dir': dirsamerica,
		'sprite': 'guyana.svg',
		'xScale': 0.11, 
		'x': 30.52, 
		'y': 45.76,
		'w': 10,
		'h': 20,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Suriname',
		'dir': dirsamerica,
		'sprite': 'suriname.svg',
		'xScale': 0.11, 
		'x': 31.325, 
		'y': 46.25,
		'w': 6,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'French Guiana',
		'dir': dirsamerica,
		'sprite': 'frenchguiana.svg',
		'xScale': 0.11, 
		'x': 32.07, 
		'y': 46.25,
		'w': 6,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Ecuador',
		'dir': dirsamerica,
		'sprite': 'ecuador.svg',
		'xScale': 0.11, 
		'x': 25.46, 
		'y': 49.3,
		'w': 8,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Peru',
		'dir': dirsamerica,
		'sprite': 'peru.svg',
		'xScale': 0.11, 
		'x': 26.335, 
		'y': 53.25,
		'w': 30,
		'h': 55,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Brazil',
		'dir': dirsamerica,
		'sprite': 'brazil.svg',
		'xScale': 0.11, 
		'x': 31.735, 
		'y': 55.92,
		'w': 40,
		'h': 60,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Bolivia',
		'dir': dirsamerica,
		'sprite': 'bolivia.svg',
		'xScale': 0.11, 
		'x': 29.54, 
		'y': 57.02,
		'w': 16,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Paraguay',
		'dir': dirsamerica,
		'sprite': 'paraguay.svg',
		'xScale': 0.11, 
		'x': 31.095, 
		'y': 60.8,
		'w': 10,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Argentina',
		'dir': dirsamerica,
		'sprite': 'argentina.svg',
		'xScale': 0.11, 
		'x': 30.37, 
		'y': 68.665,
		'w': 30,
		'h': 120,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Uruguay',
		'dir': dirsamerica,
		'sprite': 'uruguay.svg',
		'xScale': 0.11, 
		'x': 32.2, 
		'y': 65.63,
		'w': 9,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'Chile',
		'dir': dirsamerica,
		'sprite': 'chile.svg',
		'xScale': 0.11, 
		'x': 28.87, 
		'y': 67.75,
		'w': 10,
		'h': 120,
		'unique': [
			'',
			'', //FIXME
			''
		]		
	},
	{	'name': 'UK (Falkland Islands)',
		'dir': dirsamerica,
		'sprite': 'falklandislands.svg',
		'xScale': 0.11, 
		'x': 33, 
		'y': 76,
		'w': 3,
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
ended up restarting with country positioning and three different sets of images 3 times...
gave up on inventions towards the end of europe
textures aren't drawn until shapes on screen, but shapes usually are overlapped by textures
macedonia is a really awkward shape
russia appears to own a chunk of land on the coast between Poland and Lithuania
norway is also a really awkward shape
western sahara isn't a place? Confusing
there are a LOT of countries
potentially provocative - should Palestine be in here?
fascinating learning experience - didn't even know benin existed, central african republic
azerbaijan is hugging armenia
had to break the US into 3 chunks. Noone else was this unhelpful. Thanks, US.
so minus 2 countries from total
also minus greenland, which belongs to denmark
Too small to include (probably): (37 countries)
Malta
Kosovo (inside serbia)
Liechtenstein
Monaco
San Marino (is this a country inside Italy??)
Vatican City
Bahrain
Singapore
Timor-Leste
Brunei
Maldives
Cape Verde
Comoros
Mauritius
Sau Tome and Principe
Seychelles
Lesotho (literally inside SA)
Swaziland
Fiji
Kiribati
Marshall Islands
Micronesia
Nauru
Palau
Samoa
Solomon Islands
Tonga
Tuvalu
Vanatu
Barbados
Dominica
Antigua and Barbuda
Grenada
Saint Kitts and Nevis
Saint Lucia
Saint Vincent and the Grenadines
Trinidad and Tobago

*/