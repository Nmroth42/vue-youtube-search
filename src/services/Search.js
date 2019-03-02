let axios = require('axios');
let BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

module.exports = function (options, callback) {
    if (!options.apiKey) {
        throw new Error('key not found')
    }

    let params = {
        part: 'snippet',
        key: options.apiKey,
        q: options.term,
        maxResults: (options.item) ? options.item : 12,
        type:'video'
    };

    axios.get(BASE_URL, { params }) 
        .then(response => {
            if (callback) { callback(response.data.items)}
             console.log('search response' , response)

        })
        .catch(error => console.error(error))
    

}