// discord init
const Discord = require('discord.js');
const client = new Discord.Client();

// market module
const { Market } = require('./modules/market');
const marketModule = new Market;

// end file reader
require('dotenv').config();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const commandBody = message.content.slice(process.prefix.length)
	const args = commandBody.trim().split(' ');
	const command = args.shift().toLowerCase();

	console.log(args);

	// market module
	marketModule.process(command, args, message);

});

fs.createReadStream("./stats.csv").pipe(parser);


//login
client.login(process.env.TOKEN);

