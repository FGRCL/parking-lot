const path = require('path');

module.exports = {
	entry: './js/main.js',
	output: {
		library: 'parkinglot',
		path: path.resolve(__dirname, 'assets'),
	},
};
