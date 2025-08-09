const path = require('path');

module.exports = {
	entry: './src/main.js',
	output: {
		library: 'parkinglot',
		path: path.resolve(__dirname, 'docs'),
	},
};
