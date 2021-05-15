const fetch = require("node-fetch");
const Discord = require('discord.js');
const items = require('./items');

class Market {
    process(command, args, message) {
        if (command === "market") {
            if (!args.length) {
                return message.channel.send("Please use the command in this format `!market <item>`, "+`${message.author}!`);};
            const item = items.list.find(element => element.name.toLowerCase().indexOf(args.join(' ').toLowerCase()) !== -1);

            if (!item) return message.channel.send(`Unable to find item on market, ${message.author}!`);

            fetch(`https://api.eve-echoes-market.com/market-stats/${item.item_id}`)
            .then(response => response.json())
            .then(data => {
               data.reverse();
               for (var i = 0; i < 1; i ++) {
                  let date = new Date(data[i].time * 1000);

                    const marketEmbed = new Discord.MessageEmbed().setColor('#f54242')
                    .setTitle('Price: ' + item.name)
                    .setDescription(date)
                    .addFields(
                        { name: 'Average selling price', value: data[i].sell.toLocaleString(undefined, {minimumFractionDigits: 0}) + ' ISK' }, // average sell price
                        { name: 'Average purchase price', value: data[i].buy.toLocaleString(undefined, {minimumFractionDigits: 0}) + ' ISK' }, // average buy price
                        { name: 'Lowest selling price', value: data[i].lowest_sell.toLocaleString(undefined, {minimumFractionDigits: 0}) + ' ISK' }, // lowest sell price
                        { name: 'Highest purchase price', value: data[i].highest_buy.toLocaleString(undefined, {minimumFractionDigits: 0}) + ' ISK' }, // highest sell price
                        { name: 'Number of products on the market', value: data[i].volume + '' }, // items on the market
                    )
                    .setTimestamp()
                    .setFooter('STONKS');

                    message.channel.send(marketEmbed);
               }
            })
            .catch((error) => {
               console.error('Error:', error);
            });
        }
    }
}

module.exports = { Market }