
//URLS to query
var baseURLS = {
    pixaby_baseURL : "https://pixabay.com/api/?key=" ,
    darksky_baseURL : "https://api.darksky.net/forecast/",
    geonames_baseURL : "http://api.geonames.org/searchJSON?q="
}

//API KEYS
var apiKeys = {    
    geonames : "aneeshakella17",
    pixaby : "15300219-cf87cb5dd2b5bec08f22c465b",
    darksky: "bc1b17f7fef7f2e6af5f806b9a9b6617"
}

//Event Handler when start date is changed
function departureNav(startdate = null){
    var input = null
    if(startdate == null){
        input = document.getElementById("startdate").value;
    } else {
        input = new Date(startdate)
    }
    var dateEntered = new Date(input);
    var currentTime = new Date(); 
    var difference_time =  dateEntered.getTime() - currentTime.getTime(); 
    var difference_days = difference_time / (1000 * 3600 * 24); 
    if(difference_days > 0){
        document.getElementById("days_left").innerText = Math.round(difference_days) + " days left"
        return true
    } else {
        document.getElementById("days_left").innerText = "Invalid Start Date"
        return false
    }
}

//Event Handler when end date is changed
function durationNav(){
    var start_input = document.getElementById("startdate").value;
    var end_input = document.getElementById("enddate").value;
    var startdate = new Date(start_input);
    var enddate = new Date(end_input); 
    var difference_time =  enddate.getTime() - startdate.getTime(); 
    var difference_days = difference_time / (1000 * 3600 * 24); 
    difference_days += 1;
    if(difference_days > 0){
        document.getElementById("duration").innerText = Math.round(difference_days) +  " day vacation!"
    } else {
        document.getElementById("duration").innerText = "Invalid Date Range Chosen"
    }
    
}

// Function that is called when submit button is clicked
function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value
    console.log("::: Form has been Submitted :::")

    let sending = {
        text: formText,
        url: baseURLS.geonames_baseURL,
        key: apiKeys.geonames
    }


    //Promise Chain 
    geonamesAPICall(sending).then(
        function(arr) {
            darkskyAPICall(arr);
    }).then(function () {
        pixabyAPICall();
    });
}


// Call to GeonamesAPI on Server Side
const geonamesAPICall = async (sending) => {

    const response = await fetch('/analyze', {
        method: 'POST',
        credentials: "same-origin",
        body: JSON.stringify(sending),
        headers: {"Content-Type": "application/json"}
    });


    try {  
        const data = await response.json();
        if(data.length == 0) {
                alert('Sorry, Cannot Find Name of City')
        } else {
            document.getElementById('lat').innerHTML = "Latitutde: " + data.lat
            document.getElementById('lng').innerHTML = "Longitude: " + data.lng
            document.getElementById('cityName').innerHTML = "Name: " + data.name
            if(data.adminName1 != data.name){ 
                document.getElementById('adminName').innerHTML = "State: " + data.adminName1
            }
            document.getElementById('countryName').innerHTML = "Country Name: " + data.countryName
            return [data.lat, data.lng]
        }
    } catch (error) {
        console.log("ERROR", error)
    }
}


// Call to Dark Sky on Server Side
const darkskyAPICall = async (arr) => {
    const input = document.getElementById("startdate").value;
    var dateEntered = new Date(input).valueOf()/1000;
    let sending = {
        date: dateEntered,
        lat: arr[0],
        lon: arr[1],
        url: baseURLS.darksky_baseURL,
        key: apiKeys.darksky
    };

    const response = await fetch('/getWeather', {
        method: 'POST',
        credentials: "same-origin",
        body: JSON.stringify(sending),
        headers: {"Content-Type": "application/json"}
    });

    try{
        const data = await response.json();
        document.getElementById('minTemp').innerHTML = "Min Temp: " + data.minTemp + " Farenheit"
        document.getElementById('maxTemp').innerHTML  = "Max Temp: " + data.maxTemp + " Farenheit"
    }catch(error){
        console.log("ERROR", error);
    }

}

// Call to Pixaby on Server Side
const pixabyAPICall = async () => { 
    var sending = {
        text: document.getElementById('name').value, 
        url: baseURLS.pixaby_baseURL,
        key: apiKeys.pixaby
    }

    const response = await fetch('/getPicture', {
        method: 'POST',
        credentials: "same-origin",
        body: JSON.stringify(sending),
        headers: {"Content-Type": "application/json"}
    });

    try{
        const data = await response.json();
        document.getElementById('photoBox').style.backgroundImage =  "url('" + data.url + ')' 
    } catch(error){
        console.log("ERROR", error);
    }
}


function add(a,b){
    return a + b;
}

export {handleSubmit, add, darkskyAPICall, geonamesAPICall, departureNav, pixabyAPICall, durationNav}
