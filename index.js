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
	