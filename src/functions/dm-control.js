
const { channel } = require('diagnostics_channel');
var { getChannels } = require('./channels');

var checkExistingChannel = async (server, message) => {
    var openChannels = await getChannels();
    for(var x = 0; x < openChannels.length; x++) {
        if (openChannels[x].channel_name == message.author.tag.toLowerCase().replace('#', '').replace(' ', '-')) {
            var channel = await server.channels.cache.get(openChannels[x].channel_id);
            return channel;
        }
    }
    return false;
}

var createChannel = async (server, message) => {
    var channel = await server.channels.create(message.author.tag, 'text');

    await channel.permissionOverwrites.edit('287723859430604800', {
        SEND_MESSAGES: false,
        VIEW_CHANNEL: false,
    });
    await channel.permissionOverwrites.edit('287725071840313345', {
        SEND_MESSAGES: true,
        VIEW_CHANNEL: true,       
    });

    return channel;
}

var onDmHandle = async (client, guildId, message) => {
    var server = client.guilds.cache.get(guildId);
    var channel;

    channel = await checkExistingChannel(server, message);

    //Check if open channel already exists
    if( channel ) {
        channel.send(`${message}`);
        return;
    }

    //If channel does not exist; create
    channel = await createChannel(server, message);
    channel.send(`${message}`);
}

module.exports = {onDmHandle}