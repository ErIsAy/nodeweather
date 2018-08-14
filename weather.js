const http = require('https')
const querystring = require('querystring');
const api = require('./api')


function messageToPrint(query) {
  // const lower = query;
  // const capname = lower.charAt(0).toUpperCase() + lower.substr(1);
  // const message = `${capname} ${main} ${description} ${temperature}`
  const message = `Current temperature in ${query.name} is ${query.main.temp}F`;
  console.log(message);
};

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
      // console.log(body);
      //PARSING
      const queryresult = JSON.parse(body);
      // console.log(queryresult.name);
      //PRINTING
      // messageToPrint(queryresult.name, queryresult.weather[0].main, queryresult.weather[0].description, queryresult.main.temp);
      messageToPrint(queryresult)
    })

  });


};

module.exports.get = get;