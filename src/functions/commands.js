var { checkOpenChannels, closeTicket } = require('./channels')

var close = async (client, guildId, message) => {
    var server = client.guilds.cache.get(guildId);
    var check = checkOpenChannels(message);
    if (check) {
        var channel = await server.channels.cache.get(message.channelId);
        return await closeTicket(channel);
    }
}

module.exports = { close }