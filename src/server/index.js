require('dotenv').config();
var path = require('path')
const express = require('express')
const Geonames = require('geonames.js');
const DarkSky = require('dark-sky-api');

console.log(`${process.env.USERNAME}`)
const geonames = new Geonames({
    username: "aneeshakella17",
    lan: 'en',
    encoding: 'JSON'
});

var darksky_options = {
  APIKey: "bc1b17f7fef7f2e6af5f806b9a9b6617",
}

const darksky_baseURL = "https://api.darksky.net/forecast/"

console.log(geonames)

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)


app.listen(2000, function () {
    console.log('Example app listening on port 2000!')
})

app.post('/analyze', analyze_ans);
function analyze_ans(req, res){ 
	var data = geonames.search({
	   'q': req.body.text,
     'maxRows': 10
	}).then(resp => {  
        console.log(resp.geonames)
        if(resp.geonames.length == 0){
          res.send({})
        } else { 
          res.send(resp.geonames[0])
        }
	 }).catch(err => {
    console.log(err)
  });

}

app.post('/getWeather', analyze_weather);
function analyze_weather(req, res){ 
  
  var newURL = darksky_baseURL + darksky_options.APIKey + "/" + req.body.lat + "," + req.body.lon + "," + req.body.date + "?exclude=currently,hourly,flags"
  console.log(newURL);
  fetch(newURL, { mode: 'no-cors' }).then( function (response)  {
    return response.json()
  }).then(function (data){
    var daily_data = data["daily"]
    var temp = {'minTemp':daily_data.data[0].apparentTemperatureMin, 'maxTemp': daily_data.data[0].apparentTemperatureMax }
    console.log(temp)
    res.send(temp)
  });

}

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});
