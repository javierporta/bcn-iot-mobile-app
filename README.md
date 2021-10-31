# bcn-iot-mobile-app

Crossplatform web and mobile application developed with React Native and Expo written in Typescript. The app communicates with a Web API (https://github.com/javierporta/bcn-iot-webapi)
 to get telemetry data related to different temperature and humidity sensors located in a office. It also gets and updates current client values (names and threshold). In addition, this app receives push notifications when temperature measured is too high or too low, depending on the threshold set.
 
 NOTE: Push notifications only work for Android and iOS, but not for the Web.
 
 <p align="center">
  <img src="https://github.com/javierporta/bcn-iot-mobile-app/blob/main/AppListOfSensors.png?raw=true" alt="List of Sensors"/>
 <img src="https://github.com/javierporta/bcn-iot-mobile-app/blob/main/AppSensorDetail.png?raw=true" alt="Sensor Detail"/>
</p>


 <p align="center">
  <img src="https://github.com/javierporta/bcn-iot-mobile-app/blob/main/AppLast100Entries.png?raw=true" alt="Last 100 entries"/>
  <img src="https://github.com/javierporta/bcn-iot-mobile-app/blob/main/AppClient.png?raw=true" alt="Client view"/>
</p>

<p align="center">
  <img src="https://github.com/javierporta/bcn-iot-mobile-app/blob/main/Watch.png?raw=true" alt="Push notification in a watch"/>
</p>

 
 # How to run it?
 
    expo start
    
Then you can select if you want to run the project in:
- Web
- Android
- iOS
