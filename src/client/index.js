import {handleSubmit, add, darkskyAPICall, geonamesAPICall, departureNav, pixabyAPICall } from './js/formHandler'


import './styles/style.scss' 
// import './styles/base.scss'
// import './styles/form.scss'
// import './styles/footer.scss'
// import './styles/header.scss'

document.getElementById('departure').addEventListener('change', departureNav)

export { handleSubmit, add, darkskyAPICall, geonamesAPICall, pixabyAPICall}
