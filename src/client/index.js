import {handleSubmit, add, darkskyAPICall, geonamesAPICall, departureNav, durationNav, pixabyAPICall } from './js/formHandler'


import './styles/style.scss' 

document.getElementById('startdate').addEventListener('change', departureNav)
document.getElementById('enddate').addEventListener('change', durationNav)

export { handleSubmit, add, darkskyAPICall, geonamesAPICall, pixabyAPICall}
