const axios = require('axios');

async function lyrics_get(req, res) {
    try{
        const fetchLyrics = await axios.get('https://lrclib.net/api/get', {
            params: req.query,
        });
        
        const plainLyrics = fetchLyrics.data.plainLyrics;
        res.json(plainLyrics);

    } catch(err){
        console.error('error in lyrics_get: ', err.message);

        if(err.response){
            return res.status(err.response.status).json({
                error: 'Lyrics not found for this song.'
            });
        }
        res.status(500).json({ error: 'Internal server error' })
    }
};

module.exports = { lyrics_get };