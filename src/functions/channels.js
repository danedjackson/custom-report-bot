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
    } catch ( err ) {
        console.error(err);
    }
}

module.exports = { getChannels, createTicket }