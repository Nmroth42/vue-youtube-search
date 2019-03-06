const axios = require('axios');

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search'

module.exports = function (options, callback) {
  if (!options.apiKey) {
    throw new Error('key not found');
  }

  let params = {
    part: 'snippet',
    key: options.apiKey,
    q: options.term,
    maxResults: (options.item) ? options.item : 4,
    type:'video',
  };

  axios.get(BASE_URL, { params })
    .then(response => {
      if (callback) { 
        callback(response.data.items)
      }
    })
    .catch(error => console.error(error));
};
