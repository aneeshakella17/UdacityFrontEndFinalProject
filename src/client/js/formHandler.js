

function departureNav(){
    var input = document.getElementById("departure").value;
    var dateEntered = new Date(input);
    var currentTime = new Date(); 
    var difference_time =  dateEntered.getTime() - currentTime.getTime(); 
    var difference_days = difference_time / (1000 * 3600 * 24); 
    if(difference_days > 0){
        document.getElementById("countdown").innerText = Math.round(difference_days) + " days left"
    }
}





function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value
    console.log(formText)
    console.log("::: Form has been Submitted :::")
    let sending = {
        text: formText
    }

    geonamesAPICall(sending).then(
        function(arr) {
            darkskyAPICall(arr);
    });
}


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
            console.log(data.lat, data.lng)
            return [data.lat, data.lng]
        }
    } catch (error) {
        console.log("ERROR", error)
    }
}


const darkskyAPICall = async (arr) => {
    const input = document.getElementById("departure").value;
    var dateEntered = new Date(input).valueOf()/1000;
    let sending = {
        date: dateEntered,
        lat: arr[0],
        lon: arr[1]
    }

    const response = await fetch('/getWeather', {
        method: 'POST',
        credentials: "same-origin",
        body: JSON.stringify(sending),
        headers: {"Content-Type": "application/json"}
    });

    try{
        const data = await response.json();
        console.log(data)
        document.getElementById('minTemp').innerHTML = "Min Temp: " + data.minTemp + " Farenheit"
        document.getElementById('maxTemp').innerHTML  = "Max Temp: " + data.maxTemp + " Farenheit"
    }catch(error){
        console.log("ERROR", error);
    }

}




function add(a,b){
    return a + b;
}

export {handleSubmit, add, darkskyAPICall, geonamesAPICall, departureNav}
