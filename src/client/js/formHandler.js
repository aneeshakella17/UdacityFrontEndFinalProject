function handleSubmit(event) {
    event.preventDefault()

    let formText = document.getElementById('name').value
    console.log(formText)
    Client.checkForName(formText)
    console.log("::: Form has been Submitted :::")
    let sending = {
        text: formText
    }

   fetch('/analyze', {
        method: 'POST',
        credentials: "same-origin",
        body: JSON.stringify(sending),
        headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(function(res) {
                // document.getElementById('polarity').innerHTML = res.polarity
        console.log("INSIDE CLIENT SIDE CODE", res.length)
        if(res.length == 0){
            alert('Sorry, Cannot Find Name of City')
        } else {
                console.log(res)
                document.getElementById('lat').innerHTML = "Latitutde: " + res.lat
                document.getElementById('lng').innerHTML = "Longitude: " + res.lng
                document.getElementById('cityName').innerHTML = "Name: " + res.name
                if(res.adminName1 != res.name){ 
                    document.getElementById('adminName').innerHTML = "State: " + res.adminName1
                }
                document.getElementById('countryName').innerHTML = "Country Name: " + res.countryName
        }
    })
}

function add(a,b){
    return a + b;
}

export {handleSubmit, add }
