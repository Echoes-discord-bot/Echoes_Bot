var fs = require('fs'); 
var parse = require('csv-parse');
const { Console } = require('console');

var parser = parse
({columns: true}, 
	async function (err, records) {
});

fs.createReadStream('./stats.csv').pipe(parser);
