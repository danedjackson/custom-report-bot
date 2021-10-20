const { Client } = require('pg');



var getChannels = async () => {
    var channels = [] ;

    var client = new Client({
        user: "postgres",
        password: "postgres",
        host: "localhost",
        database: "botdb"
    });

    await client.connect();
    console.log(`connected to the db`);
    try {
        let response = await client.query(`SELECT * FROM channels WHERE status = 'open' AND deleted = 'N'`);
        response.rows.forEach(row => channels.push(row.channel_id));
        console.log(channels);
    } catch( err ) {
        console.log(err);
    } finally {
        console.log(`closing client`);
        await client.end;
    }
    return channels;
}

module.exports = { getChannels }