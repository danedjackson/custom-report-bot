require('dotenv').config();
const { Client, Intents } = require('discord.js');

var { getChannels } = require('./functions/channels');

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
        await getChannels();

        //Check if open channel already exists
        

        //If channel does not exist; create
        var channel = await server.channels.create(message.author.tag, 'text');

        await channel.permissionOverwrites.edit('287723859430604800', {
            SEND_MESSAGES: false,
            VIEW_CHANNEL: false,
        });
        await channel.permissionOverwrites.edit('287725071840313345', {
            SEND_MESSAGES: true,
            VIEW_CHANNEL: true,       
        });
        channel.send(`${message}`);
    }

});



client.login(token);