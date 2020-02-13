require('dotenv').config();
var path = require('path')
const express = require('express')
const Geonames = require('geonames.js');
console.log(`${process.env.USERNAME}`)
const geonames = new Geonames({
    username: "aneeshakella17",
    lan: 'en',
    encoding: 'JSON'
});

console.log(geonames)

const app = express()

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'))

console.log(__dirname)


app.listen(1556, function () {
    console.log('Example app listening on port 1556!')
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


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});
