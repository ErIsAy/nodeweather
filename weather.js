const http = require('http')
const https = require('https')
const querystring = require('querystring');
const api = require('./api')


function messageToPrint(query) {
  // const lower = query;
  // const capname = lower.charAt(0).toUpperCase() + lower.substr(1);
  // const message = `${capname} ${main} ${description} ${temperature}`
  const message = `Current temperature in ${query.name} is ${query.main.temp}F`;
  console.log(message);
};

function logError(error) {
  console.error(error.message);
}

function get(query) {

  try {
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

    const request = https.get(url, response => {
      if (response.statusCode === 200) {

        console.log(response.statusCode);

        let body = "";

        //READING THE DATA
        response.on('data', data => {
          body += data.toString()
        });

        response.on('end', () => {
          try {
            // console.log(body);
            //PARSING
            const queryresult = JSON.parse(body);
            // console.log(queryresult.name);
            //PRINTING
            // messageToPrint(queryresult.name, queryresult.weather[0].main, queryresult.weather[0].description, queryresult.main.temp);
            messageToPrint(queryresult)
          } catch (error) {
            logError(error);
          }
        });
      } else {
        const statusErrorCode = new Error(`There was an error getting the message for "${query}". (${http.STATUS_CODES[response.statusCode]})`);
        logError(statusErrorCode);
      }
    });

  } catch (error) {
    logError(error);
  }

};

module.exports.get = get;