const http = require('https')
const querystring = require('querystring');
const api = require('./api')

function get(query) {


  const parameters = {
    APPID: api.key,
    units: 'imperial'
  };

  const zipCode = parseInt(query);
  if (!isNaN(zipCode)) {
    parameters.zip = zipCode;
  } else {
    parameters.q = query;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?${querystring.stringify(parameters)}`;

  const request = http.get(url, response => {

    console.log(response.statusCode);

    let body = "";

    //READING THE DATA
    response.on('data', data => {
      body += data.toString()
    });

    response.on('end', () => {
      console.log(body);
      //PARSING

      //PRINTING

    })

  });


};

module.exports.get = get;