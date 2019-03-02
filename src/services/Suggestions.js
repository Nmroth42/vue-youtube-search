let axios = require('axios');
let BASE_URL = 'http://suggestqueries.google.com/complete/search'

// ?client=youtube&ds=yt&client=firefox&q=Query

const suggestions  = function (options, callback) {
    // if (!options.apiKey) {
    //     throw new Error('key not found')
    // }
   
    let params = {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        client: 'youtube',
        ds: 'yt',
        client: 'firefox',
        q: options.query,
        
        
    };

    axios.get(BASE_URL, { params }) 
        .then(response => {
            if (callback) { callback(response)}
             console.log('suggestion response' , response)

        })
        .catch(error => console.error(error))
    

}
const test  = function() {
   
    

        axios.get('http://suggestqueries.google.com/complete/search?client=youtube&ds=yt&client=firefox&q=Query',{
            method: 'GET',
            mode: 'no-cors',
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
            withCredentials: true,
            credentials: 'same-origin',
          })
          .then(results => console.log(results))

        }


        




export {suggestions, test};