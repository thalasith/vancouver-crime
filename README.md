#Vancouver Crime Dashboard

Disclaimer: Please read the VPD Disclaimer Notice on this dataset [here](https://data.vancouver.ca/datacatalogue/crime-data.htm)

This dashboard is meant to visualize Vancouver's crime data in 2018 with minimal data cleaning required. Vancouver has done a great job at making their data available to the public and ensuring data cleanliness. For more info on this dataset, please refer to: [Vancouver Crime Data](https://data.vancouver.ca/datacatalogue/crime-data.htm).

This dashboard was built on a one Friday night and full day Saturday timeline.

[Link to Live Site](https://intense-bastion-98788.herokuapp.com/)

![](demo.gif)

#Technology Stack

I've used the below to build this stack:

1. Flask Microframework - Python library to host webpages. Chosen mostly due to my familiarity with Flask, simplicity, data cleaning requirements, and easy to push to Heroku.
2. D3.js - JS library for manipulating the DOM based on data. Chosen due to its flexibility and awesomeness.
3. Crossfilter.js - JS library for exploring large multivariate datasets. Chosen to be able to drill down to detail on time of crime, what type of crime, and which neighbourhood.
4. DC.js - JS library that combines D3.js and Crossfilter. Chosen so that I would not have to create simple barcharts from scratch using D3.js.
5. Materialize - CSS/JS library to give the website a clean look.
6. Leaflet - CSS/JS library to create Vancouver's heatmap.
7. jQuery & Lodash - JS libraries to handle certain HTML/JS manipulations.

#Data Cleaning
I've done minimal data cleaning to ensure that the data was as 'raw' as possible. Here is the list of datacleaning methods I complete:

1. Changed the X,Y coordinates from UTM (Universal Transverse Mercator) to Latitude and Longitude to ensure that the data can be mapped to Leaflet.
2. Dropped the HUNDRED_BLOCK column as this is not a useful column when we have the NEIGHBOURHOOD column.
3. Dropped datapoints where coordinates where not available. This is either a) crime was related to homicide or offense against a person or b) person reporting the crime was not aware of where it happeneg (most likely...).
4. Split the data out to only show the 2018 dataset. This was due to user-friendliness. It would take a long time to load the entire dataset for the user.

#Next Steps
Next steps for when I pick this project up again:

1. Include multiple years of data to be used - can use Flask's API and build a dropdown to select the year on the frontend.
2. Cosmetic Changes - hourly chart can be more aesthetically pleasing. Can explore different settings for the leaflet module to ensure that it is optimized for the visualizations.
