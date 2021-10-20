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
        console.log(err);
    } finally {
        await client.end;
    }
    return channels;
}

module.exports = { getChannels }