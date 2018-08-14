const weather = require('./weather');

const query = process.argv.slice(2).join(' ');

//query: 90201
//query: Los Angeles

weather.get(query);