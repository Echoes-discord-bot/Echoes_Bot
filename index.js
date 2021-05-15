const fs = require('fs');

const Discord = require('discord.js');

const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	// set a new item in the Collection
	// with the key as the command name and the value as the exported module

	client.commands.set(command.name, command);
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
	
    if (!client.commands.has(commandName)) return;

	const command = client.commands.get(commandName);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	console.log(args);

	// market module
	marketModule.process(command, args, message);

});

//login
client.login(process.env.TOKEN);

