const fs = require('fs');

const Discord = require('discord.js');

const client = new Discord.Client();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
}

// market module
const { Market } = require('./modules/market');
const marketModule = new Market;

// end file reader
require('dotenv').config();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
	if (!message.content.startsWith(process.env.PREFIX) || message.author.bot) return;

	const commandBody = message.content.slice(process.env.PREFIX.length)
	const args = commandBody.trim().split(' ');
	const command = args.shift().toLowerCase();
	

	console.log(args);

	// market module
	marketModule.process(command, args, message);

});

//login
client.login(process.env.TOKEN);

