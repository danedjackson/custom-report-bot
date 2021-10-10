require('dotenv').config();
const { Client, Intents } = require('discord.js');

const token = process.env.TOKEN;

const client = new Client( { intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]  } );

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if(message.author.bot) return;
})

client.login(token);