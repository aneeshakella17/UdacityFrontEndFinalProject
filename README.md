# Travel App


## Overview
This project is the final project in the Front End Nanodegree Program. The final project is to build a travel app that takes in as input a location and a start date. The output is a location picture, the predicted weather of the location on the start date, and demographic info regarding the location. To build this project, three APIs are utilized: Pixabay, Geoname, and DarkSky. Pixabay is what gathers the picture based on the location. Geoname gathers the demographic info (lat, lon) of the location. Darksky uses the latitude and longitude information from the previous API to predict the weather on a specific specified date.  

## Instructions
To run the web app, simply run 
```
sudo npm run build-prod
```
Afterwards, run 
```
sudo npm run start 
```

To run some of the sample tests, execute:

```
sudo npm run test
```


## Added Extensions
I added an end date feature. The net result is that the difference between the start date and end date will be calculated, the HTML DOM will be manipulated and the length of the vacation will be tabulated.