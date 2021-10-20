require('dotenv').config();
const { Client, Intents } = require('discord.js');

const { onDmHandle } = require('./functions/dm-control');

const token = process.env.TOKEN;
const guildId = process.env.GUILDID;


const client = new Client( { partials: ["CHANNEL"], intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES]  } );

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async message => {
    if(message.author.bot) return;

    if(message.channel.type == 'DM'){
        onDmHandle(client, guildId, message);
    }

    const [cmdName, ...args] = message.content
        .trim()
        .substring("=".length)
        .split(/ +/g);

    if ( cmdName.toLowerCase() === 'buydino' ) { 
        message.reply('hh');
    }

});



client.login(token);