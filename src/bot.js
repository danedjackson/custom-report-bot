require('dotenv').config();
const { Client, Intents } = require('discord.js');

const token = process.env.TOKEN;
const guildId = process.env.GUILDID;

const client = new Client( { partials: ["CHANNEL"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]  } );

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if(message.author.bot) return;

    if(message.channel.type == 'DM'){
        var server = client.guilds.cache.get(guildId);
        server.channels.create(message.author.tag, { reason: `report for ${message.author.username}` });
    }

});



client.login(token);