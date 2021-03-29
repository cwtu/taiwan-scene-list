# Taiwan Scene Searchup

You can view the site [here](https://cwtu.github.io/taiwan-scene-list)

## Description

This is a website for browsing scene spots in Taiwan. Users can filter scene spots by cities.
All of the information are fetched from [this API](https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot). API details are provided in [MOTC Transport API V2](https://ptx.transportdata.tw/MOTC?t=Tourism&v=2#!/Tourism/TourismApi_ScenicSpot) under Tourism/ScenicSpot and Tourism/scenicSpot/{City}.
This webpage uses ReactJS and Create React App. Main files are listed under src folder.

## Structures

The components are: <br>

- App
- Navbar
- Scenelist
- Scene

App:<br>
The App component holds the entire functionallity of the app. It has Navbar and Scenelist. App also host the request state, which holds the city city name the user want to filter by when browsing. It passes setRequest function down to Navbar for it to handle the changes and passes request down to Scenelist for it to display proper scenes from the chosen city.

Navbar:<br>
The Navbar component handles the request from users. Users can pick a city from select or choose show all, and Navbar will update the request state.

Scenelist:<br>
The Scenelist component consists of a list of scenes filtered by the requested city. It fetches data from the API as JSON and store the scenes into a list. Then it uses map function to create Scene components with scene information as props. Once the request state is updated, Scenelist is rerendered and display a new list of scenes.

Scene:<br>
The Scene component is responsible for displaying the name and discription of a scene spot.

## Notes

This website is built for Dcard summer 2021 internship application. Requirements are described [here](https://drive.google.com/file/d/14wpY_xmY1VxlwJQNr1WKE872UdWZ6ft6/view).
