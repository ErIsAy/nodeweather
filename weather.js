const http = require('https')
const querystring = require('querystring');
const api = require('./api')

function get(query) {


  const parameters = {
    APPID: api.key,
    units: 'imperial'
  };

  parameters.q = query

  http.get(`https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`, response => {

    console.log(response.statusCode);

    let body = "";

    response.on('data', data => {
      body += data.toString()
      console.log(body)
    });

  });


};

module.exports.get = get;