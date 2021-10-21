const { Pool, Client } = require('pg');

var getClient = () => {
    var client = new Pool({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        database: "botdb"
    });

    return client;
}

var getChannels = async () => {
    var channel = {} ;
    var channels = [];

    var client = getClient();

    await client.connect();
    try {
        let response = await client.query(`SELECT channel_name::text, channel_id::text FROM channels WHERE status = 'open' AND deleted = 'N'`);
        response.rows.forEach(row => {
            channel['channel_id'] = row.channel_id;
            channel['channel_name'] = row.channel_name;
            channels.push(channel);
            channel = {};
        });
    } catch( err ) {
        console.error(err);
    } 
    return channels;
}

var createTicket = async (channel_id, channel_name) => {
    var query = {
        text: `INSERT INTO channels(channel_id, channel_name, status, deleted) VALUES ($1, $2, $3, $4)`,
        values: [channel_id, channel_name, 'open', 'N'],
    }

    var client = getClient();
    await client.connect();

    try {
        await client.query(query);
        console.log(`Inserted row into channels Table for user: ${channel_name}`);
        return true;
    } catch ( err ) {
        console.error(err);
        return false;
    }
}

var closeTicket = async (channel) => {
    var query = {
        text: `UPDATE channels SET deleted = 'Y', status = 'closed' WHERE channel_id = $1`,
        values: [channel.id],
    }
    var client = getClient();
    await client.connect();

    try {
        await client.query(query);
        console.log(`Updated channels Table to close ticket for: ${channel.name} | ${channel.id}`);
        channel.delete()
            .then(console.log(`Channel deleted.`))
            .catch(err => console.log(err));
        return true;
    } catch ( err ) {
        console.error(err);
        return false;
    }
}

var checkOpenChannels = async (message) => {
    var openChannels = await getChannels();
        for(var x = 0; x < openChannels.length; x++) {
            if(message.channelId == openChannels[x].channel_id) {
                return true;
            }
        }
    return false;
}

module.exports = { getChannels, createTicket, closeTicket, checkOpenChannels }