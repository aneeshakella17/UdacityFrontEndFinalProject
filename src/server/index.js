require('dotenv').config();
var path = require('path')
const express = require('express')
const fetch = require("node-fetch");
const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)

// Listen on specified port
app.listen(2003, function () {
    console.log('Example app listening on port 2003!')
})

// Geonames API querying
app.post('/analyze', analyze_ans);
function analyze_ans(req, res){ 
  console.log(req.body)
  var newURL = req.body.url + req.body.text + "&maxRows=10&username=" + req.body.key
  
    fetch(newURL, { mode: 'no-cors' }).then( function (response)  {
      return response.json()
    }).then(function (data){
        var geonames_data = data["geonames"]
        console.log(geonames_data)
        if(geonames_data.length == 0){
          res.send({})
        } else { 
          res.send(geonames_data[0])
        }
	 }).catch(err => {
    console.log(err)
  });
}

// Weather API querying
app.post('/getWeather', analyze_weather);
function analyze_weather(req, res){ 
  
  var newURL = req.body.url + req.body.key + "/" + req.body.lat + "," + req.body.lon + "," + req.body.date + "?exclude=currently,hourly,flags"
  fetch(newURL, { mode: 'no-cors' }).then( function (response)  {
    return response.json()
  }).then(function (data){
    var daily_data = data["daily"]
    var temp = {'minTemp':daily_data.data[0].apparentTemperatureMin, 'maxTemp': daily_data.data[0].apparentTemperatureMax }
    res.send(temp)
  });

}


// Pixaby API querying
app.post('/getPicture', analyze_pic);
function analyze_pic(req, res){ 
  toReplace = req.body.text
  var replaced = toReplace.replace(' ', '+');
  var newURL = req.body.url + req.body.key + "&q=" + replaced + "&image_type=photo"
  fetch(newURL, { mode: 'no-cors' }).then( function (response)  {
    return response.json()
  }).then(function (data){
    var picture_data = data["hits"][0]
    var temp = {'url': picture_data.largeImageURL}
    res.send(temp)
  });

}


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});
